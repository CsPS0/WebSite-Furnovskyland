import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { LocalDate } from "@/components/local-date";
import { NotAdmin } from "@/components/not-admin";
import { getAdmin } from "@/lib/admin";
import { isAdmin } from "@/lib/discord";
import { displayStatus, listAllElections } from "@/lib/elections";
import { getDictionary, getLocale } from "@/lib/i18n";
import { StatusBadge } from "../szavazas/status";

export const metadata = { title: "Admin", robots: { index: false } };

export default function AdminPage() {
  return (
    <section className="section">
      <div className="page max-w-4xl">
        <Suspense fallback={<div className="card h-64 animate-pulse" />}>
          <AdminList />
        </Suspense>
      </div>
    </section>
  );
}

async function AdminList() {
  const [admin, t, locale] = [await getAdmin(), await getDictionary(), await getLocale()];
  if (!admin) return <NotAdmin />;
  const all = await listAllElections();
  const now = new Date();

  return (
    <>
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
                  </p>
                </div>
                <StatusBadge status={displayStatus(e, now)} labels={t.admin.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
