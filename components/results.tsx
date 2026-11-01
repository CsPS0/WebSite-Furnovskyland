import { fmt, type Dictionary } from "@/lib/i18n";
import { allocateDhondtSeats, type TallyResult } from "@/lib/tally";
import { HemicycleChart, type HemicycleSeat } from "./hemicycle";

const DEFAULT_PALETTE = [
  "#d62828", // Imperial / AfF Crimson Red
  "#2563eb", // Conservative / Royal Blue
  "#d97706", // Gold / United Furnovskyland Orange
  "#15803d", // Emerald Green
  "#7c3aed", // Noble Purple
  "#0d9488", // Teal
  "#64748b", // Slate
];

function colorForOption(label: string, index: number, kind?: "yes" | "no" | "abstain"): { pie: string; seat: string } {
  if (kind === "yes") return { pie: "#16a34a", seat: "#16a34a" };
  if (kind === "no") return { pie: "#dc2626", seat: "#dc2626" };
  if (kind === "abstain") return { pie: "#94a3b8", seat: "#94a3b8" };

  const lower = label.toLowerCase();
  if (
    lower.includes("alliance for furnovskyland") ||
    lower.includes("we continue the change") ||
    lower.includes("aff") ||
    lower.includes("social democratic") ||
    lower.includes("sdp") ||
    lower.includes("democratic alliance") ||
    lower.includes("centre-left") ||
    lower.includes("socialist")
  ) {
    return { pie: "#dc2626", seat: "#d60000" };
  }
  if (
    lower.includes("united conservative") ||
    lower.includes("united coalition") ||
    lower.includes("national coalition") ||
    lower.includes("christian-conservative") ||
    lower.includes("ccp")
  ) {
    return { pie: "#2563eb", seat: "#ffffff" };
  }
  if (lower.includes("united furnovskyland") || lower.includes("monarchist") || lower.includes("rfmp")) {
    return { pie: "#ea580c", seat: "#ff8c00" };
  }
  if (lower.includes("integral nationalist") || lower.includes("inp") || lower.includes("unitedfortheright")) {
    return { pie: "#15803d", seat: "#15803d" };
  }
  if (lower.includes("liberal") || lower.includes("uflp")) {
    return { pie: "#0284c7", seat: "#0284c7" };
  }
  if (lower.includes("progressive") || lower.includes("fpp")) {
    return { pie: "#9333ea", seat: "#9333ea" };
  }
  if (lower.includes("independent") || lower.includes("csps")) {
    return { pie: "#64748b", seat: "#d9d9d9" };
  }
  const fallback = DEFAULT_PALETTE[index % DEFAULT_PALETTE.length];
  return { pie: fallback, seat: fallback };
}

type PieSlice = {
  label: string;
  votes: number;
  color: string;
};

