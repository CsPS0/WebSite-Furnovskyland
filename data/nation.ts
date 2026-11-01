import type { Locale } from "@/lib/i18n-config";

export const DISCORD_LINKS = {
  invite: "https://discord.gg/UjcUnNhNfk",
  verification: "https://discord.com/channels/836271168977764363/879265701746053160",
  border: "https://discord.com/channels/836271168977764363/836276918658662430",
  channel1: "https://discord.com/channels/836271168977764363/836271169553432610",
  ministryAnnouncements: "https://discord.com/channels/836271168977764363/1434952634938167337",
  federalGazette: "https://discord.com/channels/836271168977764363/1563296282712481963",
  parliamentDiscussions: "https://discord.com/channels/836271168977764363/1504157290016538634",
  submitLaw: "https://discord.com/channels/836271168977764363/1022531564808196176",
  registerParty: "https://discord.com/channels/836271168977764363/1044286833384759317",
  partyInfo: "https://discord.com/channels/836271168977764363/1044286407113400331",
  electionRegistration: "https://discord.com/channels/836271168977764363/1137647581913170031",
  campaigns: "https://discord.com/channels/836271168977764363/851496091521384448",
  elections: "https://discord.com/channels/836271168977764363/852198106627047474",
  roleplayInfo: "https://discord.com/channels/836271168977764363/1439559280410755223",
  rpCharacterMaker: "https://discord.com/channels/836271168977764363/1446201616217935922",
  egerliget: "https://discord.com/channels/836271168977764363/1461042290742136975",
  dzsungelfalva: "https://discord.com/channels/836271168977764363/1461044268599607461",
  olympicIslands: "https://discord.com/channels/836271168977764363/1461045703529730259",
  companies: "https://discord.com/channels/836271168977764363/1439559492412113009",
  createCompany: "https://discord.com/channels/836271168977764363/1456680316122038434",
  workersHall: "https://discord.com/channels/836271168977764363/1353024644608692276",
  newsAgencies: "https://discord.com/channels/836271168977764363/1439559593800765490",
  createNewsAgency: "https://discord.com/channels/836271168977764363/1456681138142580870",
  embassies: "https://discord.com/channels/836271168977764363/1250085185354039407",
  leagueOfServers: "https://discord.com/channels/836271168977764363/1486729744098525204",
  militaryApplication: "https://discord.com/channels/836271168977764363/1428430431887302867",
  minecraftChat: "https://discord.com/channels/836271168977764363/1344365224253050920",
} as const;

export interface PoliticalParty {
  abbr: string;
  name: string;
  leader: string;
  ideology: string;
  motto?: string;
  founded: string;
  seats?: string;
  highlight?: "government" | "opposition";
}

export const politicalParties: Record<Locale, PoliticalParty[]> = {
  en: [
    {
      abbr: "AfF",
      name: "Alliance for Furnovskyland",
      leader: "Prime Minister Levi (@deba15)",
      ideology: "Big-tent left, social democracy & reformist republicanism",
      motto: "United We Can!",
      founded: "2025-11-30",
      seats: "9 / 15 MPs (61.7% — Governing Majority)",
      highlight: "government",
    },
    {
      abbr: "CCP–UF",
      name: "Christian-Conservative Party (United Conservative Coalition)",
      leader: "Dr. Attikasp (@attikasp)",
      ideology: "Christian democracy, national conservatism & traditionalism",
      motto: "Defend the traditions to defend the nation!",
      founded: "2025-11-04",
      seats: "6 / 15 MPs (38.3% — Parliamentary Opposition)",
      highlight: "opposition",
    },
    {
      abbr: "Jobbik–NKF",
      name: "Jobbik — National Christian Forum",
      leader: "National Christian Forum Board",
      ideology: "National conservatism & green conservatism",
      motto: "Courage, Determination, Expertise",
      founded: "2026-04-03",
    },
    {
      abbr: "FSP",
      name: "Furnovskylandic Socialist Party",
      leader: "Edgeworth",
      ideology: "Democratic socialism & labor representation",
      motto: "Together with people!",
      founded: "2025-04-17",
    },
    {
      abbr: "SDP",
      name: "Social Democratic Party",
      leader: "H.R.H. Damian Ramirez-Casterwill",
      ideology: "Social democracy & progressivism (merged into AfF in Oct 2026)",
      motto: "Unitum a Populum",
      founded: "2022-11-22",
    },
    {
      abbr: "FDMP",
      name: "Furnovskylandic Democratic Moderatist Party",
      leader: "Rolen Degytriev",
      ideology: "Degytriism & Revolutionary Moderatism",
      motto: "We stand together, as brothers!",
      founded: "2022-11-22",
    },
    {
      abbr: "RFMP",
      name: "Rupiturome's Furnovskylandic Monarchist Party",
      leader: "Felix Krovavsky",
      ideology: "Constitutional & traditional monarchism",
      founded: "2020-11-09",
    },
    {
      abbr: "INP",
      name: "Integral Nationalist Party",
      leader: "Nationalist Council",
      ideology: "Integral nationalism & traditionalism",
      founded: "2020-11-09",
    },
    {
      abbr: "UFLP",
      name: "Unified Furnovskylandic Liberal Party",
      leader: "Crown Prince Daniel of Furn-Hauptstadt",
      ideology: "Classical liberalism & constitutionalism",
      founded: "2019-11-09",
    },
  ],
  hu: [
    {
      abbr: "AfF",
      name: "Szövetség Furnovskyföldért (Alliance for Furnovskyland)",
      leader: "Levi miniszterelnök (@deba15)",
      ideology: "Baloldali gyűjtőpárt, szociáldemokrácia és reformer republikanizmus",
      motto: "United We Can!",
      founded: "2025-11-30",
      seats: "9 / 15 mandátum (61,7% — Kormánytöbbség)",
      highlight: "government",
    },
    {
      abbr: "CCP–UF",
      name: "Keresztény-Konzervatív Párt (Egyesült Konzervatív Koalíció)",
      leader: "Dr. Attikasp (@attikasp)",
      ideology: "Kereszténydemokrácia, nemzeti konzervativizmus és tradicionalizmus",
      motto: "Defend the traditions to defend the nation!",
      founded: "2025-11-04",
      seats: "6 / 15 mandátum (38,3% — Parlamenti ellenzék)",
      highlight: "opposition",
    },
    {
      abbr: "Jobbik–NKF",
      name: "Jobbik — Nemzeti Keresztény Fórum",
      leader: "Nemzeti Keresztény Fórum Elnöksége",
      ideology: "Nemzeti konzervativizmus és zöld konzervativizmus",
      motto: "Bátorság, Elszántság, Szakértelem",
      founded: "2026-04-03",
    },
    {
      abbr: "FSP",
      name: "Furnovskyföldi Szocialista Párt",
      leader: "Edgeworth",
      ideology: "Demokratikus szocializmus és munkásképviselet",
      motto: "Together with people!",
      founded: "2025-04-17",
    },
    {
      abbr: "SDP",
      name: "Szociáldemokrata Párt (Social Democratic Party)",
      leader: "H.R.H. Damian Ramirez-Casterwill",
      ideology: "Szociáldemokrácia és progresszivizmus (2026 októberében egyesült az AfF-fel)",
      motto: "Unitum a Populum",
      founded: "2022-11-22",
    },
    {
      abbr: "FDMP",
      name: "Furnovskyföldi Demokratikus Moderatista Párt",
      leader: "Rolen Degytriev",
      ideology: "Degytriizmus és forradalmi moderatizmus",
      motto: "We stand together, as brothers!",
      founded: "2022-11-22",
    },
    {
      abbr: "RFMP",
      name: "Rupiturome Furnovskyföldi Monarchista Pártja",
      leader: "Felix Krovavsky",
      ideology: "Alkotmányos és tradicionális monarchizmus",
      founded: "2020-11-09",
    },
    {
      abbr: "INP",
      name: "Integrista Nacionalista Párt",
      leader: "Nemzeti Tanács",
      ideology: "Integrista nacionalizmus és tradicionalizmus",
      founded: "2020-11-09",
    },
    {
      abbr: "UFLP",
      name: "Egyesült Furnovskyföldi Liberális Párt",
      leader: "Dániel Koronaherceg (Furn-Hauptstadt)",
      ideology: "Klasszikus liberalizmus és alkotmányosság",
      founded: "2019-11-09",
    },
  ],
  de: [
    {
      abbr: "AfF",
      name: "Allianz für Furnovskyland (Alliance for Furnovskyland)",
      leader: "Premierminister Levi (@deba15)",
      ideology: "Linkes Bündnis, Sozialdemokratie & reformorientierter Republikanismus",
      motto: "United We Can!",
      founded: "2025-11-30",
      seats: "9 / 15 Sitze (61,7% — Regierungsmehrheit)",
      highlight: "government",
    },
    {
      abbr: "CCP–UF",
      name: "Christlich-Konservative Partei (Vereinigte Konservative Koalition)",
      leader: "Dr. Attikasp (@attikasp)",
      ideology: "Christdemokratie, Nationalkonservatismus & Traditionalismus",
      motto: "Defend the traditions to defend the nation!",
      founded: "2025-11-04",
      seats: "6 / 15 Sitze (38,3% — Parlamentarische Opposition)",
      highlight: "opposition",
    },
    {
      abbr: "Jobbik–NKF",
      name: "Jobbik — Nationales Christliches Forum",
      leader: "Vorstand des Nationalen Christlichen Forums",
      ideology: "Nationalkonservatismus & grüner Konservatismus",
      motto: "Mut, Entschlossenheit, Fachwissen",
      founded: "2026-04-03",
    },
    {
      abbr: "FSP",
      name: "Sozialistische Partei Furnovskylands",
      leader: "Edgeworth",
      ideology: "Demokratischer Sozialismus & Arbeitnehmervertretung",
      motto: "Together with people!",
      founded: "2025-04-17",
    },
    {
      abbr: "SDP",
      name: "Sozialdemokratische Partei (Social Democratic Party)",
      leader: "H.R.H. Damian Ramirez-Casterwill",
      ideology: "Sozialdemokratie & Progressivismus (Okt. 2026 in die AfF eingegliedert)",
      motto: "Unitum a Populum",
      founded: "2022-11-22",
    },
    {
      abbr: "FDMP",
      name: "Demokratisch-Moderatistische Partei Furnovskylands",
      leader: "Rolen Degytriev",
      ideology: "Degytriismus & Revolutionärer Moderatismus",
      motto: "We stand together, as brothers!",
      founded: "2022-11-22",
    },
    {
      abbr: "RFMP",
      name: "Rupituromes Monarchistische Partei Furnovskylands",
      leader: "Felix Krovavsky",
      ideology: "Konstitutioneller & traditioneller Monarchismus",
      founded: "2020-11-09",
    },
    {
      abbr: "INP",
      name: "Integrale Nationalistische Partei",
      leader: "Nationalrat",
      ideology: "Integraler Nationalismus & Traditionalismus",
      founded: "2020-11-09",
    },
    {
      abbr: "UFLP",
      name: "Vereinigte Liberale Partei Furnovskylands",
      leader: "Kronprinz Daniel von Furn-Hauptstadt",
      ideology: "Klassischer Liberalismus & Konstitutionalismus",
      founded: "2019-11-09",
    },
  ],
  sk: [
    {
      abbr: "AfF",
      name: "Aliancia pre Furnovskyland (Alliance for Furnovskyland)",
      leader: "Predseda vlády Levi (@deba15)",
      ideology: "Široká ľavica, sociálna demokracia a reformný republikanizmus",
      motto: "United We Can!",
      founded: "2025-11-30",
      seats: "9 / 15 mandátov (61,7% — Vládna väčšina)",
      highlight: "government",
    },
    {
      abbr: "CCP–UF",
      name: "Kresťansko-konzervatívna strana (Zjednotená konzervatívna koalícia)",
      leader: "Dr. Attikasp (@attikasp)",
      ideology: "Kresťanská demokracia, národný konzervativizmus a tradicionalizmus",
      motto: "Defend the traditions to defend the nation!",
      founded: "2025-11-04",
      seats: "6 / 15 mandátov (38,3% — Parlamentná opozícia)",
      highlight: "opposition",
    },
    {
      abbr: "Jobbik–NKF",
      name: "Jobbik — Národné kresťanské fórum",
      leader: "Predsedníctvo Národného kresťanského fóra",
      ideology: "Národný konzervativizmus a zelený konzervativizmus",
      motto: "Odvaha, Odhodlanie, Odbornosť",
      founded: "2026-04-03",
    },
    {
      abbr: "FSP",
      name: "Furnovskylandská socialistická strana",
      leader: "Edgeworth",
      ideology: "Demokratický socializmus a zastúpenie pracujúcich",
      motto: "Together with people!",
      founded: "2025-04-17",
    },
    {
      abbr: "SDP",
      name: "Sociálnodemokratická strana (Social Democratic Party)",
      leader: "H.R.H. Damian Ramirez-Casterwill",
      ideology: "Sociálna demokracia a progresivizmus (v okt. 2026 zlúčená do AfF)",
      motto: "Unitum a Populum",
      founded: "2022-11-22",
    },
    {
      abbr: "FDMP",
      name: "Furnovskylandská demokratická moderatistická strana",
      leader: "Rolen Degytriev",
      ideology: "Degytriizmus a revolučný moderatizmus",
      motto: "We stand together, as brothers!",
      founded: "2022-11-22",
    },
    {
      abbr: "RFMP",
      name: "Rupituromova furnovskylandská monarchistická strana",
      leader: "Felix Krovavsky",
      ideology: "Konštitučný a tradičný monarchizmus",
      founded: "2020-11-09",
    },
    {
      abbr: "INP",
      name: "Integrálna nacionalistická strana",
      leader: "Národná rada",
      ideology: "Integrálny nacionalizmus a tradicionalizmus",
      founded: "2020-11-09",
    },
    {
      abbr: "UFLP",
      name: "Zjednotená furnovskylandská liberálna strana",
      leader: "Korunný princ Daniel z Furn-Hauptstadtu",
      ideology: "Klasický liberalizmus a konštitucionalizmus",
      founded: "2019-11-09",
    },
  ],
};

