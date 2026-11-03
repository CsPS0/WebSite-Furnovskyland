"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { safeNext, SESSION_COOKIE } from "@/lib/session";

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  const referer = (await headers()).get("referer");
  let back: string | null = null;
  try {
    back = referer ? new URL(referer).pathname : null;
  } catch {}
  // A page at "//evil.com/" has that pathname, which redirect() would treat as another host.
  redirect(safeNext(back));
}
