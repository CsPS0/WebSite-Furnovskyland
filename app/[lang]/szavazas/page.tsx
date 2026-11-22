import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { CampaignsSection } from "@/components/campaigns-section";
import { LocalDate } from "@/components/local-date";
import { RolePrivilegesTable } from "@/components/role-privileges";
import { canPublishCampaign, getMember, isAdmin, isEmperor } from "@/lib/discord";
import { displayStatus, listPublicElections, syncElection } from "@/lib/elections";
import { fmt, getDictionary, getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { listCampaigns } from "@/lib/parliament";
import { getSessionUser } from "@/lib/session";
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
      <div className="page max-w-5xl space-y-16">
        <div>
          <h1 className="section-title">{t.pageTitle}</h1>
          <p className="section-subtitle">{t.pageSubtitle}</p>
          <div className="mb-8 flex flex-wrap gap-3">
            <a href="#elections-archive" className="btn-ghost px-4 py-2 text-xs">
              Elections and referendums
            </a>
            <a href="#campaigns" className="btn-ghost px-4 py-2 text-xs">
              Campaign posters
            </a>
            <a href="#role-privileges" className="btn-ghost px-4 py-2 text-xs">
              Who can do what
            </a>
          </div>
          <Suspense fallback={<div className="card h-40 animate-pulse" />}>
            <VoteList />
          </Suspense>
        </div>

        <div id="campaigns" className="scroll-mt-24 border-t border-border pt-12">
          <p className="eyebrow">From #campaigns</p>
          <h2 className="section-title">Campaigns and manifestos</h2>
          <p className="section-subtitle">
            Party posters, coalition lists and candidate manifestos from Furnovskyland&apos;s parliamentary, Senate and municipal elections. Candidates and party leaders can publish new posts below.
          </p>
          <Suspense fallback={<div className="card h-64 animate-pulse" />}>
            <CampaignsBlock />
          </Suspense>
        </div>

        <div id="role-privileges" className="scroll-mt-24 border-t border-border pt-12">
          <p className="eyebrow">Permissions</p>
          <h2 className="section-title">Who can do what on the website</h2>
          <p className="section-subtitle">
            What you can do here depends on your roles on the Furnovskyland Discord server, which the site checks live through the server bot. The tables below list each role and what it allows.
          </p>
          <RolePrivilegesTable />
        </div>
      </div>
    </section>
  );
}

async function CampaignsBlock() {
  await connection();
  const [campaigns, user] = await Promise.all([listCampaigns(), getSessionUser()]);
  const member = user ? await getMember(user.id).catch(() => null) : null;
  const canPublish = canPublishCampaign(member);
  const canDeleteAll = isAdmin(member) || isEmperor(member);

  return (
    <CampaignsSection
      campaigns={campaigns}
      canPublish={canPublish}
      canDeleteAll={canDeleteAll}
      currentUserId={user?.id ?? null}
    />
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
    <div id="elections-archive" className="space-y-12">
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
                        {fmt(typeLabel(e, t), { n: e.maxPicks })}
                        {e.seats > 0 ? ` · ${e.seats} Seats (D'Hondt)` : ""} ·{" "}
                        {displayStatus(e, now) === "scheduled" ? t.opens : t.closes}{" "}
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
