import { NextResponse, type NextRequest } from "next/server";
import { hasLocale } from "@/lib/i18n-config";

/** Sends visitors without a language in the URL to their browser's language (English if none match). */
export function proxy(request: NextRequest) {
  if (hasLocale(request.nextUrl.pathname.split("/")[1] ?? "")) return NextResponse.next();

  const preferred = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.split("-")[0].toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q)
    .find((p) => hasLocale(p.lang));

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred?.lang ?? "en"}${url.pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals and anything with a dot (files, and Workflow's /.well-known/workflow/ routes).
  matcher: ["/((?!api/|_next/|.*\\..*).*)"],
};