export interface NationPortalCopy {
  chancelleryBadge: string;
  factSheetTitle: string;
  factSheetSubtitle: string;
  facts: { label: string; value: string; detail: string }[];
  whyJoinTitle: string;
  whyJoinSubtitle: string;
  whyJoinCards: {
    badge: string;
    title: string;
    description: string;
    primaryLink: { label: string; href: string };
    secondaryLink: { label: string; href: string };
  }[];
  portalTitle: string;
  portalSubtitle: string;
  portalCards: { title: string; desc: string; href: string; cta: string }[];
  politicsExtras: {
    parliamentCompositionTitle: string;
    parliamentCompositionDesc: string;
    govSeatsLabel: string;
    oppSeatsLabel: string;
    partiesTitle: string;
    partiesSubtitle: string;
    partyLeader: string;
    partyIdeology: string;
    partyFounded: string;
    actionLinksTitle: string;
    actionLinksSubtitle: string;
    links: { label: string; desc: string; href: string }[];
  };
  historyExtras: {
    heraldryShowcaseTitle: string;
    flagCaption: string;
    flagDetails: string;
    coatCaption: string;
    coatDetails: string;
  };
  minecraftExtras: {
    settlementsTitle: string;
    settlementsSubtitle: string;
    mayorLabel: string;
    settlements: {
      name: string;
      mayor: string;
      desc: string;
      channelHref?: string;
      channelLabel?: string;
    }[];
    infraTitle: string;
    infraSubtitle: string;
    infraItems: { title: string; date: string; desc: string }[];
    rpBannerTitle: string;
    rpBannerDesc: string;
    rpInfoBtn: string;
    rpMakerBtn: string;
  };
  cultureExtras: {
    constitutionalTitle: string;
    constitutionalSubtitle: string;
    nationalHolidays: { date: string; name: string; desc: string }[];
    institutionsTitle: string;
    institutionsSubtitle: string;
    institutions: { title: string; badge: string; desc: string; href: string; cta: string }[];
  };
  otherExtras: {
    directoryTitle: string;
    directorySubtitle: string;
    categories: {
      title: string;
      channels: { name: string; desc: string; href: string }[];
    }[];
  };
}

