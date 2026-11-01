import { expect, mock, test } from "bun:test";

mock.module("server-only", () => ({}));
mock.module("next/headers", () => ({ cookies: async () => ({ get: () => undefined }) }));
process.env.AUTH_SECRET = "test-secret-that-is-at-least-32-characters";
const { decodeSession, encodeSession, safeNext } = await import("./session");

const user = { id: "123", name: "Furnovsky", avatar: null };

test("round trip", () => {
  expect(decodeSession(encodeSession(user).value)).toEqual(user);
});

test("rejects tampered, malformed and expired cookies", () => {
  const { value } = encodeSession(user);
  const [payload, sig] = value.split(".");
  const forged = Buffer.from(JSON.stringify({ ...user, id: "999", exp: Date.now() + 1e9 })).toString("base64url");
  expect(decodeSession(`${forged}.${sig}`)).toBeNull();
  expect(decodeSession(`${payload}.${sig}x`)).toBeNull();
  expect(decodeSession(`${payload}.${sig}.extra`)).toBeNull();
  expect(decodeSession("garbage")).toBeNull();
  expect(decodeSession(undefined)).toBeNull();
  expect(decodeSession(value, Date.now() + 31 * 86400000)).toBeNull();
});

test("safeNext keeps redirects on this site", () => {
  expect(safeNext("/hu/szavazas/3/")).toBe("/hu/szavazas/3/");
  expect(safeNext("//evil.example")).toBe("/");
  expect(safeNext("/\\evil.example")).toBe("/");
  expect(safeNext("https://evil.example")).toBe("/");
  expect(safeNext("/\t/evil.example")).toBe("/");
  expect(safeNext("/\n/evil.example")).toBe("/");
  expect(safeNext("/.//evil.example")).toBe("/");
  expect(safeNext("/a/..//evil.example")).toBe("/");
  expect(safeNext("/hu/?x=1#top")).toBe("/hu/?x=1#top");
  expect(safeNext(null, "/en/")).toBe("/en/");
});
