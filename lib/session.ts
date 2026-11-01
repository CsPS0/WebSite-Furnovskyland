import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";

export type SessionUser = { id: string; name: string; avatar: string | null };

const MAX_AGE = 30 * 24 * 60 * 60; // seconds

export const SESSION_COOKIE = "fl_session";
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

function sign(data: string) {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) throw new Error("AUTH_SECRET must be set to at least 32 characters");
  return createHmac("sha256", secret).update(data).digest("base64url");
}

/** A signed (not encrypted) cookie value: base64url(JSON).signature. It holds nothing secret. */
export function encodeSession(user: SessionUser, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ ...user, exp: now + MAX_AGE * 1000 })).toString("base64url");
  return { value: `${payload}.${sign(payload)}`, maxAge: MAX_AGE };
}

export function decodeSession(value: string | undefined, now = Date.now()): SessionUser | null {
  const [payload, signature, extra] = value?.split(".") ?? [];
  if (!payload || !signature || extra !== undefined) return null;
  const given = Buffer.from(signature);
  const expected = Buffer.from(sign(payload));
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof data.exp !== "number" || data.exp < now || typeof data.id !== "string") return null;
    return { id: data.id, name: String(data.name), avatar: data.avatar ?? null };
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  await connection(); // the expiry check reads the clock, so this can never be prerendered
  return decodeSession(value);
}

/** Only allow redirects back into this site after login. */
export function safeNext(next: string | null | undefined, fallback = "/") {
  // URL parsers drop tabs/newlines and treat "\" like "/", so "/\t/evil.com" would become "//evil.com".
  if (!next || /[\u0000-\u001F\u007F\\]/.test(next) || !next.startsWith("/") || next.startsWith("//")) return fallback;
  const base = "http://internal.invalid";
  const url = new URL(next, base);
  const out = url.pathname + url.search + url.hash;
  // Dot segments can normalize into "//evil.com" (e.g. "/.//evil.com"), so check the result too.
  return url.origin === base && !out.startsWith("//") ? out : fallback;
}
