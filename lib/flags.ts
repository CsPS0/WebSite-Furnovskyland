// Alt-account warnings shown to admins. Computed when the voter list is shown, so the first of two linked ballots is flagged too.

export type Flag = "same_device" | "same_ip" | "new_account" | "new_member";

const DAY = 24 * 60 * 60 * 1000;
const DISCORD_EPOCH = 1420070400000n;

/** Discord ids are snowflakes: the top bits are the account's creation time. */
export function discordCreatedAt(userId: string): Date {
  return new Date(Number((BigInt(userId) >> 22n) + DISCORD_EPOCH));
}

type BallotSignals = { userId: string; deviceId: string; ipHash: string; memberJoinedAt: Date | null; createdAt: Date };

export function flagBallots<T extends BallotSignals>(ballots: T[]): (T & { flags: Flag[] })[] {
  const count = (key: "deviceId" | "ipHash") => {
    const users = new Map<string, Set<string>>();
    for (const b of ballots) users.set(b[key], (users.get(b[key]) ?? new Set()).add(b.userId));
    return (b: T) => users.get(b[key])!.size > 1;
  };
  const sharedDevice = count("deviceId");
  const sharedIp = count("ipHash");

  return ballots.map((b) => {
    const flags: Flag[] = [];
    if (sharedDevice(b)) flags.push("same_device");
    if (sharedIp(b)) flags.push("same_ip");
    if (b.createdAt.getTime() - discordCreatedAt(b.userId).getTime() < 30 * DAY) flags.push("new_account");
    if (b.memberJoinedAt && b.createdAt.getTime() - b.memberJoinedAt.getTime() < 7 * DAY) flags.push("new_member");
    return { ...b, flags };
  });
}
