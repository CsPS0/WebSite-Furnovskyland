import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { LocalDate } from "@/components/local-date";
import { displayStatus, listPublicElections, syncElection } from "@/lib/elections";
import { fmt, getDictionary, getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import type { Election } from "@/db/schema";
import { StatusBadge, typeLabel } from "./status";

export async function generateMetadata() {
  const t = await getDictionary();
  return pageMetadata("szavazas/", t.vote.pageTitle, t.vote.pageSubtitle);
}

export default async function VotesPage() {
  const t = (await getDictionary()).vote;
  return (
    <section className="section">
      <div className="page max-w-4xl">
        <h1 className="section-title">{t.pageTitle}</h1>
        <p className="section-subtitle">{t.pageSubtitle}</p>
        <Suspense fallback={<div className="card h-40 animate-pulse" />}>
          <VoteList />
        </Suspense>
      </div>
    </section>
  );
}

async function VoteList() {
  await connection();
  const [all, dict, locale] = [await listPublicElections(), await getDictionary(), await getLocale()];
  const t = dict.vote;
  const now = new Date();
  // Catch up any vote whose time has passed before the background job did.
  await Promise.all(all.filter((e) => displayStatus(e, now) !== e.status).map((e) => syncElection(e.id, now)));

  const groups: [string, Election[]][] = [
    [t.open, all.filter((e) => displayStatus(e, now) === "open")],
    [t.upcoming, all.filter((e) => displayStatus(e, now) === "scheduled")],
    [t.past, all.filter((e) => !["open", "scheduled"].includes(displayStatus(e, now)))],
  ];

  return (
    <div className="space-y-12">
      {groups.map(([title, items]) => (
        <div key={title}>
          <h2 className="mb-4 text-2xl">{title}</h2>
          {items.length === 0 ? (
            <p className="text-muted">{t.none}</p>
          ) : (
            <ul className="space-y-3">
              {items.map((e) => (
                <li key={e.id}>
                  <Link
                    href={`/${locale}/szavazas/${e.id}/`}
                    className="card card-hover flex flex-col gap-2 p-5 text-text hover:text-text sm:flex-row sm:items-center sm:justify-between sm:p-6"
                  >
                    <div>
                      <p className="font-serif text-lg font-bold text-heading">{e.title}</p>
                      <p className="text-sm text-muted">
                        {fmt(typeLabel(e, t), { n: e.maxPicks })} · {displayStatus(e, now) === "scheduled" ? t.opens : t.closes}{" "}
                        <LocalDate date={displayStatus(e, now) === "scheduled" ? e.opensAt : e.closesAt} locale={locale} />
                      </p>
                    </div>
                    <StatusBadge status={displayStatus(e, now)} labels={dict.admin.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
