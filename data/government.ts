// Current office holders. Names are as people chose them; roles and duties are translation keys in messages/*.json (politics.roles / politics.duties).
import type { Dictionary } from "@/lib/i18n";

type Role = keyof Dictionary["politics"]["roles"];
type Duty = keyof Dictionary["politics"]["duties"];

export const government: { role: Role; name: string; duty: Duty }[] = [
  { role: "prime_minister", name: "Prime Minister Levi (@deba15)", duty: "efficiency_internal" },
  { role: "deputy_pm", name: "Deputy PM & Speaker Azurkapro (@azurkapro)", duty: "defense" },
  { role: "minister", name: "H.R.H. Damian Ramirez-Casterwill (@unfortunatelydamian)", duty: "education_health_welfare" },
  { role: "minister", name: "Minister Levi444 (@levi444x)", duty: "culture" },
  { role: "minister", name: "Minister Szórádi (@szoradi)", duty: "finance_justice_infra" },
  { role: "minister", name: "Minister Riccsuka (@riccsuka.)", duty: "foreign" },
  { role: "minister", name: "Minister Lőrinczi Domokos (@lorinczidomokos3.0.)", duty: "communication" },
  { role: "minister", name: "Minister Marcesz (@szigetihu)", duty: "media" },
];

export const senate: { role: Role; name: string }[] = [
  { role: "senator", name: "Speaker Azurkapro (@azurkapro)" },
  {
    role: "deputy_senator",
    name: "Levi, Azurkapro, Levi444, Szabika, Riccsuka, Marcesz, Szórádi, Lőrinczi Domokos, Miss hatter",
  },
  {
    role: "observer_internal",
    name: "Dr. Attikasp, Happy Kiba, ZenithSX_, Xen Mikhail, Taiyo das Reichspiel, Felix Krovavsky",
  },
  {
    role: "observer_foreign",
    name: "H.R.H. Damian Ramirez-Casterwill, Szórádi, Levi444, ZenithSX_, Xen Mikhail",
  },
  {
    role: "observer_minecraft",
    name: "Égerliget: Azurkapro · Dzsungelfalva: Damian Ramirez-Casterwill · Olympic & Poseidon Islands: MeteorBarni · Értilos: XVDX",
  },
];
