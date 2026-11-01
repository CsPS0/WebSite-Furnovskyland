// Pure vote counting. Ballots are arrays of option ids (ordered for ranked votes); voided ballots are removed before calling.

export type TallyInput = {
  type: "law" | "single" | "multi" | "ranked";
  maxPicks: number;
  majority: "simple" | "two_thirds";
  quorum: number | null;
  options: { id: number; label: string }[];
  ballots: number[][];
};

export type LawResult = {
  kind: "law";
  total: number;
  counts: { yes: number; no: number; abstain: number };
  outcome: "passed" | "failed" | "quorum_failed";
};

export type PluralityResult = {
  kind: "plurality";
  total: number;
  counts: { optionId: number; votes: number }[]; // highest first
  winners: number[]; // certainly elected
  tied: number[]; // compete for the remaining seats with equal votes
  outcome: "decided" | "tie" | "quorum_failed";
};

export type RankedResult = {
  kind: "ranked";
  total: number;
  rounds: { counts: Record<number, number>; exhausted: number; eliminated: number[] }[];
  winners: number[];
  tied: number[];
  outcome: "decided" | "tie" | "quorum_failed";
};

export type TallyResult = LawResult | PluralityResult | RankedResult;

export function tally(input: TallyInput): TallyResult {
  const total = input.ballots.length;
  const quorumFailed = input.quorum != null && total < input.quorum;
  if (input.type === "law") return tallyLaw(input, total, quorumFailed);
  if (input.type === "ranked") return tallyRanked(input, total, quorumFailed);
  return tallyPlurality(input, total, quorumFailed);
}

function tallyLaw(input: TallyInput, total: number, quorumFailed: boolean): LawResult {
  const labelOf = new Map(input.options.map((o) => [o.id, o.label]));
  const counts = { yes: 0, no: 0, abstain: 0 };
  for (const [id] of input.ballots) {
    const label = labelOf.get(id);
    if (label === "yes" || label === "no" || label === "abstain") counts[label]++;
  }
  // Abstentions count toward quorum but not toward the majority.
  const decided = counts.yes + counts.no;
  const passes =
    input.majority === "two_thirds" ? decided > 0 && counts.yes * 3 >= decided * 2 : counts.yes > counts.no;
  return { kind: "law", total, counts, outcome: quorumFailed ? "quorum_failed" : passes ? "passed" : "failed" };
}

function tallyPlurality(input: TallyInput, total: number, quorumFailed: boolean): PluralityResult {
  const seats = input.type === "single" ? 1 : input.maxPicks;
  const votes = new Map(input.options.map((o) => [o.id, 0]));
  for (const ballot of input.ballots) {
    for (const id of new Set(ballot)) if (votes.has(id)) votes.set(id, votes.get(id)! + 1);
  }
  const counts = [...votes].map(([optionId, v]) => ({ optionId, votes: v })).sort((a, b) => b.votes - a.votes);

  let winners = counts.slice(0, seats).map((c) => c.optionId);
  let tied: number[] = [];
  const cutoff = counts[seats - 1]?.votes;
  // A tie at the cutoff means the last seat(s) can't be assigned.
  if (cutoff !== undefined && counts[seats] && counts[seats].votes === cutoff) {
    winners = counts.filter((c) => c.votes > cutoff).map((c) => c.optionId);
    tied = counts.filter((c) => c.votes === cutoff).map((c) => c.optionId);
  }
  const outcome = quorumFailed ? "quorum_failed" : tied.length ? "tie" : "decided";
  return { kind: "plurality", total, counts, winners: quorumFailed ? [] : winners, tied: quorumFailed ? [] : tied, outcome };
}

/** Instant runoff: drop the weakest option each round until one has a majority of the ballots still in play. */
function tallyRanked(input: TallyInput, total: number, quorumFailed: boolean): RankedResult {
  const active = new Set(input.options.map((o) => o.id));
  const rounds: RankedResult["rounds"] = [];
  let winners: number[] = [];
  let tied: number[] = [];

  while (active.size > 0) {
    const counts: Record<number, number> = Object.fromEntries([...active].map((id) => [id, 0]));
    let exhausted = 0;
    for (const ballot of input.ballots) {
      const pick = ballot.find((id) => active.has(id));
      if (pick === undefined) exhausted++;
      else counts[pick]++;
    }
    const inPlay = total - exhausted;
    const sorted = [...active].sort((a, b) => counts[b] - counts[a]);
    const round = { counts, exhausted, eliminated: [] as number[] };
    rounds.push(round);

    if (active.size === 1 || (inPlay > 0 && counts[sorted[0]] * 2 > inPlay)) {
      winners = [sorted[0]];
      break;
    }
    const lowest = counts[sorted[sorted.length - 1]];
    const losers = sorted.filter((id) => counts[id] === lowest);
    if (losers.length === active.size) {
      tied = sorted; // everyone left is level, nothing to separate them
      break;
    }
    round.eliminated = losers;
    for (const id of losers) active.delete(id);
  }

  const outcome = quorumFailed ? "quorum_failed" : tied.length ? "tie" : "decided";
  return { kind: "ranked", total, rounds, winners: quorumFailed ? [] : winners, tied: quorumFailed ? [] : tied, outcome };
}

/** Allocates parliamentary seats proportionally using the D'Hondt highest-averages method. */
export function allocateDhondtSeats(
  counts: { optionId: number; votes: number }[],
  totalSeats: number,
): Map<number, number> {
  const allocated = new Map<number, number>(counts.map((c) => [c.optionId, 0]));
  const totalVotes = counts.reduce((sum, c) => sum + c.votes, 0);
  if (totalSeats <= 0 || totalVotes <= 0 || counts.length === 0) return allocated;

  for (let s = 0; s < totalSeats; s++) {
    let bestId = counts[0].optionId;
    let bestQuotient = -1;
    let bestVotes = -1;
    for (const c of counts) {
      if (c.votes <= 0) continue;
      const currentSeats = allocated.get(c.optionId) ?? 0;
      const quotient = c.votes / (currentSeats + 1);
      if (quotient > bestQuotient || (quotient === bestQuotient && c.votes > bestVotes)) {
        bestQuotient = quotient;
        bestVotes = c.votes;
        bestId = c.optionId;
      }
    }
    allocated.set(bestId, (allocated.get(bestId) ?? 0) + 1);
  }
  return allocated;
}

/** Checks a submitted choice against the vote's rules before it is stored. */
export function isValidChoice(
  type: TallyInput["type"],
  maxPicks: number,
  optionIds: number[],
  choice: number[],
): boolean {
  const known = new Set(optionIds);
  if (choice.length === 0 || new Set(choice).size !== choice.length) return false;
  if (!choice.every((id) => known.has(id))) return false;
  if (type === "law" || type === "single") return choice.length === 1;
  if (type === "multi") return choice.length <= maxPicks;
  return true; // ranked: any non-empty ordering of distinct options
}
