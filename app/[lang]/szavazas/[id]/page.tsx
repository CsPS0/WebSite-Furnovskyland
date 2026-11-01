import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Lock } from "lucide-react";
import { BallotForm } from "@/components/ballot-form";
import { LocalDate } from "@/components/local-date";
import { LoginLink } from "@/components/login-link";
import { DiscordIcon } from "@/components/icons";
import { Results } from "@/components/results";
import { canLogin, getMember } from "@/lib/discord";
import { displayStatus, getElection, getUserBallot, syncElection } from "@/lib/elections";
import { fmt, getDictionary, getLocale } from "@/lib/i18n";
import { getSessionUser } from "@/lib/session";
import { optionLabel, StatusBadge, typeLabel } from "../status";

export default function VotePage({ params }: PageProps<"/[lang]/szavazas/[id]">) {
  return (
    <section className="section">
      <div className="page max-w-3xl">
        <Suspense fallback={<div className="card h-96 animate-pulse" />}>
          <Vote params={params} />
        </Suspense>
      </div>
    </section>
  );
}

async function Vote({ params }: { params: PageProps<"/[lang]/szavazas/[id]">["params"] }) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  await connection();

  let election = await getElection(id);
  if (!election || election.status === "draft") notFound();
  const now = new Date();
  if (displayStatus(election, now) !== election.status) {
    await syncElection(id, now);
    election = (await getElection(id))!;
  }

  const [dict, locale] = [await getDictionary(), await getLocale()];
  const t = dict.vote;
  const status = displayStatus(election, now);
  const label = (optionId: number) => {
    const o = election.options.find((x) => x.id === optionId);
    return o ? optionLabel(election, o.label, t) : "?";
  };

  return (
    <article className="space-y-8">
      <header>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <StatusBadge status={status} labels={dict.admin.status} />
          <span className="text-sm text-muted">{fmt(typeLabel(election, t), { n: election.maxPicks })}</span>
        </div>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">{election.title}</h1>
        {election.description && <p className="whitespace-pre-line">{election.description}</p>}
        <dl className="mt-6 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2 [&_dt]:font-semibold [&>div]:flex [&>div]:gap-2">
          <div>
            <dt>{t.opens}:</dt>
            <dd><LocalDate date={election.opensAt} locale={locale} /></dd>
          </div>
          <div>
            <dt>{t.closes}:</dt>
            <dd><LocalDate date={election.closesAt} locale={locale} /></dd>
          </div>
          <div className="sm:col-span-2">
            <dd>{election.eligibleRoleIds.length ? t.eligibility.roles : t.eligibility.everyone}</dd>
          </div>
          {election.type === "law" && (
            <div className="sm:col-span-2">
              <dd>
                {t.majority[election.majority]}
                {election.quorum ? ` · ${fmt(t.quorum, { n: election.quorum })}` : ""}
              </dd>
            </div>
          )}
        </dl>
      </header>

      {status === "open" && (
        <div className="card">
          <Suspense fallback={<div className="h-40 animate-pulse" />}>
            <Ballot election={election} labelOf={label} />
          </Suspense>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted">
            <Lock className="size-4" /> {t.secret}
          </p>
        </div>
      )}

      {status === "scheduled" && <p className="card text-muted">{t.resultsHidden}</p>}
      {status === "cancelled" && <p className="card text-muted">{t.outcome.cancelled}</p>}

      {election.result && (
        <div className="card">
          <h2 className="mb-2 text-2xl">{t.results}</h2>
          <p className="mb-6 text-lg font-semibold text-secondary">
            {status === "vetoed"
              ? t.outcome.vetoed
              : status === "veto_window" && election.vetoEndsAt
                ? t.outcome.veto_window.split("{date}").flatMap((part, i) =>
                    i === 0 ? [part] : [<LocalDate key={i} date={election.vetoEndsAt!} locale={locale} />, part],
                  )
                : election.result.kind === "law"
                  ? t.outcome[election.result.outcome]
                  : election.result.outcome === "decided"
                    ? `${t.elected}: ${election.result.winners.map(label).join(", ")}`
                    : election.result.outcome === "tie"
                      ? `${t.outcome.tie}: ${election.result.tied.map(label).join(", ")}`
                      : t.outcome.quorum_failed}
          </p>
          <Results result={election.result} label={label} t={t} seats={election.seats} />
        </div>
      )}
    </article>
  );
}

async function Ballot({
  election,
  labelOf,
}: {
  election: NonNullable<Awaited<ReturnType<typeof getElection>>>;
  labelOf: (id: number) => string;
}) {
  const [user, dict, locale] = [await getSessionUser(), await getDictionary(), await getLocale()];
  const t = dict.vote;
  if (!user) {
    return (
      <LoginLink className="btn-primary">
        <DiscordIcon className="size-5" /> {t.loginToVote}
      </LoginLink>
    );
  }

  const member = await getMember(user.id).catch(() => null);
  if (!member) return <p className="text-muted">{t.notMember}</p>;
  if (!canLogin(member) || (election.eligibleRoleIds.length && !member.roles.some((r) => election.eligibleRoleIds.includes(r)))) {
    return <p className="text-muted">{t.notEligible}</p>;
  }

  const ballot = await getUserBallot(election.id, user.id);
  return (
    <BallotForm
      electionId={election.id}
      lang={locale}
      type={election.type}
      maxPicks={election.maxPicks}
      options={election.options.map((o) => ({ id: o.id, label: labelOf(o.id) }))}
      previous={ballot?.choice ?? null}
      labels={{ submit: t.submit, change: t.change, voted: t.voted, pickHint: fmt(t.pickHint, { n: election.maxPicks }), rankHint: t.rankHint }}
    />
  );
}
