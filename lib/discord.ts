import "server-only";

const API = "https://discord.com/api/v10";

export type Member = { roles: string[]; joinedAt: Date | null };
export type GuildRole = { id: string; name: string };

/** Local testing without a Discord app: DEV_FAKE_LOGIN=1 plus DEV_FAKE_ROLES='{"1001":["admin"]}'. Never active in production. */
export const devFake = process.env.DEV_FAKE_LOGIN === "1" && process.env.NODE_ENV !== "production";

const roleList = (name: string, defaults: string[] = []) => {
  const fromEnv = (process.env[name] ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  return fromEnv.length > 0 ? fromEnv : defaults;
};

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

const DEFAULT_EMPEROR_ROLES: string[] = [DISCORD_ROLES.EMPEROR];
const DEFAULT_ADMIN_ROLES: string[] = [
  DISCORD_ROLES.EMPEROR,
  DISCORD_ROLES.VOTUM_ADMIN,
  DISCORD_ROLES.WEBMASTER,
  DISCORD_ROLES.MODERATOR,
];
const PARLIAMENT_MANAGER_ROLES: string[] = [
  ...DEFAULT_ADMIN_ROLES,
  DISCORD_ROLES.PRIME_MINISTER,
  DISCORD_ROLES.DEPUTY_PM,
  DISCORD_ROLES.SPEAKER,
  DISCORD_ROLES.BUREAU_OFFICER,
];
const CAMPAIGN_ROLES: string[] = [
  ...PARLIAMENT_MANAGER_ROLES,
  DISCORD_ROLES.MINISTER,
  DISCORD_ROLES.MP,
  DISCORD_ROLES.PARTY_LEADER,
  DISCORD_ROLES.CAMPAIGNING,
];

export const isAdmin = (m: Member | null) =>
  !!m && m.roles.some((r) => roleList("ADMIN_ROLE_IDS", DEFAULT_ADMIN_ROLES).includes(r));
export const isEmperor = (m: Member | null) =>
  !!m && m.roles.some((r) => roleList("EMPEROR_ROLE_IDS", DEFAULT_EMPEROR_ROLES).includes(r));
export const canManageParliament = (m: Member | null) =>
  isAdmin(m) || isEmperor(m) || (!!m && m.roles.some((r) => PARLIAMENT_MANAGER_ROLES.includes(r)));
export const canPublishCampaign = (m: Member | null) =>
  isAdmin(m) || isEmperor(m) || (!!m && m.roles.some((r) => CAMPAIGN_ROLES.includes(r)));
export const hasLoginWhitelist = () => roleList("LOGIN_ROLE_IDS").length > 0;
export const canLogin = (m: Member | null) => {
  if (!m) return false;
  if (m.roles.includes(DISCORD_ROLES.QUARANTINE) || m.roles.includes(DISCORD_ROLES.UNVERIFIED)) return false;
  const allowed = roleList("LOGIN_ROLE_IDS");
  return allowed.length === 0 || m.roles.some((r) => allowed.includes(r));
};

async function bot(path: string) {
  return fetch(`${API}${path}`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
    cache: "no-store",
  });
}

// Short per-instance cache so one page render doesn't ask Discord several times.
const memberCache = new Map<string, { at: number; member: Member | null }>();
const MEMBER_TTL = 60_000;

/** The user's roles on the Furnovskyland server, or null if they aren't a member. */
export async function getMember(userId: string): Promise<Member | null> {
  if (devFake) {
    const roles = JSON.parse(process.env.DEV_FAKE_ROLES ?? "{}")[userId];
    return roles ? { roles, joinedAt: new Date("2024-01-01") } : null;
  }
  const hit = memberCache.get(userId);
  if (hit && Date.now() - hit.at < MEMBER_TTL) return hit.member;

  const res = await bot(`/guilds/${process.env.DISCORD_GUILD_ID}/members/${userId}`);
  if (res.status === 404) {
    memberCache.set(userId, { at: Date.now(), member: null });
    return null;
  }
  if (!res.ok) throw new Error(`Discord member lookup failed: ${res.status}`);
  const data = (await res.json()) as { roles: string[]; joined_at: string | null };
  const member = { roles: data.roles, joinedAt: data.joined_at ? new Date(data.joined_at) : null };
  memberCache.set(userId, { at: Date.now(), member });
  return member;
}

/** All server roles except @everyone, highest first, for the admin form. */
export async function getGuildRoles(): Promise<GuildRole[]> {
  if (devFake) {
    return [
      { id: "admin", name: "Admin" },
      { id: "emperor", name: "Emperor" },
      { id: "senator", name: "Senator" },
    ];
  }
  const res = await bot(`/guilds/${process.env.DISCORD_GUILD_ID}/roles`);
  if (!res.ok) throw new Error(`Discord roles lookup failed: ${res.status}`);
  const roles = (await res.json()) as (GuildRole & { position: number; managed: boolean })[];
  return roles
    .filter((r) => r.id !== process.env.DISCORD_GUILD_ID && !r.managed)
    .sort((a, b) => b.position - a.position)
    .map(({ id, name }) => ({ id, name }));
}

export function avatarUrl(userId: string, avatar: string | null) {
  return avatar
    ? `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png?size=64`
    : `https://cdn.discordapp.com/embed/avatars/${Number(BigInt(userId) >> 22n) % 6}.png`;
}
