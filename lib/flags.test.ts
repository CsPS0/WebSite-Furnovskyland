import { expect, test } from "bun:test";
import { discordCreatedAt, flagBallots } from "./flags";

// A real-looking old account id (2016) and a helper to make an id created at a given time.
const OLD_ID = "175928847299117063";
const idCreatedAt = (date: Date) => String((BigInt(date.getTime()) - 1420070400000n) << 22n);

const now = new Date("2026-10-01T12:00:00Z");
const base = { deviceId: "d", ipHash: "i", memberJoinedAt: new Date("2025-01-01"), createdAt: now };

test("snowflake decoding", () => {
  expect(discordCreatedAt(OLD_ID).getUTCFullYear()).toBe(2016);
  expect(discordCreatedAt(idCreatedAt(now)).getTime()).toBe(now.getTime());
});

test("shared device and connection flag both ballots", () => {
  const [a, b, c] = flagBallots([
    { ...base, userId: OLD_ID, deviceId: "dev1", ipHash: "ip1" },
    { ...base, userId: "175928847299117064", deviceId: "dev1", ipHash: "ip2" },
    { ...base, userId: "175928847299117065", deviceId: "dev3", ipHash: "ip2" },
  ]);
  expect(a.flags).toEqual(["same_device"]);
  expect(b.flags).toEqual(["same_device", "same_ip"]);
  expect(c.flags).toEqual(["same_ip"]);
});

test("young account and recent server join", () => {
  const young = idCreatedAt(new Date(now.getTime() - 5 * 86400000));
  const [b] = flagBallots([{ ...base, userId: young, memberJoinedAt: new Date(now.getTime() - 2 * 86400000) }]);
  expect(b.flags).toEqual(["new_account", "new_member"]);
  const [ok] = flagBallots([{ ...base, userId: OLD_ID }]);
  expect(ok.flags).toEqual([]);
});
