"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { refresh } from "next/cache";
import { start } from "workflow/api";
import { getDb } from "@/db";
import { ballots, elections, electionTypes, options, type ElectionType } from "@/db/schema";
import { requireAdmin, requireEmperor } from "@/lib/admin";
import { cancelElection, getElection, vetoElection } from "@/lib/elections";
import { dictionaryFor, hasLocale } from "@/lib/i18n";
import { electionLifecycle } from "@/workflows/election";

export type SaveState = { error?: string } | null;

const LAW_OPTIONS = ["yes", "no", "abstain"];

export async function saveElection(_prev: SaveState, form: FormData): Promise<SaveState> {
  const admin = await requireAdmin();
  const lang = String(form.get("lang"));
  const t = dictionaryFor(lang).admin.errors;
  const id = form.get("id") ? Number(form.get("id")) : null;
  const publish = form.get("intent") === "publish";

  const type = String(form.get("type")) as ElectionType;
  if (!electionTypes.includes(type)) return { error: t.title };
  const title = String(form.get("title") ?? "").trim();
  const labels =
    type === "law"
      ? LAW_OPTIONS
      : String(form.get("options") ?? "").split("\n").map((s) => s.trim()).filter(Boolean);
  const opensAt = new Date(String(form.get("opensAt")));
  const closesAt = new Date(String(form.get("closesAt")));
  const maxPicks = type === "multi" ? Number(form.get("maxPicks")) : 1;
  const quorum = form.get("quorum") ? Number(form.get("quorum")) : null;
  const vetoHours = type === "law" ? Math.max(0, Number(form.get("vetoHours") ?? 0)) : 0;

  if (!title) return { error: t.title };
  if (labels.length < 2 || new Set(labels).size !== labels.length) return { error: t.options };
  if (isNaN(opensAt.getTime()) || isNaN(closesAt.getTime()) || closesAt <= opensAt) return { error: t.dates };
  if (publish && closesAt <= new Date()) return { error: t.dates };
  if (!Number.isInteger(maxPicks) || maxPicks < 1 || maxPicks > labels.length) return { error: t.maxPicks };
  if (quorum !== null && (!Number.isInteger(quorum) || quorum < 1)) return { error: t.quorum };

  const values = {
    title,
    description: String(form.get("description") ?? "").trim(),
    type,
    maxPicks,
    eligibleRoleIds: form.getAll("roles").map(String),
    majority: form.get("majority") === "two_thirds" ? ("two_thirds" as const) : ("simple" as const),
    quorum,
    vetoHours,
    opensAt,
    closesAt,
    status: publish ? ("scheduled" as const) : ("draft" as const),
  };

  const db = await getDb();
  let electionId = id;
  if (id) {
    // Only drafts can change; the WHERE makes that atomic.
    const [row] = await db
      .update(elections)
      .set(values)
      .where(and(eq(elections.id, id), eq(elections.status, "draft")))
      .returning({ id: elections.id });
    if (!row) return { error: t.locked };
    await db.delete(options).where(eq(options.electionId, id));
  } else {
    const [row] = await db.insert(elections).values({ ...values, createdBy: admin.id }).returning({ id: elections.id });
    electionId = row.id;
  }
  await db.insert(options).values(labels.map((label, position) => ({ electionId: electionId!, label, position })));

  if (publish) await start(electionLifecycle, [electionId!]);
  redirect(`/${hasLocale(lang) ? lang : "en"}/admin/${electionId}/`);
}

export async function deleteDraft(form: FormData) {
  await requireAdmin();
  const db = await getDb();
  await db.delete(elections).where(and(eq(elections.id, Number(form.get("id"))), eq(elections.status, "draft")));
  redirect(`/${hasLocale(String(form.get("lang"))) ? String(form.get("lang")) : "en"}/admin/`);
}

export async function deleteVote(form: FormData) {
  await requireAdmin();
  const db = await getDb();
  await db.delete(elections).where(eq(elections.id, Number(form.get("id"))));
  const lang = String(form.get("lang"));
  redirect(`/${hasLocale(lang) ? lang : "en"}/admin/`);
}

export async function cancelVote(form: FormData) {
  await requireAdmin();
  await cancelElection(Number(form.get("id")));
  refresh();
}

/** Voiding is only possible until the vote closes; after that the published result stands. */
export async function setBallotVoided(form: FormData) {
  const admin = await requireAdmin();
  const electionId = Number(form.get("electionId"));
  const election = await getElection(electionId);
  if (!election || !["scheduled", "open"].includes(election.status) || election.closesAt <= new Date()) return;

  const voided = form.get("voided") === "1";
  const db = await getDb();
  await db
    .update(ballots)
    .set({
      voided,
      voidedBy: voided ? admin.id : null,
      voidReason: voided ? String(form.get("reason") ?? "").trim() || null : null,
    })
    .where(and(eq(ballots.id, Number(form.get("ballotId"))), eq(ballots.electionId, electionId)));
  refresh();
}

export async function veto(form: FormData) {
  await requireEmperor();
  await vetoElection(Number(form.get("id")));
  refresh();
}
