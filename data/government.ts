// Current office holders. Names are as people chose them; roles and duties are translation keys in messages/*.json (politics.roles / politics.duties).
import type { Dictionary } from "@/lib/i18n";

type Role = keyof Dictionary["politics"]["roles"];
type Duty = keyof Dictionary["politics"]["duties"];

export const government: { role: Role; name: string; duty: Duty }[] = [
  { role: "prime_minister", name: "Honorary Baron & PM XVDX", duty: "efficiency_internal" },
  { role: "deputy_pm", name: "DPM.I. Hafiz Yahaya A.E.K, D.E.A", duty: "finance_justice_infra" },
  { role: "deputy_pm", name: "Deputy PM Seneca (from May 7)", duty: "defense" },
  { role: "minister", name: "H.R.H. Prince Rupitu", duty: "education_health_welfare" },
  { role: "minister", name: "Marquess Dunaújvárosi Dexter", duty: "foreign" },
  { role: "minister", name: "Minister Opra Melinda", duty: "culture" },
  { role: "minister", name: "pchugs_1 (banned on July 15)/@unknown-user (July 15-28)", duty: "communication" },
];

export const senate: { role: Role; name: string }[] = [
  { role: "senator", name: "Marquess & Senator Edgeworth" },
  { role: "deputy_senator", name: "Acél Elvtárs (left on June 9)/@『🔴』Deputy Senator Yesko (from June 9)" },
  { role: "observer_internal", name: "Marquess & Senator Edgeworth" },
  { role: "observer_foreign", name: "Metal Crusader" },
  { role: "observer_minecraft", name: "Observer Proud Hungarian" },
  { role: "observer_constitutional", name: "Acél Elvtárs (left on June 9)/@『🔴』Deputy Senator Yesko (from June 9)" },
  { role: "observer_recruitment", name: "Observer Aljoot Lichtensvon" },
];
