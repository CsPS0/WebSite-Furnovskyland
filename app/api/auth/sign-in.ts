import "server-only";
import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { cookieOptions, encodeSession, SESSION_COOKIE, type SessionUser } from "@/lib/session";

export const STATE_COOKIE = "fl_oauth_state";

/** Stores the Discord user and sets the session cookie. */
export async function signIn(request: NextRequest, user: SessionUser, next: string) {
  const db = await getDb();
  await db
    .insert(users)
    .values(user)
    .onConflictDoUpdate({ target: users.id, set: { name: user.name, avatar: user.avatar, lastLoginAt: new Date() } });

  const { value, maxAge } = encodeSession(user);
  const response = NextResponse.redirect(new URL(next, request.nextUrl.origin));
  response.cookies.set(SESSION_COOKIE, value, { ...cookieOptions, maxAge });
  return response;
}
