import Image from "next/image";
import { Suspense } from "react";
import { MC_SERVER, MinecraftPlayers, MinecraftState, Skeleton } from "@/components/live-status";
import { Gallery } from "@/components/gallery";
import { Rich } from "@/components/rich";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import mcBanner from "@/public/IMG/mc/banner.webp";
import church from "@/public/IMG/mc/church.webp";
import malasian from "@/public/IMG/mc/malasian.webp";

export async function generateMetadata() {
  const t = await getDictionary();
  return pageMetadata("minecraft/", t.minecraft.pageTitle, t.minecraft.pageSubtitle);
}

export default async function MinecraftPage() {
  const t = (await getDictionary()).minecraft;

  return (
    <section className="section">
      <div className="page">
        <h1 className="section-title">{t.pageTitle}</h1>
        <p className="section-subtitle">{t.pageSubtitle}</p>

        <div className="mb-10 grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-3 text-2xl">{t.description.title}</h2>
            <Rich html={t.description.content} />
          </div>
          <Image src={mcBanner} alt="" className="rounded-2xl shadow-lg" placeholder="blur" />
        </div>

        <div className="card reveal mb-16">
          <h2 className="mb-6 text-center text-2xl">{t.status.title}</h2>
          <dl className="grid gap-x-10 gap-y-2 sm:grid-cols-2 [&_dt]:font-semibold [&>div]:flex [&>div]:gap-2">
            <div>
              <dt>{t.status.ip}</dt>
              <dd className="font-mono select-all">{MC_SERVER}</dd>
            </div>
            <div>
              <dt>{t.status.status}</dt>
              <dd>
                <Suspense fallback={<Skeleton />}>
                  <MinecraftState labels={t.status} />
                </Suspense>
              </dd>
            </div>
            <div>
              <dt>{t.status.version}</dt>
              <dd>1.21.x</dd>
            </div>
            <div>
              <dt>{t.status.players}</dt>
              <dd>
                <Suspense fallback={<Skeleton />}>
                  <MinecraftPlayers />
                </Suspense>
              </dd>
            </div>
          </dl>
        </div>

        <h2 className="section-title">{t.gallery.title}</h2>
        <Gallery images={[mcBanner, church, malasian]} />
      </div>
    </section>
  );
}
