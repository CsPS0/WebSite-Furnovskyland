"use client";

import { useState } from "react";
import { Megaphone, Plus, Trash2, X } from "lucide-react";
import { createCampaign, deleteCampaign } from "@/app/actions/parliament";
import type { Campaign } from "@/db/schema";

const COLOR_OPTIONS = [
  { label: "Alliance for Furnovskyland / SDP (Crimson Red)", value: "#d60000" },
  { label: "United Conservative / CCP (Royal Blue)", value: "#2563eb" },
  { label: "United Furnovskyland / Monarchist (Orange)", value: "#ea580c" },
  { label: "Integral Nationalist Party (Emerald Green)", value: "#15803d" },
  { label: "Independent / Other (Slate)", value: "#64748b" },
];

export function CampaignsSection({
  campaigns,
  canPublish,
  canDeleteAll,
  currentUserId,
}: {
  campaigns: Campaign[];
  canPublish: boolean;
  canDeleteAll: boolean;
  currentUserId?: string | null;
}) {
  const elections = Array.from(new Set(campaigns.map((c) => c.electionTitle)));
  const [selectedElection, setSelectedElection] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  const visible =
    selectedElection === "all"
      ? campaigns
      : campaigns.filter((c) => c.electionTitle === selectedElection);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedElection("all")}
            className={`rounded-md border px-3.5 py-1.5 text-xs font-semibold transition ${
              selectedElection === "all"
                ? "border-secondary bg-secondary/15 text-heading"
                : "border-border bg-surface text-muted hover:border-secondary/40 hover:text-heading"
            }`}
          >
            All Campaigns ({campaigns.length})
          </button>
          {elections.map((el) => (
            <button
              key={el}
              type="button"
              onClick={() => setSelectedElection(el)}
              className={`rounded-md border px-3.5 py-1.5 text-xs font-semibold transition ${
                selectedElection === el
                  ? "border-secondary bg-secondary/15 text-heading"
                  : "border-border bg-surface text-muted hover:border-secondary/40 hover:text-heading"
              }`}
            >
              {el}
            </button>
          ))}
        </div>

        {canPublish && (
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="btn-primary px-4 py-2 text-xs"
          >
            <Plus className="size-4" />
            {showForm ? "Cancel" : "Publish Campaign Poster / Manifesto"}
          </button>
        )}
      </div>

      {canPublish && showForm && (
        <form
          action={async (fd) => {
            await createCampaign(fd);
            setShowForm(false);
          }}
          className="card space-y-4 border-secondary/40 bg-bg-alt/60"
        >
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Megaphone className="size-5 text-secondary" />
            <h3 className="text-lg font-bold text-heading">Publish Official Election Campaign</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="label">Election Cycle</span>
              <input
                name="electionTitle"
                required
                defaultValue={elections[0] ?? "Parliamentary Election"}
                placeholder="e.g. December 2026 Parliamentary Election"
                className="input"
              />
            </label>
            <label className="block">
              <span className="label">Party or Coalition</span>
              <input
                name="party"
                required
                placeholder="e.g. Alliance for Furnovskyland (AfF)"
                className="input"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="label">Campaign Headline / Slogan</span>
              <input
                name="title"
                required
                maxLength={180}
                placeholder="e.g. Forward with Stability, Constitutional Order, and Active Governance"
                className="input"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="label">Manifesto / Campaign Statement</span>
              <textarea
                name="body"
                rows={4}
                required
                placeholder="Outline your coalition's platform, legislative priorities, or municipal development plan..."
                className="input"
              />
            </label>
            <label className="block">
              <span className="label">Poster Image URL (optional)</span>
              <input
                name="imageUrl"
                placeholder="https://... or /campaigns/..."
                className="input"
              />
            </label>
            <label className="block">
              <span className="label">Party Accent Color</span>
              <select name="color" defaultValue="#d60000" className="input">
                {COLOR_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit" className="btn-primary text-sm">
            Publish Campaign
          </button>
        </form>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((c) => {
          const canDelete = canDeleteAll || (currentUserId && c.authorId === currentUserId);
          return (
            <article key={c.id} className="card flex flex-col justify-between overflow-hidden p-0 sm:p-0">
              <div className="h-1.5 w-full" style={{ backgroundColor: c.color }} />
              {c.imageUrl && (
                <button
                  type="button"
                  onClick={() => setLightboxImage({ url: c.imageUrl!, title: c.title })}
                  className="group relative block max-h-72 w-full overflow-hidden border-b border-border bg-bg-alt text-left"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.imageUrl}
                    alt={c.title}
                    className="h-64 w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                  />
                  <span className="absolute right-3 bottom-3 rounded bg-black/75 px-2.5 py-1 text-[11px] font-semibold text-white">
                    View Full Poster
                  </span>
                </button>
              )}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase" style={{ color: c.color }}>
                      <span className="size-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                      {c.party}
                    </span>
                    <span className="text-xs text-muted">{c.electionTitle}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-heading">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-text whitespace-pre-line">{c.body}</p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted">
                  <span>
                    Published by <strong className="text-heading">{c.authorName}</strong>
                  </span>
                  {canDelete && (
                    <form action={deleteCampaign}>
                      <input type="hidden" name="id" value={c.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1 text-red-600 hover:underline dark:text-red-400"
                      >
                        <Trash2 className="size-3.5" /> Remove
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-auto rounded-lg border border-border bg-surface p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between gap-4 px-2 py-1">
              <p className="font-serif text-base font-bold text-heading">{lightboxImage.title}</p>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="rounded p-1 text-muted hover:bg-bg-alt hover:text-heading"
              >
                <X className="size-5" />
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              className="mx-auto max-h-[80vh] w-auto rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}
