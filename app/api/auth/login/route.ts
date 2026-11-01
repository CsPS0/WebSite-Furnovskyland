import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { devFake } from "@/lib/discord";
import { cookieOptions, safeNext } from "@/lib/session";
import { signIn, STATE_COOKIE } from "../sign-in";

export async function GET(request: NextRequest) {
  const next = safeNext(request.nextUrl.searchParams.get("next"));

  if (devFake) {
    // Local testing only: /api/auth/login/?dev_user=1001&dev_name=Furnovsky
    const id = request.nextUrl.searchParams.get("dev_user");
    if (id && /^\d+$/.test(id)) {
      return signIn(request, { id, name: request.nextUrl.searchParams.get("dev_name") ?? `dev-${id}`, avatar: null }, next);
    }
  }

  const state = randomBytes(16).toString("base64url");
  const url = new URL("https://discord.com/oauth2/authorize");
  url.search = new URLSearchParams({
    client_id: process.env.AUTH_DISCORD_ID!,
    redirect_uri: `${request.nextUrl.origin}/api/auth/callback/`,
    response_type: "code",
    scope: "identify",
    state,
    prompt: "none",
  }).toString();

  const response = NextResponse.redirect(url);
  response.cookies.set(STATE_COOKIE, `${state}|${next}`, { ...cookieOptions, maxAge: 600 });
  return response;
}
