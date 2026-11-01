import "server-only";
import { asc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { ballots, users } from "@/db/schema";
import { flagBallots } from "./flags";
import { getMember, isAdmin, isEmperor, type Member } from "./discord";
import { getSessionUser, type SessionUser } from "./session";

/** The logged-in admin, or null. Checked on every request and every action, never trusted from the client. */
export async function getAdmin(): Promise<(SessionUser & { member: Member; emperor: boolean }) | null> {
  const user = await getSessionUser();
  if (!user) return null;
  const member = await getMember(user.id).catch(() => null);
  if (!member) return null;
  if (!isAdmin(member) && !isEmperor(member)) return null;
  return { ...user, member, emperor: isEmperor(member) };
}

/** Emperors can open the admin area for vetoes; only admins can create or manage votes. */
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin || !isAdmin(admin.member)) throw new Error("Not an admin");
  return admin;
}

/** Who voted in one election, without what they picked, with alt-account warnings. */
export async function getVoters(electionId: number) {
  await requireAdmin();
  const db = await getDb();
  const rows = await db
    .select({
      id: ballots.id,
      userId: ballots.userId,
      name: users.name,
      deviceId: ballots.deviceId,
      ipHash: ballots.ipHash,
      memberJoinedAt: ballots.memberJoinedAt,
      createdAt: ballots.createdAt,
      voided: ballots.voided,
      voidReason: ballots.voidReason,
    })
    .from(ballots)
    .innerJoin(users, eq(users.id, ballots.userId))
    .where(eq(ballots.electionId, electionId))
    .orderBy(asc(ballots.createdAt));
  return flagBallots(rows);
}

export async function requireEmperor() {
  const admin = await getAdmin();
  if (!admin?.emperor) throw new Error("Not the Emperor");
  return admin;
}
