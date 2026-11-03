"use client";

import { useActionState, useState, useSyncExternalStore } from "react";
import { CircleAlert, Eye, Hash, Shield } from "lucide-react";
import { saveElection, type SaveState } from "@/app/actions/admin";
import type { ResultsVisibility } from "@/db/schema";
import {
  DISCORD_VOTE_CHANNELS,
  RESULTS_VISIBILITY_OPTIONS,
  ROLE_ACCESS_PRESETS,
} from "@/lib/governance-config";
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
  announceChannelId?: string | null;
  resultsVisibility?: ResultsVisibility;
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
  const [selectedRoles, setSelectedRoles] = useState<string[]>(draft?.eligibleRoleIds ?? []);
  const [announceChannelId, setAnnounceChannelId] = useState<string>(draft?.announceChannelId ?? "852198106627047474");
  const [resultsVisibility, setResultsVisibility] = useState<ResultsVisibility>(draft?.resultsVisibility ?? "after_close");
  const f = t.fields;

  const toggleRole = (roleId: string) => {
    setSelectedRoles((prev) => (prev.includes(roleId) ? prev.filter((id) => id !== roleId) : [...prev, roleId]));
  };

  const activeVis = RESULTS_VISIBILITY_OPTIONS.find((o) => o.value === resultsVisibility) ?? RESULTS_VISIBILITY_OPTIONS[0];
  const activeChan = DISCORD_VOTE_CHANNELS.find((c) => c.id === announceChannelId);

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

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="label">{f.type}</span>
          <select
            name="type"
            value={type}
            onChange={(e) => {
              const nextType = e.target.value as Draft["type"];
              setType(nextType);
              if (nextType === "law" && announceChannelId === "852198106627047474") {
                setAnnounceChannelId("1490456420444016871"); // #the-parliament
              }
            }}
            className="input"
          >
            {(Object.keys(types) as Draft["type"][]).map((k) => (
              <option key={k} value={k}>
                {fmt(types[k], { n: "N" })}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="label flex items-center gap-1.5">
            <Hash className="size-4 text-secondary" />
            Discord Announcement Channel
          </span>
          <select
            name="announceChannelId"
            value={announceChannelId}
            onChange={(e) => setAnnounceChannelId(e.target.value)}
            className="input"
          >
            <option value="">Default Webhook (DISCORD_WEBHOOK_URL)</option>
            {DISCORD_VOTE_CHANNELS.map((ch) => (
              <option key={ch.id} value={ch.id}>
                {ch.name} — {ch.category}
              </option>
            ))}
          </select>
          {activeChan && <span className="mt-1 block text-xs text-muted">{activeChan.description}</span>}
        </label>
      </div>

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

      <div className="rounded-xl border border-border bg-bg-alt/40 p-4 space-y-4">
        <div>
          <span className="label flex items-center gap-1.5">
            <Shield className="size-4 text-secondary" />
            Quick Constitutional Role Presets (Who Can Vote)
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {ROLE_ACCESS_PRESETS.map((preset) => {
              const isSelected =
                preset.roleIds.length === selectedRoles.length &&
                preset.roleIds.every((id) => selectedRoles.includes(id));
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedRoles([...preset.roleIds])}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                    isSelected
                      ? "border-secondary bg-secondary text-white shadow-xs"
                      : "border-border bg-surface text-heading hover:border-secondary/60"
                  }`}
                  title={preset.description}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        <fieldset>
          <legend className="label">{f.roles}</legend>
          <div className="flex flex-wrap gap-2">
            {roles.map((r) => {
              const checked = selectedRoles.includes(r.id);
              return (
                <label
                  key={r.id}
                  className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
                    checked ? "border-secondary bg-secondary/10 font-semibold text-heading" : "border-border bg-surface"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="roles"
                    value={r.id}
                    checked={checked}
                    onChange={() => toggleRole(r.id)}
                    className="accent-secondary"
                  />
                  {r.name}
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <label className="block rounded-xl border border-border bg-bg-alt/40 p-4">
        <span className="label flex items-center gap-1.5">
          <Eye className="size-4 text-secondary" />
          Website Results Visibility (Who Can See the Results &amp; Graphs)
        </span>
        <select
          name="resultsVisibility"
          value={resultsVisibility}
          onChange={(e) => setResultsVisibility(e.target.value as ResultsVisibility)}
          className="input mt-1"
        >
          {RESULTS_VISIBILITY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="mt-1.5 block text-xs text-muted">{activeVis.description}</span>
      </label>

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
            <input name="vetoHours" type="number" min={0} max={720} defaultValue={draft?.vetoHours ?? 48} className="input" />
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
