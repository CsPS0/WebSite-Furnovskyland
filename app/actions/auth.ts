"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "@/lib/session";

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  const referer = (await headers()).get("referer");
  redirect(referer ? new URL(referer).pathname : "/");
}
