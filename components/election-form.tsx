"use client";

import { useActionState, useState, useSyncExternalStore } from "react";
import { CircleAlert } from "lucide-react";
import { saveElection, type SaveState } from "@/app/actions/admin";
import type { Dictionary } from "@/lib/i18n";
import { fmt } from "@/lib/i18n-config";

type Draft = {
  id: number;
  title: string;
  description: string;
  type: "law" | "single" | "multi" | "ranked";
  maxPicks: number;
  seats?: number;
  eligibleRoleIds: string[];
  majority: "simple" | "two_thirds";
  quorum: number | null;
  vetoHours: number;
  opensAt: string;
  closesAt: string;
  options: string[];
};

type Props = {
  lang: string;
  roles: { id: string; name: string }[];
  draft?: Draft;
  t: Dictionary["admin"];
  types: Dictionary["vote"]["types"];
  majorities: Dictionary["vote"]["majority"];
};

const noop = () => () => {};

/** "2026-10-24T18:00" in the browser's time zone, the format datetime-local expects. */
function toLocalInput(iso: string) {
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

/** datetime-local works in the admin's own time zone; the hidden field carries the exact moment as ISO. */
function DateTimeField({ name, label, initial }: { name: string; label: string; initial?: string }) {
  const [edited, setEdited] = useState<string | null>(null);
  // The browser's time zone is only known after hydration; the server renders the field empty.
  const inBrowser = useSyncExternalStore(noop, () => true, () => false);
  const local = edited ?? (inBrowser && initial ? toLocalInput(initial) : "");
  const iso = edited === null ? (initial ?? "") : edited ? new Date(edited).toISOString() : "";

  return (
    <label className="block">
      <span className="label">{label}</span>
      <input type="datetime-local" required value={local} onChange={(e) => setEdited(e.target.value)} className="input" />
      <input type="hidden" name={name} value={iso} />
    </label>
  );
}

export function ElectionForm({ lang, roles, draft, t, types, majorities }: Props) {
  const [state, action, pending] = useActionState<SaveState, FormData>(saveElection, null);
  const [type, setType] = useState<Draft["type"]>(draft?.type ?? "single");
  const f = t.fields;

  return (
    <form action={action} onReset={(e) => e.preventDefault()} className="card space-y-6">
      <input type="hidden" name="lang" value={lang} />
      {draft && <input type="hidden" name="id" value={draft.id} />}

      <label className="block">
        <span className="label">{f.title}</span>
        <input name="title" required maxLength={200} defaultValue={draft?.title} className="input" />
      </label>

      <label className="block">
        <span className="label">{f.description}</span>
        <textarea name="description" rows={4} maxLength={4000} defaultValue={draft?.description} className="input" />
      </label>

      <label className="block">
        <span className="label">{f.type}</span>
        <select name="type" value={type} onChange={(e) => setType(e.target.value as Draft["type"])} className="input">
          {(Object.keys(types) as Draft["type"][]).map((k) => (
            <option key={k} value={k}>
              {fmt(types[k], { n: "N" })}
            </option>
          ))}
        </select>
      </label>

      {type !== "law" && (
        <label className="block">
          <span className="label">{f.options}</span>
          <textarea name="options" rows={5} required defaultValue={draft?.options.join("\n")} className="input" />
        </label>
      )}

      {type === "multi" && (
        <label className="block">
          <span className="label">{f.maxPicks}</span>
          <input name="maxPicks" type="number" min={1} required defaultValue={draft?.maxPicks ?? 2} className="input w-32" />
        </label>
      )}

      {type !== "law" && (
        <label className="block">
          <span className="label">Parliamentary / Senate Seats (D&apos;Hondt hemicycle — 0 for none, e.g. 15 for Parliament)</span>
          <input name="seats" type="number" min={0} max={50} defaultValue={draft?.seats ?? 0} className="input w-32" />
        </label>
      )}

      <fieldset>
        <legend className="label">{f.roles}</legend>
        <div className="flex flex-wrap gap-2">
          {roles.map((r) => (
            <label key={r.id} className="flex cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-1.5 has-checked:border-secondary has-checked:bg-secondary/10">
              <input type="checkbox" name="roles" value={r.id} defaultChecked={draft?.eligibleRoleIds.includes(r.id)} className="accent-secondary" />
              {r.name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <DateTimeField name="opensAt" label={f.opensAt} initial={draft?.opensAt} />
        <DateTimeField name="closesAt" label={f.closesAt} initial={draft?.closesAt} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {type === "law" && (
          <label className="block">
            <span className="label">{f.majority}</span>
            <select name="majority" defaultValue={draft?.majority ?? "simple"} className="input">
              <option value="simple">{majorities.simple}</option>
              <option value="two_thirds">{majorities.two_thirds}</option>
            </select>
          </label>
        )}
        <label className="block">
          <span className="label">{f.quorum}</span>
          <input name="quorum" type="number" min={1} defaultValue={draft?.quorum ?? ""} className="input" />
        </label>
        {type === "law" && (
          <label className="block">
            <span className="label">{f.vetoHours}</span>
            <input name="vetoHours" type="number" min={0} defaultValue={draft?.vetoHours ?? 48} className="input" />
          </label>
        )}
      </div>

      {state?.error && (
        <p role="alert" className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <CircleAlert className="size-5 shrink-0" /> {state.error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button name="intent" value="draft" className="btn-ghost" disabled={pending}>
          {t.saveDraft}
        </button>
        <button
          name="intent"
          value="publish"
          className="btn-primary"
          disabled={pending}
          onClick={(e) => {
            if (!confirm(t.publishConfirm)) e.preventDefault();
          }}
        >
          {t.publish}
        </button>
      </div>
    </form>
  );
}
