import { sleep } from "workflow";
import { getElection, syncElection } from "@/lib/elections";

/**
 * One durable run per published vote: wakes at opening, at closing and at the end of the veto window.
 * Every step only calls syncElection, which checks the database itself, so a cancelled vote or a
 * page load that got there first just makes a step a no-op.
 */
export async function electionLifecycle(electionId: number) {
  "use workflow";

  const times = await loadTimes(electionId);
  if (!times) return;

  await sleep(times.opensAt);
  await sync(electionId);

  await sleep(times.closesAt);
  const vetoEndsAt = (await sync(electionId))?.vetoEndsAt;

  if (vetoEndsAt) {
    await sleep(vetoEndsAt);
    await sync(electionId);
  }
}

async function loadTimes(electionId: number) {
  "use step";
  const e = await getElection(electionId);
  return e && { opensAt: e.opensAt, closesAt: e.closesAt };
}

async function sync(electionId: number) {
  "use step";
  await syncElection(electionId);
  const e = await getElection(electionId);
  return e && { vetoEndsAt: e.status === "veto_window" ? e.vetoEndsAt : null };
}
