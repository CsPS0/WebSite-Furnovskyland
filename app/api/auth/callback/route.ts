import { NextResponse, type NextRequest } from "next/server";
import { canLogin, getMember, hasLoginWhitelist } from "@/lib/discord";
import { safeNext } from "@/lib/session";
import { signIn, STATE_COOKIE } from "../sign-in";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const [expectedState, storedNext] = (request.cookies.get(STATE_COOKIE)?.value ?? "").split("|");
  const next = safeNext(storedNext);
  const fail = () => {
    const url = new URL(next, request.nextUrl.origin);
    url.searchParams.set("login", "failed");
    const response = NextResponse.redirect(url);
    response.cookies.delete(STATE_COOKIE);
    return response;
  };

  const code = params.get("code");
  if (!code || !expectedState || params.get("state") !== expectedState) return fail();

  const tokenRes = await fetch("https://discord.com/api/v10/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.AUTH_DISCORD_ID!,
      client_secret: process.env.AUTH_DISCORD_SECRET!,
      grant_type: "authorization_code",
      code,
      redirect_uri: `${request.nextUrl.origin}/api/auth/callback/`,
    }),
  });
  if (!tokenRes.ok) return fail();
  const { access_token } = (await tokenRes.json()) as { access_token: string };

  const meRes = await fetch("https://discord.com/api/v10/users/@me", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!meRes.ok) return fail();
  const me = (await meRes.json()) as { id: string; username: string; global_name: string | null; avatar: string | null };

  if (hasLoginWhitelist()) {
    const member = await getMember(me.id).catch(() => null);
    if (!canLogin(member)) return fail();
  }

  const response = await signIn(request, { id: me.id, name: me.global_name ?? me.username, avatar: me.avatar }, next);
  response.cookies.delete(STATE_COOKIE);
  return response;
}
