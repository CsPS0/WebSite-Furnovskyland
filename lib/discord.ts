import "server-only";

const API = "https://discord.com/api/v10";

export type Member = { roles: string[]; joinedAt: Date | null };
export type GuildRole = { id: string; name: string };

/** Local testing without a Discord app: DEV_FAKE_LOGIN=1 plus DEV_FAKE_ROLES='{"1001":["admin"]}'. Never active in production. */
export const devFake = process.env.DEV_FAKE_LOGIN === "1" && process.env.NODE_ENV !== "production";

const roleList = (name: string) =>
  (process.env[name] ?? "").split(",").map((s) => s.trim()).filter(Boolean);

export const isAdmin = (m: Member | null) => !!m && m.roles.some((r) => roleList("ADMIN_ROLE_IDS").includes(r));
export const isEmperor = (m: Member | null) => !!m && m.roles.some((r) => roleList("EMPEROR_ROLE_IDS").includes(r));
export const hasLoginWhitelist = () => roleList("LOGIN_ROLE_IDS").length > 0;
export const canLogin = (m: Member | null) => {
  if (!m) return false;
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
