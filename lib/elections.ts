import "server-only";
import { and, asc, desc, eq, inArray, isNull, lte, ne } from "drizzle-orm";
import { getDb } from "@/db";
import { ballots, elections, options, type Election, type ElectionStatus, type Option } from "@/db/schema";
import { tally } from "./tally";
import { announce } from "./announce";

export type ElectionWithOptions = Election & { options: Option[] };

export async function getElection(id: number): Promise<ElectionWithOptions | null> {
  const db = await getDb();
  const row = await db.query.elections.findFirst({ where: eq(elections.id, id) });
  if (!row) return null;
  const opts = await db.select().from(options).where(eq(options.electionId, id)).orderBy(asc(options.position));
  return { ...row, options: opts };
}

/** Published votes for the public list, newest first. */
export async function listPublicElections() {
  const db = await getDb();
  return db.select().from(elections).where(ne(elections.status, "draft")).orderBy(desc(elections.opensAt));
}

export async function listAllElections() {
  const db = await getDb();
  return db.select().from(elections).orderBy(desc(elections.createdAt));
}

export async function getUserBallot(electionId: number, userId: string) {
  const db = await getDb();
  const [row] = await db
    .select()
    .from(ballots)
    .where(and(eq(ballots.electionId, electionId), eq(ballots.userId, userId)));
  return row ?? null;
}

/** Moves a vote along if its times have passed. Safe to call any number of times, from anywhere. */
export async function syncElection(id: number, now = new Date()) {
  await openIfDue(id, now);
  await closeIfDue(id, now);
  await finalizeIfDue(id, now);
}

/**
 * Each transition is one conditional UPDATE, so when the scheduled job and a page load race,
 * only one of them wins and posts to Discord.
 */
async function transition(id: number, from: ElectionStatus[], set: Partial<Election>, extra = and()) {
  const db = await getDb();
  const [row] = await db
    .update(elections)
    .set(set)
    .where(and(eq(elections.id, id), inArray(elections.status, from), extra))
    .returning();
  return row ?? null;
}

async function openIfDue(id: number, now: Date) {
  const row = await transition(id, ["scheduled"], { status: "open" }, lte(elections.opensAt, now));
  if (row) await announceOnce(id, "announcedOpenAt", () => announce("opened", row));
}

async function closeIfDue(id: number, now: Date) {
  const db = await getDb();
  const election = await getElection(id);
  if (!election || !["scheduled", "open"].includes(election.status) || election.closesAt > now) return;

  const valid = await db
    .select({ choice: ballots.choice })
    .from(ballots)
    .where(and(eq(ballots.electionId, id), eq(ballots.voided, false)));
  const result = tally({ ...election, ballots: valid.map((b) => b.choice) });

  const vetoable = election.type === "law" && result.kind === "law" && result.outcome === "passed" && election.vetoHours > 0;
  const vetoEndsAt = vetoable ? new Date(election.closesAt.getTime() + election.vetoHours * 3600_000) : null;
  const row = await transition(id, ["scheduled", "open"], {
    status: vetoable ? "veto_window" : "final",
    result,
    vetoEndsAt,
  });
  if (row) await announceOnce(id, "announcedResultAt", () => announce("result", row));
}

async function finalizeIfDue(id: number, now: Date) {
  const row = await transition(id, ["veto_window"], { status: "final" }, lte(elections.vetoEndsAt, now));
  if (row) await announceOnce(id, "announcedFinalAt", () => announce("final", row));
}

export async function vetoElection(id: number) {
  const row = await transition(id, ["veto_window"], { status: "vetoed" });
  if (row) await announceOnce(id, "announcedFinalAt", () => announce("vetoed", row));
  return !!row;
}

export async function cancelElection(id: number) {
  return !!(await transition(id, ["scheduled", "open"], { status: "cancelled" }));
}

type AnnouncedField = "announcedOpenAt" | "announcedResultAt" | "announcedFinalAt";

/** Claims the announcement slot first, so a retry never posts the same message twice. */
async function announceOnce(id: number, field: AnnouncedField, send: () => Promise<void>) {
  const db = await getDb();
  const [claimed] = await db
    .update(elections)
    .set({ [field]: new Date() })
    .where(and(eq(elections.id, id), isNull(elections[field])))
    .returning({ id: elections.id });
  if (!claimed) return;
  try {
    await send();
  } catch (error) {
    // A failed post shouldn't block the vote; free the slot so the next sync tries again.
    await db.update(elections).set({ [field]: null }).where(eq(elections.id, id));
    console.error(`Discord announcement for election ${id} failed`, error);
  }
}

/** What a viewer should see right now, even if the background job is a little late. */
export function displayStatus(e: Election, now = new Date()): ElectionStatus {
  if ((e.status === "scheduled" || e.status === "open") && e.closesAt <= now) return "closed";
  if (e.status === "scheduled" && e.opensAt <= now) return "open";
  return e.status;
}
