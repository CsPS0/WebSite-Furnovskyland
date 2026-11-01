import { Suspense } from "react";
import { connection } from "next/server";
import { ExternalLink, Globe, Landmark, Scale, ShieldCheck, Users } from "lucide-react";
import { ParliamentChamber } from "@/components/parliament-chamber";
import { Rich } from "@/components/rich";
import { RolePrivilegesTable } from "@/components/role-privileges";
import { government, senate } from "@/data/government";
import { nationPortal, politicalParties } from "@/data/nation";
import { canManageParliament, getMember } from "@/lib/discord";
import { getDictionary, getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { listParliamentSeats } from "@/lib/parliament";
import { getSessionUser } from "@/lib/session";

export async function generateMetadata() {
  const t = await getDictionary();
  return pageMetadata("politika/", t.politics.pageTitle, t.politics.pageSubtitle);
}

async function InteractiveParliamentSection() {
  await connection();
  const [seats, user] = await Promise.all([listParliamentSeats(), getSessionUser()]);
  const member = user ? await getMember(user.id).catch(() => null) : null;
  const canManage = canManageParliament(member);
  return <ParliamentChamber seats={seats} canManage={canManage} />;
}

export default async function PoliticsPage() {
  const [dict, locale] = [await getDictionary(), await getLocale()];
  const t = dict.politics;
  const lp = t.legislative_process;
  const affairs = t.senate.affairs;
  const extras = nationPortal[locale].politicsExtras;
  const parties = politicalParties[locale];

  return (
    <section className="section">
      <div className="page max-w-5xl space-y-10">
        <div>
          <h1 className="section-title">{t.pageTitle}</h1>
          <p className="section-subtitle">{t.pageSubtitle}</p>
        </div>

        <article className="card reveal">
          <h2 className="mb-3 text-2xl">{t.state_structure.title}</h2>
          <Rich html={t.state_structure.content} className="leading-relaxed" />
          <div className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-surface-alt p-4">
              <div className="mb-2 flex items-center gap-2 text-secondary">
                <Landmark className="size-5" />
                <h3 className="text-base font-bold">{t.government.legislative.title}</h3>
              </div>
              <p className="text-sm text-muted">{t.government.legislative.description}</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-alt p-4">
              <div className="mb-2 flex items-center gap-2 text-secondary">
                <ShieldCheck className="size-5" />
                <h3 className="text-base font-bold">{t.government.executive.title}</h3>
              </div>
              <p className="text-sm text-muted">{t.government.executive.description}</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-alt p-4">
              <div className="mb-2 flex items-center gap-2 text-secondary">
                <Scale className="size-5" />
                <h3 className="text-base font-bold">{t.government.judicial.title}</h3>
              </div>
              <p className="text-sm text-muted">{t.government.judicial.description}</p>
            </div>
          </div>
        </article>

        <article className="space-y-4">
          <div>
            <p className="eyebrow">III. Federal Parliament · D&apos;Hondt 15-Seat Chamber</p>
            <h2 className="mb-2 text-2xl">{extras.parliamentCompositionTitle}</h2>
            <p className="text-sm text-muted">{extras.parliamentCompositionDesc}</p>
          </div>
          <Suspense fallback={<div className="card h-96 animate-pulse" />}>
            <InteractiveParliamentSection />
          </Suspense>
        </article>

        <article className="card reveal overflow-hidden p-0 sm:p-0">
          <h2 id="gov-table-heading" className="p-6 pb-4 text-2xl sm:px-8">
            {t.current_gov.title}
          </h2>
          <div className="table-wrapper" role="region" aria-labelledby="gov-table-heading" tabIndex={0}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t.current_gov.table.role}</th>
                  <th>{t.current_gov.table.name}</th>
                  <th>{t.current_gov.table.responsibilities}</th>
                </tr>
              </thead>
              <tbody>
                {government.map((row) => (
                  <tr key={row.name}>
                    <td className="font-semibold text-heading">{t.roles[row.role]}</td>
                    <td>{row.name}</td>
                    <td>{t.duties[row.duty]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="card reveal overflow-hidden p-0 sm:p-0">
          <h2 id="senate-table-heading" className="p-6 pb-4 text-2xl sm:px-8">
            {t.current_senate.title}
          </h2>
          <div className="table-wrapper" role="region" aria-labelledby="senate-table-heading" tabIndex={0}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t.current_senate.table.role}</th>
                  <th>{t.current_senate.table.name}</th>
                </tr>
              </thead>
              <tbody>
                {senate.map((row) => (
                  <tr key={row.role}>
                    <td className="font-semibold text-heading">{t.roles[row.role]}</td>
                    <td>{row.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <div className="grid gap-8 md:grid-cols-2">
          <article className="card reveal">
            <h2 className="mb-3 text-2xl">{t.senate.title}</h2>
            <Rich html={t.senate.p1} className="mb-3 text-sm leading-relaxed" />
            <ul className="mb-4 ml-5 list-disc space-y-1.5 text-sm">
              {[affairs.internal, affairs.foreign, affairs.minecraft, affairs.constitutional, affairs.recruitment].map((html) => (
                <Rich key={html} as="li" html={html} />
              ))}
            </ul>
            <Rich html={t.senate.p2} className="text-sm leading-relaxed" />
          </article>

          <article className="card reveal flex flex-col justify-between">
            <div>
              <h2 className="mb-3 text-2xl">{lp.title}</h2>
              <Rich html={lp.intro} className="mb-3 text-sm" />
              <ul className="mb-4 ml-5 list-disc space-y-1.5 text-sm">
                {[lp.organic_law, lp.bill, lp.act, lp.decree].map((html) => (
                  <Rich key={html} as="li" html={html} />
                ))}
              </ul>
              <Rich html={lp.act_submit} className="mb-2 text-sm font-medium" />
              <ol className="ml-5 list-decimal space-y-1.5 text-sm">
                {[lp.step1, lp.step2, lp.step3].map((html) => (
                  <Rich key={html} as="li" html={html} />
                ))}
              </ol>
            </div>
          </article>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <article className="card reveal">
            <h2 className="mb-3 text-2xl">{t.supreme_court.title}</h2>
            <Rich html={t.supreme_court.content} className="text-sm leading-relaxed" />
          </article>

          <article className="card reveal flex flex-col justify-between">
            <div>
              <h2 className="mb-3 text-2xl">{t.current_supreme_court.title}</h2>
              <Rich html={t.current_supreme_court.content} className="leading-relaxed" />
            </div>
            <div className="mt-6 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
              <div className="rounded-lg bg-surface-alt p-3">
                <h3 className="text-sm font-bold">{t.structure.federation.title}</h3>
                <p className="mt-1 text-xs text-muted">{t.structure.federation.description}</p>
              </div>
              <div className="rounded-lg bg-surface-alt p-3">
                <h3 className="text-sm font-bold">{t.structure.local.title}</h3>
                <p className="mt-1 text-xs text-muted">{t.structure.local.description}</p>
              </div>
            </div>
          </article>
        </div>

        <article className="card reveal">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Users className="size-6 text-secondary" />
                <h2 className="text-2xl">{extras.partiesTitle}</h2>
              </div>
              <p className="mt-1 text-sm text-muted">{extras.partiesSubtitle}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {parties.map((party) => (
              <div
                key={party.abbr}
                className={`flex flex-col justify-between rounded-xl border p-4 ${
                  party.highlight === "government"
                    ? "border-secondary/60 bg-secondary/5"
                    : party.highlight === "opposition"
                      ? "border-accent/70 bg-accent/5"
                      : "border-border bg-surface-alt/60"
                }`}
              >
                <div>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="badge-gold">{party.abbr}</span>
                    <span className="font-mono text-xs text-muted">
                      {extras.partyFounded} {party.founded}
                    </span>
                  </div>
                  <h3 className="mb-1 text-base font-bold text-heading">{party.name}</h3>
                  {party.seats && (
                    <p className="mb-2 text-xs font-semibold text-secondary">{party.seats}</p>
                  )}
                  <p className="text-xs text-muted">
                    <strong className="text-text">{extras.partyLeader}</strong> {party.leader}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    <strong className="text-text">{extras.partyIdeology}</strong> {party.ideology}
                  </p>
                </div>
                {party.motto && (
                  <p className="mt-3 border-t border-border/70 pt-2 font-serif text-xs italic text-muted">
                    “{party.motto}”
                  </p>
                )}
              </div>
            ))}
          </div>
        </article>

        <article className="card reveal">
          <div className="mb-4 flex items-center gap-2">
            <Globe className="size-6 text-secondary" />
            <h2 className="text-2xl">{t.foreign.title}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface-alt p-5">
              <h3 className="mb-2 text-lg font-bold">{t.foreign.allies.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{t.foreign.allies.description}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-alt p-5">
              <h3 className="mb-2 text-lg font-bold">{t.foreign.international.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{t.foreign.international.description}</p>
            </div>
          </div>
        </article>

        <article className="card reveal">
          <h2 className="mb-2 text-2xl">{extras.actionLinksTitle}</h2>
          <p className="mb-6 text-sm text-muted">{extras.actionLinksSubtitle}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {extras.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col justify-between rounded-xl border border-border bg-surface-alt p-4 text-text transition hover:border-accent hover:text-text"
              >
                <div>
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="font-serif text-sm font-bold text-heading">{link.label}</span>
                    <ExternalLink className="size-4 shrink-0 text-secondary" />
                  </div>
                  <p className="text-xs leading-relaxed text-muted">{link.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </article>

        <RolePrivilegesTable />
      </div>
    </section>
  );
}
