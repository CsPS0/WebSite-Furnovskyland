import { eq } from "drizzle-orm";
import * as schema from "./schema";
import type { TallyResult } from "@/lib/tally";

type HistoricalLawVote = {
  kind: "law";
  title: string;
  description: string;
  opensAt: string;
  closesAt: string;
  majority?: "simple" | "two_thirds";
  status?: "final" | "vetoed";
  yes: number;
  no: number;
  abstain?: number;
  outcome?: "passed" | "failed" | "quorum_failed";
};

type HistoricalPluralityVote = {
  kind: "plurality";
  type?: "single" | "multi";
  maxPicks?: number;
  title: string;
  description: string;
  opensAt: string;
  closesAt: string;
  total: number;
  outcome?: "decided" | "tie";
  options: { label: string; votes: number; winner?: boolean; tied?: boolean }[];
};

type HistoricalVote = HistoricalLawVote | HistoricalPluralityVote;

const EMPEROR_ID = "548177745465704468";
const EMPEROR_NAME = "Furnovsky I";

export const HISTORICAL_VOTES: HistoricalVote[] = [
  {
    kind: "plurality",
    type: "single",
    title: "October–November 2026 Parliamentary Election (III. Federal Parliament)",
    description:
      "First unicameral 15-seat National Assembly election held under the October 24, 2026 Constitution using the D'Hondt proportional representation method (47 ballots cast). Alliance for Furnovskyland (AfF) won 9 seats (61.7%, 29 votes) and formed the XIV. Federal Government under Prime Minister Levi; the United Conservative Coalition (CCP–United Furnovskyland) won 6 seats (38.3%, 18 votes).",
    opensAt: "2026-10-31T09:35:00Z",
    closesAt: "2026-11-01T19:00:00Z",
    total: 47,
    options: [
      { label: "Alliance for Furnovskyland (AfF — Prime Minister Levi) · 9 seats", votes: 29, winner: true },
      { label: "United Conservative Coalition (CCP–UF — Dr. Attikasp) · 6 seats", votes: 18 },
    ],
  },
  {
    kind: "law",
    title: "Public Referendum on the 2026 Constitution of Furnovskyland",
    description:
      "Citizen referendum in #citizen-polls on the new Constitution of Furnovskyland establishing a unicameral 15-seat Parliament elected every two months by D'Hondt proportional representation. Passed by both Parliament and Senate and signed into law by Emperor Furnovsky I on October 23, 2026 (effective October 24, 2026).",
    opensAt: "2026-10-22T18:21:00Z",
    closesAt: "2026-10-23T18:13:00Z",
    majority: "two_thirds",
    yes: 15,
    no: 2,
    abstain: 0,
  },
  {
    kind: "plurality",
    type: "single",
    title: "September 2026 Olympic and Poseidon Islands Special Municipal Election",
    description:
      "Second-edition special municipal election for Mayor of the Olympic and Poseidon Islands following the resignation of Mayor Lost Knight (16 ballots cast). MeteorBarni won with 68.8% of the vote.",
    opensAt: "2026-09-20T08:34:00Z",
    closesAt: "2026-09-20T18:00:00Z",
    total: 16,
    options: [
      { label: "MeteorBarni", votes: 11, winner: true },
      { label: "Faember4", votes: 5 },
    ],
  },
  {
    kind: "law",
    title: "Referendum on Establishing the Administrative Government Bureau",
    description:
      "Citizen referendum in #citizen-polls on establishing a unified Government Bureau (#government-bureau) to administer political party, company, and news agency registrations in one place.",
    opensAt: "2026-09-19T17:55:00Z",
    closesAt: "2026-09-20T17:55:00Z",
    majority: "simple",
    yes: 14,
    no: 3,
    abstain: 0,
  },
  {
    kind: "law",
    title: "First Constitutional Amendment of September 2026 (Article 37 Eligibility Reform)",
    description:
      "Bicameral constitutional amendment passed by both the Imperial Parliament and XVI. Federal Senate and presented to Emperor Furnovsky I for Sanctio Regia on September 13, 2026, revising Article 37 eligibility rules for Members of Parliament and the Senate.",
    opensAt: "2026-09-11T12:00:00Z",
    closesAt: "2026-09-13T20:24:00Z",
    majority: "two_thirds",
    yes: 12,
    no: 1,
    abstain: 2,
  },
  {
    kind: "plurality",
    type: "single",
    title: "September 2026 Dzsungelfalva Municipal Election",
    description:
      "Municipal election for Mayor of Dzsungelfalva (Jungle Village). Former Prime Minister H.R.H. Damian Ramirez-Casterwill (SDP) defeated Faember4 with 66.7% of the vote (24 ballots cast).",
    opensAt: "2026-09-05T08:02:00Z",
    closesAt: "2026-09-06T18:00:00Z",
    total: 24,
    options: [
      { label: "H.R.H. Damian Ramirez-Casterwill (Social Democratic Party)", votes: 16, winner: true },
      { label: "Faember4 (Independent)", votes: 8 },
    ],
  },
  {
    kind: "law",
    title: "September 2026 Égerliget Mayoral Confidence Vote (Azurkapro)",
    description:
      "Municipal vote of confidence for Deputy Prime Minister and Speaker Azurkapro to succeed Damian Ramirez as Mayor of Égerliget (95.8% approval, 24 ballots cast).",
    opensAt: "2026-09-05T08:02:00Z",
    closesAt: "2026-09-06T18:00:00Z",
    majority: "simple",
    yes: 23,
    no: 1,
    abstain: 0,
  },
  {
    kind: "plurality",
    type: "single",
    title: "August 2026 Parliamentary Election (II. Federal Parliament)",
    description:
      "Proportional representation election for the 10-seat II. Federal Parliament (record 57 ballots cast). The governing We Continue The Change! coalition (AfF–SDP, led by Prime Minister Levi) won 6 seats (63.2%, 36 votes) and formed the XIII. Federal Government; the right-wing United Coalition (CCP–INP–RFMP, led by Dr. Attikasp) won 4 seats (36.8%, 21 votes).",
    opensAt: "2026-08-29T08:00:00Z",
    closesAt: "2026-08-30T18:00:00Z",
    total: 57,
    options: [
      { label: "We Continue The Change! (AfF–SDP — Prime Minister Levi) · 6 seats", votes: 36, winner: true },
      { label: "United Coalition (CCP–INP–RFMP — Dr. Attikasp) · 4 seats", votes: 21 },
    ],
  },
  {
    kind: "plurality",
    type: "single",
    title: "August 2026 Senatorial Election (XVI. Federal Senate)",
    description:
      "Proportional representation election for the 5-seat XVI. Federal Senate (57 ballots cast). We Continue The Change! (AfF–SDP, led by Senate President Koffie) won 3 seats (66.7%, 38 votes); the United Coalition (CCP–INP–RFMP, led by Happy Kiba) won 2 seats (33.3%, 19 votes).",
    opensAt: "2026-08-29T08:00:00Z",
    closesAt: "2026-08-30T18:00:00Z",
    total: 57,
    options: [
      { label: "We Continue The Change! (AfF–SDP — Koffie) · 3 seats", votes: 38, winner: true },
      { label: "United Coalition (CCP–INP–RFMP — Happy Kiba) · 2 seats", votes: 19 },
    ],
  },
  {
    kind: "law",
    title: "Referendum on Shortening Parliamentary Terms for Higher Activity",
    description:
      "Citizen referendum in #citizen-polls on holding more frequent Parliamentary Elections instead of 6-month terms to boost political participation (78.9% in favour).",
    opensAt: "2026-08-05T18:56:00Z",
    closesAt: "2026-08-06T18:56:00Z",
    majority: "simple",
    yes: 15,
    no: 4,
    abstain: 0,
  },
  {
    kind: "law",
    title: "July 2026 Égerliget Mayoral Confidence Vote (Damian Ramirez)",
    description:
      "Municipal vote of confidence in #elections confirming H.R.H. Damian Ramirez-Casterwill (Social Democratic Party) as Mayor of Égerliget with 82.4% approval (17 ballots cast).",
    opensAt: "2026-07-26T08:03:00Z",
    closesAt: "2026-07-26T18:00:00Z",
    majority: "simple",
    yes: 14,
    no: 3,
    abstain: 0,
  },
  {
    kind: "law",
    title: "July 2026 Dzsungelfalva Mayoral Confidence Vote (Patriots for Furnovskyland)",
    description:
      "Municipal vote of confidence in #elections for Mayor of Dzsungelfalva, narrowly approved with 52.9% in favour (9 yes, 8 no).",
    opensAt: "2026-07-26T08:03:00Z",
    closesAt: "2026-07-26T18:00:00Z",
    majority: "simple",
    yes: 9,
    no: 8,
    abstain: 0,
  },
  {
    kind: "law",
    title: "May 2026 Dzsungelfalva Mayoral Confidence Vote (Szabika — AfF)",
    description:
      "Municipal vote of confidence in #elections electing Szabika (Alliance for Furnovskyland) as Mayor of Dzsungelfalva with 81.25% approval (16 ballots cast).",
    opensAt: "2026-05-30T08:03:00Z",
    closesAt: "2026-05-31T18:00:00Z",
    majority: "simple",
    yes: 13,
    no: 3,
    abstain: 0,
  },
  {
    kind: "law",
    title: "May 2026 Égerliget Mayoral Confidence Vote (Alliance for Furnovskyland)",
    description:
      "Municipal vote of confidence in #elections for the Alliance for Furnovskyland mayoral candidate in Égerliget, approved with 75.0% in favour (16 ballots cast).",
    opensAt: "2026-05-30T08:03:00Z",
    closesAt: "2026-05-31T18:00:00Z",
    majority: "simple",
    yes: 12,
    no: 4,
    abstain: 0,
  },
  {
    kind: "law",
    title: "XV. Federal Senate Confirmation of the XII. Federal Government Cabinet",
    description:
      "Confirmation vote in #senate-announcements on Prime Minister Levi's coalition cabinet (AfF–FSP–SDP–UFLP) for the XII. Federal Government, approved by the XV. Federal Senate with 3 ayes and 2 abstentions.",
    opensAt: "2026-04-18T12:00:00Z",
    closesAt: "2026-04-19T12:53:00Z",
    majority: "simple",
    yes: 3,
    no: 0,
    abstain: 2,
  },
  {
    kind: "plurality",
    type: "single",
    title: "April 2026 Parliamentary Election (I. Federal Parliament)",
    description:
      "First election for the 10-seat I. Federal Parliament under the March 2026 Temporary Constitution (44 ballots cast). AfF–FSP (Levi) won 4 seats (38.6%, 17 votes) and formed a 7-seat grand coalition with SDP–Liberal Party (Damian Ramirez, 3 seats, 34.1%, 15 votes); the National Coalition (Jobbik–CCP, Dr. Attikasp) won 3 seats (27.3%, 12 votes).",
    opensAt: "2026-04-04T08:09:00Z",
    closesAt: "2026-04-05T18:00:00Z",
    total: 44,
    options: [
      { label: "AfF–FSP Coalition (Levi) · 4 seats", votes: 17, winner: true },
      { label: "SDP–Liberal Party Coalition (Damian Ramirez) · 3 seats", votes: 15 },
      { label: "National Coalition (Jobbik–CCP — Dr. Attikasp) · 3 seats", votes: 12 },
    ],
  },
  {
    kind: "plurality",
    type: "single",
    title: "April 2026 Senatorial Election (XV. Federal Senate)",
    description:
      "Single Transferable Vote election for the 5-seat XV. Federal Senate (44 ballots cast). AfF–FSP won 2 seats (19 first-preference votes), SDP–Liberal Party won 2 seats (13 first-preference votes; Koffie elected President of the Senate with second-choice transfers), and the National Coalition won 1 seat (12 votes).",
    opensAt: "2026-04-04T08:09:00Z",
    closesAt: "2026-04-05T18:00:00Z",
    total: 44,
    options: [
      { label: "AfF–FSP Delegation (Metal Crusader) · 2 seats", votes: 19, winner: true },
      { label: "SDP–Liberal Party Delegation (Koffie — Elected Senate President) · 2 seats", votes: 13, winner: true },
      { label: "National Coalition Delegation (XVDX) · 1 seat", votes: 12 },
    ],
  },
  {
    kind: "law",
    title: "Census Referendum on the March 2026 Temporary Constitution",
    description:
      "Citizen census referendum in #citizen-polls approving the Second (Temporary) Constitutional Draft, which established the bicameral I. Federal Parliament alongside a reformed 5-member Federal Senate (78.6% approval).",
    opensAt: "2026-03-15T22:49:00Z",
    closesAt: "2026-03-19T14:00:00Z",
    majority: "two_thirds",
    yes: 11,
    no: 3,
    abstain: 0,
  },
  {
    kind: "plurality",
    type: "single",
    title: "January 2026 Olympic and Poseidon Islands Mayoral Election (Runoff)",
    description:
      "Second-round runoff election for Mayor of the Olympic and Poseidon Islands after the first round ended in a 12–12 tie (21 ballots cast). Lost Knight (Christian-Conservative Party) defeated Damian Ramirez (Social Democratic Party) with 57.1% of the vote.",
    opensAt: "2026-01-25T09:39:00Z",
    closesAt: "2026-01-26T19:00:00Z",
    total: 21,
    options: [
      { label: "Lost Knight (Christian-Conservative Party)", votes: 12, winner: true },
      { label: "H.R.H. Damian Ramirez-Casterwill (Social Democratic Party)", votes: 9 },
    ],
  },
  {
    kind: "law",
    title: "January 2026 Égerliget Mayoral Confidence Vote (Miss Hatter — Liberal Party)",
    description:
      "Second-round municipal confidence vote in #elections electing former Senator Miss Hatter (Unified Furnovskylandic Liberal Party) as the first Mayor of Égerliget with 81.0% approval (21 ballots cast).",
    opensAt: "2026-01-25T09:39:00Z",
    closesAt: "2026-01-26T19:00:00Z",
    majority: "simple",
    yes: 17,
    no: 4,
    abstain: 0,
  },
  {
    kind: "plurality",
    type: "single",
    title: "January 2026 Értilos First Municipal Election",
    description:
      "Inaugural municipal election for Mayor of Értilos (24 ballots cast). Former Prime Minister XVDX / Dr. Attikasp (Christian-Conservative Party) defeated former Prime Minister Hunor with 54.2% of the vote.",
    opensAt: "2026-01-17T09:00:00Z",
    closesAt: "2026-01-18T19:00:00Z",
    total: 24,
    options: [
      { label: "Dr. Attikasp / XVDX (Christian-Conservative Party)", votes: 13, winner: true },
      { label: "Hunor (Democratic Alliance)", votes: 11 },
    ],
  },
  {
    kind: "plurality",
    type: "single",
    title: "January 2026 Olympic and Poseidon Islands Mayoral Election (1st Round Tie)",
    description:
      "First-round municipal election for Mayor of the Olympic and Poseidon Islands (24 ballots cast). Ended in an exact 12–12 tie (50.0%–50.0%) between Lost Knight (CCP) and Damian Ramirez (SDP), triggering the January 25 runoff.",
    opensAt: "2026-01-17T09:00:00Z",
    closesAt: "2026-01-18T19:00:00Z",
    total: 24,
    outcome: "tie",
    options: [
      { label: "Lost Knight (Christian-Conservative Party)", votes: 12, tied: true },
      { label: "H.R.H. Damian Ramirez-Casterwill (Social Democratic Party)", votes: 12, tied: true },
    ],
  },
  {
    kind: "law",
    title: "January 2026 Dzsungelfalva Inaugural Mayoral Confidence Vote (Kriszi)",
    description:
      "Inaugural municipal confidence vote in #elections electing Deputy Prime Minister Kriszi as the first Mayor of Dzsungelfalva with 66.7% approval (24 ballots cast).",
    opensAt: "2026-01-17T09:00:00Z",
    closesAt: "2026-01-18T19:00:00Z",
    majority: "simple",
    yes: 16,
    no: 8,
    abstain: 0,
  },
  {
    kind: "plurality",
    type: "single",
    title: "November 2025 Senatorial Election (XIV. Federal Senate)",
    description:
      "Single Transferable Vote election for the 5-seat XIV. Federal Senate (30 ballots cast). Democratic Alliance won 2 seats (9 first-preference votes), Christian-Conservative Party won 1 seat (7 votes), Integral Nationalist Party won 1 seat (7 votes), and Progressive Party won 1 seat (5 votes; Miss Hatter was subsequently elected Senator 3–2).",
    opensAt: "2025-11-22T09:02:00Z",
    closesAt: "2025-11-23T20:00:00Z",
    total: 30,
    options: [
      { label: "Democratic Alliance (Kriszi) · 2 seats", votes: 9, winner: true },
      { label: "Christian-Conservative Party (XVDX) · 1 seat", votes: 7 },
      { label: "Integral Nationalist Party (Proud Hungarian) · 1 seat", votes: 7 },
      { label: "Furnovskylandic Progressive Party (Miss Hatter — Elected Senator) · 1 seat", votes: 5, winner: true },
      { label: "Furnovskylandic Republican Party (Levi)", votes: 2 },
    ],
  },
  {
    kind: "plurality",
    type: "single",
    title: "August 2025 Senatorial Election (XIII. Federal Senate)",
    description:
      "Single Transferable Vote election for the 5-seat XIII. Federal Senate (29 ballots cast). Incumbent Senator Edgeworth (Democratic Alliance / FSP) won 3 seats and re-election as Senator (16 first-choice / 17 final votes); Sellout / Guacamole (FPP) won 1 seat (7 first-choice / 12 final votes); UnitedForTheRight (INP) won 1 seat (6 votes).",
    opensAt: "2025-08-23T08:16:00Z",
    closesAt: "2025-08-24T18:00:00Z",
    total: 29,
    options: [
      { label: "Edgeworth (Democratic Alliance / FSP — Re-elected Senator) · 3 seats", votes: 16, winner: true },
      { label: "Sellout / Guacamole (Progressive Party) · 1 seat", votes: 7 },
      { label: "UnitedForTheRight (Integral Nationalist Party) · 1 seat", votes: 6 },
    ],
  },
  {
    kind: "plurality",
    type: "single",
    title: "August 2025 Prime Ministerial Election (XI. Federal Government)",
    description:
      "General election for Prime Minister of the XI. Federal Government (34 ballots cast). Hunor (Democratic Alliance – United for Furnovskyland: SPF–FSP–FCDP–UFLP–FDMP) won a two-thirds supermajority with 23 votes (67.6%) over Seneca (UnitedForTheRight) with 11 votes (32.4%).",
    opensAt: "2025-08-16T08:04:00Z",
    closesAt: "2025-08-17T18:00:00Z",
    total: 34,
    options: [
      { label: "Hunor (Democratic Alliance — United for Furnovskyland)", votes: 23, winner: true },
      { label: "Seneca (UnitedForTheRight Coalition)", votes: 11 },
    ],
  },
  {
    kind: "plurality",
    type: "single",
    title: "May 2025 Senatorial Election (XII. Federal Senate)",
    description:
      "Single Transferable Vote election for the 5-seat XII. Federal Senate (29 ballots cast). Edgeworth (Furnovskylandic Socialist Party) won 2 seats and was elected Senator with 15 final-round votes against 14 for Prime Minister XVDX (RFMP, 2 seats); Unified Liberal Party won 1 seat (7 first-preference votes).",
    opensAt: "2025-05-24T08:19:00Z",
    closesAt: "2025-05-25T18:00:00Z",
    total: 29,
    options: [
      { label: "Edgeworth (Furnovskylandic Socialist Party — Elected Senator) · 2 seats", votes: 8, winner: true },
      { label: "XVDX (Rupiturome's Furnovskylandic Monarchist Party) · 2 seats", votes: 7 },
      { label: "Unified Furnovskylandic Liberal Party · 1 seat", votes: 7 },
      { label: "Independent Candidate", votes: 5 },
      { label: "Furnovskylandic Christiandemocratic Party", votes: 2 },
    ],
  },
  {
    kind: "plurality",
    type: "single",
    title: "April 2025 Prime Ministerial Snap Election (X. Federal Government)",
    description:
      "Snap election for Prime Minister called after the April 17, 2025 citizen referendum (37 ballots cast). XVDX (UnitedForTheRight — INP–RFMP–FCP) won a two-thirds supermajority with 25 votes (67.6%) against Radikális Változás with 12 votes (32.4%).",
    opensAt: "2025-04-26T08:01:00Z",
    closesAt: "2025-04-27T18:00:00Z",
    total: 37,
    options: [
      { label: "XVDX (UnitedForTheRight — INP–RFMP–FCP)", votes: 25, winner: true },
      { label: "Radikális Változás (Radical Change)", votes: 12 },
    ],
  },
  {
    kind: "law",
    title: "Referendum on Calling the April 2025 Snap Prime Ministerial Election",
    description:
      "Citizen referendum in #citizen-polls on calling an early snap election for the remaining 4.5 months of the IX. Federal Government term (64.7% in favour, 17 ballots cast).",
    opensAt: "2025-04-17T17:50:00Z",
    closesAt: "2025-04-20T18:00:00Z",
    majority: "simple",
    yes: 11,
    no: 6,
    abstain: 0,
  },
  {
    kind: "plurality",
    type: "single",
    title: "February 2025 Senatorial Election (XI. Federal Senate)",
    description:
      "Single Transferable Vote election for the 5-seat XI. Federal Senate (29 ballots cast). Incumbent Senator CsPS (Independent) won 2 seats and re-election as Senator (7 first-choice / 16 final votes), XVDX (INP) won 2 seats (6 first-choice / 13 final votes), and Ondro (SDP) won 1 seat (9 votes).",
    opensAt: "2025-02-22T09:01:00Z",
    closesAt: "2025-02-23T20:00:00Z",
    total: 29,
    options: [
      { label: "CsPS (Independent — Re-elected Senator) · 2 seats", votes: 7, winner: true },
      { label: "Ondro (Social Democratic Party) · 1 seat", votes: 9 },
      { label: "XVDX (Integral Nationalist Party) · 2 seats", votes: 6 },
      { label: "Shamrock (Integral Nationalist Party)", votes: 3 },
      { label: "Edgeworth (Sloboda Progress Party)", votes: 3 },
      { label: "Sellout (Furnovskylandic Progressive Party)", votes: 1 },
    ],
  },
  {
    kind: "plurality",
    type: "single",
    title: "February 2025 Prime Ministerial Election (IX. Federal Government)",
    description:
      "General election for Prime Minister of the IX. Federal Government (27 ballots cast). Incumbent Prime Minister H.R.H. Damian Ramirez-Casterwill (Social Democratic Party) won a second consecutive term with 12 votes (44.4%), followed by Gejka (FHTP, 8 votes, 29.6%) and the Christiandemocratic Party candidate (7 votes, 25.9%).",
    opensAt: "2025-02-15T09:00:00Z",
    closesAt: "2025-02-16T19:00:00Z",
    total: 27,
    options: [
      { label: "H.R.H. Damian Ramirez-Casterwill (Social Democratic Party)", votes: 12, winner: true },
      { label: "Gejka (Furnovskylandic Hungarian Technocratic Party)", votes: 8 },
      { label: "Furnovskylandic Christiandemocratic Party Candidate", votes: 7 },
    ],
  },
  {
    kind: "plurality",
    type: "single",
    title: "November 2024 Senatorial Election (X. Federal Senate)",
    description:
      "Single Transferable Vote election for the X. Federal Senate (27 ballots cast). Independent candidate CsPS won the Senatorial runoff with 14 final-round votes against 13 for XVDX (Sloboda Progress Party); Sellout (Progressive Party) placed third.",
    opensAt: "2024-11-23T10:11:00Z",
    closesAt: "2024-11-24T19:00:00Z",
    total: 27,
    options: [
      { label: "CsPS (Independent — Elected Senator, 14 final STV votes)", votes: 7, winner: true },
      { label: "XVDX (Sloboda Progress Party — 13 final STV votes)", votes: 8 },
      { label: "Sellout (Furnovskylandic Progressive Party)", votes: 5 },
      { label: "Integral Nationalist Party Candidate", votes: 4 },
      { label: "Furnovskylandic Christiandemocratic Party Candidate", votes: 3 },
    ],
  },
  {
    kind: "plurality",
    type: "single",
    title: "August 2024 Prime Ministerial Election (VIII. Federal Government)",
    description:
      "General election for Prime Minister of the VIII. Federal Government (37 ballots cast), decided by a single vote. H.R.H. Damian Ramirez-Casterwill (Centre-Left Alliance: SDP–UFLP–FDMP–FPP) won with 14 votes (37.8%), ahead of Ghost (13 votes, 35.1%) and XVDX (10 votes, 27.0%).",
    opensAt: "2024-08-17T08:02:00Z",
    closesAt: "2024-08-18T18:00:00Z",
    total: 37,
    options: [
      { label: "H.R.H. Damian Ramirez-Casterwill (Centre-Left Alliance)", votes: 14, winner: true },
      { label: "Ghost (Right-Wing Coalition)", votes: 13 },
      { label: "XVDX (Independent / Sloboda)", votes: 10 },
    ],
  },
  {
    kind: "plurality",
    type: "single",
    title: "June 2024 Referendum on Creating the Independent Representative Role",
    description:
      "Citizen referendum in #citizen-polls on creating an elected Independent Representative role allowing one independent candidate every 6 months to contest Prime Ministerial elections (16 ballots cast).",
    opensAt: "2024-06-21T18:42:00Z",
    closesAt: "2024-06-28T18:50:00Z",
    total: 16,
    options: [
      { label: 'Yes — named "Independent Representative"', votes: 10, winner: true },
      { label: 'Yes — named "Représentant Indépendant"', votes: 5 },
      { label: "No — do not create the role", votes: 1 },
    ],
  },
  {
    kind: "plurality",
    type: "single",
    title: "May 2024 Senatorial Election (VIII. Federal Senate)",
    description:
      "Single Transferable Vote election for the VIII. Federal Senate (20 ballots cast). Incumbent Senator John Albertson (Social Democratic Party) won re-election with 9 final-round votes ahead of EricWilson (Independent, 7 final votes) and XVDX (FDMP, 4 votes).",
    opensAt: "2024-05-25T08:08:00Z",
    closesAt: "2024-05-26T18:00:00Z",
    total: 20,
    options: [
      { label: "John Albertson (Social Democratic Party — Re-elected Senator)", votes: 9, winner: true },
      { label: "EricWilson (Independent — Deputy Senator)", votes: 7 },
      { label: "XVDX (Furnovskylandic Democratic Moderatist Party)", votes: 4 },
    ],
  },
  {
    kind: "plurality",
    type: "single",
    title: "February 2024 Senatorial Election (VII. Federal Senate)",
    description:
      "Single Transferable Vote election for the VII. Federal Senate (27 ballots cast). John Albertson (Social Democratic Party) won an outright majority in the first round with 14 votes (51.9%); Selloutcreative (FPP) won Deputy Senator on second-preference transfers.",
    opensAt: "2024-02-24T09:04:00Z",
    closesAt: "2024-02-25T19:00:00Z",
    total: 27,
    options: [
      { label: "John Albertson (Social Democratic Party — Elected Senator)", votes: 14, winner: true },
      { label: "Selloutcreative (Furnovskylandic Progressive Party — Deputy Senator)", votes: 5 },
      { label: "XVDX (Independent)", votes: 5 },
      { label: "Other Candidates", votes: 3 },
    ],
  },
  {
    kind: "law",
    title: "February 2024 Referendum on Senatorial Appointment of Deputies",
    description:
      "Citizen referendum in #citizen-polls deciding that future elected Senators shall have the right to choose their own Deputies in the Federal Senate (approved 10–4).",
    opensAt: "2024-02-17T08:00:00Z",
    closesAt: "2024-02-19T07:50:00Z",
    majority: "simple",
    yes: 10,
    no: 4,
    abstain: 0,
  },
  {
    kind: "plurality",
    type: "single",
    title: "February 2024 Prime Ministerial Election (VII. Federal Government)",
    description:
      "General election for Prime Minister of the VII. Federal Government (33 ballots cast). Softing (Social Democratic Party) defeated Gejka (Furnovskylandic Hungarian Technocratic Party) by a single vote (16 to 15, 48.5% to 45.5%).",
    opensAt: "2024-02-17T09:00:00Z",
    closesAt: "2024-02-18T19:00:00Z",
    total: 33,
    options: [
      { label: "Softing (Social Democratic Party)", votes: 16, winner: true },
      { label: "Gejka (Furnovskylandic Hungarian Technocratic Party)", votes: 15 },
      { label: "Furnovskylandic Christiandemocratic Party Candidate", votes: 2 },
    ],
  },
  {
    kind: "plurality",
    type: "single",
    title: "November 2023 Senatorial Election (VI. Federal Senate)",
    description:
      "Election for the VI. Federal Senate (30 ballots cast). Hafiz bin Najmuldin (Integral Nationalist Party) was elected Senator with 14 votes (46.7%), followed by John Albertson (Social Democratic Party, 10 votes, 33.3%) and XVDX (Independent, 6 votes, 20.0%).",
    opensAt: "2023-11-25T10:00:00Z",
    closesAt: "2023-11-26T19:00:00Z",
    total: 30,
    options: [
      { label: "Hafiz bin Najmuldin (Integral Nationalist Party — Elected Senator)", votes: 14, winner: true },
      { label: "John Albertson (Social Democratic Party)", votes: 10 },
      { label: "XVDX (Independent)", votes: 6 },
    ],
  },
  {
    kind: "plurality",
    type: "single",
    title: "August 2023 Prime Ministerial Election (VI. Federal Government)",
    description:
      "General election for Prime Minister of the VI. Federal Government (33 ballots cast). Incumbent Prime Minister Migaspin Casterwill (Social Democratic Party) won re-election with 15 votes (45.5%), ahead of Shogenki (Integral Nationalist Party, 13 votes, 39.4%) and Rolen Degytriev (Democratic Degytriist Party, 5 votes, 15.2%).",
    opensAt: "2023-08-18T03:31:00Z",
    closesAt: "2023-08-20T20:00:00Z",
    total: 33,
    options: [
      { label: "Migaspin Casterwill (Social Democratic Party)", votes: 15, winner: true },
      { label: "Shogenki (Integral Nationalist Party)", votes: 13 },
      { label: "Rolen Degytriev (Democratic Degytriist Party)", votes: 5 },
    ],
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function seedHistoricalVotes(db: any) {
  const existingRows: { title: string }[] = await db
    .select({ title: schema.elections.title })
    .from(schema.elections);
  const existingTitles = new Set(existingRows.map((r) => r.title));

  const missing = HISTORICAL_VOTES.filter((v) => !existingTitles.has(v.title));
  if (missing.length === 0) return 0;

  await db
    .insert(schema.users)
    .values({ id: EMPEROR_ID, name: EMPEROR_NAME })
    .onConflictDoNothing();

  for (const vote of missing) {
    const opensAt = new Date(vote.opensAt);
    const closesAt = new Date(vote.closesAt);

    if (vote.kind === "law") {
      const abstain = vote.abstain ?? 0;
      const total = vote.yes + vote.no + abstain;
      const result: TallyResult = {
        kind: "law",
        total,
        counts: { yes: vote.yes, no: vote.no, abstain },
        outcome: vote.outcome ?? (vote.yes > vote.no ? "passed" : "failed"),
      };

      const [inserted] = await db
        .insert(schema.elections)
        .values({
          title: vote.title,
          description: vote.description,
          type: "law",
          maxPicks: 1,
          majority: vote.majority ?? "simple",
          eligibleRoleIds: [],
          opensAt,
          closesAt,
          status: vote.status ?? "final",
          result,
          announcedOpenAt: closesAt,
          announcedResultAt: closesAt,
          announcedFinalAt: closesAt,
          createdBy: EMPEROR_ID,
          createdAt: opensAt,
        })
        .returning({ id: schema.elections.id });

      await db.insert(schema.options).values([
        { electionId: inserted.id, label: "yes", position: 0 },
        { electionId: inserted.id, label: "no", position: 1 },
        { electionId: inserted.id, label: "abstain", position: 2 },
      ]);
    } else {
      const [inserted] = await db
        .insert(schema.elections)
        .values({
          title: vote.title,
          description: vote.description,
          type: vote.type ?? "single",
          maxPicks: vote.maxPicks ?? 1,
          majority: "simple",
          eligibleRoleIds: [],
          opensAt,
          closesAt,
          status: "final",
          result: null,
          announcedOpenAt: closesAt,
          announcedResultAt: closesAt,
          announcedFinalAt: closesAt,
          createdBy: EMPEROR_ID,
          createdAt: opensAt,
        })
        .returning({ id: schema.elections.id });

      const insertedOptions: { id: number; position: number }[] = await db
        .insert(schema.options)
        .values(
          vote.options.map((o, position) => ({
            electionId: inserted.id,
            label: o.label,
            position,
          })),
        )
        .returning({ id: schema.options.id, position: schema.options.position });

      insertedOptions.sort((a, b) => a.position - b.position);

      const counts = insertedOptions.map((opt, idx) => ({
        optionId: opt.id,
        votes: vote.options[idx].votes,
      }));
      const winners = insertedOptions
        .filter((_, idx) => vote.options[idx].winner)
        .map((opt) => opt.id);
      const tied = insertedOptions
        .filter((_, idx) => vote.options[idx].tied)
        .map((opt) => opt.id);

      const result: TallyResult = {
        kind: "plurality",
        total: vote.total,
        counts,
        winners,
        tied,
        outcome: vote.outcome ?? (tied.length > 0 ? "tie" : "decided"),
      };

      await db
        .update(schema.elections)
        .set({ result })
        .where(eq(schema.elections.id, inserted.id));
    }
  }

  return missing.length;
}
