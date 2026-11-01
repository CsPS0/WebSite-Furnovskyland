import type { Election, ElectionStatus } from "@/db/schema";
import type { Dictionary } from "@/lib/i18n";

const STYLES: Record<ElectionStatus, string> = {
  draft: "bg-border text-text",
  scheduled: "bg-accent/20 text-heading",
  open: "bg-emerald-600 text-white",
  closed: "bg-primary/15 text-heading",
  veto_window: "bg-accent text-primary-dark",
  final: "bg-primary text-white",
  vetoed: "bg-secondary text-white",
  cancelled: "bg-border text-muted line-through",
};

export function StatusBadge({ status, labels }: { status: ElectionStatus; labels: Dictionary["admin"]["status"] }) {
  return <span className={`badge shrink-0 self-start sm:self-auto ${STYLES[status]}`}>{labels[status]}</span>;
}

export function typeLabel(e: Pick<Election, "type">, t: Dictionary["vote"]) {
  return t.types[e.type];
}

/** Option labels as shown to people; law votes store fixed keys that get translated. */
export function optionLabel(e: Pick<Election, "type">, label: string, t: Dictionary["vote"]) {
  return e.type === "law" && (label === "yes" || label === "no" || label === "abstain") ? t[label] : label;
}
