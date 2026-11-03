import "server-only";
import { asc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { options, type Election } from "@/db/schema";
import { resultsArePublic } from "./governance-config";
import { dictionaryFor, fmt, hasLocale, type Dictionary } from "./i18n";
import type { TallyResult } from "./tally";

type Kind = "opened" | "result" | "vetoed" | "final";

export function siteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, "");
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return host ? `https://${host}` : "http://localhost:3000";
}

/** Discord renders <t:…> in each reader's own time zone. */
const discordTime = (d: Date) => `<t:${Math.floor(d.getTime() / 1000)}:f>`;

const COLORS: Record<Kind, number> = { opened: 0x1e3a5f, result: 0xc6a11e, vetoed: 0xc61e2c, final: 0x10b981 };

/** Posts to the target Discord channel (via Bot API if announceChannelId is set) or webhook fallback. */
export async function announce(kind: Kind, election: Election) {
  const webhook =
    election.type === "law"
      ? process.env.DISCORD_LAW_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL
      : process.env.DISCORD_WEBHOOK_URL;
  const lang = hasLocale(process.env.ANNOUNCE_LANG ?? "") ? process.env.ANNOUNCE_LANG! : "en";
  const t = dictionaryFor(lang);
  const url = `${siteUrl()}/${lang}/szavazas/${election.id}/`;

  let description: string;
  if (kind === "opened") {
    description = [election.description, `${t.vote.closes}: ${discordTime(election.closesAt)}`].filter(Boolean).join("\n\n");
  } else if (!resultsArePublic(election.resultsVisibility)) {
    // Restricted results stay on the website; the channel only learns that the vote moved on.
    description = t.vote.resultsRestricted;
  } else {
    const db = await getDb();
    const opts = await db.select().from(options).where(eq(options.electionId, election.id)).orderBy(asc(options.position));
    const label = new Map(opts.map((o) => [o.id, o.label]));
    description = election.result ? summarize(election.result, (id) => label.get(id) ?? "?", t) : "";
    if (kind === "result" && election.status === "veto_window" && election.vetoEndsAt) {
      description += `\n\n${fmt(t.vote.outcome.veto_window, { date: discordTime(election.vetoEndsAt) })}`;
    }
    if (kind === "vetoed") description = `${t.vote.outcome.vetoed}\n\n${description}`;
  }

  const body = {
    embeds: [
      {
        title: fmt(t.vote.announce[kind], { title: election.title }),
        description,
        url,
        color: COLORS[kind],
      },
    ],
    allowed_mentions: { parse: [] }, // never ping from user-written titles
  };

  // Rows saved before the channel allowlist could hold any string; only a snowflake may go into the URL path.
  if (election.announceChannelId && /^\d{17,20}$/.test(election.announceChannelId) && process.env.DISCORD_BOT_TOKEN) {
    const botRes = await fetch(`https://discord.com/api/v10/channels/${election.announceChannelId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (botRes.ok) return;
    console.warn(`[announce] Bot post to channel ${election.announceChannelId} returned ${botRes.status}, falling back to webhook`);
  }

  if (!webhook) {
    console.log("[announce] no webhook set, would post:", JSON.stringify(body));
    return;
  }
  const res = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`Discord webhook returned ${res.status}`);
}

/** Plain-text result for Discord. */
export function summarize(result: TallyResult, label: (id: number) => string, t: Dictionary) {
  const lines = [fmt(t.vote.ballots, { n: result.total })];
  if (result.kind === "law") {
    lines.push(`${t.vote.yes}: ${result.counts.yes} · ${t.vote.no}: ${result.counts.no} · ${t.vote.abstain}: ${result.counts.abstain}`);
    lines.push(`**${t.vote.outcome[result.outcome]}**`);
    return lines.join("\n");
  }
  if (result.outcome === "quorum_failed") return [...lines, `**${t.vote.outcome.quorum_failed}**`].join("\n");

  const counts =
    result.kind === "plurality"
      ? result.counts
      : Object.entries(result.rounds.at(-1)?.counts ?? {})
          .map(([id, votes]) => ({ optionId: Number(id), votes }))
          .sort((a, b) => b.votes - a.votes);
  for (const c of counts) lines.push(`${label(c.optionId)}: ${c.votes}`);
  if (result.winners.length) lines.push(`**${t.vote.elected}: ${result.winners.map(label).join(", ")}**`);
  if (result.tied.length) lines.push(`**${t.vote.outcome.tie}: ${result.tied.map(label).join(", ")}**`);
  return lines.join("\n");
}
