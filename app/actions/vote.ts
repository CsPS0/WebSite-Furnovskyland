"use server";

import { createHmac, randomBytes } from "node:crypto";
import { cookies, headers } from "next/headers";
import { refresh } from "next/cache";
import { sql } from "drizzle-orm";
import { getDb } from "@/db";
import { ballots } from "@/db/schema";
import { canLogin, getMember } from "@/lib/discord";
import { getElection } from "@/lib/elections";
import { dictionaryFor } from "@/lib/i18n";
import { cookieOptions, getSessionUser } from "@/lib/session";
import { isValidChoice } from "@/lib/tally";

export type VoteState = { ok?: boolean; error?: string } | null;

const DEVICE_COOKIE = "fl_device";

/** Reads the ballot form: radio/checkbox `choice` values, or `rank-<optionId>` numbers for ranked votes. */
function readChoice(form: FormData, type: string): number[] {
  if (type !== "ranked") return form.getAll("choice").map(Number);
  const ranks = [...form.entries()]
    .filter(([key, value]) => key.startsWith("rank-") && String(value).trim() !== "")
    .map(([key, value]) => ({ id: Number(key.slice(5)), rank: Number(value) }));
  // Two options with the same number would be ambiguous, so that ballot is rejected (empty = invalid).
  if (ranks.some((r) => !Number.isInteger(r.rank) || r.rank < 1) || new Set(ranks.map((r) => r.rank)).size !== ranks.length) {
    return [];
  }
  return ranks.sort((a, b) => a.rank - b.rank).map((r) => r.id);
}

export async function castVote(_prev: VoteState, form: FormData): Promise<VoteState> {
  const t = dictionaryFor(String(form.get("lang"))).vote;
  const user = await getSessionUser();
  if (!user) return { error: t.loginToVote };

  const election = await getElection(Number(form.get("electionId")));
  const now = new Date();
  if (!election || !["scheduled", "open"].includes(election.status) || now < election.opensAt || now >= election.closesAt) {
    return { error: t.notOpen };
  }

  let member;
  try {
    member = await getMember(user.id);
  } catch {
    return { error: t.error };
  }
  if (!member) return { error: t.notMember };
  if (!canLogin(member) || (election.eligibleRoleIds.length && !member.roles.some((r) => election.eligibleRoleIds.includes(r)))) {
    return { error: t.notEligible };
  }

  const choice = readChoice(form, election.type);
  if (!isValidChoice(election.type, election.maxPicks, election.options.map((o) => o.id), choice)) {
    return { error: t.invalid };
  }

  const jar = await cookies();
  let deviceId = jar.get(DEVICE_COOKIE)?.value;
  if (!deviceId) {
    deviceId = randomBytes(16).toString("base64url");
    jar.set(DEVICE_COOKIE, deviceId, { ...cookieOptions, maxAge: 2 * 365 * 24 * 3600 });
  }
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  // Without a secret the IPv4 space could be brute-forced back out of the hash.
  if (!process.env.IP_HASH_SECRET) throw new Error("IP_HASH_SECRET is not set");
  const ipHash = createHmac("sha256", process.env.IP_HASH_SECRET).update(ip).digest("base64url");

  const db = await getDb();
  await db
    .insert(ballots)
    .values({ electionId: election.id, userId: user.id, choice, deviceId, ipHash, memberJoinedAt: member.joinedAt })
    .onConflictDoUpdate({
      target: [ballots.electionId, ballots.userId],
      // A changed vote keeps any admin decision (voided) and the original vote time.
      set: { choice, deviceId, ipHash, memberJoinedAt: member.joinedAt, updatedAt: sql`now()` },
    });

  refresh();
  return { ok: true };
}
