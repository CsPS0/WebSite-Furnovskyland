import type { Dictionary } from "@/lib/i18n";

type DocKey = keyof Dictionary["other"]["resources"]["items"];

export interface ResourceDocument {
  key: DocKey;
  date: string;
  href: string;
  download?: boolean;
}

export const constitutions: ResourceDocument[] = [
  {
    key: "constitution_2026",
    date: "2026-10-24",
    href: "https://docs.google.com/document/d/1wTB91jJCNM3egZrkTc_siFqeuVYkXWwkSok1m9XCrZ8/edit?usp=sharing",
  },
  {
    key: "constitution_2026_temp",
    date: "2026-03-14",
    href: "https://docs.google.com/document/d/1aZvcyRvFRzdY3xjUwEpKbGkGJK2u1j3IAyDIr6QgfVQ/edit?usp=sharing",
  },
  {
    key: "constitution_2023",
    date: "2023-03-07",
    href: "https://docs.google.com/document/d/14uNgXnuzzyyFpB1bd5f0jirR-gqDmGi5/edit?usp=sharing",
  },
];

export const laws: ResourceDocument[] = [
  {
    key: "reconfig_2026",
    date: "2026-10-12",
    href: "https://docs.google.com/document/d/19D7xSE12uyqpyIxH3oKfkiLelF9twNO24JVRQesU2Lw/edit?usp=sharing",
  },
  {
    key: "regional_construction_2026",
    date: "2026-09-12",
    href: "https://docs.google.com/document/d/1UGEAd6c0kdX4_VN558-jPIoLiQGtbMNfubZff1-KdvY/edit?usp=sharing",
  },
  {
    key: "reconfig_aug_2026",
    date: "2026-08-04",
    href: "https://docs.google.com/document/d/1hrvkfVMm4XErnW-yquI_hvjDld6HyPTYttsgFnZKAe4/edit?usp=sharing",
  },
  {
    key: "aurigrad_treaty_2026",
    date: "2026-07-26",
    href: "https://docs.google.com/document/d/1XP-9uE_JPB07DZZh4bz20Jg5MePXT0TsGGB8wulfFCo/edit?usp=sharing",
  },
  {
    key: "sanctio_regia_2026",
    date: "2026-07-16",
    href: "https://docs.google.com/document/d/1Y5Nu2a9dOaQ4yEruInc2HBLI4Q9j-DvNXYLjpNJOAx4/edit?tab=t.0",
  },
  {
    key: "federal_gazette_2026",
    date: "2026-07-12",
    href: "https://docs.google.com/document/d/1WvUQpJftB7eD_8S-qqUewk4VxegGsetQWZOogOdfauY/edit?tab=t.0",
  },
  {
    key: "commonwealth_games_2026",
    date: "2026-07-12",
    href: "https://docs.google.com/document/d/12pnsIXUa3We6sbGfiPUF5xtDO5snvyd6ekbVcj1Xn3U/edit?usp=sharing",
  },
  {
    key: "los_charter_2026",
    date: "2026-03-28",
    href: "https://docs.google.com/document/d/1AvuMxVbfuevRm6tdAQZIgppKbPgzH_OiQI3u77h6ZrE/preview",
  },
  {
    key: "bunker_limitation_2025",
    date: "2025-12-27",
    href: "https://docs.google.com/document/d/12OBsSj_nK_OGXGV2G4TsTkaSkISRzKt1n8Za_R45tBI/edit?usp=sharing",
  },
  {
    key: "federal_bank_2025",
    date: "2025-10-26",
    href: "https://docs.google.com/document/d/1E59HBXgEpY-Fspd3P3gdb8S-BZZuntjnn6y7zYrDtY0/edit?usp=drivesdk",
  },
  {
    key: "reconfig_2025",
    date: "2025-10-25",
    href: "https://docs.google.com/document/d/1mBVsWL30oqMvbQvKj2MDvDhrfTIGLqFTy8oTNVeNjv0/edit?usp=sharing",
  },
  {
    key: "official_secrets_2025",
    date: "2025-05-27",
    href: "https://docs.google.com/document/d/11QESPqdhlBsCEBKquy5SKqzYNXQGtfhE/edit?usp=sharing",
  },
  {
    key: "ora_economy_2025",
    date: "2025-03-23",
    href: "https://docs.google.com/document/d/1KN_1k8rggtHK78GSdGMnjx_30dLTr4KVDdJBPsq9NSQ/edit?usp=sharing",
  },
  {
    key: "monetary_fund_2025",
    date: "2025-03-12",
    href: "https://docs.google.com/document/d/1eDRq-TfPhv9kY0qwdfWAqp4FQWxfIa5PZglwqkgLUeQ/edit?usp=drivesdk",
  },
  {
    key: "work_department_2025",
    date: "2025-03-09",
    href: "https://docs.google.com/document/d/1pfQcwxrb0ywS-6Sz3Bxr7XnGvSJDll91PtynlvLS9tI/edit?usp=sharing",
  },
];

export const maps: ResourceDocument[] = [
  {
    key: "coat_of_arms",
    date: "2021-04-15",
    href: "/IMG/coat-of-arms.png",
    download: true,
  },
  {
    key: "map_districts_numbered",
    date: "2025-11-16",
    href: "/IMG/maps/districts-numbered.png",
    download: true,
  },
  {
    key: "map_districts_unnumbered",
    date: "2025-11-16",
    href: "/IMG/maps/districts-unnumbered.png",
    download: true,
  },
  {
    key: "map_subdistricts",
    date: "2025-11-16",
    href: "/IMG/maps/subdistricts.png",
    download: true,
  },
  {
    key: "map_blank",
    date: "2025-11-16",
    href: "/IMG/maps/blank-map.png",
    download: true,
  },
];
