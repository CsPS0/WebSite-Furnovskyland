import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { LocalDate } from "@/components/local-date";
import { NotAdmin } from "@/components/not-admin";
import { ParliamentChamber } from "@/components/parliament-chamber";
import { RolePrivilegesTable } from "@/components/role-privileges";
import { getAdmin } from "@/lib/admin";
import { canManageParliament, isAdmin } from "@/lib/discord";
import { displayStatus, listAllElections } from "@/lib/elections";
import { getDictionary, getLocale } from "@/lib/i18n";
import { listParliamentSeats } from "@/lib/parliament";
import { StatusBadge } from "../szavazas/status";

export const metadata = { title: "Admin", robots: { index: false } };

export default function AdminPage() {
  return (
    <section className="section">
      <div className="page max-w-5xl">
        <Suspense fallback={<div className="card h-64 animate-pulse" />}>
          <AdminList />
        </Suspense>
      </div>
    </section>
  );
}

async function AdminList() {
  const [admin, t, locale, all, seats] = await Promise.all([
    getAdmin(),
    getDictionary(),
    getLocale(),
    listAllElections(),
    listParliamentSeats(),
  ]);
  if (!admin) return <NotAdmin />;
  const now = new Date();

  return (
    <div className="space-y-14">
      <div>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">{t.admin.votes}</h1>
          {isAdmin(admin.member) && (
            <Link href={`/${locale}/admin/new/`} className="btn-primary">
              <Plus className="size-5" /> {t.admin.newVote}
            </Link>
          )}
        </div>
        {all.length === 0 ? (
          <p className="text-muted">{t.vote.none}</p>
        ) : (
          <ul className="space-y-3">
            {all.map((e) => (
              <li key={e.id}>
                <Link
                  href={`/${locale}/admin/${e.id}/`}
                  className="card card-hover flex flex-col gap-2 p-5 text-text hover:text-text sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-serif text-lg font-bold text-heading">{e.title}</p>
                    <p className="text-sm text-muted">
                      <LocalDate date={e.opensAt} locale={locale} /> → <LocalDate date={e.closesAt} locale={locale} />
                      {e.seats > 0 ? ` · ${e.seats} Seats (D'Hondt)` : ""}
                    </p>
                  </div>
                  <StatusBadge status={displayStatus(e, now)} labels={t.admin.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-border pt-12">
        <p className="eyebrow">Parliamentary Roster Management</p>
        <h2 className="section-title">15-Seat Imperial Parliament Assignment</h2>
        <p className="section-subtitle">
          Click any seat in the hemicycle or roster below to assign or update its Member of Parliament, Discord User ID, political party, coalition bench, or ministerial portfolio.
        </p>
        <ParliamentChamber seats={seats} canManage={canManageParliament(admin.member)} />
      </div>

      <div className="border-t border-border pt-12">
        <RolePrivilegesTable />
      </div>
    </div>
  );
}
