import { fmt, type Dictionary } from "@/lib/i18n";
import type { TallyResult } from "@/lib/tally";

function Bar({ label, votes, total, highlight }: { label: string; votes: number; total: number; highlight?: boolean }) {
  const pct = total ? Math.round((votes / total) * 100) : 0;
  return (
    <div>
      <div className="mb-1 flex justify-between gap-4 text-sm">
        <span className={highlight ? "font-bold text-heading" : ""}>{label}</span>
        <span className="tabular-nums text-muted">
          {votes} · {pct}%
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-border">
        <div className={`h-full rounded-full ${highlight ? "bg-secondary" : "bg-primary/60 dark:bg-link/60"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function Results({ result, label, t }: { result: TallyResult; label: (id: number) => string; t: Dictionary["vote"] }) {
  if (result.kind === "law") {
    const decided = result.counts.yes + result.counts.no;
    return (
      <div className="space-y-4">
        <Bar label={t.yes} votes={result.counts.yes} total={decided} highlight={result.outcome === "passed"} />
        <Bar label={t.no} votes={result.counts.no} total={decided} highlight={result.outcome === "failed"} />
        <p className="text-sm text-muted">
          {t.abstain}: {result.counts.abstain} · {fmt(t.ballots, { n: result.total })}
        </p>
      </div>
    );
  }

  if (result.kind === "plurality") {
    return (
      <div className="space-y-4">
        {result.counts.map((c) => (
          <Bar key={c.optionId} label={label(c.optionId)} votes={c.votes} total={result.total} highlight={result.winners.includes(c.optionId)} />
        ))}
        <p className="text-sm text-muted">{fmt(t.ballots, { n: result.total })}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {result.rounds.map((round, i) => {
        const inPlay = result.total - round.exhausted;
        const rows = Object.entries(round.counts)
          .map(([id, votes]) => ({ id: Number(id), votes }))
          .sort((a, b) => b.votes - a.votes);
        return (
          <div key={i} className="space-y-3">
            <h3 className="text-base">{fmt(t.round, { n: i + 1 })}</h3>
            {rows.map((r) => (
              <Bar key={r.id} label={label(r.id)} votes={r.votes} total={inPlay} highlight={result.winners.includes(r.id)} />
            ))}
            {round.exhausted > 0 && (
              <p className="text-sm text-muted">
                {t.exhausted}: {round.exhausted}
              </p>
            )}
          </div>
        );
      })}
      <p className="text-sm text-muted">{fmt(t.ballots, { n: result.total })}</p>
    </div>
  );
}
