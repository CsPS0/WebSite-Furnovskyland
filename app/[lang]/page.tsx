import Link from "next/link";
import { Suspense } from "react";
import { Box, Vote } from "lucide-react";
import { DiscordIcon } from "@/components/icons";
import { DiscordOnline, Skeleton } from "@/components/live-status";
import { Rich } from "@/components/rich";
import { getDictionary, getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  // The layout's title template only applies to child segments, so the home page keeps the default title.
  return pageMetadata("");
}

export default async function Home() {
  const [t, locale] = [await getDictionary(), await getLocale()];

  return (
    <>
      <section className="relative overflow-hidden bg-linear-135 from-primary-dark to-primary pt-20 pb-28 text-center text-white">
        <div className="page relative z-10">
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">{t.hero.welcome}</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90 sm:text-xl">{t.hero.discover}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#intro" className="btn border-2 border-white text-white hover:bg-white hover:text-primary">
              {t.hero.learnMore}
            </a>
            <Link href={`/${locale}/szavazas/`} className="btn-primary">
              <Vote className="size-5" />
              {t.nav.votes}
            </Link>
          </div>
        </div>
        <div className="absolute -bottom-12 left-0 h-24 w-full -skew-y-2 bg-bg" />
      </section>

      <section id="intro" className="section">
        <div className="page">
          <h2 className="section-title">{t.intro.title}</h2>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <Rich html={t.intro.description} className="text-lg" />
            <div className="card reveal border-[#5865f2]/30 text-center">
              <DiscordIcon className="mx-auto mb-3 size-10 text-[#5865f2]" />
              <p className="text-2xl font-bold">
                <span className="text-secondary">
                  <Suspense fallback={<Skeleton />}>
                    <DiscordOnline />
                  </Suspense>
                </span>{" "}
                {t.intro.discordStatus.members}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-y border-border bg-surface">
        <div className="page">
          <h2 className="section-title">{t.join.title}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="card card-hover reveal text-center">
              <DiscordIcon className="mx-auto mb-5 size-12 text-secondary" />
              <h3 className="mb-3 text-2xl">{t.join.discord.title}</h3>
              <p className="mb-6 text-muted">{t.join.discord.description}</p>
              <a href="https://discord.gg/UjcUnNhNfk" target="_blank" rel="noreferrer" className="btn-primary">
                {t.join.discord.button}
              </a>
            </div>
            <div className="card card-hover reveal text-center">
              <Box className="mx-auto mb-5 size-12 text-secondary" />
              <h3 className="mb-3 text-2xl">{t.join.minecraft.title}</h3>
              <p className="mb-6 text-muted">{t.join.minecraft.description}</p>
              <Link href={`/${locale}/minecraft/`} className="btn-primary">
                {t.join.minecraft.button}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
