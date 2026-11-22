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
      seats: "9 / 15 MPs (61.7%, governing majority)",
      highlight: "government",
    },
    {
      abbr: "CCP–UF",
      name: "Christian-Conservative Party (United Conservative Coalition)",
      leader: "Dr. Attikasp (@attikasp)",
      ideology: "Christian democracy, national conservatism & traditionalism",
      motto: "Defend the traditions to defend the nation!",
      founded: "2025-11-04",
      seats: "6 / 15 MPs (38.3%, opposition)",
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
      seats: "9 / 15 mandátum (61,7%, kormánytöbbség)",
      highlight: "government",
    },
    {
      abbr: "CCP–UF",
      name: "Keresztény-Konzervatív Párt (Egyesült Konzervatív Koalíció)",
      leader: "Dr. Attikasp (@attikasp)",
      ideology: "Kereszténydemokrácia, nemzeti konzervativizmus és tradicionalizmus",
      motto: "Defend the traditions to defend the nation!",
      founded: "2025-11-04",
      seats: "6 / 15 mandátum (38,3%, ellenzék)",
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
      seats: "9 / 15 Sitze (61,7 %, Regierungsmehrheit)",
      highlight: "government",
    },
    {
      abbr: "CCP–UF",
      name: "Christlich-Konservative Partei (Vereinigte Konservative Koalition)",
      leader: "Dr. Attikasp (@attikasp)",
      ideology: "Christdemokratie, Nationalkonservatismus & Traditionalismus",
      motto: "Defend the traditions to defend the nation!",
      founded: "2025-11-04",
      seats: "6 / 15 Sitze (38,3 %, Opposition)",
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
      seats: "9 / 15 mandátov (61,7 %, vládna väčšina)",
      highlight: "government",
    },
    {
      abbr: "CCP–UF",
      name: "Kresťansko-konzervatívna strana (Zjednotená konzervatívna koalícia)",
      leader: "Dr. Attikasp (@attikasp)",
      ideology: "Kresťanská demokracia, národný konzervativizmus a tradicionalizmus",
      motto: "Defend the traditions to defend the nation!",
      founded: "2025-11-04",
      seats: "6 / 15 mandátov (38,3 %, opozícia)",
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
    chancelleryBadge: "State Portal of the Commonwealth",
    factSheetTitle: "National Fact Sheet of the Commonwealth",
    factSheetSubtitle: "Basic facts under the Constitution of October 24, 2026",
    facts: [
      { label: "Official State Name", value: "Empire of Furnovskyland's Commonwealth", detail: "Founded Oct 31, 2018 · Commonwealth since Apr 15, 2021" },
      { label: "Constitutional Order", value: "Democratic Parliamentary Monarchy", detail: "Constitution in force since Oct 24, 2026" },
      { label: "Head of State", value: "H.M. Emperor Furnovsky I", detail: "Commander-in-Chief & Chair of the Server Council" },
      { label: "Head of Government", value: "Prime Minister Levi (@deba15)", detail: "XIII. Federal Government (AfF Majority)" },
      { label: "Legislature", value: "15-Seat National Assembly", detail: "Unicameral · D'Hondt Proportional · Speaker Azurkapro" },
      { label: "Judiciary", value: "Supreme Court of the Commonwealth", detail: "Chief Justice Mig (@migaspincasterwill)" },
      { label: "Capital & Territory", value: "Furn-Hauptstadt · 546,861 km²", detail: "36 districts in 4 territories" },
      { label: "Population & Currency", value: "54.1M (RP) · 250+ Discord Citizens", detail: "Furn-Brule (Fß) · Central Bank of Furnovskyland" },
      { label: "Official Languages", value: "Hungarian, English, Slovak, German", detail: "Protected under Article H of the Constitution" },
      { label: "International Status", value: "League of Servers (LoS) Member State", detail: "Member under Article D of the Constitution · 11+ embassies" },
    ],
    whyJoinTitle: "Why Join Furnovskyland?",
    whyJoinSubtitle: "Citizens can draft laws in Parliament, run a Minecraft municipality, start a company, or publish a newspaper. Every institution is open to them.",
    whyJoinCards: [
      {
        badge: "Parliament & Parties",
        title: "Run for the 15-Seat National Assembly",
        description: "Every 4 months, citizens elect the 15-member National Assembly from D'Hondt proportional party lists. You can found a party with just 2 citizens, submit bills, debate at the Friday sittings held every second week, and form the Federal Government.",
        primaryLink: { label: "Register a Party", href: DISCORD_LINKS.registerParty },
        secondaryLink: { label: "Submit a Bill", href: DISCORD_LINKS.submitLaw },
      },
      {
        badge: "Roleplay & Municipalities",
        title: "Create Your Character & Govern a Settlement",
        description: "Design your character in the RP Character Maker, settle in Égerliget, Dzsungelfalva, the Olympic & Poseidon Islands, or Értilos, and run for Mayor in the municipal elections held every 5 months. Mayors sit on the Server Council.",
        primaryLink: { label: "Roleplay Forum", href: DISCORD_LINKS.roleplayInfo },
        secondaryLink: { label: "RP Character Maker", href: DISCORD_LINKS.rpCharacterMaker },
      },
      {
        badge: "Central Bank & Economy",
        title: "Trade in Furn-Brule (Fß) & Start a Company",
        description: "Take part in the Ora Economy regulated by the Central Bank of Furnovskyland (CBF). Start your own business alongside Metronon Company, Migaspin Inc., Crystal Corporation, and Hafiz & Partners Inc., or join the Work Department.",
        primaryLink: { label: "Companies Registry", href: DISCORD_LINKS.companies },
        secondaryLink: { label: "Create a Company", href: DISCORD_LINKS.createCompany },
      },
      {
        badge: "Free Press & Media",
        title: "Start an Independent News Agency",
        description: "Article VII of the 2026 Constitution protects the press. Outlets such as FNBC, Vox News, and CCP News report on government policy, host election debates, and cover life in the country.",
        primaryLink: { label: "News Agencies", href: DISCORD_LINKS.newsAgencies },
        secondaryLink: { label: "Launch an Outlet", href: DISCORD_LINKS.createNewsAgency },
      },
      {
        badge: "Diplomacy & Defence",
        title: "Foreign Service & Furnovskyland Defence Force",
        description: "Represent the Empire as a diplomat to 11+ partner states and the League of Servers (LoS), or enlist in the Furnovskyland Defence Force (FDF), which screens arrivals at the border and defends the country.",
        primaryLink: { label: "Foreign Embassies", href: DISCORD_LINKS.embassies },
        secondaryLink: { label: "Enlist in the FDF", href: DISCORD_LINKS.militaryApplication },
      },
      {
        badge: "Minecraft 1.21.11",
        title: "Build Cities, Metro Lines & Railways",
        description: "Connect to ujfurnvaros.aternos.me on Java or Bedrock Edition. Drive cars and fly aircraft with MTVehicles, ride the FM-01, FM-03, and FM-04 underground metro lines, and help build the Empire's cities.",
        primaryLink: { label: "Minecraft Portal", href: "/minecraft/" },
        secondaryLink: { label: "Server Chat", href: DISCORD_LINKS.minecraftChat },
      },
    ],
    portalTitle: "Directory",
    portalSubtitle: "Government, history, laws, and elections of the Commonwealth",
    portalCards: [
      { title: "Politics & Government", desc: "XIII. Federal Government, 15-seat National Assembly, Supreme Court, and registered political parties.", href: "/politika/", cta: "View Government" },
      { title: "History & Heraldry", desc: "The Empire's history from the coronation on October 31, 2018 to the 2026 Constitution.", href: "/tortenelem/", cta: "Read the History" },
      { title: "Legal Archive & Maps", desc: "Promulgated constitutions, acts, royal decrees, downloadable district maps, and Discord directory.", href: "/egyeb/", cta: "Browse Archive" },
      { title: "Elections & Law Votes", desc: "Vote in parliamentary elections, referendums, and law votes with your Discord account. Ballots are secret.", href: "/szavazas/", cta: "Go to Votes" },
    ],
    politicsExtras: {
      parliamentCompositionTitle: "2026 National Assembly Seat Distribution (15 Seats)",
      parliamentCompositionDesc: "Elected on November 1, 2026 under the D'Hondt proportional representation system (47 valid ballots cast).",
      govSeatsLabel: "Alliance for Furnovskyland (AfF): 9 seats (61.7%)",
      oppSeatsLabel: "United Conservative Coalition (CCP–UF): 6 seats (38.3%)",
      partiesTitle: "Registered Political Parties",
      partiesSubtitle: "Current electoral coalitions and older parties on the parliamentary register",
      partyLeader: "Leadership:",
      partyIdeology: "Ideology:",
      partyFounded: "Founded:",
      actionLinksTitle: "Take Part in Politics",
      actionLinksSubtitle: "Links to the legislative, election, and diplomacy channels on the Furnovskyland Discord server",
      links: [
        { label: "Submit a Bill (#submit-a-law)", desc: "Propose an ordinary law, cardinal law, or constitutional amendment to the National Assembly.", href: DISCORD_LINKS.submitLaw },
        { label: "Parliamentary Debates (#parliament-discussions)", desc: "Follow public sessions held every second Friday at 20:00 UTC and ongoing committee debates.", href: DISCORD_LINKS.parliamentDiscussions },
        { label: "Register a Political Party (#register-your-party)", desc: "Found a new political party with a name, ideology, motto, and at least 2 citizen members.", href: DISCORD_LINKS.registerParty },
        { label: "Election Registration (#election-registration)", desc: "Register party lists for National Assembly elections or stand for Mayor in your settlement.", href: DISCORD_LINKS.electionRegistration },
        { label: "The Federal Gazette (#federal-gazette)", desc: "Where acts signed via Sanctio Regia, imperial decrees, and court rulings are promulgated.", href: DISCORD_LINKS.federalGazette },
        { label: "Embassies & League of Servers (#league-of-servers)", desc: "Diplomatic missions, bilateral treaties, and League of Servers (LoS) inter-server affairs.", href: DISCORD_LINKS.leagueOfServers },
      ],
    },
    historyExtras: {
      heraldryShowcaseTitle: "State Symbols of the Empire of Furnovskyland's Commonwealth",
      flagCaption: "National Flag of Furnovskyland (Adopted 2018, Standardized 2019)",
      flagDetails: "Three horizontal stripes of red, white, and green with a yellow circle in the center.",
      coatCaption: "Imperial Coat of Arms, the Imperial Banner (Adopted April 15, 2021)",
      coatDetails: "Quartered shield with the Red Raven, Silver Ship, Silver Angel, and Red-Cowled Friar, and a purple heart-shield bearing the golden lily and triple knot, under the Royal Crown.",
    },
    minecraftExtras: {
      settlementsTitle: "Settlements and Their Mayors",
      settlementsSubtitle: "Under Articles 28–31 of the 2026 Constitution, each settlement elects its Mayor every 5 months and holds representation on the Server Council",
      mayorLabel: "Mayor:",
      settlements: [
        {
          name: "Égerliget",
          mayor: "Deputy PM & Speaker Azurkapro (@azurkapro)",
          desc: "Large residential and administrative town with a direct metro connection and public buildings.",
          channelHref: DISCORD_LINKS.egerliget,
          channelLabel: "Égerliget Municipal Thread",
        },
        {
          name: "Dzsungelfalva (Jungle Village)",
          mayor: "H.R.H. Damian Ramirez-Casterwill",
          desc: "Historic jungle province served by the Belső-Dzsungel Railway Station and regional transport links.",
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
          desc: "Autonomous settlement with traditional regional architecture and its own local council.",
        },
        {
          name: "Furn-Hauptstadt & Coastal City (ACCC)",
          mayor: "Imperial Capital Administration",
          desc: "Seat of the National Assembly, the Central Bank of Furnovskyland, St. Elizabeth's Catholic Church, and the Attila Krisztián Condominium Estates.",
        },
      ],
      infraTitle: "Infrastructure and Major Buildings",
      infraSubtitle: "State and corporate building projects covered by the Regional Construction Act (2026)",
      infraItems: [
        {
          title: "Central Bank of Furnovskyland (CBF Headquarters)",
          date: "Inaugurated Dec 5, 2025",
          desc: "Neoclassical bank building modeled on the National Bank of Romania in Bucharest, built by Hafiz and Partners Inc. It holds the central reserve of the Furn-Brule (Fß).",
        },
        {
          title: "Furnovskyland Underground Metro (FM-01, FM-03, FM-04)",
          date: "Expanded 2025–2026",
          desc: "Underground metro lines linking St. Elizabeth's Catholic Church, Csillagkép Hill, and central Furn-Hauptstadt.",
        },
        {
          title: "Belső-Dzsungel Railway Station & National Rail",
          date: "Completed Jan 1, 2026",
          desc: "Inter-regional rail hub connecting Dzsungelfalva with the capital plateau and outlying settlements.",
        },
        {
          title: "Attila Krisztián Condominium Estates (ACCC) & MTVehicles",
          date: "Launched Feb 7, 2026",
          desc: "Housing development in Coastal City. MTVehicles adds roads, cars, and aircraft across the server.",
        },
      ],
      rpBannerTitle: "Start Roleplaying",
      rpBannerDesc: "Register your character in the Discord Roleplay forum to buy property, open a business in Furn-Brule (Fß), or run for Mayor.",
      rpInfoBtn: "Open #roleplay-informations",
      rpMakerBtn: "RP Character Maker",
    },
    cultureExtras: {
      constitutionalTitle: "Constitutional National Holidays (Article I)",
      constitutionalSubtitle: "The four state holidays set out in Article I of the October 24, 2026 Constitution",
      nationalHolidays: [
        { date: "April 15", name: "National Federation Day", desc: "Commemorates the proclamation of the Empire of Furnovskyland's Commonwealth and the founding of the Discord server on April 15, 2021." },
        { date: "June 15", name: "Parliament Day", desc: "Celebrates the Parliament and democratic elections." },
        { date: "August 23", name: "Furnovsky I's Day", desc: "Birthday of His Majesty Emperor Furnovsky I, founder and sovereign of the nation." },
        { date: "October 31", name: "State Foundation Day & Halloween", desc: "Anniversary of Emperor Furnovsky I's coronation at 15:00 CET on October 31, 2018, when Furnovskyland was founded." },
      ],
      institutionsTitle: "Press, Sports & Cultural Institutions",
      institutionsSubtitle: "Media outlets, sport, and civic organizations in the Commonwealth",
      institutions: [
        {
          title: "Independent Press Corps (FNBC, Vox News, CCP News)",
          badge: "Protected by Article VII",
          desc: "Newspapers and broadcasters run by citizens. They cover parliamentary sittings, elections, and cultural events, and publish their own investigations.",
          href: DISCORD_LINKS.newsAgencies,
          cta: "Read #news-agencies",
        },
        {
          title: "The Commonwealth Games & LoS Discord Olympics",
          badge: "Commonwealth Games Act 2026",
          desc: "After Furnovskyland hosted the first LoS Discord Olympics in March 2024, the 2026 Commonwealth Games Act set up regular inter-regional tournaments.",
          href: DISCORD_LINKS.olympicIslands,
          cta: "Visit Olympic Islands",
        },
        {
          title: "Corporate & Workers' Guilds",
          badge: "Work Department & Companies",
          desc: "Metronon Company, Migaspin Inc., Crystal Corporation, Hafiz & Partners Inc., and the Committee of Workers sponsor cultural and building projects.",
          href: DISCORD_LINKS.companies,
          cta: "Open #companies",
        },
      ],
    },
    otherExtras: {
      directoryTitle: "Discord Channel Directory",
      directorySubtitle: "Links to the main channels for government, Parliament, border verification, and roleplay (Server ID: 836271168977764363)",
      categories: [
        {
          title: "Border Control & State Announcements",
          channels: [
            { name: "#verification-room", desc: "Border entry screening by the Furnovskyland Defence Force (within 72h under Article 39).", href: DISCORD_LINKS.verification },
            { name: "#channel-1", desc: "Imperial decrees, constitutional referendums, election results, and FUSCPS state alerts.", href: DISCORD_LINKS.channel1 },
            { name: "#ministry-announcements", desc: "Announcements from the Prime Minister and the ministries, and Sanctio Regia promulgations.", href: DISCORD_LINKS.ministryAnnouncements },
            { name: "#federal-gazette", desc: "The legal gazette set up under the Federal Gazette Act (July 2026).", href: DISCORD_LINKS.federalGazette },
          ],
        },
        {
          title: "National Assembly, Elections & Political Parties",
          channels: [
            { name: "#parliament-discussions", desc: "Public sittings (every second week) and debates of the 15-seat National Assembly.", href: DISCORD_LINKS.parliamentDiscussions },
            { name: "#submit-a-law", desc: "Submit bills, cardinal laws, and motions.", href: DISCORD_LINKS.submitLaw },
            { name: "#register-your-party", desc: "Register a new political party or electoral coalition.", href: DISCORD_LINKS.registerParty },
            { name: "#election-registration & #campaigns", desc: "Candidate registration and the 5-day campaign forum.", href: DISCORD_LINKS.electionRegistration },
          ],
        },
        {
          title: "Roleplay, Municipalities, Economy & Press",
          channels: [
            { name: "#roleplay-informations", desc: "RP Character Maker and municipal threads for Égerliget, Dzsungelfalva, and Olympic Islands.", href: DISCORD_LINKS.roleplayInfo },
            { name: "#companies", desc: "Corporate registry (Metronon, Migaspin Inc., Crystal Corp., Hafiz & Partners) and company creation.", href: DISCORD_LINKS.companies },
            { name: "#news-agencies", desc: "Independent media outlets (FNBC, Vox News, CCP News) and press registration.", href: DISCORD_LINKS.newsAgencies },
            { name: "#workers-hall", desc: "Work Department and Committee of Workers.", href: DISCORD_LINKS.workersHall },
          ],
        },
      ],
    },
  },
  hu: {
    chancelleryBadge: "A Nemzetszövetség állami portálja",
    factSheetTitle: "A Nemzetközösség névjegye",
    factSheetSubtitle: "Alapadatok a 2026. október 24-i Alaptörvény szerint",
    facts: [
      { label: "Hivatalos államnév", value: "Furnovskyföld Nemzetszövetségének Birodalma", detail: "Alapítva: 2018. okt. 31. · Nemzetszövetség: 2021. ápr. 15." },
      { label: "Államforma", value: "Demokratikus parlamentáris monarchia", detail: "Hatályos Alkotmány: 2026. október 24." },
      { label: "Államfő", value: "Őfelsége I. Furnovsky Császár", detail: "Főparancsnok és a Szerver Tanács elnöke" },
      { label: "Kormányfő", value: "Levi miniszterelnök (@deba15)", detail: "XIII. Szövetségi Kormány (AfF kormánytöbbség)" },
      { label: "Törvényhozás", value: "15 fős egykamarás Országgyűlés", detail: "D'Hondt arányos listás rendszer · Házelnök: Azurkapro" },
      { label: "Igazságszolgáltatás", value: "A Nemzetszövetség Legfelsőbb Bírósága", detail: "Főbíró: Mig (@migaspincasterwill)" },
      { label: "Főváros és terület", value: "Furn-Hauptstadt · 546 861 km²", detail: "36 kerület 4 nemzetszövetségi tartományban" },
      { label: "Népesség és valuta", value: "54,1 millió (RP) · 250+ Discord-polgár", detail: "Furn-Brule (Fß) · Furnovskyföldi Központi Bank" },
      { label: "Hivatalos nyelvek", value: "Magyar, angol, szlovák, német", detail: "Az Alkotmány H) cikke védi őket" },
      { label: "Nemzetközi tagság", value: "Szerverek Ligája (LoS) tagállam", detail: "Alkotmány D) cikk · 11+ kétoldalú nagykövetség" },
    ],
    whyJoinTitle: "Miért érdemes csatlakozni?",
    whyJoinSubtitle: "Polgárként törvényt írhatsz az Országgyűlésben, polgármesterként vezethetsz egy Minecraft-települést, cégeket alapíthatsz vagy újságot adhatsz ki. Minden állami intézmény nyitva áll előtted.",
    whyJoinCards: [
      {
        badge: "Országgyűlés és pártok",
        title: "Indulj a 15 fős Országgyűlés választásán",
        description: "A polgárok 4 havonta D'Hondt-féle arányos pártlistás rendszerben választják meg a 15 tagú Országgyűlést. Alapíts saját pártot mindössze 2 polgárral, nyújts be törvényjavaslatokat, és vegyél részt a kéthetenkénti pénteki üléseken.",
        primaryLink: { label: "Pártalapítás", href: DISCORD_LINKS.registerParty },
        secondaryLink: { label: "Törvény benyújtása", href: DISCORD_LINKS.submitLaw },
      },
      {
        badge: "Roleplay és önkormányzatok",
        title: "Hozd létre a karakteredet, és légy polgármester",
        description: "Regisztráld karakteredet az RP Character Makerben, telepedj le Égerligeten, Dzsungelfalván, az Olimpiai és Poszeidón-szigeteken vagy Értiloson, és indulj az 5 havonta tartott polgármester-választásokon.",
        primaryLink: { label: "Roleplay-fórum", href: DISCORD_LINKS.roleplayInfo },
        secondaryLink: { label: "RP Karakterkészítő", href: DISCORD_LINKS.rpCharacterMaker },
      },
      {
        badge: "Központi bank és gazdaság",
        title: "Furn-Brule (Fß) gazdaság és cégalapítás",
        description: "Vegyél részt a Furnovskyföldi Központi Bank (CBF) által felügyelt Ora gazdaságban. Alapíts saját céget a Metronon Company, Migaspin Inc., Crystal Corporation és Hafiz & Partners Inc. mellett, vagy csatlakozz a Munkaügyi Osztályhoz.",
        primaryLink: { label: "Cégjegyzék", href: DISCORD_LINKS.companies },
        secondaryLink: { label: "Vállalat alapítása", href: DISCORD_LINKS.createCompany },
      },
      {
        badge: "Szabad sajtó és média",
        title: "Indíts független hírügynökséget",
        description: "A 2026-os Alkotmány VII. cikke garantálja a sajtószabadságot: az FNBC, a Vox News és a CCP News mellett saját szerkesztőséget alapíthatsz, tudósíthatsz a parlamenti vitákról és választásokról.",
        primaryLink: { label: "Hírügynökségek", href: DISCORD_LINKS.newsAgencies },
        secondaryLink: { label: "Újság alapítása", href: DISCORD_LINKS.createNewsAgency },
      },
      {
        badge: "Diplomácia és honvédelem",
        title: "Külügyi szolgálat és Védelmi Erők (FDF)",
        description: "Képviseld a Birodalmat nagykövetként 11+ partnerállamban és a Szerverek Ligájában (LoS), vagy csatlakozz a határőrizetért és nemzetbiztonságért felelős Furnovskyland Defence Force (FDF) kötelékéhez.",
        primaryLink: { label: "Nagykövetségek", href: DISCORD_LINKS.embassies },
        secondaryLink: { label: "FDF-jelentkezés", href: DISCORD_LINKS.militaryApplication },
      },
      {
        badge: "Minecraft 1.21.11",
        title: "Építs városokat, metróvonalakat és vasutat",
        description: "Csatlakozz az ujfurnvaros.aternos.me szerverhez Java vagy Bedrock kiadásról. Vezess autókat és repülőket (MTVehicles), utazz az FM-01, FM-03 és FM-04 metróvonalakon, és építsd a Birodalom városait.",
        primaryLink: { label: "Minecraft-portál", href: "/minecraft/" },
        secondaryLink: { label: "Szerverchat", href: DISCORD_LINKS.minecraftChat },
      },
    ],
    portalTitle: "Tartalomjegyzék",
    portalSubtitle: "A Nemzetszövetség kormányzata, történelme, törvényei és választásai",
    portalCards: [
      { title: "Politika és Kormányzat", desc: "XIII. Szövetségi Kormány, 15 fős Országgyűlés, Legfelsőbb Bíróság és bejegyzett politikai pártok.", href: "/politika/", cta: "Kormányzat" },
      { title: "Történelem és Heraldika", desc: "A Birodalom története a 2018. október 31-i koronázástól a 2026-os Alkotmányig.", href: "/tortenelem/", cta: "Történelem" },
      { title: "Törvénytár és Térképek", desc: "Hatályos alkotmányok, törvények, uralkodói rendeletek, letölthető kerületi térképek és Discord-jegyzék.", href: "/egyeb/", cta: "Törvénytár megnyitása" },
      { title: "Választások és Szavazások", desc: "Szavazz a parlamenti választásokon és törvényszavazásokon a Discord-fiókoddal. A szavazás titkos.", href: "/szavazas/", cta: "Szavazások" },
    ],
    politicsExtras: {
      parliamentCompositionTitle: "Az Országgyűlés mandátumai (2026. november, 15 mandátum)",
      parliamentCompositionDesc: "Megválasztva 2026. november 1-jén D'Hondt-féle arányos listás választási rendszerben (47 érvényes szavazat alapján).",
      govSeatsLabel: "Alliance for Furnovskyland (AfF): 9 mandátum (61,7%)",
      oppSeatsLabel: "Egyesült Konzervatív Koalíció (CCP–UF): 6 mandátum (38,3%)",
      partiesTitle: "Bejegyzett pártok és koalíciók",
      partiesSubtitle: "A parlamenti nyilvántartásban szereplő mostani választási szövetségek és korábbi pártok",
      partyLeader: "Vezető:",
      partyIdeology: "Ideológia:",
      partyFounded: "Alapítva:",
      actionLinksTitle: "Vegyél részt a politikában",
      actionLinksSubtitle: "A Furnovskyland Discord-szerver törvényhozási, választási és diplomáciai csatornái",
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
      heraldryShowcaseTitle: "Furnovskyföld Nemzetszövetségének Birodalma állami jelképei",
      flagCaption: "Furnovskyföld nemzeti zászlaja (elfogadva: 2018, véglegesítve: 2019)",
      flagDetails: "Három egyenlő szélességű piros, fehér és zöld vízszintes sáv, közepén sárga körrel.",
      coatCaption: "Birodalmi Címer, The Imperial Banner (elfogadva: 2021. április 15.)",
      coatDetails: "Csücskös talpú, négyelt pajzs: az első ezüst mezőben vörös holló, a második vörös mezőben ezüst hajó, a harmadik vörös mezőben ezüst angyal, a negyedik ezüst mezőben vörös csuklyás barát, középen bíbor boglárpajzson arany liliom és hármas csomó, a pajzson zárt királyi koronával.",
    },
    minecraftExtras: {
      settlementsTitle: "Települések és polgármestereik",
      settlementsSubtitle: "A 2026-os Alkotmány 28–31. cikkei alapján minden település 5 havonta közvetlenül választ polgármestert, aki tagja a Szerver Tanácsnak",
      mayorLabel: "Polgármester:",
      settlements: [
        {
          name: "Égerliget",
          mayor: "Azurkapro miniszterelnök-helyettes és házelnök (@azurkapro)",
          desc: "Központi fekvésű város közvetlen metrókapcsolattal és közintézményekkel.",
          channelHref: DISCORD_LINKS.egerliget,
          channelLabel: "Égerligeti fórum",
        },
        {
          name: "Dzsungelfalva (Jungle Village)",
          mayor: "H.R.H. Damian Ramirez-Casterwill",
          desc: "Történelmi dzsungeltartomány, amelynek közlekedési csomópontja a Belső-Dzsungel Vasútállomás.",
          channelHref: DISCORD_LINKS.dzsungelfalva,
          channelLabel: "Dzsungelfalvi fórum",
        },
        {
          name: "Olimpiai és Poszeidón-szigetek (Olympic & Poseidon Islands)",
          mayor: "MeteorBarni",
          desc: "Szigeti önkormányzat és sportközpont, a Nemzetközösségi Játékok és az LoS Olimpiák helyszíne.",
          channelHref: DISCORD_LINKS.olympicIslands,
          channelLabel: "Olimpiai-szigeteki fórum",
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
      infraTitle: "Infrastruktúra és nagy építkezések",
      infraSubtitle: "Állami és vállalati építkezések a 2026. évi Regionális Építési Törvény alapján",
      infraItems: [
        {
          title: "Furnovskyföldi Központi Bank (CBF Székház)",
          date: "Felavatva: 2025. dec. 5.",
          desc: "A bukaresti Román Nemzeti Bank mintájára, a Hafiz and Partners Inc. által épített neoklasszicista banképület. Itt van a Furn-Brule (Fß) központi tartaléka.",
        },
        {
          title: "Furnovskyföldi Földalatti Metróhálózat (FM-01, FM-03, FM-04)",
          date: "Kiépítve: 2025–2026",
          desc: "Földalatti metróvonalak, amelyek összekötik a Szent Erzsébet Katolikus Templomot, a Csillagkép-hegyet és a fővárost.",
        },
        {
          title: "Belső-Dzsungel Vasútállomás és Nemzeti Vasút",
          date: "Átadva: 2026. jan. 1.",
          desc: "Regionális vasúti csomópont, amely összeköti Dzsungelfalvát a fővárosi fennsíkkal és a környező településekkel.",
        },
        {
          title: "Attila Krisztián Lakótelep (ACCC) és MTVehicles",
          date: "Indult: 2026. febr. 7.",
          desc: "Lakópark Coastal Cityben. Az MTVehicles utakat, autókat és repülőket hoz az egész szerverre.",
        },
      ],
      rpBannerTitle: "Kezdj el roleplayezni",
      rpBannerDesc: "Regisztráld karakteredet a Discord Roleplay fórumban ingatlanvásárláshoz, Furn-Brule (Fß) vállalkozás indításához vagy polgármesterjelöltséghez.",
      rpInfoBtn: "#roleplay-informations megnyitása",
      rpMakerBtn: "RP Karakterkészítő",
    },
    cultureExtras: {
      constitutionalTitle: "Alkotmányos nemzeti ünnepek (Alkotmány I. cikk)",
      constitutionalSubtitle: "A 2026. október 24-i Alkotmány I. cikkében rögzített négy állami ünnep",
      nationalHolidays: [
        { date: "Április 15.", name: "A Nemzeti Föderáció Napja", desc: "Furnovskyföld Nemzetszövetsége kikiáltásának és a hivatalos Discord-szerver 2021. április 15-i alapításának ünnepe." },
        { date: "Június 15.", name: "A Parlament Napja", desc: "A Parlament és a demokratikus választások ünnepe." },
        { date: "Augusztus 23.", name: "I. Furnovsky Napja", desc: "Őfelsége I. Furnovsky császár, az államalapító uralkodó születésnapja." },
        { date: "Október 31.", name: "Államalapítás Ünnepe és Halloween", desc: "I. Furnovsky Császár 2018. október 31-én 15:00 órakor megtartott koronázásának és az államalapításnak az évfordulója." },
      ],
      institutionsTitle: "Sajtó, sport és kulturális intézmények",
      institutionsSubtitle: "Médiumok, sport és társadalmi szervezetek a Nemzetközösségben",
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
          desc: "Miután Furnovskyföld 2024 márciusában megrendezte az első LoS Discord Olimpiát, a 2026-os Nemzetközösségi Játékokról szóló törvény rendszeres régióközi versenyeket vezetett be.",
          href: DISCORD_LINKS.olympicIslands,
          cta: "Olimpiai-szigetek",
        },
        {
          title: "Vállalati és munkáskamarák",
          badge: "Munkaügyi Osztály és Vállalatok",
          desc: "A Metronon Company, a Migaspin Inc., a Crystal Corporation, a Hafiz & Partners Inc. és a Dolgozók Bizottsága kulturális és építési projekteket támogat.",
          href: DISCORD_LINKS.companies,
          cta: "#companies megnyitása",
        },
      ],
    },
    otherExtras: {
      directoryTitle: "Discord-csatornák jegyzéke",
      directorySubtitle: "A kormányzat, az Országgyűlés, a határellenőrzés és a roleplay fő csatornái (Szerver ID: 836271168977764363)",
      categories: [
        {
          title: "Határellenőrzés és állami közlemények",
          channels: [
            { name: "#verification-room", desc: "Határbeléptetés a Furnovskyland Defence Force által (72 órán belül az Alkotmány 39. cikke alapján).", href: DISCORD_LINKS.verification },
            { name: "#channel-1", desc: "Császári rendeletek, alkotmányos népszavazások, választási eredmények és FUSCPS közlemények.", href: DISCORD_LINKS.channel1 },
            { name: "#ministry-announcements", desc: "A Miniszterelnökség és a minisztériumok közleményei, valamint a Sanctio Regia kihirdetések.", href: DISCORD_LINKS.ministryAnnouncements },
            { name: "#federal-gazette", desc: "A 2026. júliusi Federal Gazette Bill által létrehozott Szövetségi Közlöny.", href: DISCORD_LINKS.federalGazette },
          ],
        },
        {
          title: "Országgyűlés, választások és pártok",
          channels: [
            { name: "#parliament-discussions", desc: "A 15 fős Országgyűlés nyilvános ülései (kéthetente pénteken) és vitái.", href: DISCORD_LINKS.parliamentDiscussions },
            { name: "#submit-a-law", desc: "Törvényjavaslatok, sarkalatos törvények és határozati javaslatok benyújtása.", href: DISCORD_LINKS.submitLaw },
            { name: "#register-your-party", desc: "Új párt vagy választási koalíció bejegyzése.", href: DISCORD_LINKS.registerParty },
            { name: "#election-registration & #campaigns", desc: "Jelöltállítás és az 5 napos kampányidőszak fóruma.", href: DISCORD_LINKS.electionRegistration },
          ],
        },
        {
          title: "Roleplay, települések, gazdaság és sajtó",
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
    chancelleryBadge: "Staatsportal des Commonwealth",
    factSheetTitle: "Staatsprofil des Commonwealth Furnovskyland",
    factSheetSubtitle: "Eckdaten nach dem Grundgesetz vom 24. Oktober 2026",
    facts: [
      { label: "Offizieller Staatsname", value: "Commonwealth-Kaiserreich Furnovskyland", detail: "Gegründet am 31. Okt. 2018 · Commonwealth seit 15. Apr. 2021" },
      { label: "Staatsform", value: "Demokratische parlamentarische Monarchie", detail: "Verfassung in Kraft seit 24. Oktober 2026" },
      { label: "Staatsoberhaupt", value: "S.M. Kaiser Furnovsky I.", detail: "Oberbefehlshaber & Vorsitzender des Serverrats" },
      { label: "Regierungschef", value: "Premierminister Levi (@deba15)", detail: "XIII. Bundesregierung (AfF-Mehrheit)" },
      { label: "Legislative", value: "15-köpfige Nationalversammlung", detail: "Einkammerparlament · D'Hondt-Verfahren · Sprecher Azurkapro" },
      { label: "Judikative", value: "Oberster Gerichtshof des Commonwealth", detail: "Oberster Richter Mig (@migaspincasterwill)" },
      { label: "Hauptstadt & Fläche", value: "Furn-Hauptstadt · 546.861 km²", detail: "36 Bezirke in 4 Commonwealth-Territorien" },
      { label: "Bevölkerung & Währung", value: "54,1 Mio. (RP) · 250+ Discord-Bürger", detail: "Furn-Brule (Fß) · Zentralbank von Furnovskyland" },
      { label: "Amtssprachen", value: "Ungarisch, Englisch, Slowakisch, Deutsch", detail: "Geschützt nach Artikel H der Verfassung" },
      { label: "Internationaler Status", value: "Mitgliedstaat der League of Servers (LoS)", detail: "Mitglied nach Artikel D der Verfassung · 11+ Botschaften" },
    ],
    whyJoinTitle: "Warum Furnovskyland beitreten?",
    whyJoinSubtitle: "Bürger können Gesetze im Parlament einbringen, als Bürgermeister eine Minecraft-Gemeinde führen, ein Unternehmen gründen oder eine Zeitung herausgeben. Alle Institutionen stehen ihnen offen.",
    whyJoinCards: [
      {
        badge: "Parlament & Parteien",
        title: "Kandidieren Sie für die 15-köpfige Nationalversammlung",
        description: "Alle 4 Monate wählen die Bürger die 15-köpfige Nationalversammlung nach dem D'Hondt-Verhältniswahlrecht. Gründen Sie mit nur 2 Bürgern eine Partei, reichen Sie Gesetzentwürfe ein und bilden Sie die Bundesregierung.",
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
        description: "Artikel VII der Verfassung von 2026 schützt die Presse. Medien wie FNBC, Vox News und CCP News berichten über Parlamentsdebatten, Wahlen und das öffentliche Leben.",
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
        description: "Verbinden Sie sich mit ujfurnvaros.aternos.me (Java & Bedrock). Nutzen Sie Autos und Flugzeuge (MTVehicles), fahren Sie mit den U-Bahn-Linien FM-01, FM-03 und FM-04 und bauen Sie an den Städten des Reiches mit.",
        primaryLink: { label: "Minecraft-Portal", href: "/minecraft/" },
        secondaryLink: { label: "Server-Chat", href: DISCORD_LINKS.minecraftChat },
      },
    ],
    portalTitle: "Übersicht",
    portalSubtitle: "Regierung, Geschichte, Gesetze und Wahlen des Commonwealth",
    portalCards: [
      { title: "Politik & Regierung", desc: "XIII. Bundesregierung, 15-köpfige Nationalversammlung, Oberster Gerichtshof und registrierte Parteien.", href: "/politika/", cta: "Zur Regierung" },
      { title: "Geschichte & Heraldik", desc: "Die Geschichte des Reiches von der Krönung am 31. Oktober 2018 bis zur Verfassung von 2026.", href: "/tortenelem/", cta: "Zur Geschichte" },
      { title: "Gesetzesarchiv & Karten", desc: "Verkündete Verfassungen, Gesetze, Dekrete, herunterladbare Bezirkskarten und Discord-Verzeichnis.", href: "/egyeb/", cta: "Archiv öffnen" },
      { title: "Wahlen & Abstimmungen", desc: "Stimmen Sie mit Ihrem Discord-Konto bei Parlamentswahlen und Gesetzesabstimmungen ab. Die Wahl ist geheim.", href: "/szavazas/", cta: "Zu den Abstimmungen" },
    ],
    politicsExtras: {
      parliamentCompositionTitle: "Sitzverteilung der Nationalversammlung 2026 (15 Sitze)",
      parliamentCompositionDesc: "Gewählt am 1. November 2026 nach dem D'Hondt-Verhältniswahlrecht (47 gültige Stimmen).",
      govSeatsLabel: "Alliance for Furnovskyland (AfF): 9 Sitze (61,7 %)",
      oppSeatsLabel: "Vereinigte Konservative Koalition (CCP–UF): 6 Sitze (38,3 %)",
      partiesTitle: "Registrierte Parteien",
      partiesSubtitle: "Aktuelle Wahlbündnisse und frühere Parteien im Parlamentsregister",
      partyLeader: "Vorsitz:",
      partyIdeology: "Ideologie:",
      partyFounded: "Gegründet:",
      actionLinksTitle: "Politisch mitmachen",
      actionLinksSubtitle: "Links zu den Gesetzgebungs-, Wahl- und Diplomatiekanälen auf dem Discord-Server",
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
      flagCaption: "Nationalflagge von Furnovskyland (eingeführt 2018, standardisiert 2019)",
      flagDetails: "Drei horizontale Streifen in Rot, Weiß und Grün mit einem gelben Kreis in der Mitte.",
      coatCaption: "Kaiserliches Wappen, The Imperial Banner (angenommen am 15. April 2021)",
      coatDetails: "Gevierter Schild mit rotem Raben, silbernem Schiff, silbernem Engel und rotgekapptem Mönch sowie purpurnem Herzschild mit goldener Lilie und Dreifachknoten unter der Königskrone.",
    },
    minecraftExtras: {
      settlementsTitle: "Siedlungen und ihre Bürgermeister",
      settlementsSubtitle: "Gemäß Artikel 28–31 der Verfassung von 2026 wählt jede Gemeinde alle 5 Monate ihren Bürgermeister, der im Serverrat vertreten ist",
      mayorLabel: "Bürgermeister:",
      settlements: [
        {
          name: "Égerliget",
          mayor: "Stellv. PM & Parlamentssprecher Azurkapro (@azurkapro)",
          desc: "Große Wohn- und Verwaltungsgemeinde mit direkter U-Bahn-Anbindung und öffentlichen Bauten.",
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
      infraTitle: "Infrastruktur und Großbauten",
      infraSubtitle: "Staatliche und privatwirtschaftliche Bauwerke unter dem Regionalen Baugesetz (2026)",
      infraItems: [
        {
          title: "Zentralbank von Furnovskyland (CBF-Hauptsitz)",
          date: "Eröffnet am 5. Dez. 2025",
          desc: "Neoklassizistisches Bankgebäude nach dem Vorbild der Rumänischen Nationalbank in Bukarest, erbaut von Hafiz and Partners Inc. Hier liegt die Zentralreserve des Furn-Brule (Fß).",
        },
        {
          title: "U-Bahn-Netz Furnovskyland (FM-01, FM-03, FM-04)",
          date: "Ausgebaut 2025–2026",
          desc: "U-Bahn-Linien zwischen der St.-Elisabeth-Kirche, dem Csillagkép-Hügel und dem Zentrum von Furn-Hauptstadt.",
        },
        {
          title: "Bahnhof Belső-Dzsungel & Nationale Eisenbahn",
          date: "Fertiggestellt am 1. Jan. 2026",
          desc: "Überregionaler Eisenbahnknotenpunkt, der Dzsungelfalva mit dem Hauptstadtplateau verbindet.",
        },
        {
          title: "Attila-Krisztián-Wohnanlagen (ACCC) & MTVehicles",
          date: "Begonnen am 7. Feb. 2026",
          desc: "Wohnanlagen in Coastal City. MTVehicles bringt Straßen, Autos und Flugzeuge auf den ganzen Server.",
        },
      ],
      rpBannerTitle: "Mit dem Roleplay beginnen",
      rpBannerDesc: "Registrieren Sie Ihren Charakter im Discord-Roleplay-Forum, um Immobilien zu erwerben, Unternehmen in Furn-Brule (Fß) zu führen oder als Bürgermeister zu kandidieren.",
      rpInfoBtn: "#roleplay-informations öffnen",
      rpMakerBtn: "RP Character Maker",
    },
    cultureExtras: {
      constitutionalTitle: "Verfassungsmäßige Nationalfeiertage (Artikel I)",
      constitutionalSubtitle: "Die vier Staatsfeiertage nach Artikel I der Verfassung vom 24. Oktober 2026",
      nationalHolidays: [
        { date: "15. April", name: "Tag der Nationalen Föderation", desc: "Erinnert an die Proklamation des Commonwealth-Kaiserreichs Furnovskyland und die Gründung des Discord-Servers am 15. April 2021." },
        { date: "15. Juni", name: "Tag des Parlaments", desc: "Feiert das Parlament und demokratische Wahlen." },
        { date: "23. August", name: "Tag Kaiser Furnovskys I.", desc: "Geburtstag Seiner Majestät Kaiser Furnovsky I., Gründer und Souverän der Nation." },
        { date: "31. Oktober", name: "Staatsgründungstag & Halloween", desc: "Jahrestag der Krönung Kaiser Furnovskys I. am 31. Oktober 2018 um 15:00 Uhr MEZ." },
      ],
      institutionsTitle: "Presse-, Sport- & Kulturinstitutionen",
      institutionsSubtitle: "Medien, Sport und gesellschaftliche Organisationen im Commonwealth",
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
          desc: "Nachdem Furnovskyland im März 2024 die erste LoS Discord-Olympiade ausgerichtet hatte, führte das Commonwealth-Spiele-Gesetz 2026 regelmäßige Turniere ein.",
          href: DISCORD_LINKS.olympicIslands,
          cta: "Olympische Inseln",
        },
        {
          title: "Unternehmens- & Arbeitergilden",
          badge: "Arbeitsministerium & Firmen",
          desc: "Metronon Company, Migaspin Inc., Crystal Corporation, Hafiz & Partners Inc. und das Arbeiterkomitee fördern Kultur- und Bauprojekte.",
          href: DISCORD_LINKS.companies,
          cta: "#companies öffnen",
        },
      ],
    },
    otherExtras: {
      directoryTitle: "Discord-Kanalverzeichnis",
      directorySubtitle: "Links zu den wichtigsten Kanälen für Regierung, Parlament, Grenzkontrolle und Roleplay (Server-ID: 836271168977764363)",
      categories: [
        {
          title: "Grenzkontrolle & staatliche Bekanntmachungen",
          channels: [
            { name: "#verification-room", desc: "Einreiseprüfung durch die Furnovskyland Defence Force (binnen 72 Stunden gemäß Artikel 39).", href: DISCORD_LINKS.verification },
            { name: "#channel-1", desc: "Kaiserliche Dekrete, Verfassungsreferenden, Wahlergebnisse und FUSCPS-Meldungen.", href: DISCORD_LINKS.channel1 },
            { name: "#ministry-announcements", desc: "Mitteilungen des Premierministers und der Ministerien sowie Sanctio-Regia-Verkündungen.", href: DISCORD_LINKS.ministryAnnouncements },
            { name: "#federal-gazette", desc: "Das Bundesgesetzblatt nach dem Federal Gazette Act (Juli 2026).", href: DISCORD_LINKS.federalGazette },
          ],
        },
        {
          title: "Nationalversammlung, Wahlen & Parteien",
          channels: [
            { name: "#parliament-discussions", desc: "Öffentliche Sitzungen (alle zwei Wochen) und Debatten der 15-köpfigen Nationalversammlung.", href: DISCORD_LINKS.parliamentDiscussions },
            { name: "#submit-a-law", desc: "Gesetzesinitiative für einfache Gesetze, Organgesetze und Anträge.", href: DISCORD_LINKS.submitLaw },
            { name: "#register-your-party", desc: "Neue Partei oder neues Wahlbündnis registrieren.", href: DISCORD_LINKS.registerParty },
            { name: "#election-registration & #campaigns", desc: "Kandidatenanmeldung und das 5-tägige Wahlkampfforum.", href: DISCORD_LINKS.electionRegistration },
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
    chancelleryBadge: "Štátny portál Spoločenstva",
    factSheetTitle: "Štátny profil Spoločenstva Furnovskyland",
    factSheetSubtitle: "Základné údaje podľa Ústavy z 24. októbra 2026",
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
      { label: "Medzinárodné postavenie", value: "Členský štát Ligy serverov (LoS)", detail: "Člen podľa čl. D Ústavy · 11+ veľvyslanectiev" },
    ],
    whyJoinTitle: "Prečo sa pridať k Furnovskylandu?",
    whyJoinSubtitle: "Občania môžu navrhovať zákony v Parlamente, spravovať obec v Minecrafte ako starostovia, viesť firmu alebo vydávať noviny. Každá inštitúcia je im otvorená.",
    whyJoinCards: [
      {
        badge: "Parlament a strany",
        title: "Kandidujte do 15-členného Národného zhromaždenia",
        description: "Každé 4 mesiace občania volia 15-členné Národné zhromaždenie pomerným systémom D'Hondt. Založte vlastnú politickú stranu len s 2 občanmi, predkladajte zákony a formujte federálnu vládu.",
        primaryLink: { label: "Registrovať stranu", href: DISCORD_LINKS.registerParty },
        secondaryLink: { label: "Predložiť zákon", href: DISCORD_LINKS.submitLaw },
      },
      {
        badge: "Roleplay a samosprávy",
        title: "Vytvorte si postavu a staňte sa starostom",
        description: "Vytvorte si postavu v RP Character Maker, usaďte sa v obciach Égerliget, Dzsungelfalva, Olympijské a Poseidónove ostrovy alebo Értilos a kandidujte v komunálnych voľbách každých 5 mesiacov.",
        primaryLink: { label: "Roleplay fórum", href: DISCORD_LINKS.roleplayInfo },
        secondaryLink: { label: "RP Character Maker", href: DISCORD_LINKS.rpCharacterMaker },
      },
      {
        badge: "Centrálna banka a ekonomika",
        title: "Obchodujte vo Furn-Brule (Fß) a zakladajte firmy",
        description: "Zapojte sa do ekonomiky Ora regulovanej Centrálnou bankou Furnovskylandu (CBF). Založte spoločnosť popri Metronon Company, Migaspin Inc., Crystal Corporation a Hafiz & Partners Inc. alebo vstúpte do Oddelenia práce.",
        primaryLink: { label: "Register firiem", href: DISCORD_LINKS.companies },
        secondaryLink: { label: "Založiť spoločnosť", href: DISCORD_LINKS.createCompany },
      },
      {
        badge: "Slobodná tlač a médiá",
        title: "Založte nezávislú tlačovú agentúru",
        description: "Článok VII Ústavy z roku 2026 chráni tlač. Médiá ako FNBC, Vox News a CCP News sledujú prácu vlády, organizujú volebné debaty a píšu o živote v krajine.",
        primaryLink: { label: "Tlačové agentúry", href: DISCORD_LINKS.newsAgencies },
        secondaryLink: { label: "Založiť médium", href: DISCORD_LINKS.createNewsAgency },
      },
      {
        badge: "Diplomacia a obrana",
        title: "Zahraničná služba a obranné sily (FDF)",
        description: "Zastupujte Ríšu ako diplomat v 11+ partnerských štátoch a Lige serverov (LoS) alebo vstúpte do Furnovskyland Defence Force (FDF) zabezpečujúcich hraničnú kontrolu a obranu.",
        primaryLink: { label: "Veľvyslanectvá", href: DISCORD_LINKS.embassies },
        secondaryLink: { label: "Prihláška do FDF", href: DISCORD_LINKS.militaryApplication },
      },
      {
        badge: "Minecraft 1.21.11",
        title: "Stavajte mestá, linky metra a železnice",
        description: "Pripojte sa na ujfurnvaros.aternos.me cez Java alebo Bedrock edíciu. Jazdite autami a lietadlami (MTVehicles), cestujte linkami metra FM-01, FM-03 a FM-04 a pomáhajte stavať mestá Ríše.",
        primaryLink: { label: "Minecraft portál", href: "/minecraft/" },
        secondaryLink: { label: "Serverový chat", href: DISCORD_LINKS.minecraftChat },
      },
    ],
    portalTitle: "Prehľad",
    portalSubtitle: "Vláda, história, zákony a voľby Spoločenstva",
    portalCards: [
      { title: "Politika a vláda", desc: "XIII. federálna vláda, 15-členné Národné zhromaždenie, Najvyšší súd a registrované politické strany.", href: "/politika/", cta: "Prejsť na vládu" },
      { title: "História a heraldika", desc: "Dejiny Ríše od korunovácie 31. októbra 2018 po Ústavu z roku 2026.", href: "/tortenelem/", cta: "Prejsť na históriu" },
      { title: "Archív zákonov a mapy", desc: "Vyhlásené ústavy, zákony, dekréty, mapy okresov na stiahnutie a adresár Discord kanálov.", href: "/egyeb/", cta: "Otvoriť archív" },
      { title: "Voľby a hlasovania", desc: "Hlasujte v parlamentných voľbách a o zákonoch cez svoj Discord účet. Hlasovanie je tajné.", href: "/szavazas/", cta: "Prejsť na hlasovania" },
    ],
    politicsExtras: {
      parliamentCompositionTitle: "Rozdelenie mandátov Národného zhromaždenia 2026 (15 kresiel)",
      parliamentCompositionDesc: "Zvolené 1. novembra 2026 podľa pomerného systému D'Hondt (47 platných hlasovacích lístkov).",
      govSeatsLabel: "Alliance for Furnovskyland (AfF): 9 mandátov (61,7 %)",
      oppSeatsLabel: "Zjednotená konzervatívna koalícia (CCP–UF): 6 mandátov (38,3 %)",
      partiesTitle: "Registrované politické strany",
      partiesSubtitle: "Súčasné volebné koalície a staršie strany zapísané v parlamentnom registri",
      partyLeader: "Vedenie:",
      partyIdeology: "Ideológia:",
      partyFounded: "Založená:",
      actionLinksTitle: "Zapojte sa do politiky",
      actionLinksSubtitle: "Odkazy na legislatívne, volebné a diplomatické kanály na Discord serveri Furnovskyland",
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
      flagCaption: "Štátna vlajka Furnovskylandu (prijatá 2018, štandardizovaná 2019)",
      flagDetails: "Tri vodorovné pruhy červenej, bielej a zelenej farby so žltým kruhom v strede.",
      coatCaption: "Cisársky štátny znak, The Imperial Banner (prijatý 15. apríla 2021)",
      coatDetails: "Štvrtený štít s červeným havranom, striebornou loďou, strieborným anjelom a červeno odetým mníchom, so stredovým purpurovým srdcovým štítom so zlatou ľaliou a trojitým uzlom pod kráľovskou korunou.",
    },
    minecraftExtras: {
      settlementsTitle: "Sídla a ich starostovia",
      settlementsSubtitle: "Podľa článkov 28–31 Ústavy z roku 2026 si každé sídlo volí starostu každých 5 mesiacov so zastúpením v Serverovej rade",
      mayorLabel: "Starosta:",
      settlements: [
        {
          name: "Égerliget",
          mayor: "Podpredseda vlády a predseda parlamentu Azurkapro (@azurkapro)",
          desc: "Veľká obytná a administratívna obec s priamym napojením na metro a verejnými budovami.",
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
      infraTitle: "Infraštruktúra a veľké stavby",
      infraSubtitle: "Štátne a firemné stavby podľa Zákona o regionálnej výstavbe (2026)",
      infraItems: [
        {
          title: "Centrálna banka Furnovskylandu (Sídlo CBF)",
          date: "Otvorená 5. dec. 2025",
          desc: "Neoklasicistická budova banky postavená podľa vzoru Rumunskej národnej banky v Bukurešti spoločnosťou Hafiz and Partners Inc. Uchováva centrálne rezervy meny Furn-Brule (Fß).",
        },
        {
          title: "Podzemné metro Furnovskylandu (FM-01, FM-03, FM-04)",
          date: "Rozšírené 2025–2026",
          desc: "Linky podzemného metra spájajúce Katolícky kostol sv. Alžbety, vrch Csillagkép a centrum Furn-Hauptstadtu.",
        },
        {
          title: "Železničná stanica Belső-Dzsungel a Národná železnica",
          date: "Dokončená 1. jan. 2026",
          desc: "Medziregionálny železničný uzol spájajúci Dzsungelfalvu s náhornou plošinou hlavného mesta.",
        },
        {
          title: "Sídlisko Attila Krisztián (ACCC) a MTVehicles",
          date: "Spustené 7. feb. 2026",
          desc: "Sídlisko v Coastal City. MTVehicles prináša cesty, autá a lietadlá na celý server.",
        },
      ],
      rpBannerTitle: "Začnite s roleplayom",
      rpBannerDesc: "Zaregistrujte si postavu v Discord Roleplay fóre, kupujte nehnuteľnosti, podnikajte vo Furn-Brule (Fß) alebo kandidujte za starostu.",
      rpInfoBtn: "Otvoriť #roleplay-informations",
      rpMakerBtn: "RP Character Maker",
    },
    cultureExtras: {
      constitutionalTitle: "Ústavné štátne sviatky (Článok I)",
      constitutionalSubtitle: "Štyri štátne sviatky podľa článku I Ústavy z 24. októbra 2026",
      nationalHolidays: [
        { date: "15. apríl", name: "Národný deň federácie", desc: "Pripomína vyhlásenie Cisárstva Spoločenstva Furnovskyland a založenie Discord servera 15. apríla 2021." },
        { date: "15. jún", name: "Deň parlamentu", desc: "Oslava Parlamentu a demokratických volieb." },
        { date: "23. august", name: "Deň Furnovského I.", desc: "Narodeniny Jeho Veličenstva cisára Furnovského I., zakladateľa a panovníka štátu." },
        { date: "31. október", name: "Deň založenia štátu a Halloween", desc: "Výročie korunovácie cisára Furnovského I. 31. októbra 2018 o 15:00 SEČ, keď vznikol Furnovskyland." },
      ],
      institutionsTitle: "Tlačové, športové a kultúrne inštitúcie",
      institutionsSubtitle: "Médiá, šport a občianske organizácie v Spoločenstve",
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
          desc: "Po prvej LoS Discord Olympiáde, ktorú Furnovskyland usporiadal v marci 2024, zaviedol Zákon o Hrách Spoločenstva 2026 pravidelné turnaje.",
          href: DISCORD_LINKS.olympicIslands,
          cta: "Olympijské ostrovy",
        },
        {
          title: "Korporátne a robotnícke cechy",
          badge: "Oddelenie práce a spoločnosti",
          desc: "Metronon Company, Migaspin Inc., Crystal Corporation, Hafiz & Partners Inc. a Výbor pracovníkov podporujú kultúrne a stavebné projekty.",
          href: DISCORD_LINKS.companies,
          cta: "Otvoriť #companies",
        },
      ],
    },
    otherExtras: {
      directoryTitle: "Adresár Discord kanálov",
      directorySubtitle: "Odkazy na hlavné kanály pre vládu, Parlament, hraničnú kontrolu a roleplay (ID servera: 836271168977764363)",
      categories: [
        {
          title: "Hraničná kontrola a štátne oznámenia",
          channels: [
            { name: "#verification-room", desc: "Hraničná kontrola vykonávaná Furnovskyland Defence Force (do 72 hodín podľa článku 39).", href: DISCORD_LINKS.verification },
            { name: "#channel-1", desc: "Cisárske dekréty, ústavné referendá, výsledky volieb a oznámenia FUSCPS.", href: DISCORD_LINKS.channel1 },
            { name: "#ministry-announcements", desc: "Oznámenia predsedu vlády a ministerstiev a promulgácie Sanctio Regia.", href: DISCORD_LINKS.ministryAnnouncements },
            { name: "#federal-gazette", desc: "Federálny vestník zriadený zákonom Federal Gazette Act (júl 2026).", href: DISCORD_LINKS.federalGazette },
          ],
        },
        {
          title: "Národné zhromaždenie, voľby a politické strany",
          channels: [
            { name: "#parliament-discussions", desc: "Verejné zasadnutia (každé dva týždne) a debaty 15-členného Národného zhromaždenia.", href: DISCORD_LINKS.parliamentDiscussions },
            { name: "#submit-a-law", desc: "Podávanie návrhov zákonov, organických zákonov a uznesení.", href: DISCORD_LINKS.submitLaw },
            { name: "#register-your-party", desc: "Registrácia novej politickej strany alebo volebnej koalície.", href: DISCORD_LINKS.registerParty },
            { name: "#election-registration & #campaigns", desc: "Registrácia kandidátok a 5-dňové predvolebné fórum.", href: DISCORD_LINKS.electionRegistration },
          ],
        },
        {
          title: "Roleplay, samosprávy, ekonomika a tlač",
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
