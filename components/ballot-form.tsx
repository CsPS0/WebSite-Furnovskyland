"use client";

import { useActionState, useState } from "react";
import { CircleCheck, CircleAlert } from "lucide-react";
import { castVote, type VoteState } from "@/app/actions/vote";

type Props = {
  electionId: number;
  lang: string;
  type: "law" | "single" | "multi" | "ranked";
  maxPicks: number;
  options: { id: number; label: string }[];
  previous: number[] | null;
  labels: { submit: string; change: string; voted: string; pickHint: string; rankHint: string };
};

export function BallotForm({ electionId, lang, type, maxPicks, options, previous, labels }: Props) {
  const [state, action, pending] = useActionState<VoteState, FormData>(castVote, null);
  const [picked, setPicked] = useState<number[]>(type === "multi" ? (previous ?? []) : []);
  const hasVoted = !!previous || !!state?.ok;

  return (
    <form action={action} onReset={(e) => e.preventDefault()} className="space-y-4">
      <input type="hidden" name="electionId" value={electionId} />
      <input type="hidden" name="lang" value={lang} />

      {type === "multi" && <p className="text-sm text-muted">{labels.pickHint}</p>}
      {type === "ranked" && <p className="text-sm text-muted">{labels.rankHint}</p>}

      <fieldset className="space-y-2">
        {options.map((o) => {
          const rank = previous ? previous.indexOf(o.id) + 1 : 0;
          return (
            <label
              key={o.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-bg px-4 py-3 transition hover:border-primary has-checked:border-secondary has-checked:bg-secondary/5"
            >
              {type === "ranked" ? (
                <input
                  type="number"
                  name={`rank-${o.id}`}
                  min={1}
                  max={options.length}
                  defaultValue={rank || ""}
                  aria-label={o.label}
                  className="input w-16 px-2 py-1 text-center"
                />
              ) : type === "multi" ? (
                <input
                  type="checkbox"
                  name="choice"
                  value={o.id}
                  checked={picked.includes(o.id)}
                  disabled={!picked.includes(o.id) && picked.length >= maxPicks}
                  onChange={(e) => setPicked((p) => (e.target.checked ? [...p, o.id] : p.filter((id) => id !== o.id)))}
                  className="size-5 accent-secondary"
                />
              ) : (
                <input
                  type="radio"
                  name="choice"
                  value={o.id}
                  required
                  defaultChecked={previous?.[0] === o.id}
                  className="size-5 accent-secondary"
                />
              )}
              <span className="font-medium">{o.label}</span>
            </label>
          );
        })}
      </fieldset>

      {state?.error && (
        <p role="alert" className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <CircleAlert className="size-5 shrink-0" /> {state.error}
        </p>
      )}
      {hasVoted && !state?.error && (
        <p role="status" className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <CircleCheck className="size-5 shrink-0" /> {labels.voted}
        </p>
      )}

      <button className="btn-primary w-full sm:w-auto" disabled={pending}>
        {hasVoted ? labels.change : labels.submit}
      </button>
    </form>
  );
}
