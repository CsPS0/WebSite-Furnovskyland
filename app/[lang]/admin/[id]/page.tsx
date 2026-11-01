import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { cancelVote, deleteDraft, deleteVote, setBallotVoided, veto } from "@/app/actions/admin";
import { ConfirmButton } from "@/components/confirm-button";
import { ElectionForm } from "@/components/election-form";
import { LocalDate } from "@/components/local-date";
import { getAdmin, getVoters } from "@/lib/admin";
import { getGuildRoles, isAdmin } from "@/lib/discord";
import { displayStatus, getElection, syncElection } from "@/lib/elections";
import { getDictionary, getLocale } from "@/lib/i18n";
import { StatusBadge } from "../../szavazas/status";
import { NotAdmin } from "@/components/not-admin";

export const metadata = { title: "Admin", robots: { index: false } };

export default function AdminVotePage({ params }: PageProps<"/[lang]/admin/[id]">) {
  return (
    <section className="section">
      <div className="page max-w-4xl">
        <Suspense fallback={<div className="card h-96 animate-pulse" />}>
          <AdminVote params={params} />
        </Suspense>
      </div>
    </section>
  );
}

async function AdminVote({ params }: { params: PageProps<"/[lang]/admin/[id]">["params"] }) {
  const id = Number((await params).id);
  const [admin, dict, locale] = [await getAdmin(), await getDictionary(), await getLocale()];
  if (!admin) return <NotAdmin />;
  if (!Number.isInteger(id)) notFound();

  let election = await getElection(id);
  if (!election) notFound();
  const now = new Date();
  if (displayStatus(election, now) !== election.status) {
    await syncElection(id, now);
    election = (await getElection(id))!;
  }
  const t = dict.admin;
  const canManage = isAdmin(admin.member);

  if (election.status === "draft") {
    if (!canManage) return <NotAdmin />;
    const roles = await getGuildRoles();
    return (
      <>
        <h1 className="mb-8 text-3xl font-bold">{t.edit}</h1>
        <ElectionForm
          lang={locale}
          roles={roles}
          t={t}
          types={dict.vote.types}
          majorities={dict.vote.majority}
          draft={{
            ...election,
            opensAt: election.opensAt.toISOString(),
            closesAt: election.closesAt.toISOString(),
            options: election.type === "law" ? [] : election.options.map((o) => o.label),
          }}
        />
        <form action={deleteDraft} className="mt-6">
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="lang" value={locale} />
          <button className="text-sm text-red-600 hover:underline dark:text-red-400">{t.deleteDraft}</button>
        </form>
      </>
    );
  }

  const status = election.status;
  const voters = canManage ? await getVoters(id) : [];
  const editable = (status === "scheduled" || status === "open") && election.closesAt > now;

  return (
    <div className="space-y-8">
      <header>
        <div className="mb-3 flex items-center gap-3">
          <StatusBadge status={displayStatus(election, now)} labels={t.status} />
          <Link href={`/${locale}/szavazas/${id}/`} className="text-sm">
            {dict.vote.pageTitle} →
          </Link>
        </div>
        <h1 className="text-3xl font-bold">{election.title}</h1>
        <p className="mt-2 text-sm text-muted">
          <LocalDate date={election.opensAt} locale={locale} /> → <LocalDate date={election.closesAt} locale={locale} />
        </p>
      </header>

      <div className="flex flex-wrap gap-3">
        {canManage && editable && (
          <form action={cancelVote}>
            <input type="hidden" name="id" value={id} />
            <ConfirmButton message={t.cancelConfirm} className="btn-ghost">{t.cancel}</ConfirmButton>
          </form>
        )}
        {admin.emperor && status === "veto_window" && (
          <form action={veto}>
            <input type="hidden" name="id" value={id} />
            <ConfirmButton message={t.vetoConfirm} className="btn-primary">{t.veto}</ConfirmButton></form>)}
        {canManage && (
          <form action={deleteVote}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="lang" value={locale} />
            <ConfirmButton message={t.deleteConfirm} className="btn-ghost text-red-600 hover:bg-red-500/10 hover:text-red-600 dark:text-red-400">
              {t.deleteVote}
            </ConfirmButton>
          </form>
        )}
      </div>

      {canManage && (
        <div className="card overflow-hidden p-0 sm:p-0">
          <h2 className="p-6 pb-4 text-2xl">
            {t.voters} ({voters.filter((v) => !v.voided).length})
          </h2>
          {voters.length === 0 ? (
            <p className="px-6 pb-6 text-muted">{t.noVoters}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{t.voters}</th>
                    <th>{t.flags}</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {voters.map((v) => (
                    <tr key={v.id} className={v.voided ? "opacity-60" : ""}>
                      <td>
                        <span className={v.voided ? "line-through" : "font-semibold"}>{v.name}</span>
                        <span className="block text-xs text-muted">{v.userId}</span>
                        {v.voided && (
                          <span className="block text-xs text-muted">
                            {t.voided}
                            {v.voidReason ? `: ${v.voidReason}` : ""}
                          </span>
                        )}
                      </td>
                      <td>
                        {v.flags.map((f) => (
                          <span key={f} className="mr-2 mb-1 inline-flex items-center gap-1 text-sm text-amber-700 dark:text-amber-400">
                            <TriangleAlert className="size-4" /> {t.flag[f]}
                          </span>
                        ))}
                      </td>
                      <td>
                        {editable && (
                          <form action={setBallotVoided} className="flex items-center gap-2">
                            <input type="hidden" name="electionId" value={id} />
                            <input type="hidden" name="ballotId" value={v.id} />
                            <input type="hidden" name="voided" value={v.voided ? "0" : "1"} />
                            {!v.voided && <input name="reason" placeholder={t.voidReason} className="input w-36 py-1.5 text-sm" />}
                            <button className="btn-ghost px-3 py-1.5 text-sm">{v.voided ? t.restore : t.void}</button>
                          </form>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
