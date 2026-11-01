import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Box, ExternalLink, Landmark, Scale, Shield, Sparkles, Vote } from "lucide-react";
import { DiscordIcon } from "@/components/icons";
import { DiscordOnline, MC_SERVER, MinecraftPlayers, MinecraftState, Skeleton } from "@/components/live-status";
import { Rich } from "@/components/rich";
import { DISCORD_LINKS, nationPortal } from "@/data/nation";
import { getDictionary, getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import banner from "@/public/IMG/banner.webp";
import flag from "@/public/IMG/zaszlo.webp";

export async function generateMetadata() {
  return pageMetadata("");
}

export default async function Home() {
  const [t, locale] = [await getDictionary(), await getLocale()];
  const portal = nationPortal[locale];

  return (
    <>
      <section className="relative overflow-hidden border-b-2 border-accent/40 bg-linear-135 from-primary-dark via-primary to-[#540d1a] py-20 text-white sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,155,39,0.22),transparent_60%)]" />
        <div className="page relative z-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="mb-6 flex items-center gap-4">
              <Image
                src={banner}
                alt="Imperial Coat of Arms of Furnovskyland"
                width={84}
                height={84}
                priority
                className="rounded-xl border-2 border-accent/70 bg-primary-dark/60 p-1.5 shadow-xl"
              />
            </div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-primary-dark/70 px-4 py-1 text-xs font-semibold tracking-widest text-accent-light uppercase">
              <Sparkles className="size-3.5" />
              {portal.chancelleryBadge}
            </span>
            <h1 className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t.hero.welcome}
            </h1>
            <p className="mx-auto mb-9 max-w-2xl text-lg text-white/85 sm:text-xl">{t.hero.discover}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={DISCORD_LINKS.invite}
                target="_blank"
                rel="noreferrer"
                className="btn border border-accent-light bg-accent text-primary-dark shadow-md hover:bg-accent-light hover:text-primary-dark"
              >
                <DiscordIcon className="size-5" />
                {t.join.discord.button} Discord
              </a>
              <Link href={`/${locale}/szavazas/`} className="btn border border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary-dark">
                <Vote className="size-5" />
                {t.nav.votes}
              </Link>
              <a
                href="#facts"
                className="btn border border-white/25 text-white/90 hover:border-accent-light hover:text-accent-light"
              >
                {t.hero.learnMore}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="intro" className="section">
        <div className="page">
          <h2 className="section-title">{t.intro.title}</h2>
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="card reveal lg:col-span-7">
              <Rich html={t.intro.description} className="space-y-4 text-base leading-relaxed sm:text-lg" />
              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-5">
                <Image
                  src={flag}
                  alt="National Flag of Furnovskyland"
                  width={96}
                  height={60}
                  className="rounded border border-border shadow-xs"
                />
                <div className="text-sm text-muted">
                  <p className="font-serif font-bold text-heading">{portal.facts[0].value}</p>
                  <p>{portal.facts[0].detail}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              <div className="card reveal flex items-center justify-between gap-4">
                <div>
                  <span className="badge-gold mb-2">Discord · 836271168977764363</span>
                  <h3 className="text-xl">{t.join.discord.title}</h3>
                  <p className="mt-1 text-2xl font-bold text-secondary">
                    <Suspense fallback={<Skeleton />}>
                      <DiscordOnline />
                    </Suspense>{" "}
                    <span className="text-base font-normal text-muted">{t.intro.discordStatus.members}</span>
                  </p>
                </div>
                <a
                  href={DISCORD_LINKS.invite}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary shrink-0 px-4 py-2.5 text-sm"
                >
                  <DiscordIcon className="size-4" />
                  {t.join.discord.button}
                </a>
              </div>

              <div className="card reveal flex items-center justify-between gap-4">
                <div>
                  <span className="badge-gold mb-2">Minecraft 1.21.11 · Java &amp; Bedrock</span>
                  <h3 className="text-xl">{t.join.minecraft.title}</h3>
                  <p className="mt-1 font-mono text-sm font-semibold text-heading select-all">{MC_SERVER}</p>
                  <p className="mt-1 text-sm text-muted">
                    <Suspense fallback={<Skeleton />}>
                      <MinecraftState labels={t.minecraft.status} />
                    </Suspense>{" "}
                    ·{" "}
                    <Suspense fallback={<Skeleton />}>
                      <MinecraftPlayers />
                    </Suspense>{" "}
                    {t.minecraft.status.players.replace(":", "")}
                  </p>
                </div>
                <Link href={`/${locale}/minecraft/`} className="btn-ghost shrink-0 px-4 py-2.5 text-sm">
                  <Box className="size-4" />
                  {t.join.minecraft.button}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="facts" className="section border-y border-border bg-surface">
        <div className="page">
          <h2 className="section-title">{portal.factSheetTitle}</h2>
          <p className="section-subtitle">{portal.factSheetSubtitle}</p>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {portal.facts.map((fact) => (
              <div
                key={fact.label}
                className="reveal flex flex-col justify-between rounded-xl border border-border border-t-2 border-t-accent bg-bg p-5 shadow-xs"
              >
                <div>
                  <dt className="text-xs font-bold tracking-wider text-muted uppercase">{fact.label}</dt>
                  <dd className="mt-2 font-serif text-base font-bold text-heading">{fact.value}</dd>
                </div>
                <p className="mt-3 border-t border-border/70 pt-2.5 text-xs text-muted">{fact.detail}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="page">
          <h2 className="section-title">{portal.whyJoinTitle}</h2>
          <p className="section-subtitle">{portal.whyJoinSubtitle}</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portal.whyJoinCards.map((card) => {
              const isInternalPrimary = card.primaryLink.href.startsWith("/");
              return (
                <article key={card.title} className="card card-hover reveal flex flex-col justify-between">
                  <div>
                    <span className="badge-gold mb-3">{card.badge}</span>
                    <h3 className="mb-3 text-xl">{card.title}</h3>
                    <p className="mb-6 text-sm leading-relaxed text-muted">{card.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 border-t border-border pt-4">
                    {isInternalPrimary ? (
                      <Link
                        href={`/${locale}${card.primaryLink.href}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-primary hover:text-white"
                      >
                        {card.primaryLink.label}
                        <ArrowRight className="size-3.5" />
                      </Link>
                    ) : (
                      <a
                        href={card.primaryLink.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-primary hover:text-white"
                      >
                        {card.primaryLink.label}
                        <ExternalLink className="size-3.5" />
                      </a>
                    )}
                    <a
                      href={card.secondaryLink.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-alt px-3 py-2 text-xs font-semibold text-text transition hover:border-accent hover:text-secondary"
                    >
                      {card.secondaryLink.label}
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section border-t border-border bg-surface">
        <div className="page">
          <h2 className="section-title">{portal.portalTitle}</h2>
          <p className="section-subtitle">{portal.portalSubtitle}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {portal.portalCards.map((item, idx) => {
              const Icon = [Landmark, Shield, Scale, Vote][idx % 4];
              return (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className="card card-hover reveal flex flex-col justify-between text-text hover:text-text"
                >
                  <div>
                    <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg border border-accent/40 bg-surface-alt text-secondary">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mb-2 text-xl">{item.title}</h3>
                    <p className="mb-5 text-sm text-muted">{item.desc}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary">
                    {item.cta}
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