export const nationPortal: Record<Locale, NationPortalCopy> = {
  en: {
    chancelleryBadge: "Imperial Chancellery · Constitutional State Portal",
    factSheetTitle: "National Fact Sheet of the Commonwealth",
    factSheetSubtitle: "Key constitutional, territorial, and institutional indicators under the Fundamental Law of October 24, 2026",
    facts: [
      { label: "Official State Name", value: "Empire of Furnovskyland's Commonwealth", detail: "Founded Oct 31, 2018 · Commonwealth since Apr 15, 2021" },
      { label: "Constitutional Order", value: "Democratic Parliamentary Monarchy", detail: "Constitution in force since Oct 24, 2026" },
      { label: "Head of State", value: "H.M. Emperor Furnovsky I", detail: "Commander-in-Chief & Chair of the Server Council" },
      { label: "Head of Government", value: "Prime Minister Levi (@deba15)", detail: "XIII. Federal Government (AfF Majority)" },
      { label: "Legislature", value: "15-Seat National Assembly", detail: "Unicameral · D'Hondt Proportional · Speaker Azurkapro" },
      { label: "Judiciary", value: "Supreme Court of the Commonwealth", detail: "Chief Justice Mig (@migaspincasterwill)" },
      { label: "Capital & Territory", value: "Furn-Hauptstadt · 546,861 km²", detail: "36 Districts across 4 Commonwealth Territories" },
      { label: "Population & Currency", value: "54.1M (RP) · 250+ Discord Citizens", detail: "Furn-Brule (Fß) · Central Bank of Furnovskyland" },
      { label: "Official Languages", value: "Hungarian, English, Slovak, German", detail: "Protected under Article H of the Constitution" },
      { label: "International Status", value: "League of Servers (LoS) Member State", detail: "Article D Constitutional Membership · 11+ Embassies" },
    ],
    whyJoinTitle: "Why Join Furnovskyland? — Politics, Roleplay & State Life",
    whyJoinSubtitle: "Whether you want to draft laws in Parliament, govern a Minecraft municipality, run a corporation, or publish an independent newspaper, every institution is open to citizens.",
    whyJoinCards: [
      {
        badge: "Parliament & Parties",
        title: "Run for the 15-Seat National Assembly",
        description: "Every 4 months, citizens elect the 15-member National Assembly via D'Hondt proportional party lists. Found your own political party with just 2 citizens, submit bills, debate in bi-weekly Friday sittings, and form the Federal Government.",
        primaryLink: { label: "Register a Party", href: DISCORD_LINKS.registerParty },
        secondaryLink: { label: "Submit a Bill", href: DISCORD_LINKS.submitLaw },
      },
      {
        badge: "Roleplay & Municipalities",
        title: "Create Your Character & Govern a Settlement",
        description: "Design your citizen persona in the RP Character Maker, settle in Égerliget, Dzsungelfalva, the Olympic & Poseidon Islands, or Értilos, and run for Mayor in municipal elections held every 5 months with a seat on the Server Council.",
        primaryLink: { label: "Roleplay Forum", href: DISCORD_LINKS.roleplayInfo },
        secondaryLink: { label: "RP Character Maker", href: DISCORD_LINKS.rpCharacterMaker },
      },
      {
        badge: "Central Bank & Economy",
        title: "Trade in Furn-Brule (Fß) & Launch Corporations",
        description: "Participate in the Ora Economy regulated by the Central Bank of Furnovskyland (CBF). Incorporate private enterprises alongside Metronon Company, Migaspin Inc., Crystal Corporation, and Hafiz & Partners Inc., or join the Work Department.",
        primaryLink: { label: "Companies Registry", href: DISCORD_LINKS.companies },
        secondaryLink: { label: "Create a Company", href: DISCORD_LINKS.createCompany },
      },
      {
        badge: "Free Press & Media",
        title: "Establish an Independent News Agency",
        description: "Protected by Article VII of the 2026 Constitution, our independent press corps — including FNBC, Vox News, and CCP News — investigates government policy, hosts election debates, and chronicles national life.",
        primaryLink: { label: "News Agencies", href: DISCORD_LINKS.newsAgencies },
        secondaryLink: { label: "Launch an Outlet", href: DISCORD_LINKS.createNewsAgency },
      },
      {
        badge: "Diplomacy & Defence",
        title: "Foreign Service & Furnovskyland Defence Force",
        description: "Represent the Empire as a diplomat to 11+ partner states and the League of Servers (LoS), or enlist in the Furnovskyland Defence Force (FDF) responsible for border screening and national defense.",
        primaryLink: { label: "Foreign Embassies", href: DISCORD_LINKS.embassies },
        secondaryLink: { label: "Enlist in the FDF", href: DISCORD_LINKS.militaryApplication },
      },
      {
        badge: "Minecraft 1.21.11",
        title: "Build Cities, Metro Lines & Railways",
        description: "Connect to ujfurnvaros.aternos.me on Java or Bedrock Edition. Drive cars and fly aircraft with MTVehicles, ride the FM-01, FM-03, and FM-04 underground metro lines, and construct monumental civic architecture.",
        primaryLink: { label: "Minecraft Portal", href: "/minecraft/" },
        secondaryLink: { label: "Server Bridge Chat", href: DISCORD_LINKS.minecraftChat },
      },
    ],
    portalTitle: "State Chancellery & Information Directories",
    portalSubtitle: "Explore the constitutional institutions, historical archives, legal codex, and electoral system of the Commonwealth",
    portalCards: [
      { title: "Politics & Government", desc: "XIII. Federal Government, 15-seat National Assembly, Supreme Court, and registered political parties.", href: "/politika/", cta: "Open Chancellery" },
      { title: "History & Heraldry", desc: "Chronicle of the Empire from the October 31, 2018 Coronation to the 2026 Constitutional Era.", href: "/tortenelem/", cta: "Read Chronicle" },
      { title: "Legal Archive & Maps", desc: "Promulgated constitutions, acts, royal decrees, downloadable district maps, and Discord directory.", href: "/egyeb/", cta: "Browse Archive" },
      { title: "Elections & Law Votes", desc: "Cast your secret Discord-authenticated ballot in parliamentary elections, referendums, and law votes.", href: "/szavazas/", cta: "Open Ballot Box" },
    ],
    politicsExtras: {
      parliamentCompositionTitle: "2026 National Assembly Seat Distribution (15 Seats)",
      parliamentCompositionDesc: "Elected on November 1, 2026 under the D'Hondt proportional representation system (47 valid ballots cast).",
      govSeatsLabel: "Alliance for Furnovskyland (AfF) — 9 Seats (61.7%)",
      oppSeatsLabel: "United Conservative Coalition (CCP–UF) — 6 Seats (38.3%)",
      partiesTitle: "Registered Political Parties of the Commonwealth",
      partiesSubtitle: "Active electoral coalitions and historical political parties registered in the parliamentary archive",
      partyLeader: "Leadership:",
      partyIdeology: "Ideology:",
      partyFounded: "Founded:",
      actionLinksTitle: "Participate in Parliamentary & Civic Life",
      actionLinksSubtitle: "Direct links to the official legislative, electoral, and diplomatic channels on the Furnovskyland Discord server",
      links: [
        { label: "Submit a Bill (#submit-a-law)", desc: "Propose an ordinary law, cardinal law, or constitutional amendment to the National Assembly.", href: DISCORD_LINKS.submitLaw },
        { label: "Parliamentary Debates (#parliament-discussions)", desc: "Follow public sessions held every second Friday at 20:00 UTC and ongoing committee debates.", href: DISCORD_LINKS.parliamentDiscussions },
        { label: "Register a Political Party (#register-your-party)", desc: "Found a new political party with a name, ideology, motto, and at least 2 citizen members.", href: DISCORD_LINKS.registerParty },
        { label: "Election Registration (#election-registration)", desc: "Register party lists for National Assembly elections or stand for Mayor in your settlement.", href: DISCORD_LINKS.electionRegistration },
        { label: "The Federal Gazette (#federal-gazette)", desc: "Official promulgation of acts signed via Sanctio Regia, imperial decrees, and court rulings.", href: DISCORD_LINKS.federalGazette },
        { label: "Embassies & League of Servers (#league-of-servers)", desc: "Diplomatic missions, bilateral treaties, and League of Servers (LoS) inter-server affairs.", href: DISCORD_LINKS.leagueOfServers },
      ],
    },
    historyExtras: {
      heraldryShowcaseTitle: "State Symbols of the Empire of Furnovskyland's Commonwealth",
      flagCaption: "National Flag of Furnovskyland (Adopted 2018, Standardized 2019)",
      flagDetails: "Three horizontal stripes of red, white, and green charged with a central golden-yellow solar disc symbolizing unity and sovereignty.",
      coatCaption: "Imperial Coat of Arms — The Imperial Banner (Adopted April 15, 2021)",
      coatDetails: "Quartered shield featuring the Red Raven, Silver Ship, Silver Angel, and Red-Cowled Friar, with a purple heart-shield bearing the golden lily and triple knot beneath the Royal Crown.",
    },
    minecraftExtras: {
      settlementsTitle: "Autonomous Settlements & Elected Mayors",
      settlementsSubtitle: "Under Articles 28–31 of the 2026 Constitution, each settlement elects its Mayor every 5 months and holds representation on the Server Council",
      mayorLabel: "Mayor:",
      settlements: [
        {
          name: "Égerliget",
          mayor: "Deputy PM & Speaker Azurkapro (@azurkapro)",
          desc: "Major residential and administrative municipality with direct metro connections and civic landmarks.",
          channelHref: DISCORD_LINKS.egerliget,
          channelLabel: "Égerliget Municipal Thread",
        },
        {
          name: "Dzsungelfalva (Jungle Village)",
          mayor: "H.R.H. Damian Ramirez-Casterwill",
          desc: "Historic jungle province served by the Belső-Dzsungel Railway Station and regional transport corridors.",
          channelHref: DISCORD_LINKS.dzsungelfalva,
          channelLabel: "Dzsungelfalva Municipal Thread",
        },
        {
          name: "Olympic and Poseidon Islands",
          mayor: "MeteorBarni",
          desc: "Maritime district and athletic complex built to host the Commonwealth Games and League of Servers events.",
          channelHref: DISCORD_LINKS.olympicIslands,
          channelLabel: "Olympic Islands Thread",
        },
        {
          name: "Értilos",
          mayor: "XVDX",
          desc: "Chartered autonomous settlement with traditional regional architecture and local council administration.",
        },
        {
          name: "Furn-Hauptstadt & Coastal City (ACCC)",
          mayor: "Imperial Capital Administration",
          desc: "Seat of the National Assembly, the Central Bank of Furnovskyland, St. Elizabeth's Catholic Church, and the Attila Krisztián Condominium Estates.",
        },
      ],
      infraTitle: "National Infrastructure & Economic Landmarks",
      infraSubtitle: "Major state and corporate construction works Regulated under the Regional Construction Act (2026)",
      infraItems: [
        {
          title: "Central Bank of Furnovskyland (CBF Headquarters)",
          date: "Inaugurated Dec 5, 2025",
          desc: "Neoclassical financial palace modeled after the National Bank of Romania in Bucharest and constructed by Hafiz and Partners Inc. Houses the central reserve for the Furn-Brule (Fß) currency.",
        },
        {
          title: "Furnovskyland Underground Metro (FM-01, FM-03, FM-04)",
          date: "Expanded 2025–2026",
          desc: "Rapid transit metro network linking St. Elizabeth's Catholic Church, Csillagkép Hill, and central Furn-Hauptstadt.",
        },
        {
          title: "Belső-Dzsungel Railway Station & National Rail",
          date: "Completed Jan 1, 2026",
          desc: "Inter-regional rail hub connecting Dzsungelfalva with the capital plateau and outlying settlements.",
        },
        {
          title: "Attila Krisztián Condominium Estates (ACCC) & MTVehicles",
          date: "Launched Feb 7, 2026",
          desc: "Modern residential development in Coastal City, complemented by server-wide MTVehicles roads, cars, and aviation.",
        },
      ],
      rpBannerTitle: "Start Your Roleplay Life & Municipal Career",
      rpBannerDesc: "Register your character in the Discord Roleplay forum to buy property, open a business in Furn-Brule (Fß), or run for Mayor.",
      rpInfoBtn: "Open #roleplay-informations",
      rpMakerBtn: "RP Character Maker",
    },
    cultureExtras: {
      constitutionalTitle: "Constitutional National Holidays (Article I)",
      constitutionalSubtitle: "The four supreme state holidays enshrined in Article I of the October 24, 2026 Constitution of Furnovskyland",
      nationalHolidays: [
        { date: "April 15", name: "National Federation Day", desc: "Commemorates the proclamation of the Empire of Furnovskyland's Commonwealth and the founding of the Discord server on April 15, 2021." },
        { date: "June 15", name: "Parliament Day", desc: "Celebrates parliamentary sovereignty, democratic elections, and the legislative heritage of the Commonwealth." },
        { date: "August 23", name: "Furnovsky I's Day", desc: "Official birthday celebration of His Majesty Emperor Furnovsky I, founder and Sovereign of the Nation." },
        { date: "October 31", name: "State Foundation Day & Halloween", desc: "Marks the historic Coronation of Emperor Furnovsky I at 15:00 CET on October 31, 2018 and the birth of Furnovskyland." },
      ],
      institutionsTitle: "Press, Sports & Cultural Institutions",
      institutionsSubtitle: "Active media outlets, sporting traditions, and civic organizations across the Commonwealth",
      institutions: [
        {
          title: "Independent Press Corps (FNBC, Vox News, CCP News)",
          badge: "Article VII Protected",
          desc: "Citizen-run newspapers and broadcasters covering parliamentary sittings, elections, investigative reports, and cultural events.",
          href: DISCORD_LINKS.newsAgencies,
          cta: "Read #news-agencies",
        },
        {
          title: "The Commonwealth Games & LoS Discord Olympics",
          badge: "Commonwealth Games Act 2026",
          desc: "Following the historic March 2024 LoS Discord Olympics hosted by Furnovskyland, the 2026 Commonwealth Games Act established regular inter-regional tournaments.",
          href: DISCORD_LINKS.olympicIslands,
          cta: "Visit Olympic Islands",
        },
        {
          title: "Corporate & Workers' Guilds",
          badge: "Work Department & Companies",
          desc: "Cultural and architectural patronage led by Metronon Company, Migaspin Inc., Crystal Corporation, Hafiz & Partners Inc., and the Committee of Workers.",
          href: DISCORD_LINKS.companies,
          cta: "Explore #companies",
        },
      ],
    },
    otherExtras: {
      directoryTitle: "Official Discord Channels & State Services Directory",
      directorySubtitle: "Direct deep-links to administrative offices, legislative chambers, border verification, and roleplay forums (Server ID: 836271168977764363)",
      categories: [
        {
          title: "Border Control & State Announcements",
          channels: [
            { name: "#verification-room", desc: "Border entry screening by the Furnovskyland Defence Force (within 72h under Article 39).", href: DISCORD_LINKS.verification },
            { name: "#channel-1", desc: "Imperial decrees, constitutional referendums, election results, and FUSCPS state alerts.", href: DISCORD_LINKS.channel1 },
            { name: "#ministry-announcements", desc: "Official communiqués of the Prime Minister, Ministries, and Sanctio Regia promulgations.", href: DISCORD_LINKS.ministryAnnouncements },
            { name: "#federal-gazette", desc: "Official legal gazette established under the Federal Gazette Act (July 2026).", href: DISCORD_LINKS.federalGazette },
          ],
        },
        {
          title: "National Assembly, Elections & Political Parties",
          channels: [
            { name: "#parliament-discussions", desc: "Public chamber of the 15-seat National Assembly (bi-weekly sittings & legislative debates).", href: DISCORD_LINKS.parliamentDiscussions },
            { name: "#submit-a-law", desc: "Legislative docket for submitting bills, cardinal laws, and motions.", href: DISCORD_LINKS.submitLaw },
            { name: "#register-your-party", desc: "Official registry for founding political parties and electoral coalitions.", href: DISCORD_LINKS.registerParty },
            { name: "#election-registration & #campaigns", desc: "Candidate filing and official 5-day election campaign forum.", href: DISCORD_LINKS.electionRegistration },
          ],
        },
        {
          title: "Roleplay, Municipalities, Economy & Press",
          channels: [
            { name: "#roleplay-informations", desc: "RP Character Maker and municipal threads for Égerliget, Dzsungelfalva, and Olympic Islands.", href: DISCORD_LINKS.roleplayInfo },
            { name: "#companies", desc: "Corporate registry (Metronon, Migaspin Inc., Crystal Corp., Hafiz & Partners) and company creation.", href: DISCORD_LINKS.companies },
            { name: "#news-agencies", desc: "Independent media outlets (FNBC, Vox News, CCP News) and press registration.", href: DISCORD_LINKS.newsAgencies },
            { name: "#workers-hall", desc: "Work Department and Committee of Workers public labor coordination.", href: DISCORD_LINKS.workersHall },
          ],
        },
      ],
    },
  },
  hu: {
    chancelleryBadge: "Birodalmi Kancellária · Alkotmányos Állami Portál",
    factSheetTitle: "A Nemzetközösség Hivatalos Állami Névjegye",
    factSheetSubtitle: "Alkotmányos, területi és intézményi alapadatok a 2026. október 24-i Alaptörvény alapján",
    facts: [
      { label: "Hivatalos Államnév", value: "Furnovskyföld Nemzetszövetségének Birodalma", detail: "Alapítva: 2018. okt. 31. · Nemzetszövetség: 2021. ápr. 15." },
      { label: "Államforma", value: "Demokratikus Parlamentáris Monarchia", detail: "Hatályos Alkotmány: 2026. október 24." },
      { label: "Államfő", value: "Őfelsége I. Furnovsky Császár", detail: "Főparancsnok és a Szerver Tanács elnöke" },
      { label: "Kormányfő", value: "Levi miniszterelnök (@deba15)", detail: "XIII. Szövetségi Kormány (AfF kormánytöbbség)" },
      { label: "Törvényhozás", value: "15 fős Egykamarás Országgyűlés", detail: "D'Hondt arányos listás rendszer · Házelnök: Azurkapro" },
      { label: "Igazságszolgáltatás", value: "A Nemzetszövetség Legfelsőbb Bírósága", detail: "Főbíró: Mig (@migaspincasterwill)" },
      { label: "Főváros és Terület", value: "Furn-Hauptstadt · 546 861 km²", detail: "36 kerület 4 nemzetszövetségi tartományban" },
      { label: "Népesség és Valuta", value: "54,1 millió (RP) · 250+ Discord-polgár", detail: "Furn-Brule (Fß) · Furnovskyföldi Központi Bank" },
      { label: "Hivatalos Nyelvek", value: "Magyar, angol, szlovák, német", detail: "Az Alkotmány H) cikke által védett államnyelvek" },
      { label: "Nemzetközi tagság", value: "Szerverek Ligája (LoS) tagállam", detail: "Alkotmány D) cikk · 11+ kétoldalú nagykövetség" },
    ],
    whyJoinTitle: "Miért érdemes csatlakozni? — Politika, Roleplay és Közélet",
    whyJoinSubtitle: "Legyen szó törvényalkotásról az Országgyűlésben, egy Minecraft-település polgármesteri vezetéséről, vállalatalapításról vagy szabad újságírásról, minden állami intézmény nyitva áll polgáraink előtt.",
    whyJoinCards: [
      {
        badge: "Országgyűlés és Pártok",
        title: "Indulj a 15 fős Országgyűlési Választásokon",
        description: "A polgárok 4 havonta D'Hondt-féle arányos pártlistás rendszerben választják meg a 15 tagú Országgyűlést. Alapíts saját pártot mindössze 2 polgárral, nyújts be törvényjavaslatokat, és vegyél részt a kéthetenkénti pénteki üléseken.",
        primaryLink: { label: "Pártalapítás", href: DISCORD_LINKS.registerParty },
        secondaryLink: { label: "Törvény benyújtása", href: DISCORD_LINKS.submitLaw },
      },
      {
        badge: "Roleplay és Önkormányzatok",
        title: "Hozd létre karakteredet és légy Polgármester",
        description: "Regisztráld karakteredet az RP Character Makerben, telepedj le Égerligeten, Dzsungelfalván, az Olimpiai és Poszeidón-szigeteken vagy Értiloson, és indulj az 5 havonta tartott polgármester-választásokon.",
        primaryLink: { label: "Roleplay Fórum", href: DISCORD_LINKS.roleplayInfo },
        secondaryLink: { label: "RP Karakterkészítő", href: DISCORD_LINKS.rpCharacterMaker },
      },
      {
        badge: "Központi Bank és Gazdaság",
        title: "Furn-Brule (Fß) Gazdaság és Vállalatalapítás",
        description: "Vegyél részt a Furnovskyföldi Központi Bank (CBF) által felügyelt Ora gazdaságban. Alapíts részvénytársaságot a Metronon Company, Migaspin Inc., Crystal Corporation és Hafiz & Partners Inc. mellett, vagy csatlakozz a Munkaügyi Osztályhoz.",
        primaryLink: { label: "Cégjegyzék", href: DISCORD_LINKS.companies },
        secondaryLink: { label: "Vállalat alapítása", href: DISCORD_LINKS.createCompany },
      },
      {
        badge: "Szabad Sajtó és Média",
        title: "Indíts Független Hírügynökséget",
        description: "A 2026-os Alkotmány VII. cikke garantálja a sajtószabadságot: az FNBC, a Vox News és a CCP News mellett saját szerkesztőséget alapíthatsz, tudósíthatsz a parlamenti vitákról és választásokról.",
        primaryLink: { label: "Hírügynökségek", href: DISCORD_LINKS.newsAgencies },
        secondaryLink: { label: "Újság alapítása", href: DISCORD_LINKS.createNewsAgency },
      },
      {
        badge: "Diplomácia és Honvédelem",
        title: "Külügyi Szolgálat és Védelmi Erők (FDF)",
        description: "Képviseld a Birodalmat nagykövetként 11+ partnerállamban és a Szerverek Ligájában (LoS), vagy csatlakozz a határőrizetért és nemzetbiztonságért felelős Furnovskyland Defence Force (FDF) kötelékéhez.",
        primaryLink: { label: "Nagykövetségek", href: DISCORD_LINKS.embassies },
        secondaryLink: { label: "FDF Jelentkezés", href: DISCORD_LINKS.militaryApplication },
      },
      {
        badge: "Minecraft 1.21.11",
        title: "Építs Városokat, Metróvonalakat és Vasutat",
        description: "Csatlakozz az ujfurnvaros.aternos.me szerverhez Java vagy Bedrock kiadásról. Vezess autókat és repülőket (MTVehicles), utazz az FM-01, FM-03 és FM-04 metróvonalakon, és építsd a Birodalom városait.",
        primaryLink: { label: "Minecraft Portál", href: "/minecraft/" },
        secondaryLink: { label: "Szerver Chat", href: DISCORD_LINKS.minecraftChat },
      },
    ],
    portalTitle: "Birodalmi Kancellária és Állami Nyilvántartások",
    portalSubtitle: "Fedezd fel a Nemzetszövetség alkotmányos intézményeit, történelmi krónikáját, törvénytárát és választási rendszerét",
    portalCards: [
      { title: "Politika és Kormányzat", desc: "XIII. Szövetségi Kormány, 15 fős Országgyűlés, Legfelsőbb Bíróság és bejegyzett politikai pártok.", href: "/politika/", cta: "Kancellária megnyitása" },
      { title: "Történelem és Heraldika", desc: "A Birodalom krónikája a 2018. október 31-i koronázástól a 2026-os alkotmányos korszakig.", href: "/tortenelem/", cta: "Krónika olvasása" },
      { title: "Törvénytár és Térképek", desc: "Hatályos alkotmányok, törvények, uralkodói rendeletek, letölthető kerületi térképek és Discord-jegyzék.", href: "/egyeb/", cta: "Törvénytár megnyitása" },
      { title: "Választások és Szavazások", desc: "Add le titkos, Discord-hitelesített szavazatodat a parlamenti választásokon és törvényszavazásokon.", href: "/szavazas/", cta: "Szavazófülke" },
    ],
    politicsExtras: {
      parliamentCompositionTitle: "Az Országgyűlés Mandátummegoszlása (2026. november — 15 mandátum)",
      parliamentCompositionDesc: "Megválasztva 2026. november 1-jén D'Hondt-féle arányos listás választási rendszerben (47 érvényes szavazat alapján).",
      govSeatsLabel: "Alliance for Furnovskyland (AfF) — 9 mandátum (61,7%)",
      oppSeatsLabel: "Egyesült Konzervatív Koalíció (CCP–UF) — 6 mandátum (38,3%)",
      partiesTitle: "Bejegyzett Politikai Pártok és Koalíciók",
      partiesSubtitle: "A parlamenti nyilvántartásban szereplő aktív választási szövetségek és történelmi politikai pártok",
      partyLeader: "Vezető:",
      partyIdeology: "Ideológia:",
      partyFounded: "Alapítva:",
      actionLinksTitle: "Közéleti és Parlamenti Részvétel",
      actionLinksSubtitle: "Közvetlen hivatkozások a Furnovskyland Discord-szerver hivatalos törvényhozási, választási és diplomáciai csatornáira",
      links: [
        { label: "Törvényjavaslat benyújtása (#submit-a-law)", desc: "Sima törvény, sarkalatos törvény vagy alkotmánymódosítás kezdeményezése az Országgyűlés előtt.", href: DISCORD_LINKS.submitLaw },
        { label: "Parlamenti viták (#parliament-discussions)", desc: "Kéthetenkénti pénteki (20:00 UTC) nyilvános ülések és bizottsági viták követése.", href: DISCORD_LINKS.parliamentDiscussions },
        { label: "Pártalapítás (#register-your-party)", desc: "Új politikai párt bejegyzése névvel, ideológiával, mottóval és legalább 2 állampolgár taggal.", href: DISCORD_LINKS.registerParty },
        { label: "Választási regisztráció (#election-registration)", desc: "Pártlisták állítása az országgyűlési választásokra és polgármesterjelölti jelentkezés.", href: DISCORD_LINKS.electionRegistration },
        { label: "Szövetségi Közlöny (#federal-gazette)", desc: "A Sanctio Regia keretében szentesített törvények, rendeletek és bírósági határozatok kihirdetése.", href: DISCORD_LINKS.federalGazette },
        { label: "Nagykövetségek és Szerverek Ligája (#league-of-servers)", desc: "Diplomáciai képviseletek, államközi szerződések és a League of Servers (LoS) ügyei.", href: DISCORD_LINKS.leagueOfServers },
      ],
    },
    historyExtras: {
      heraldryShowcaseTitle: "Furnovskyföld Nemzetszövetségének Birodalma Állami Jelképei",
      flagCaption: "Furnovskyföld Nemzeti Zászlaja (Elfogadva: 2018, véglegesítve: 2019)",
      flagDetails: "Három egyenlő szélességű piros, fehér és zöld vízszintes sáv, közepén az egységet és szuverenitást jelképező aranysárga körrel.",
      coatCaption: "Birodalmi Címer — The Imperial Banner (Elfogadva: 2021. április 15.)",
      coatDetails: "Csücskös talpú, négyelt pajzs: az első ezüst mezőben vörös holló, a második vörös mezőben ezüst hajó, a harmadik vörös mezőben ezüst angyal, a negyedik ezüst mezőben vörös csuklyás barát, középen bíbor boglárpajzson arany liliom és hármas csomó, a pajzson zárt királyi koronával.",
    },
    minecraftExtras: {
      settlementsTitle: "Önálló Települések és Választott Polgármesterek",
      settlementsSubtitle: "A 2026-os Alkotmány 28–31. cikkei alapján minden település 5 havonta közvetlenül választ polgármestert, aki tagja a Szerver Tanácsnak",
      mayorLabel: "Polgármester:",
      settlements: [
        {
          name: "Égerliget",
          mayor: "Azurkapro miniszterelnök-helyettes és házelnök (@azurkapro)",
          desc: "Központi fekvésű, kiépített városi önkormányzat közvetlen metrókapcsolattal és közintézményekkel.",
          channelHref: DISCORD_LINKS.egerliget,
          channelLabel: "Égerliget Fórum",
        },
        {
          name: "Dzsungelfalva (Jungle Village)",
          mayor: "H.R.H. Damian Ramirez-Casterwill",
          desc: "Történelmi dzsungeltartomány, amelynek közlekedési csomópontja a Belső-Dzsungel Vasútállomás.",
          channelHref: DISCORD_LINKS.dzsungelfalva,
          channelLabel: "Dzsungelfalva Fórum",
        },
        {
          name: "Olimpiai és Poszeidón-szigetek (Olympic & Poseidon Islands)",
          mayor: "MeteorBarni",
          desc: "Szigeti önkormányzat és sportközpont, a Nemzetközösségi Játékok és az LoS Olimpiák helyszíne.",
          channelHref: DISCORD_LINKS.olympicIslands,
          channelLabel: "Olimpiai-szigetek Fórum",
        },
        {
          name: "Értilos",
          mayor: "XVDX",
          desc: "Hagyományos építészettel és helyi önkormányzattal rendelkező autonóm település.",
        },
        {
          name: "Furn-Hauptstadt és Coastal City (ACCC)",
          mayor: "Birodalmi Fővárosi Közigazgatás",
          desc: "Az Országgyűlés, a Furnovskyföldi Központi Bank (CBF), a Szent Erzsébet Katolikus Templom és az Attila Krisztián Lakótelep (ACCC) székhelye.",
        },
      ],
      infraTitle: "Nemzeti Infrastruktúra és Állami Nagyberuházások",
      infraSubtitle: "A 2026. évi Regionális Építési Törvény hatálya alá tartozó kiemelt állami és vállalati létesítmények",
      infraItems: [
        {
          title: "Furnovskyföldi Központi Bank (CBF Székház)",
          date: "Felavatva: 2025. dec. 5.",
          desc: "A bukaresti Román Nemzeti Bank mintájára, a Hafiz and Partners Inc. által épített neoklasszicista pénzügyi palota, a Furn-Brule (Fß) nemzeti valuta központja.",
        },
        {
          title: "Furnovskyföldi Földalatti Metróhálózat (FM-01, FM-03, FM-04)",
          date: "Kiépítve: 2025–2026",
          desc: "Gyorsvasúti földalatti metróvonalak, amelyek összekötik a Szent Erzsébet Katolikus Templomot, a Csillagkép-hegyet és a fővárost.",
        },
        {
          title: "Belső-Dzsungel Vasútállomás és Nemzeti Vasút",
          date: "Átadva: 2026. jan. 1.",
          desc: "Regionális vasúti csomópont, amely összeköti Dzsungelfalvát a fővárosi fennsíkkal és a környező településekkel.",
        },
        {
          title: "Attila Krisztián Lakótelep (ACCC) és MTVehicles",
          date: "Indult: 2026. febr. 7.",
          desc: "Modern lakópark-fejlesztés Coastal Cityben, szerverszintű MTVehicles közúti és légi közlekedéssel.",
        },
      ],
      rpBannerTitle: "Kezdd el Roleplay Életedet és Önkormányzati Karrieredet",
      rpBannerDesc: "Regisztráld karakteredet a Discord Roleplay fórumban ingatlanvásárláshoz, Furn-Brule (Fß) vállalkozás indításához vagy polgármesterjelöltséghez.",
      rpInfoBtn: "#roleplay-informations megnyitása",
      rpMakerBtn: "RP Karakterkészítő",
    },
    cultureExtras: {
      constitutionalTitle: "Alkotmányos Nemzeti Ünnepek (Alkotmány I. cikk)",
      constitutionalSubtitle: "Furnovskyföld 2026. október 24-i Alkotmányának I. cikkében rögzített négy kiemelt állami ünnep",
      nationalHolidays: [
        { date: "Április 15.", name: "A Nemzeti Föderáció Napja", desc: "Furnovskyföld Nemzetszövetsége kikiáltásának és a hivatalos Discord-szerver 2021. április 15-i alapításának ünnepe." },
        { date: "Június 15.", name: "A Parlament Napja", desc: "A népszuverenitás, a demokratikus választások és a parlamentáris törvényhozás nemzeti ünnepe." },
        { date: "Augusztus 23.", name: "I. Furnovsky Napja", desc: "Őfelsége I. Furnovsky Császár, az államalapító uralkodó hivatalos születésnapi állami ünnepe." },
        { date: "Október 31.", name: "Államalapítás Ünnepe és Halloween", desc: "I. Furnovsky Császár 2018. október 31-én 15:00 órakor megtartott koronázásának és az államalapításnak az évfordulója." },
      ],
      institutionsTitle: "Sajtó, Sport és Kulturális Intézmények",
      institutionsSubtitle: "Aktív médiumok, sportesemények és társadalmi szervezetek a Nemzetközösségben",
      institutions: [
        {
          title: "Független Sajtó (FNBC, Vox News, CCP News)",
          badge: "Alkotmány VII. cikk",
          desc: "Állampolgárok által működtetett hírügynökségek és lapok, amelyek tudósítanak a parlamenti ülésekről, választásokról és közéleti eseményekről.",
          href: DISCORD_LINKS.newsAgencies,
          cta: "#news-agencies megnyitása",
        },
        {
          title: "Nemzetközösségi Játékok és LoS Discord Olimpia",
          badge: "Commonwealth Games Act 2026",
          desc: "A 2024. márciusi első LoS Discord Olimpia megrendezése után a 2026-os Nemzetközösségi Játékokról szóló törvény intézményesítette az állami sportversenyeket.",
          href: DISCORD_LINKS.olympicIslands,
          cta: "Olimpiai-szigetek",
        },
        {
          title: "Vállalati és Munkáskamarák",
          badge: "Munkaügyi Osztály és Vállalatok",
          desc: "A Metronon Company, a Migaspin Inc., a Crystal Corporation, a Hafiz & Partners Inc. és a Dolgozók Bizottsága által támogatott kulturális és építészeti projektek.",
          href: DISCORD_LINKS.companies,
          cta: "#companies megnyitása",
        },
      ],
    },
    otherExtras: {
      directoryTitle: "Hivatalos Discord-Csatornák és Állami Szolgáltatások Jegyzéke",
      directorySubtitle: "Közvetlen hivatkozások a közigazgatási hivatalokhoz, a törvényhozáshoz, a határellenőrzéshez és a roleplay fórumokhoz (Szerver ID: 836271168977764363)",
      categories: [
        {
          title: "Határellenőrzés és Állami Közlemények",
          channels: [
            { name: "#verification-room", desc: "Határbeléptetés a Furnovskyland Defence Force által (72 órán belül az Alkotmány 39. cikke alapján).", href: DISCORD_LINKS.verification },
            { name: "#channel-1", desc: "Császári rendeletek, alkotmányos népszavazások, választási eredmények és FUSCPS közlemények.", href: DISCORD_LINKS.channel1 },
            { name: "#ministry-announcements", desc: "A Miniszterelnökség, a minisztériumok és a Sanctio Regia kihirdetések hivatalos csatornája.", href: DISCORD_LINKS.ministryAnnouncements },
            { name: "#federal-gazette", desc: "A 2026. júliusi Federal Gazette Bill által létrehozott hivatalos Szövetségi Közlöny.", href: DISCORD_LINKS.federalGazette },
          ],
        },
        {
          title: "Országgyűlés, Választások és Politikai Pártok",
          channels: [
            { name: "#parliament-discussions", desc: "A 15 fős Országgyűlés nyilvános ülésterme (kéthetenkénti pénteki ülések és törvényhozási viták).", href: DISCORD_LINKS.parliamentDiscussions },
            { name: "#submit-a-law", desc: "Törvényjavaslatok, sarkalatos törvények és határozati javaslatok benyújtása.", href: DISCORD_LINKS.submitLaw },
            { name: "#register-your-party", desc: "Politikai pártok és választási koalíciók hivatalos bejegyzése.", href: DISCORD_LINKS.registerParty },
            { name: "#election-registration & #campaigns", desc: "Jelöltállítás és a hivatalos 5 napos választási kampányidőszak fóruma.", href: DISCORD_LINKS.electionRegistration },
          ],
        },
        {
          title: "Roleplay, Települések, Gazdaság és Sajtó",
          channels: [
            { name: "#roleplay-informations", desc: "RP Karakterkészítő, valamint Égerliget, Dzsungelfalva és az Olimpiai-szigetek önkormányzati fórumai.", href: DISCORD_LINKS.roleplayInfo },
            { name: "#companies", desc: "Cégjegyzék (Metronon, Migaspin Inc., Crystal Corp., Hafiz & Partners) és vállalatalapítás.", href: DISCORD_LINKS.companies },
            { name: "#news-agencies", desc: "Független sajtóorgánumok (FNBC, Vox News, CCP News) és hírügynökség-alapítás.", href: DISCORD_LINKS.newsAgencies },
            { name: "#workers-hall", desc: "Munkaügyi Osztály (Work Department) és a Dolgozók Bizottsága.", href: DISCORD_LINKS.workersHall },
          ],
        },
      ],
    },
  },
  de: {
    chancelleryBadge: "Kaiserliche Staatskanzlei · Konstitutionelles Staatsportal",
    factSheetTitle: "Staatsprofil des Commonwealth Furnovskyland",
    factSheetSubtitle: "Verfassungsrechtliche, territoriale und institutionelle Eckdaten gemäß dem Grundgesetz vom 24. Oktober 2026",
    facts: [
      { label: "Offizieller Staatsname", value: "Commonwealth-Kaiserreich Furnovskyland", detail: "Gegründet am 31. Okt. 2018 · Commonwealth seit 15. Apr. 2021" },
      { label: "Staatsform", value: "Demokratische Parlamentarische Monarchie", detail: "Verfassung in Kraft seit 24. Oktober 2026" },
      { label: "Staatsoberhaupt", value: "S.M. Kaiser Furnovsky I.", detail: "Oberbefehlshaber & Vorsitzender des Serverrats" },
      { label: "Regierungschef", value: "Premierminister Levi (@deba15)", detail: "XIII. Bundesregierung (AfF-Mehrheit)" },
      { label: "Legislative", value: "15-köpfige Nationalversammlung", detail: "Einkammerparlament · D'Hondt-Verfahren · Sprecher Azurkapro" },
      { label: "Judikative", value: "Oberster Gerichtshof des Commonwealth", detail: "Oberster Richter Mig (@migaspincasterwill)" },
      { label: "Hauptstadt & Fläche", value: "Furn-Hauptstadt · 546.861 km²", detail: "36 Bezirke in 4 Commonwealth-Territorien" },
      { label: "Bevölkerung & Währung", value: "54,1 Mio. (RP) · 250+ Discord-Bürger", detail: "Furn-Brule (Fß) · Zentralbank von Furnovskyland" },
      { label: "Amtssprachen", value: "Ungarisch, Englisch, Slowakisch, Deutsch", detail: "Geschützt nach Artikel H der Verfassung" },
      { label: "Internationaler Status", value: "Mitgliedstaat der League of Servers (LoS)", detail: "Artikel D Verfassungsmitgliedschaft · 11+ Botschaften" },
    ],
    whyJoinTitle: "Warum Furnovskyland beitreten? — Politik, Roleplay & Staatsleben",
    whyJoinSubtitle: "Ob Sie Gesetze im Parlament einbringen, eine Minecraft-Gemeinde als Bürgermeister regieren, ein Unternehmen gründen oder eine unabhängige Zeitung herausgeben möchten — alle Institutionen stehen Bürgern offen.",
    whyJoinCards: [
      {
        badge: "Parlament & Parteien",
        title: "Kandidieren Sie für die 15-köpfige Nationalversammlung",
        description: "Alle 4 Monate wählen die Bürger die 15-köpfige Nationalversammlung nach dem D'Hondt-Verhältniswahlrecht. Gründen Sie mit nur 2 Bürgern eine Partei, reichen Sie Gesetzentwürfe ein und gestalten Sie die Bundesregierung.",
        primaryLink: { label: "Partei registrieren", href: DISCORD_LINKS.registerParty },
        secondaryLink: { label: "Gesetz einreichen", href: DISCORD_LINKS.submitLaw },
      },
      {
        badge: "Roleplay & Gemeinden",
        title: "Charakter erstellen & Bürgermeister werden",
        description: "Erstellen Sie Ihren Charakter im RP Character Maker, lassen Sie sich in Égerliget, Dzsungelfalva, auf den Olympischen & Poseidon-Inseln oder in Értilos nieder und kandidieren Sie alle 5 Monate bei den Kommunalwahlen.",
        primaryLink: { label: "Roleplay-Forum", href: DISCORD_LINKS.roleplayInfo },
        secondaryLink: { label: "RP Character Maker", href: DISCORD_LINKS.rpCharacterMaker },
      },
      {
        badge: "Zentralbank & Wirtschaft",
        title: "Handel in Furn-Brule (Fß) & Unternehmensgründung",
        description: "Nehmen Sie an der von der Zentralbank (CBF) regulierten Ora-Wirtschaft teil. Gründen Sie Unternehmen neben der Metronon Company, Migaspin Inc., Crystal Corporation und Hafiz & Partners Inc. oder treten Sie dem Arbeitsministerium bei.",
        primaryLink: { label: "Handelsregister", href: DISCORD_LINKS.companies },
        secondaryLink: { label: "Firma gründen", href: DISCORD_LINKS.createCompany },
      },
      {
        badge: "Freie Presse & Medien",
        title: "Gründen Sie eine unabhängige Nachrichtenagentur",
        description: "Geschützt durch Artikel VII der Verfassung von 2026 berichten unabhängige Medien wie FNBC, Vox News und CCP News über Parlamentsdebatten, Wahlen und das öffentliche Leben.",
        primaryLink: { label: "Nachrichtenagenturen", href: DISCORD_LINKS.newsAgencies },
        secondaryLink: { label: "Medium gründen", href: DISCORD_LINKS.createNewsAgency },
      },
      {
        badge: "Diplomatie & Verteidigung",
        title: "Auswärtiger Dienst & Verteidigungskräfte (FDF)",
        description: "Vertreten Sie das Reich als Diplomat bei über 11 Partnerstaaten und der League of Servers (LoS) oder dienen Sie in der Furnovskyland Defence Force (FDF) beim Grenzschutz.",
        primaryLink: { label: "Botschaften", href: DISCORD_LINKS.embassies },
        secondaryLink: { label: "FDF-Bewerbung", href: DISCORD_LINKS.militaryApplication },
      },
      {
        badge: "Minecraft 1.21.11",
        title: "Städte, U-Bahn-Linien & Eisenbahnen bauen",
        description: "Verbinden Sie sich mit ujfurnvaros.aternos.me (Java & Bedrock). Nutzen Sie Autos und Flugzeuge (MTVehicles), fahren Sie mit den U-Bahn-Linien FM-01, FM-03 und FM-04 und errichten Sie klassizistische Bauwerke.",
        primaryLink: { label: "Minecraft-Portal", href: "/minecraft/" },
        secondaryLink: { label: "Server-Chat", href: DISCORD_LINKS.minecraftChat },
      },
    ],
    portalTitle: "Staatskanzlei & Informationsverzeichnisse",
    portalSubtitle: "Entdecken Sie die verfassungsmäßigen Organe, die historische Chronik, das Gesetzesarchiv und das Wahlsystem des Commonwealth",
    portalCards: [
      { title: "Politik & Regierung", desc: "XIII. Bundesregierung, 15-köpfige Nationalversammlung, Oberster Gerichtshof und registrierte Parteien.", href: "/politika/", cta: "Staatskanzlei öffnen" },
      { title: "Geschichte & Heraldik", desc: "Chronik des Reiches von der Krönung am 31. Oktober 2018 bis zur Verfassungsära 2026.", href: "/tortenelem/", cta: "Chronik lesen" },
      { title: "Gesetzesarchiv & Karten", desc: "Verkündete Verfassungen, Gesetze, Dekrete, herunterladbare Bezirkskarten und Discord-Verzeichnis.", href: "/egyeb/", cta: "Archiv öffnen" },
      { title: "Wahlen & Abstimmungen", desc: "Geben Sie Ihre geheime, Discord-authentifizierte Stimme bei Parlamentswahlen und Gesetzesabstimmungen ab.", href: "/szavazas/", cta: "Zur Wahlurne" },
    ],
    politicsExtras: {
      parliamentCompositionTitle: "Sitzverteilung der Nationalversammlung 2026 (15 Sitze)",
      parliamentCompositionDesc: "Gewählt am 1. November 2026 nach dem D'Hondt-Verhältniswahlrecht (47 gültige Stimmen).",
      govSeatsLabel: "Alliance for Furnovskyland (AfF) — 9 Sitze (61,7%)",
      oppSeatsLabel: "Vereinigte Konservative Koalition (CCP–UF) — 6 Sitze (38,3%)",
      partiesTitle: "Registrierte Politische Parteien des Commonwealth",
      partiesSubtitle: "Aktive Wahlbündnisse und historische politische Parteien im Parlamentsregister",
      partyLeader: "Vorsitz:",
      partyIdeology: "Ideologie:",
      partyFounded: "Gegründet:",
      actionLinksTitle: "Beteiligung am Parlamentarischen & Staatlichen Leben",
      actionLinksSubtitle: "Direkte Links zu den offiziellen Gesetzgebungs-, Wahl- und Diplomatiekanälen auf dem Discord-Server",
      links: [
        { label: "Gesetzentwurf einreichen (#submit-a-law)", desc: "Einfache Gesetze, Organgesetze oder Verfassungsänderungen in die Nationalversammlung einbringen.", href: DISCORD_LINKS.submitLaw },
        { label: "Parlamentsdebatten (#parliament-discussions)", desc: "Öffentliche Sitzungen jeden zweiten Freitag um 20:00 UTC sowie laufende Ausschussdebatten.", href: DISCORD_LINKS.parliamentDiscussions },
        { label: "Partei gründen (#register-your-party)", desc: "Registrierung einer neuen Partei mit Namen, Ideologie, Motto und mindestens 2 Bürgern.", href: DISCORD_LINKS.registerParty },
        { label: "Wahlregistrierung (#election-registration)", desc: "Einreichung von Parteilisten für die Nationalversammlung oder Kandidatur als Bürgermeister.", href: DISCORD_LINKS.electionRegistration },
        { label: "Bundesgesetzblatt (#federal-gazette)", desc: "Amtliche Verkündung von Gesetzen (Sanctio Regia), kaiserlichen Dekreten und Gerichtsurteilen.", href: DISCORD_LINKS.federalGazette },
        { label: "Botschaften & League of Servers (#league-of-servers)", desc: "Diplomatische Vertretungen, Staatsverträge und Angelegenheiten der League of Servers (LoS).", href: DISCORD_LINKS.leagueOfServers },
      ],
    },
    historyExtras: {
      heraldryShowcaseTitle: "Staatssymbole des Commonwealth-Kaiserreichs Furnovskyland",
      flagCaption: "Nationalflagge von Furnovskyland (Eingeführt 2018, standardisiert 2019)",
      flagDetails: "Drei horizontale Streifen in Rot, Weiß und Grün mit einer zentralen goldgelben Sonnenscheibe als Symbol für Einheit und Souveränität.",
      coatCaption: "Kaiserliches Wappen — The Imperial Banner (Angenommen am 15. April 2021)",
      coatDetails: "Gevierter Schild mit rotem Raben, silbernem Schiff, silbernem Engel und rotgekapptem Mönch sowie purpurnem Herzschild mit goldener Lilie und Dreifachknoten unter der Königskrone.",
    },
    minecraftExtras: {
      settlementsTitle: "Autonome Siedlungen & Gewählte Bürgermeister",
      settlementsSubtitle: "Gemäß Artikel 28–31 der Verfassung von 2026 wählt jede Gemeinde alle 5 Monate ihren Bürgermeister, der im Serverrat vertreten ist",
      mayorLabel: "Bürgermeister:",
      settlements: [
        {
          name: "Égerliget",
          mayor: "Stellv. PM & Parlamentssprecher Azurkapro (@azurkapro)",
          desc: "Bedeutende Wohn- und Verwaltungsgemeinde mit direkter U-Bahn-Anbindung und öffentlichen Bauten.",
          channelHref: DISCORD_LINKS.egerliget,
          channelLabel: "Gemeindeforum Égerliget",
        },
        {
          name: "Dzsungelfalva (Dschungeldorf)",
          mayor: "H.R.H. Damian Ramirez-Casterwill",
          desc: "Historische Dschungelprovinz, erschlossen durch den Bahnhof Belső-Dzsungel und regionale Verkehrswege.",
          channelHref: DISCORD_LINKS.dzsungelfalva,
          channelLabel: "Gemeindeforum Dzsungelfalva",
        },
        {
          name: "Olympische und Poseidon-Inseln",
          mayor: "MeteorBarni",
          desc: "Inselbezirk und Sportkomplex für die Commonwealth Games und Wettbewerbe der League of Servers.",
          channelHref: DISCORD_LINKS.olympicIslands,
          channelLabel: "Forum Olympische Inseln",
        },
        {
          name: "Értilos",
          mayor: "XVDX",
          desc: "Autonome Siedlung mit traditioneller Regionalarchitektur und kommunaler Selbstverwaltung.",
        },
        {
          name: "Furn-Hauptstadt & Coastal City (ACCC)",
          mayor: "Kaiserliche Hauptstadtverwaltung",
          desc: "Sitz der Nationalversammlung, der Zentralbank von Furnovskyland, der katholischen St.-Elisabeth-Kirche und der Attila-Krisztián-Wohnanlagen.",
        },
      ],
      infraTitle: "Nationale Infrastruktur & Staatliche Großprojekte",
      infraSubtitle: "Staatliche und privatwirtschaftliche Bauwerke unter dem Regionalen Baugesetz (2026)",
      infraItems: [
        {
          title: "Zentralbank von Furnovskyland (CBF-Hauptsitz)",
          date: "Eröffnet am 5. Dez. 2025",
          desc: "Neoklassizistischer Finanzpalast nach dem Vorbild der Rumänischen Nationalbank in Bukarest, erbaut von Hafiz and Partners Inc. als Zentrum der Währung Furn-Brule (Fß).",
        },
        {
          title: "U-Bahn-Netz Furnovskyland (FM-01, FM-03, FM-04)",
          date: "Ausgebaut 2025–2026",
          desc: "Unterirdisches Schnellbahnnetz zwischen der St.-Elisabeth-Kirche, dem Csillagkép-Hügel und dem Zentrum von Furn-Hauptstadt.",
        },
        {
          title: "Bahnhof Belső-Dzsungel & Nationale Eisenbahn",
          date: "Fertiggestellt am 1. Jan. 2026",
          desc: "Überregionaler Eisenbahnknotenpunkt, der Dzsungelfalva mit dem Hauptstadtplateau verbindet.",
        },
        {
          title: "Attila-Krisztián-Wohnanlagen (ACCC) & MTVehicles",
          date: "Begonnen am 7. Feb. 2026",
          desc: "Moderne Wohnanlagen in Coastal City sowie serverweiter Straßen- und Luftverkehr mittels MTVehicles.",
        },
      ],
      rpBannerTitle: "Starten Sie Ihr Roleplay-Leben & Ihre Kommunale Laufbahn",
      rpBannerDesc: "Registrieren Sie Ihren Charakter im Discord-Roleplay-Forum, um Immobilien zu erwerben, Unternehmen in Furn-Brule (Fß) zu führen oder als Bürgermeister zu kandidieren.",
      rpInfoBtn: "#roleplay-informations öffnen",
      rpMakerBtn: "RP Character Maker",
    },
    cultureExtras: {
      constitutionalTitle: "Verfassungsmäßige Nationalfeiertage (Artikel I)",
      constitutionalSubtitle: "Die vier höchsten Staatsfeiertage gemäß Artikel I der Verfassung von Furnovskyland vom 24. Oktober 2026",
      nationalHolidays: [
        { date: "15. April", name: "Tag der Nationalen Föderation", desc: "Erinnert an die Proklamation des Commonwealth-Kaiserreichs Furnovskyland und die Gründung des Discord-Servers am 15. April 2021." },
        { date: "15. Juni", name: "Tag des Parlaments", desc: "Feiert die parlamentarische Souveränität, demokratische Wahlen und die Gesetzgebungstradition des Commonwealth." },
        { date: "23. August", name: "Tag Kaiser Furnovskys I.", desc: "Offizieller Geburtstagsfeiertag Seiner Majestät Kaiser Furnovsky I., Gründer und Souverän der Nation." },
        { date: "31. Oktober", name: "Staatsgründungstag & Halloween", desc: "Jahrestag der historischen Krönung Kaiser Furnovskys I. am 31. Oktober 2018 um 15:00 Uhr MEZ." },
      ],
      institutionsTitle: "Presse-, Sport- & Kulturinstitutionen",
      institutionsSubtitle: "Aktive Medienhäuser, Sporttraditionen und gesellschaftliche Organisationen im Commonwealth",
      institutions: [
        {
          title: "Unabhängige Presse (FNBC, Vox News, CCP News)",
          badge: "Geschützt nach Artikel VII",
          desc: "Von Bürgern geführte Zeitungen und Sender, die über Parlamentssitzungen, Wahlen und kulturelle Ereignisse berichten.",
          href: DISCORD_LINKS.newsAgencies,
          cta: "#news-agencies lesen",
        },
        {
          title: "Commonwealth Games & LoS Discord-Olympiade",
          badge: "Commonwealth Games Act 2026",
          desc: "Nach der ersten LoS Discord-Olympiade im März 2024 verankerte das Commonwealth-Spiele-Gesetz 2026 regelmäßige Turniere.",
          href: DISCORD_LINKS.olympicIslands,
          cta: "Olympische Inseln",
        },
        {
          title: "Unternehmens- & Arbeitergilden",
          badge: "Arbeitsministerium & Firmen",
          desc: "Kulturelle und architektonische Förderung durch Metronon Company, Migaspin Inc., Crystal Corporation, Hafiz & Partners Inc. und das Arbeiterkomitee.",
          href: DISCORD_LINKS.companies,
          cta: "#companies erkunden",
        },
      ],
    },
    otherExtras: {
      directoryTitle: "Offizielles Discord-Kanal- & Behördenverzeichnis",
      directorySubtitle: "Direkte Links zu Verwaltungsämtern, Parlamentskammern, Grenzkontrolle und Roleplay-Foren (Server-ID: 836271168977764363)",
      categories: [
        {
          title: "Grenzkontrolle & Staatliche Bekanntmachungen",
          channels: [
            { name: "#verification-room", desc: "Einreiseprüfung durch die Furnovskyland Defence Force (binnen 72 Stunden gemäß Artikel 39).", href: DISCORD_LINKS.verification },
            { name: "#channel-1", desc: "Kaiserliche Dekrete, Verfassungsreferenden, Wahlergebnisse und FUSCPS-Meldungen.", href: DISCORD_LINKS.channel1 },
            { name: "#ministry-announcements", desc: "Amtliche Mitteilungen des Premierministers, der Ministerien und Sanctio-Regia-Verkündungen.", href: DISCORD_LINKS.ministryAnnouncements },
            { name: "#federal-gazette", desc: "Offizielles Bundesgesetzblatt gemäß dem Federal Gazette Act (Juli 2026).", href: DISCORD_LINKS.federalGazette },
          ],
        },
        {
          title: "Nationalversammlung, Wahlen & Parteien",
          channels: [
            { name: "#parliament-discussions", desc: "Öffentlicher Plenarsaal der 15-köpfigen Nationalversammlung (zweiwöchentliche Sitzungen & Debatten).", href: DISCORD_LINKS.parliamentDiscussions },
            { name: "#submit-a-law", desc: "Gesetzesinitiative für einfache Gesetze, Organgesetze und Anträge.", href: DISCORD_LINKS.submitLaw },
            { name: "#register-your-party", desc: "Amtliches Register zur Gründung politischer Parteien und Wahlbündnisse.", href: DISCORD_LINKS.registerParty },
            { name: "#election-registration & #campaigns", desc: "Kandidatenanmeldung und offizielles 5-tägiges Wahlkampfforum.", href: DISCORD_LINKS.electionRegistration },
          ],
        },
        {
          title: "Roleplay, Gemeinden, Wirtschaft & Presse",
          channels: [
            { name: "#roleplay-informations", desc: "RP Character Maker sowie Gemeindeforen für Égerliget, Dzsungelfalva und die Olympischen Inseln.", href: DISCORD_LINKS.roleplayInfo },
            { name: "#companies", desc: "Handelsregister (Metronon, Migaspin Inc., Crystal Corp., Hafiz & Partners) und Firmengründung.", href: DISCORD_LINKS.companies },
            { name: "#news-agencies", desc: "Unabhängige Medien (FNBC, Vox News, CCP News) und Presseregistrierung.", href: DISCORD_LINKS.newsAgencies },
            { name: "#workers-hall", desc: "Arbeitsministerium (Work Department) und Arbeiterkomitee.", href: DISCORD_LINKS.workersHall },
          ],
        },
      ],
    },
  },
  sk: {
    chancelleryBadge: "Cisárska kancelária · Ústavný štátny portál",
    factSheetTitle: "Štátny profil Spoločenstva Furnovskyland",
    factSheetSubtitle: "Základné ústavné, územné a inštitucionálne ukazovatele podľa Ústavy z 24. októbra 2026",
    facts: [
      { label: "Oficiálny názov štátu", value: "Cisárstvo Spoločenstva Furnovskyland", detail: "Založené 31. okt. 2018 · Spoločenstvo od 15. apr. 2021" },
      { label: "Štátne zriadenie", value: "Demokratická parlamentná monarchia", detail: "Ústava účinná od 24. októbra 2026" },
      { label: "Hlava štátu", value: "J.V. cisár Furnovsky I.", detail: "Hlavný veliteľ a predseda Serverovej rady" },
      { label: "Predseda vlády", value: "Premiér Levi (@deba15)", detail: "XIII. federálna vláda (väčšina AfF)" },
      { label: "Zákonodarný zbor", value: "15-členné Národné zhromaždenie", detail: "Jednokomorový parlament · D'Hondtov systém · Predseda Azurkapro" },
      { label: "Súdnictvo", value: "Najvyšší súd Spoločenstva", detail: "Hlavný sudca Mig (@migaspincasterwill)" },
      { label: "Hlavné mesto a rozloha", value: "Furn-Hauptstadt · 546 861 km²", detail: "36 okresov v 4 teritóriách Spoločenstva" },
      { label: "Obyvateľstvo a mena", value: "54,1 mil. (RP) · 250+ Discord občanov", detail: "Furn-Brule (Fß) · Centrálna banka Furnovskylandu" },
      { label: "Úradné jazyky", value: "Maďarčina, angličtina, slovenčina, nemčina", detail: "Chránené podľa článku H Ústavy" },
      { label: "Medzinárodné postavenie", value: "Členský štát Ligy serverov (LoS)", detail: "Ústavné členstvo podľa čl. D · 11+ veľvyslanectiev" },
    ],
    whyJoinTitle: "Prečo sa pridať k Furnovskylandu? — Politika, Roleplay a Štátny život",
    whyJoinSubtitle: "Či už chcete navrhovať zákony v Parlamente, spravovať obec v Minecrafte ako starosta, viesť korporáciu alebo vydávať nezávislé noviny, každá inštitúcia je otvorená občanom.",
    whyJoinCards: [
      {
        badge: "Parlament a Strany",
        title: "Kandidujte do 15-členného Národného zhromaždenia",
        description: "Každé 4 mesiace občania volia 15-členné Národné zhromaždenie pomerným systémom D'Hondt. Založte vlastnú politickú stranu len s 2 občanmi, predkladajte zákony a formujte federálnu vládu.",
        primaryLink: { label: "Registrovať stranu", href: DISCORD_LINKS.registerParty },
        secondaryLink: { label: "Predložiť zákon", href: DISCORD_LINKS.submitLaw },
      },
      {
        badge: "Roleplay a Samosprávy",
        title: "Vytvorte si postavu a staňte sa Starostom",
        description: "Vytvorte si postavu v RP Character Maker, usaďte sa v obciach Égerliget, Dzsungelfalva, Olympijské a Poseidónove ostrovy alebo Értilos a kandidujte v komunálnych voľbách každých 5 mesiacov.",
        primaryLink: { label: "Roleplay fórum", href: DISCORD_LINKS.roleplayInfo },
        secondaryLink: { label: "RP Character Maker", href: DISCORD_LINKS.rpCharacterMaker },
      },
      {
        badge: "Centrálna banka a Ekonomika",
        title: "Obchodujte vo Furn-Brule (Fß) a zakladajte firmy",
        description: "Zapojte sa do ekonomiky Ora regulovanej Centrálnou bankou Furnovskylandu (CBF). Založte spoločnosť popri Metronon Company, Migaspin Inc., Crystal Corporation a Hafiz & Partners Inc. alebo vstúpte do Oddelenia práce.",
        primaryLink: { label: "Register firiem", href: DISCORD_LINKS.companies },
        secondaryLink: { label: "Založiť spoločnosť", href: DISCORD_LINKS.createCompany },
      },
      {
        badge: "Slobodná tlač a Médiá",
        title: "Založte nezávislú tlačovú agentúru",
        description: "Pod ochranou článku VII Ústavy z roku 2026 nezávislé médiá — vrátane FNBC, Vox News a CCP News — sledujú prácu vlády, organizujú volebné debaty a dokumentujú život štátu.",
        primaryLink: { label: "Tlačové agentúry", href: DISCORD_LINKS.newsAgencies },
        secondaryLink: { label: "Založiť médium", href: DISCORD_LINKS.createNewsAgency },
      },
      {
        badge: "Diplomacia a Obrana",
        title: "Zahraničná služba a Obranné sily (FDF)",
        description: "Zastupujte Ríšu ako diplomat v 11+ partnerských štátoch a Lige serverov (LoS) alebo vstúpte do Furnovskyland Defence Force (FDF) zabezpečujúcich hraničnú kontrolu a obranu.",
        primaryLink: { label: "Veľvyslanectvá", href: DISCORD_LINKS.embassies },
        secondaryLink: { label: "Prihláška do FDF", href: DISCORD_LINKS.militaryApplication },
      },
      {
        badge: "Minecraft 1.21.11",
        title: "Stavajte mestá, linky metra a železnice",
        description: "Pripojte sa na ujfurnvaros.aternos.me cez Java alebo Bedrock edíciu. Jazdite autami a lietadlami (MTVehicles), cestujte linkami metra FM-01, FM-03 a FM-04 a budujte monumentálnu architektúru.",
        primaryLink: { label: "Minecraft portál", href: "/minecraft/" },
        secondaryLink: { label: "Serverový chat", href: DISCORD_LINKS.minecraftChat },
      },
    ],
    portalTitle: "Štátna kancelária a Informačné registre",
    portalSubtitle: "Preskúmajte ústavné inštitúcie, historickú kroniku, archív zákonov a volebný systém Spoločenstva",
    portalCards: [
      { title: "Politika a Vláda", desc: "XIII. federálna vláda, 15-členné Národné zhromaždenie, Najvyšší súd a registrované politické strany.", href: "/politika/", cta: "Otvoriť kanceláriu" },
      { title: "História a Heraldika", desc: "Kronika Ríše od korunovácie 31. októbra 2018 až po ústavnú éru roku 2026.", href: "/tortenelem/", cta: "Čítať kroniku" },
      { title: "Archív zákonov a Mapy", desc: "Vyhlásené ústavy, zákony, dekréty, mapy okresov na stiahnutie a adresár Discord kanálov.", href: "/egyeb/", cta: "Otvoriť archív" },
      { title: "Voľby a Hlasovania", desc: "Odovzdajte svoj tajný, cez Discord overený hlas v parlamentných voľbách a hlasovaniach o zákonoch.", href: "/szavazas/", cta: "Otvoriť hlasovanie" },
    ],
    politicsExtras: {
      parliamentCompositionTitle: "Rozdelenie mandátov Národného zhromaždenia 2026 (15 kresiel)",
      parliamentCompositionDesc: "Zvolené 1. novembra 2026 podľa pomerného systému D'Hondt (47 platných hlasovacích lístkov).",
      govSeatsLabel: "Alliance for Furnovskyland (AfF) — 9 mandátov (61,7%)",
      oppSeatsLabel: "Zjednotená konzervatívna koalícia (CCP–UF) — 6 mandátov (38,3%)",
      partiesTitle: "Registrované politické strany Spoločenstva",
      partiesSubtitle: "Aktívne volebné koalície a historické politické strany zapísané v parlamentnom registri",
      partyLeader: "Vedenie:",
      partyIdeology: "Ideológia:",
      partyFounded: "Založená:",
      actionLinksTitle: "Zapojte sa do parlamentného a občianskeho života",
      actionLinksSubtitle: "Priame odkazy na oficiálne legislatívne, volebné a diplomatické kanály na Discord serveri Furnovskyland",
      links: [
        { label: "Predložiť návrh zákona (#submit-a-law)", desc: "Navrhnite obyčajný zákon, organický zákon alebo ústavnú zmenu Národnému zhromaždeniu.", href: DISCORD_LINKS.submitLaw },
        { label: "Parlamentné rozpravy (#parliament-discussions)", desc: "Sledujte verejné zasadnutia každý druhý piatok o 20:00 UTC a prebiehajúce výborové debaty.", href: DISCORD_LINKS.parliamentDiscussions },
        { label: "Zaregistrovať stranu (#register-your-party)", desc: "Založte novú politickú stranu s názvom, ideológiou, mottom a aspoň 2 občanmi.", href: DISCORD_LINKS.registerParty },
        { label: "Registrácia do volieb (#election-registration)", desc: "Prihláste stranícke kandidátky do Národného zhromaždenia alebo kandidujte za starostu.", href: DISCORD_LINKS.electionRegistration },
        { label: "Federálny vestník (#federal-gazette)", desc: "Oficiálne vyhlasovanie zákonov podpísaných cez Sanctio Regia, cisárskych dekrétov a rozsudkov.", href: DISCORD_LINKS.federalGazette },
        { label: "Veľvyslanectvá a Liga serverov (#league-of-servers)", desc: "Diplomatické misie, bilaterálne zmluvy a záležitosti Ligy serverov (LoS).", href: DISCORD_LINKS.leagueOfServers },
      ],
    },
    historyExtras: {
      heraldryShowcaseTitle: "Štátne symboly Cisárstva Spoločenstva Furnovskyland",
      flagCaption: "Štátna vlajka Furnovskylandu (Prijatá 2018, štandardizovaná 2019)",
      flagDetails: "Tri vodorovné pruhy červenej, bielej a zelenej farby so stredovým zlatožltým slnečným kotúčom symbolizujúcim jednotu a zvrchovanosť.",
      coatCaption: "Cisársky štátny znak — The Imperial Banner (Prijatý 15. apríla 2021)",
      coatDetails: "Štvrtený štít s červeným havranom, striebornou loďou, strieborným anjelom a červeno odetým mníchom, so stredovým purpurovým srdcovým štítom so zlatou ľaliou a trojitým uzlom pod kráľovskou korunou.",
    },
    minecraftExtras: {
      settlementsTitle: "Autonómne sídla a Volení starostovia",
      settlementsSubtitle: "Podľa článkov 28–31 Ústavy z roku 2026 si každé sídlo volí starostu každých 5 mesiacov so zastúpením v Serverovej rade",
      mayorLabel: "Starosta:",
      settlements: [
        {
          name: "Égerliget",
          mayor: "Podpredseda vlády a predseda parlamentu Azurkapro (@azurkapro)",
          desc: "Hlavná obytná a administratívna samospráva s priamym napojením na metro a verejnými inštitúciami.",
          channelHref: DISCORD_LINKS.egerliget,
          channelLabel: "Mestské fórum Égerliget",
        },
        {
          name: "Dzsungelfalva (Džungľová dedina)",
          mayor: "H.R.H. Damian Ramirez-Casterwill",
          desc: "Historická džungľová provincia obsluhovaná železničnou stanicou Belső-Dzsungel a dopravnými koridormi.",
          channelHref: DISCORD_LINKS.dzsungelfalva,
          channelLabel: "Mestské fórum Dzsungelfalva",
        },
        {
          name: "Olympijské a Poseidónove ostrovy",
          mayor: "MeteorBarni",
          desc: "Ostrovný okres a športový komplex vybudovaný pre Hry Spoločenstva a podujatia Ligy serverov.",
          channelHref: DISCORD_LINKS.olympicIslands,
          channelLabel: "Fórum Olympijských ostrovov",
        },
        {
          name: "Értilos",
          mayor: "XVDX",
          desc: "Autonómne sídlo s tradičnou regionálnou architektúrou a miestnou radou.",
        },
        {
          name: "Furn-Hauptstadt a Coastal City (ACCC)",
          mayor: "Cisárska správa hlavného mesta",
          desc: "Sídlo Národného zhromaždenia, Centrálnej banky Furnovskylandu, Katolíckeho kostola sv. Alžbety a sídliska Attila Krisztián (ACCC).",
        },
      ],
      infraTitle: "Národná infraštruktúra a Hospodárske stavby",
      infraSubtitle: "Hlavné štátne a korporátne stavby podľa Zákona o regionálnej výstavbe (2026)",
      infraItems: [
        {
          title: "Centrálna banka Furnovskylandu (Sídlo CBF)",
          date: "Otvorená 5. dec. 2025",
          desc: "Neoklasicistický finančný palác postavený podľa vzoru Rumunskej národnej banky v Bukurešti spoločnosťou Hafiz and Partners Inc. Sídlo rezerv meny Furn-Brule (Fß).",
        },
        {
          title: "Podzemné metro Furnovskylandu (FM-01, FM-03, FM-04)",
          date: "Rozšírené 2025–2026",
          desc: "Sieť rýchlodráhy spájajúca Katolícky kostol sv. Alžbety, vrch Csillagkép a centrum Furn-Hauptstadtu.",
        },
        {
          title: "Železničná stanica Belső-Dzsungel a Národná železnica",
          date: "Dokončená 1. jan. 2026",
          desc: "Medziregionálny železničný uzol spájajúci Dzsungelfalvu s náhornou plošinou hlavného mesta.",
        },
        {
          title: "Sídlisko Attila Krisztián (ACCC) a MTVehicles",
          date: "Spustené 7. feb. 2026",
          desc: "Moderná bytová výstavba v Coastal City doplnená o cestnú a leteckú dopravu cez MTVehicles.",
        },
      ],
      rpBannerTitle: "Začnite svoj Roleplay život a Komunálnu kariéru",
      rpBannerDesc: "Zaregistrujte si postavu v Discord Roleplay fóre, kupujte nehnuteľnosti, podnikajte vo Furn-Brule (Fß) alebo kandidujte za starostu.",
      rpInfoBtn: "Otvoriť #roleplay-informations",
      rpMakerBtn: "RP Character Maker",
    },
    cultureExtras: {
      constitutionalTitle: "Ústavné štátne sviatky (Článok I)",
      constitutionalSubtitle: "Štyri najvyššie štátne sviatky zakotvené v článku I Ústavy Furnovskylandu z 24. októbra 2026",
      nationalHolidays: [
        { date: "15. apríl", name: "Národný deň federácie", desc: "Pripomína vyhlásenie Cisárstva Spoločenstva Furnovskyland a založenie Discord servera 15. apríla 2021." },
        { date: "15. jún", name: "Deň parlamentu", desc: "Oslavuje parlamentnú zvrchovanosť, demokratické voľby a zákonodarné dedičstvo Spoločenstva." },
        { date: "23. august", name: "Deň Furnovského I.", desc: "Oficiálny narodeninový štátny sviatok Jeho Veličenstva cisára Furnovského I., zakladateľa a panovníka štátu." },
        { date: "31. október", name: "Deň založenia štátu a Halloween", desc: "Výročie historickej korunovácie cisára Furnovského I. dňa 31. októbra 2018 o 15:00 SEČ a zrodu Furnovskylandu." },
      ],
      institutionsTitle: "Tlačové, športové a kultúrne inštitúcie",
      institutionsSubtitle: "Aktívne médiá, športové tradície a občianske organizácie v Spoločenstve",
      institutions: [
        {
          title: "Nezávislá tlač (FNBC, Vox News, CCP News)",
          badge: "Chránené článkom VII",
          desc: "Občianske noviny a vysielatelia pokrývajúci zasadnutia parlamentu, voľby, investigatívu a kultúrne dianie.",
          href: DISCORD_LINKS.newsAgencies,
          cta: "Čítať #news-agencies",
        },
        {
          title: "Hry Spoločenstva a LoS Discord Olympiáda",
          badge: "Commonwealth Games Act 2026",
          desc: "Po historickej prvej LoS Discord Olympiáde v marci 2024 ustanovil Zákon o Hrách Spoločenstva 2026 pravidelné turnaje.",
          href: DISCORD_LINKS.olympicIslands,
          cta: "Olympijské ostrovy",
        },
        {
          title: "Korporátne a robotnícke cechy",
          badge: "Oddelenie práce a Spoločnosti",
          desc: "Kultúrny a architektonický patronát vedený spoločnosťami Metronon Company, Migaspin Inc., Crystal Corporation, Hafiz & Partners Inc. a Výborom pracovníkov.",
          href: DISCORD_LINKS.companies,
          cta: "Preskúmať #companies",
        },
      ],
    },
    otherExtras: {
      directoryTitle: "Oficiálny adresár Discord kanálov a štátnych služieb",
      directorySubtitle: "Priame odkazy na správne úrady, parlamentné komory, hraničnú kontrolu a roleplay fóra (ID servera: 836271168977764363)",
      categories: [
        {
          title: "Hraničná kontrola a Štátne oznámenia",
          channels: [
            { name: "#verification-room", desc: "Hraničná kontrola vykonávaná Furnovskyland Defence Force (do 72 hodín podľa článku 39).", href: DISCORD_LINKS.verification },
            { name: "#channel-1", desc: "Cisárske dekréty, ústavné referendá, výsledky volieb a oznámenia FUSCPS.", href: DISCORD_LINKS.channel1 },
            { name: "#ministry-announcements", desc: "Oficiálne komuniké predsedu vlády, ministerstiev a promulgácie Sanctio Regia.", href: DISCORD_LINKS.ministryAnnouncements },
            { name: "#federal-gazette", desc: "Oficiálny Federálny vestník zriadený zákonom Federal Gazette Act (júl 2026).", href: DISCORD_LINKS.federalGazette },
          ],
        },
        {
          title: "Národné zhromaždenie, Voľby a Politické strany",
          channels: [
            { name: "#parliament-discussions", desc: "Verejná rokovacia sála 15-členného Národného zhromaždenia (dvojtýždenné zasadnutia a debaty).", href: DISCORD_LINKS.parliamentDiscussions },
            { name: "#submit-a-law", desc: "Legislatívna podateľňa pre návrhy zákonov, organických zákonov a uznesení.", href: DISCORD_LINKS.submitLaw },
            { name: "#register-your-party", desc: "Oficiálny register pre zakladanie politických strán a volebných koalícií.", href: DISCORD_LINKS.registerParty },
            { name: "#election-registration & #campaigns", desc: "Registrácia kandidátok a oficiálne 5-dňové predvolebné fórum.", href: DISCORD_LINKS.electionRegistration },
          ],
        },
        {
          title: "Roleplay, Samosprávy, Ekonomika a Tlač",
          channels: [
            { name: "#roleplay-informations", desc: "RP Character Maker a mestské fóra pre Égerliget, Dzsungelfalvu a Olympijské ostrovy.", href: DISCORD_LINKS.roleplayInfo },
            { name: "#companies", desc: "Obchodný register (Metronon, Migaspin Inc., Crystal Corp., Hafiz & Partners) a zakladanie firiem.", href: DISCORD_LINKS.companies },
            { name: "#news-agencies", desc: "Nezávislé médiá (FNBC, Vox News, CCP News) a registrácia tlače.", href: DISCORD_LINKS.newsAgencies },
            { name: "#workers-hall", desc: "Oddelenie práce (Work Department) a Výbor pracovníkov.", href: DISCORD_LINKS.workersHall },
          ],
        },
      ],
    },
  },
};
