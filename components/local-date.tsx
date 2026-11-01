"use client";

import { useId } from "react";

const OPTIONS: Intl.DateTimeFormatOptions = { dateStyle: "medium", timeStyle: "short" };

/**
 * A date in the reader's own time zone. The inline script fixes the text before first paint on full page
 * loads (the server only knows UTC); on client navigations React renders it in the browser directly.
 */
export function LocalDate({ date, locale }: { date: Date | string; locale: string }) {
  const id = useId();
  const iso = new Date(date).toISOString();
  const format = `new Date(${JSON.stringify(iso)}).toLocaleString(${JSON.stringify(locale)},${JSON.stringify(OPTIONS)})`;
  return (
    <>
      <time id={id} dateTime={iso} suppressHydrationWarning>
        {typeof window === "undefined"
          ? `${new Date(iso).toLocaleString(locale, { ...OPTIONS, timeZone: "UTC" })} UTC`
          : new Date(iso).toLocaleString(locale, OPTIONS)}
      </time>
      <script
        type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: `{var n=document.getElementById(${JSON.stringify(id)});if(n)n.textContent=${format}}` }}
      />
    </>
  );
}
