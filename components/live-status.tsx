import { cacheLife } from "next/cache";

export const GUILD_ID = "836271168977764363";
export const MC_SERVER = "ujfurnvaros.aternos.me";

async function discordWidget(): Promise<number | null> {
  "use cache";
  cacheLife("minutes");
  try {
    const res = await fetch(`https://discord.com/api/guilds/${GUILD_ID}/widget.json`);
    const data = await res.json();
    return typeof data.presence_count === "number" ? data.presence_count : null;
  } catch {
    return null;
  }
}

async function minecraftStatus(): Promise<{ online: boolean; players?: string } | null> {
  "use cache";
  cacheLife("minutes");
  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${MC_SERVER}`);
    const data = await res.json();
    return data.online ? { online: true, players: `${data.players.online}/${data.players.max}` } : { online: false };
  } catch {
    return null;
  }
}

export async function DiscordOnline() {
  return <>{(await discordWidget()) ?? "N/A"}</>;
}

export async function MinecraftState({ labels }: { labels: { online: string; offline: string; unknown: string } }) {
  const status = await minecraftStatus();
  if (!status) return <span className="text-muted">{labels.unknown}</span>;
  return status.online ? (
    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{labels.online}</span>
  ) : (
    <span className="font-semibold text-red-600 dark:text-red-400">{labels.offline}</span>
  );
}

export async function MinecraftPlayers() {
  return <>{(await minecraftStatus())?.players ?? "N/A"}</>;
}

export function Skeleton({ className = "w-16" }: { className?: string }) {
  return <span className={`inline-block h-[1em] animate-pulse rounded bg-border align-middle ${className}`} />;
}
