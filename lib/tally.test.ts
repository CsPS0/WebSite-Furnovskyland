import { describe, expect, test } from "bun:test";
import { isValidChoice, tally, type TallyInput } from "./tally";

const lawOptions = [
  { id: 1, label: "yes" },
  { id: 2, label: "no" },
  { id: 3, label: "abstain" },
];
const law = (ballots: number[][], extra: Partial<TallyInput> = {}) =>
  tally({ type: "law", maxPicks: 1, majority: "simple", quorum: null, options: lawOptions, ballots, ...extra });

const abc = [
  { id: 10, label: "A" },
  { id: 20, label: "B" },
  { id: 30, label: "C" },
  { id: 40, label: "D" },
];

describe("law votes", () => {
  test("simple majority passes and fails", () => {
    expect(law([[1], [1], [2]]).outcome).toBe("passed");
    expect(law([[1], [2], [2]]).outcome).toBe("failed");
    expect(law([[1], [2]]).outcome).toBe("failed"); // a tie does not pass
  });

  test("abstentions don't count toward the majority", () => {
    const r = law([[1], [3], [3], [3]]);
    expect(r.outcome).toBe("passed");
    expect(r.kind === "law" && r.counts).toEqual({ yes: 1, no: 0, abstain: 3 });
  });

  test("two-thirds at the boundary", () => {
    expect(law([[1], [1], [2]], { majority: "two_thirds" }).outcome).toBe("passed"); // exactly 2/3
    expect(law([[1], [1], [1], [2], [2]], { majority: "two_thirds" }).outcome).toBe("failed"); // 60%
    expect(law([[3]], { majority: "two_thirds" }).outcome).toBe("failed"); // only abstentions
  });

  test("quorum counts abstentions", () => {
    expect(law([[1], [3]], { quorum: 3 }).outcome).toBe("quorum_failed");
    expect(law([[1], [3], [3]], { quorum: 3 }).outcome).toBe("passed");
  });
});

describe("plurality", () => {
  const vote = (type: "single" | "multi", maxPicks: number, ballots: number[][], quorum: number | null = null) =>
    tally({ type, maxPicks, majority: "simple", quorum, options: abc, ballots });

  test("single winner", () => {
    const r = vote("single", 1, [[10], [10], [20]]);
    expect(r.kind === "plurality" && [r.winners, r.outcome]).toEqual([[10], "decided"]);
  });

  test("tie for first", () => {
    const r = vote("single", 1, [[10], [20]]);
    expect(r.kind === "plurality" && [r.winners, r.tied.sort(), r.outcome]).toEqual([[], [10, 20], "tie"]);
  });

  test("top N with a tie at the cutoff", () => {
    // A=3, B=2, C=2, D=0, two seats: A is in, B and C tie for the last seat.
    const r = vote("multi", 2, [[10, 20], [10, 30], [10, 20, 30]]);
    expect(r.kind === "plurality" && [r.winners, r.tied.sort(), r.outcome]).toEqual([[10], [20, 30], "tie"]);
  });

  test("top N decided", () => {
    const r = vote("multi", 2, [[10, 20], [10, 20], [30]]);
    expect(r.kind === "plurality" && [r.winners.sort(), r.outcome]).toEqual([[10, 20], "decided"]);
  });

  test("quorum not met clears winners", () => {
    const r = vote("single", 1, [[10]], 2);
    expect(r.kind === "plurality" && [r.winners, r.outcome]).toEqual([[], "quorum_failed"]);
  });
});

describe("ranked (instant runoff)", () => {
  const ranked = (ballots: number[][]) =>
    tally({ type: "ranked", maxPicks: 1, majority: "simple", quorum: null, options: abc, ballots });

  test("majority in the first round", () => {
    const r = ranked([[10, 20], [10], [20]]);
    expect(r.kind === "ranked" && [r.winners, r.rounds.length]).toEqual([[10], 1]);
  });

  test("eliminations transfer votes", () => {
    // Round 1: A=2 B=2 C=1 D=0 -> D is out (0). Round 2: A=2 B=2 C=1 -> C out, its ballot goes to B. Round 3: B=3 wins.
    const r = ranked([[10], [10], [20], [20], [30, 20]]);
    expect(r.kind === "ranked" && r.winners).toEqual([20]);
    expect(r.kind === "ranked" && r.rounds.map((x) => x.eliminated)).toEqual([[40], [30], []]);
  });

  test("exhausted ballots leave the count", () => {
    // Round 1: A=2 B=1 C=1 D=0, D out. Round 2: B and C tie lowest and go together; the C voter ranked nobody else.
    const r = ranked([[10], [10], [20], [30]]);
    expect(r.kind === "ranked" && [r.winners, r.rounds.at(-1)?.exhausted]).toEqual([[10], 2]);
  });

  test("a full tie can't be broken", () => {
    const r = tally({ type: "ranked", maxPicks: 1, majority: "simple", quorum: null, options: abc.slice(0, 2), ballots: [[10], [20]] });
    expect(r.kind === "ranked" && [r.winners, r.tied.sort(), r.outcome]).toEqual([[], [10, 20], "tie"]);
  });

  test("no ballots is a tie, not a crash", () => {
    expect(ranked([]).outcome).toBe("tie");
  });
});

describe("isValidChoice", () => {
  const ids = [10, 20, 30];
  test("rules per type", () => {
    expect(isValidChoice("single", 1, ids, [10])).toBe(true);
    expect(isValidChoice("single", 1, ids, [10, 20])).toBe(false);
    expect(isValidChoice("multi", 2, ids, [10, 20])).toBe(true);
    expect(isValidChoice("multi", 2, ids, [10, 20, 30])).toBe(false);
    expect(isValidChoice("ranked", 1, ids, [30, 10])).toBe(true);
    expect(isValidChoice("ranked", 1, ids, [30, 30])).toBe(false);
    expect(isValidChoice("law", 1, ids, [99])).toBe(false);
    expect(isValidChoice("multi", 2, ids, [])).toBe(false);
  });
});
