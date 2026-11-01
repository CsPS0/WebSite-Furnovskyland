import Image from "next/image";
import { Suspense } from "react";
import { Building2, ExternalLink, MapPin, TrainFront } from "lucide-react";
import { MC_SERVER, MinecraftPlayers, MinecraftState, Skeleton } from "@/components/live-status";
import { Gallery } from "@/components/gallery";
import { Rich } from "@/components/rich";
import { DISCORD_LINKS, nationPortal } from "@/data/nation";
import { getDictionary, getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import mcBanner from "@/public/IMG/mc/banner.webp";
import church from "@/public/IMG/mc/church.webp";
import malasian from "@/public/IMG/mc/malasian.webp";

export async function generateMetadata() {
  const t = await getDictionary();
  return pageMetadata("minecraft/", t.minecraft.pageTitle, t.minecraft.pageSubtitle);
}

export default async function MinecraftPage() {
  const [dict, locale] = [await getDictionary(), await getLocale()];
  const t = dict.minecraft;
  const extras = nationPortal[locale].minecraftExtras;

  return (
    <section className="section">
      <div className="page space-y-14">
        <div>
          <h1 className="section-title">{t.pageTitle}</h1>
          <p className="section-subtitle">{t.pageSubtitle}</p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="card reveal lg:col-span-7">
            <span className="badge-gold mb-3">Minecraft 1.21.11 · Java &amp; Bedrock</span>
            <h2 className="mb-3 text-2xl">{t.description.title}</h2>
            <Rich html={t.description.content} className="leading-relaxed" />
            <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
              <a
                href={DISCORD_LINKS.roleplayInfo}
                target="_blank"
                rel="noreferrer"
                className="btn-primary px-4 py-2.5 text-sm"
              >
                {extras.rpInfoBtn}
                <ExternalLink className="size-4" />
              </a>
              <a
                href={DISCORD_LINKS.rpCharacterMaker}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost px-4 py-2.5 text-sm"
              >
                {extras.rpMakerBtn}
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Image
              src={mcBanner}
              alt="Furnovskyland Minecraft Server"
              className="rounded-xl border-2 border-accent/50 shadow-lg"
              placeholder="blur"
            />
          </div>
        </div>

        <div className="card reveal">
          <h2 className="mb-6 text-center text-2xl">{t.status.title}</h2>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border bg-surface-alt p-4">
              <dt className="text-xs font-bold tracking-wider text-muted uppercase">{t.status.ip}</dt>
              <dd className="mt-1 font-mono text-base font-bold text-heading select-all">{MC_SERVER}</dd>
            </div>
            <div className="rounded-lg border border-border bg-surface-alt p-4">
              <dt className="text-xs font-bold tracking-wider text-muted uppercase">{t.status.status}</dt>
              <dd className="mt-1 text-base font-bold">
                <Suspense fallback={<Skeleton />}>
                  <MinecraftState labels={t.status} />
                </Suspense>
              </dd>
            </div>
            <div className="rounded-lg border border-border bg-surface-alt p-4">
              <dt className="text-xs font-bold tracking-wider text-muted uppercase">{t.status.version}</dt>
              <dd className="mt-1 text-base font-bold text-heading">1.21.11 (Java &amp; Bedrock)</dd>
            </div>
            <div className="rounded-lg border border-border bg-surface-alt p-4">
              <dt className="text-xs font-bold tracking-wider text-muted uppercase">{t.status.players}</dt>
              <dd className="mt-1 text-base font-bold text-heading">
                <Suspense fallback={<Skeleton />}>
                  <MinecraftPlayers />
                </Suspense>
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="section-title">{extras.settlementsTitle}</h2>
          <p className="section-subtitle">{extras.settlementsSubtitle}</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {extras.settlements.map((settlement) => (
              <article key={settlement.name} className="card card-hover reveal flex flex-col justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-secondary">
                    <MapPin className="size-5 shrink-0" />
                    <h3 className="text-xl">{settlement.name}</h3>
                  </div>
                  <p className="mb-3 text-xs font-semibold text-muted">
                    <strong className="text-heading">{extras.mayorLabel}</strong> {settlement.mayor}
                  </p>
                  <p className="text-sm leading-relaxed text-muted">{settlement.desc}</p>
                </div>
                {settlement.channelHref && settlement.channelLabel && (
                  <div className="mt-5 border-t border-border pt-3">
                    <a
                      href={settlement.channelHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-primary"
                    >
                      {settlement.channelLabel}
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        <div>
          <h2 className="section-title">{extras.infraTitle}</h2>
          <p className="section-subtitle">{extras.infraSubtitle}</p>
          <div className="grid gap-6 md:grid-cols-2">
            {extras.infraItems.map((item, idx) => {
              const Icon = idx % 2 === 0 ? Building2 : TrainFront;
              return (
                <article key={item.title} className="card reveal">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-secondary">
                      <Icon className="size-5 shrink-0" />
                      <h3 className="text-lg font-bold">{item.title}</h3>
                    </div>
                    <span className="badge-gold">{item.date}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="section-title">{t.gallery.title}</h2>
          <Gallery images={[mcBanner, church, malasian]} />
        </div>
      </div>
    </section>
  );
}
