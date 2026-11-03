import type { ResultsVisibility } from "@/db/schema";

export const DISCORD_ROLES = {
  EMPEROR: "836272651814830140",
  VOTUM_ADMIN: "1135221429164584960",
  WEBMASTER: "1566045077980053524",
  MODERATOR: "1033089906001584129",
  PRIME_MINISTER: "836273968058859581",
  DEPUTY_PM: "978721383678894091",
  SPEAKER: "1491734052355444849",
  MINISTER: "836274885226397726",
  STATE_SECRETARY: "1564418967441903688",
  MP: "1490455424812454149",
  SENATE_PRESIDENT: "983038650449264650",
  SENATOR: "1006845578270998538",
  PARTY_LEADER: "891932223169765387",
  CAMPAIGNING: "999227153415671909",
  BUREAU_OFFICER: "1564419081405337630",
  CHIEF_JUSTICE: "1066679871343968396",
  CONSTITUTIONAL_COURT: "1180863370681909380",
  CITIZEN: "836275657892954122",
  QUARANTINE: "879725345677410304",
  UNVERIFIED: "875780258962505739",
} as const;

export type DiscordVoteChannel = {
  id: string;
  name: string;
  category: string;
  description: string;
};

export const DISCORD_VOTE_CHANNELS: DiscordVoteChannel[] = [
  {
    id: "852198106627047474",
    name: "#『🗳』elections",
    category: "Politics — General Elections & Polls",
    description: "Parliamentary elections, Mayoral elections, and national ballot notices",
  },
  {
    id: "871702306352144405",
    name: "#『✅』citizen-polls『❌』",
    category: "Politics — National Referendums",
    description: "Article 9 National Referendums & public citizen consultations",
  },
  {
    id: "1490456420444016871",
    name: "#the-parliament",
    category: "Politics — National Assembly",
    description: "15-Seat National Assembly bills, confidence motions & cardinal law divisions",
  },
  {
    id: "1563296282712481963",
    name: "#federal-gazette",
    category: "Politics — Official Promulgation",
    description: "Promulgated Acts of Parliament, Constitutional Amendments & Imperial Assent",
  },
  {
    id: "902150505130782760",
    name: "#『📢』throne-hall『🎂』",
    category: "Legislative Announcements — Imperial Crown",
    description: "Imperial Decrees, Sanctio Regia notifications & State Proclamations",
  },
  {
    id: "1434952634938167337",
    name: "#『📢』ministry-announcements",
    category: "Legislative Announcements — Executive",
    description: "Government Cabinet resolutions & Ministerial decrees",
  },
  {
    id: "1006845281687580672",
    name: "#the-senate",
    category: "Historical Archive — Upper Chamber",
    description: "Legacy Senate chamber (archived under the Oct 24, 2026 Constitution)",
  },
];

export const ROLE_ACCESS_PRESETS = [
  {
    id: "everyone",
    label: "🌍 All Verified Server Members",
    roleIds: [] as string[],
    description: "Open to every verified server member (Quarantine & Unverified always blocked)",
  },
  {
    id: "citizens",
    label: "🇭🇺 Citizens of Furnovskyland (Universal Suffrage)",
    roleIds: [DISCORD_ROLES.CITIZEN],
    description: "General Elections, Municipal Elections, and Article 9 National Referendums",
  },
  {
    id: "parliament",
    label: "🏛️ National Assembly Only (MPs & Speaker)",
    roleIds: [DISCORD_ROLES.MP, DISCORD_ROLES.SPEAKER],
    description: "15 elected Members of Parliament and Speaker of the House (Bills & Cardinal Laws)",
  },
  {
    id: "cabinet",
    label: "⚖️ Government Cabinet Only (PM & Ministers)",
    roleIds: [
      DISCORD_ROLES.PRIME_MINISTER,
      DISCORD_ROLES.DEPUTY_PM,
      DISCORD_ROLES.MINISTER,
      DISCORD_ROLES.STATE_SECRETARY,
    ],
    description: "Executive Cabinet divisions (Prime Minister, Deputy PM, Ministers, State Secretaries)",
  },
  {
    id: "supreme_court",
    label: "👨‍⚖️ Supreme Court Judicial Panel",
    roleIds: [DISCORD_ROLES.CHIEF_JUSTICE, DISCORD_ROLES.CONSTITUTIONAL_COURT],
    description: "Judicial uniformity & constitutional review divisions",
  },
  {
    id: "senate",
    label: "📜 Legacy Senate Chamber",
    roleIds: [DISCORD_ROLES.SENATOR, DISCORD_ROLES.SENATE_PRESIDENT],
    description: "Historical upper house divisions",
  },
] as const;

export const RESULTS_VISIBILITY_OPTIONS: {
  value: ResultsVisibility;
  label: string;
  shortLabel: string;
  description: string;
}[] = [
  {
    value: "after_close",
    label: "Constitutional Secret Ballot — Hidden while open, Public after close (Default)",
    shortLabel: "Public after poll closes",
    description:
      "Tallies are sealed while voting is in progress; full circle graphs & D'Hondt seat hemicycles become public automatically when the poll closes.",
  },
  {
    value: "live_public",
    label: "Live Public Tally — Visible to everyone during & after voting",
    shortLabel: "Live public results",
    description:
      "All visitors can view real-time vote counts, percentages, and projected seat distributions while voting is still open.",
  },
  {
    value: "live_admin_only",
    label: "Chancellery Live Preview — Emperor & Admins see live; Public after close",
    shortLabel: "Admin live preview · Public after close",
    description:
      "The Emperor and Votum Admins can monitor live tallies while open; citizens see full results once the poll closes.",
  },
  {
    value: "eligible_only",
    label: "Eligible Role Holders Only — Restricted to voters of this chamber + Admins",
    shortLabel: "Eligible role holders & Admins only",
    description:
      "Only members holding the eligible Discord roles for this vote (e.g. MPs for internal parliamentary procedural votes) and Admins can view results.",
  },
  {
    value: "admin_only",
    label: "Classified Imperial Audit — Emperor & Electoral Admins Only",
    shortLabel: "Emperor & Electoral Admins only",
    description:
      "Results remain restricted exclusively to the Emperor, Votum Admins, Webmaster, and Moderators.",
  },
];

/** Only listed channels: the id goes into a Bot API URL path, so anything else could reach other endpoints. */
export const isVoteChannelId = (id: string) => DISCORD_VOTE_CHANNELS.some((c) => c.id === id);

/** Whether a closed vote's tally may go to everyone, including the Discord announcement. */
export const resultsArePublic = (vis: ResultsVisibility | null | undefined) => vis !== "eligible_only" && vis !== "admin_only";

export function getChannelInfo(channelId: string | null | undefined) {
  if (!channelId) return null;
  return DISCORD_VOTE_CHANNELS.find((c) => c.id === channelId) ?? {
    id: channelId,
    name: `#channel-${channelId}`,
    category: "Custom Discord Channel",
    description: "Custom Discord announcement channel",
  };
}

export function getResultsVisibilityInfo(vis: ResultsVisibility | null | undefined) {
  const v = vis ?? "after_close";
  return RESULTS_VISIBILITY_OPTIONS.find((o) => o.value === v) ?? RESULTS_VISIBILITY_OPTIONS[0];
}
