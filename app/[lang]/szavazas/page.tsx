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
              Elections &amp; Referendums
            </a>
            <a href="#campaigns" className="btn-ghost px-4 py-2 text-xs">
              Election Campaigns &amp; Posters
            </a>
            <a href="#role-privileges" className="btn-ghost px-4 py-2 text-xs">
              Discord Role &amp; Voting Privileges
            </a>
          </div>
          <Suspense fallback={<div className="card h-40 animate-pulse" />}>
            <VoteList />
          </Suspense>
        </div>

        <div id="campaigns" className="scroll-mt-24 border-t border-border pt-12">
          <p className="eyebrow">Official Electoral Postings · #campaigns</p>
          <h2 className="section-title">Election Campaigns &amp; Manifestos</h2>
          <p className="section-subtitle">
            Official party posters, coalition slates, and candidate manifestos from Furnovskyland&apos;s Parliamentary, Senatorial, and Municipal elections. Authorized candidates and party leaders may publish new campaign materials directly below.
          </p>
          <Suspense fallback={<div className="card h-64 animate-pulse" />}>
            <CampaignsBlock />
          </Suspense>
        </div>

        <div id="role-privileges" className="scroll-mt-24 border-t border-border pt-12">
          <p className="eyebrow">Constitutional Access Control</p>
          <h2 className="section-title">Website Roles &amp; Electoral Privileges</h2>
          <p className="section-subtitle">
            Website permissions are synchronized live with the Empire of Furnovskyland Discord server via OAuth2 and the guild bot. Below is the official schedule of Discord roles and the privileges they confer on this site.
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