function computePieGeometry(nonZero: PieSlice[], total: number, r: number) {
  let cumulative = 0;
  return nonZero.map((s, idx) => {
    const fraction = s.votes / total;
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    cumulative += fraction;
    const endAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    const midAngle = (startAngle + endAngle) / 2;

    const x1 = r * Math.cos(startAngle);
    const y1 = r * Math.sin(startAngle);
    const x2 = r * Math.cos(endAngle);
    const y2 = r * Math.sin(endAngle);
    const largeArc = fraction > 0.5 ? 1 : 0;

    const pathData =
      nonZero.length === 1
        ? `M 0 ${-r} A ${r} ${r} 0 1 1 0 ${r} A ${r} ${r} 0 1 1 0 ${-r} Z`
        : `M 0 0 L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    const labelR = nonZero.length === 1 ? 0 : r * 0.62;
    const lx = labelR * Math.cos(midAngle);
    const ly = labelR * Math.sin(midAngle);
    const pctText = `${((s.votes / total) * 100).toFixed(1)}%`;

    return {
      key: `${s.label}-${idx}`,
      pathData,
      color: s.color,
      lx,
      ly,
      pctText,
      showLabel: fraction >= 0.08,
    };
  });
}

function CircleGraph({ slices, total, ballotsLabel }: { slices: PieSlice[]; total: number; ballotsLabel: string }) {
  const nonZero = slices.filter((s) => s.votes > 0);
  if (total <= 0 || nonZero.length === 0) return null;

  const renderedSlices = computePieGeometry(nonZero, total, 96);

  return (
    <div className="rounded-lg border border-border bg-bg-alt/50 p-5">
      <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
        <span className="text-xs font-bold tracking-wider text-secondary uppercase">Vote Share Distribution</span>
        <span className="text-xs font-semibold text-muted">{ballotsLabel}</span>
      </div>
      <div className="grid items-center gap-6 md:grid-cols-[220px_1fr]">
        <div className="mx-auto w-full max-w-[210px]">
          <svg viewBox="-108 -108 216 216" className="w-full drop-shadow-sm" role="img" aria-label="Election vote share pie chart">
            {renderedSlices.map((s) => (
              <g key={s.key}>
                <path d={s.pathData} fill={s.color} stroke="#ffffff" strokeWidth={nonZero.length > 1 ? 2 : 0} />
                {s.showLabel && (
                  <text
                    x={s.lx}
                    y={s.ly + 4}
                    textAnchor="middle"
                    className="pointer-events-none select-none text-[13px] font-bold"
                    fill="#ffffff"
                  >
                    {s.pctText}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>
        <ul className="space-y-2.5 text-sm">
          {slices.map((s, idx) => {
            const pct = total > 0 ? ((s.votes / total) * 100).toFixed(1) : "0.0";
            return (
              <li key={idx} className="flex items-start justify-between gap-3 border-b border-border/60 pb-2 last:border-none last:pb-0">
                <div className="flex items-start gap-2.5">
                  <span
                    className="mt-1 size-3.5 shrink-0 rounded-full border border-black/15"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="font-medium text-heading">{s.label}</span>
                </div>
                <span className="shrink-0 font-mono text-xs font-semibold text-muted tabular-nums">
                  {s.votes} ({pct}%)
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function parseExplicitSeats(labelText: string): number | null {
  const m = labelText.match(/·\s*(\d+)\s*seats?/i);
  return m ? Number(m[1]) : null;
}

function buildElectionSeats(
  rows: { optionId: number; label: string; votes: number; seatColor: string }[],
  configuredSeats: number,
): { coalitionSeats: HemicycleSeat[]; partyBreakdownSeats: HemicycleSeat[] | null; legend: { label: string; seats: number; color: string }[] } | null {
  const explicitCounts = rows.map((r) => parseExplicitSeats(r.label));
  const hasExplicit = explicitCounts.some((n) => n !== null && n > 0);

  let seatMap: Map<number, number>;
  if (hasExplicit) {
    seatMap = new Map(rows.map((r, i) => [r.optionId, explicitCounts[i] ?? 0]));
  } else if (configuredSeats > 0) {
    seatMap = allocateDhondtSeats(
      rows.map((r) => ({ optionId: r.optionId, votes: r.votes })),
      configuredSeats,
    );
  } else {
    return null;
  }

  const totalSeats = [...seatMap.values()].reduce((a, b) => a + b, 0);
  if (totalSeats <= 0) return null;

  const coalitionSeats: HemicycleSeat[] = [];
  const legend: { label: string; seats: number; color: string }[] = [];

  for (const r of rows) {
    const count = seatMap.get(r.optionId) ?? 0;
    if (count <= 0) continue;
    const cleanLabel = r.label.replace(/\s*·\s*\d+\s*seats?/i, "").trim();
    legend.push({ label: cleanLabel, seats: count, color: r.seatColor });
    for (let i = 0; i < count; i++) {
      coalitionSeats.push({
        seatNumber: coalitionSeats.length + 1,
        color: r.seatColor,
        label: cleanLabel,
      });
    }
  }

  // If this is the 15-seat Oct-Nov 2026 Parliamentary Election (9 AfF coalition vs 6 UCC coalition),
  // also provide the exact Party Breakdown hemicycle (8 Red AfF, 1 Grey Independent/Partner, 5 White CCP, 1 Orange UF)
  // matching the Emperor's two hemicycle announcement charts.
  let partyBreakdownSeats: HemicycleSeat[] | null = null;
  if (
    totalSeats === 15 &&
    legend.length === 2 &&
    legend[0].seats === 9 &&
    legend[1].seats === 6 &&
    legend[0].label.toLowerCase().includes("alliance for furnovskyland")
  ) {
    const partyColors = [
      ...Array(8).fill({ color: "#d60000", label: "Alliance for Furnovskyland (AfF)" }),
      { color: "#d9d9d9", label: "Independent / Partner (AfF List)" },
      ...Array(5).fill({ color: "#ffffff", label: "Christian-Conservative Party (CCP)" }),
      { color: "#ff8c00", label: "United Furnovskyland (UF)" },
    ];
    partyBreakdownSeats = partyColors.map((p, idx) => ({
      seatNumber: idx + 1,
      color: p.color,
      label: p.label,
    }));
  }

  return { coalitionSeats, partyBreakdownSeats, legend };
}

function Bar({ label, votes, total, highlight, color }: { label: string; votes: number; total: number; highlight?: boolean; color?: string }) {
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
        <div
          className={`h-full rounded-full ${!color ? (highlight ? "bg-secondary" : "bg-primary/60 dark:bg-link/60") : ""}`}
          style={{ width: `${pct}%`, ...(color ? { backgroundColor: color } : {}) }}
        />
      </div>
    </div>
  );
}

export function Results({
  result,
  label,
  t,
  seats = 0,
}: {
  result: TallyResult;
  label: (id: number) => string;
  t: Dictionary["vote"];
  seats?: number;
}) {
  if (result.kind === "law") {
    const decided = result.counts.yes + result.counts.no;
    const slices: PieSlice[] = [
      { label: t.yes, votes: result.counts.yes, color: colorForOption(t.yes, 0, "yes").pie },
      { label: t.no, votes: result.counts.no, color: colorForOption(t.no, 1, "no").pie },
      ...(result.counts.abstain > 0
        ? [{ label: t.abstain, votes: result.counts.abstain, color: colorForOption(t.abstain, 2, "abstain").pie }]
        : []),
    ];
    return (
      <div className="space-y-6">
        <CircleGraph slices={slices} total={result.total || decided} ballotsLabel={fmt(t.ballots, { n: result.total })} />
        <div className="space-y-4">
          <Bar label={t.yes} votes={result.counts.yes} total={decided} highlight={result.outcome === "passed"} color="#16a34a" />
          <Bar label={t.no} votes={result.counts.no} total={decided} highlight={result.outcome === "failed"} color="#dc2626" />
          <p className="text-sm text-muted">
            {t.abstain}: {result.counts.abstain} · {fmt(t.ballots, { n: result.total })}
          </p>
        </div>
      </div>
    );
  }

  if (result.kind === "plurality") {
    const rows = result.counts.map((c, idx) => {
      const text = label(c.optionId);
      const colors = colorForOption(text, idx);
      return {
        optionId: c.optionId,
        label: text,
        votes: c.votes,
        pieColor: colors.pie,
        seatColor: colors.seat,
      };
    });

    const slices: PieSlice[] = rows.map((r) => ({
      label: r.label,
      votes: r.votes,
      color: r.pieColor,
    }));

    const seatData = buildElectionSeats(rows, seats);

    return (
      <div className="space-y-6">
        <CircleGraph slices={slices} total={result.total} ballotsLabel={fmt(t.ballots, { n: result.total })} />

        {seatData && (
          <div className="rounded-lg border border-border bg-bg-alt/50 p-5">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-bold tracking-wider text-secondary uppercase">
                Legislative Seat Allocation ({seatData.coalitionSeats.length} Seats)
              </span>
              <span className="text-xs text-muted">D&apos;Hondt / Proportional Method</span>
            </div>
            <div className={`grid gap-6 ${seatData.partyBreakdownSeats ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
              <HemicycleChart
                seats={seatData.coalitionSeats}
                title={seatData.partyBreakdownSeats ? "Coalition Seat Distribution" : "Chamber Seat Distribution"}
                subtitle={seatData.legend.map((l) => `${l.seats} — ${l.label}`).join(" · ")}
              />
              {seatData.partyBreakdownSeats && (
                <HemicycleChart
                  seats={seatData.partyBreakdownSeats}
                  title="Individual Party Breakdown"
                  subtitle="8 AfF (Red) · 1 Ind. (Grey) · 5 CCP (White) · 1 UF (Orange)"
                />
              )}
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4 border-t border-border/60 pt-3 text-xs">
              {seatData.legend.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span
                    className="size-3.5 rounded-full border border-slate-400"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-semibold text-heading">{item.seats} seats</span>
                  <span className="text-muted">— {item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {rows.map((r) => (
            <Bar
              key={r.optionId}
              label={r.label}
              votes={r.votes}
              total={result.total}
              highlight={result.winners.includes(r.optionId)}
              color={r.pieColor}
            />
          ))}
          <p className="text-sm text-muted">{fmt(t.ballots, { n: result.total })}</p>
        </div>
      </div>
    );
  }

  const lastRound = result.rounds[result.rounds.length - 1];
  const lastRoundSlices: PieSlice[] = lastRound
    ? Object.entries(lastRound.counts)
        .map(([id, votes], idx) => {
          const text = label(Number(id));
          return { label: text, votes, color: colorForOption(text, idx).pie };
        })
        .sort((a, b) => b.votes - a.votes)
    : [];

  return (
    <div className="space-y-6">
      {lastRoundSlices.length > 0 && (
        <CircleGraph
          slices={lastRoundSlices}
          total={result.total - (lastRound?.exhausted ?? 0)}
          ballotsLabel={fmt(t.ballots, { n: result.total })}
        />
      )}
      {result.rounds.map((round, i) => {
        const inPlay = result.total - round.exhausted;
        const rows = Object.entries(round.counts)
          .map(([id, votes]) => ({ id: Number(id), votes }))
          .sort((a, b) => b.votes - a.votes);
        return (
          <div key={i} className="space-y-3">
            <h3 className="text-base">{fmt(t.round, { n: i + 1 })}</h3>
            {rows.map((r, idx) => (
              <Bar
                key={r.id}
                label={label(r.id)}
                votes={r.votes}
                total={inPlay}
                highlight={result.winners.includes(r.id)}
                color={colorForOption(label(r.id), idx).pie}
              />
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
