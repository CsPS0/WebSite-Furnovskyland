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
    category: "Politics: elections",
    description: "Parliamentary and mayoral elections, and other ballot notices",
  },
  {
    id: "871702306352144405",
    name: "#『✅』citizen-polls『❌』",
    category: "Politics: referendums",
    description: "National referendums under Article 9 and citizen polls",
  },
  {
    id: "1490456420444016871",
    name: "#the-parliament",
    category: "Politics: National Assembly",
    description: "Bills, confidence motions and cardinal law votes in the 15-seat National Assembly",
  },
  {
    id: "1563296282712481963",
    name: "#federal-gazette",
    category: "Politics: promulgation",
    description: "Promulgated acts of Parliament, constitutional amendments and imperial assent",
  },
  {
    id: "902150505130782760",
    name: "#『📢』throne-hall『🎂』",
    category: "Announcements: the Emperor",
    description: "Imperial decrees, Sanctio Regia notices and state proclamations",
  },
  {
    id: "1434952634938167337",
    name: "#『📢』ministry-announcements",
    category: "Announcements: the Government",
    description: "Cabinet resolutions and ministerial decrees",
  },
  {
    id: "1006845281687580672",
    name: "#the-senate",
    category: "Archive: former Senate",
    description: "The old Senate channel, archived since the October 24, 2026 Constitution",
  },
];

export const ROLE_ACCESS_PRESETS = [
  {
    id: "everyone",
    label: "All verified server members",
    roleIds: [] as string[],
    description: "Every verified server member (Quarantine and Unverified are always blocked)",
  },
  {
    id: "citizens",
    label: "Citizens of Furnovskyland",
    roleIds: [DISCORD_ROLES.CITIZEN],
    description: "General elections, municipal elections and Article 9 referendums",
  },
  {
    id: "parliament",
    label: "National Assembly (MPs and Speaker)",
    roleIds: [DISCORD_ROLES.MP, DISCORD_ROLES.SPEAKER],
    description: "The 15 elected MPs and the Speaker, for bills and cardinal laws",
  },
  {
    id: "cabinet",
    label: "Cabinet (PM and ministers)",
    roleIds: [
      DISCORD_ROLES.PRIME_MINISTER,
      DISCORD_ROLES.DEPUTY_PM,
      DISCORD_ROLES.MINISTER,
      DISCORD_ROLES.STATE_SECRETARY,
    ],
    description: "Prime Minister, Deputy PM, ministers and state secretaries",
  },
  {
    id: "supreme_court",
    label: "Supreme Court judges",
    roleIds: [DISCORD_ROLES.CHIEF_JUSTICE, DISCORD_ROLES.CONSTITUTIONAL_COURT],
    description: "Chief Justice and Constitutional Court members, for court and constitutional review votes",
  },
  {
    id: "senate",
    label: "Former Senate",
    roleIds: [DISCORD_ROLES.SENATOR, DISCORD_ROLES.SENATE_PRESIDENT],
    description: "Senators and the Senate President, for archived upper-house votes",
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
    label: "Hidden until the vote closes, then public (default)",
    shortLabel: "Public after the vote closes",
    description:
      "Nobody sees the count while the vote is open. When it closes, the pie chart and the D'Hondt seat chart become public.",
  },
  {
    value: "live_public",
    label: "Public live count, during and after the vote",
    shortLabel: "Live public results",
    description:
      "Anyone can see the running count, percentages and projected seats while the vote is open.",
  },
  {
    value: "live_admin_only",
    label: "Emperor and admins see it live, public after the vote closes",
    shortLabel: "Admins see it live, public after close",
    description:
      "The Emperor and Votum Admins can follow the count while the vote is open. Everyone else sees the results when it closes.",
  },
  {
    value: "eligible_only",
    label: "Only eligible voters and admins",
    shortLabel: "Eligible voters and admins only",
    description:
      "Only members with a Discord role that can vote here (for example MPs on a procedural vote) and admins can see the results.",
  },
  {
    value: "admin_only",
    label: "Only the Emperor and admins",
    shortLabel: "Emperor and admins only",
    description:
      "Only the Emperor, Votum Admins, the Webmaster and Moderators can see the results.",
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
    category: "Other channel",
    description: "Discord channel not on the list",
  };
}

export function getResultsVisibilityInfo(vis: ResultsVisibility | null | undefined) {
  const v = vis ?? "after_close";
  return RESULTS_VISIBILITY_OPTIONS.find((o) => o.value === v) ?? RESULTS_VISIBILITY_OPTIONS[0];
}
