import Image from "next/image";
import { Rich } from "@/components/rich";
import { nationPortal } from "@/data/nation";
import { getDictionary, getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import coatOfArms from "@/public/IMG/coat-of-arms.png";
import flag from "@/public/IMG/zaszlo.webp";

export async function generateMetadata() {
  const t = await getDictionary();
  return pageMetadata("tortenelem/", t.history.pageTitle, t.history.pageSubtitle);
}

export default async function HistoryPage() {
  const [dict, locale] = [await getDictionary(), await getLocale()];
  const t = dict.history;
  const extras = nationPortal[locale].historyExtras;
  const sections = ["foundation", "expansion", "modernEra", "geography", "government", "flag"] as const;

  return (
    <section className="section">
      <div className="page">
        <h1 className="section-title">{t.pageTitle}</h1>
        <p className="section-subtitle">{t.pageSubtitle}</p>

        <article className="card reveal mx-auto mb-14 max-w-4xl">
          <h2 className="mb-6 text-center text-2xl">{extras.heraldryShowcaseTitle}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center rounded-xl border border-border bg-surface-alt p-6 text-center">
              <div className="mb-4 flex h-40 items-center justify-center">
                <Image
                  src={flag}
                  alt={extras.flagCaption}
                  width={220}
                  height={138}
                  className="rounded-lg border border-border shadow-md"
                />
              </div>
              <h3 className="mb-2 text-lg font-bold">{extras.flagCaption}</h3>
              <p className="text-sm leading-relaxed text-muted">{extras.flagDetails}</p>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-border bg-surface-alt p-6 text-center">
              <div className="mb-4 flex h-40 items-center justify-center">
                <Image
                  src={coatOfArms}
                  alt={extras.coatCaption}
                  width={132}
                  height={156}
                  className="h-36 w-auto drop-shadow-md"
                />
              </div>
              <h3 className="mb-2 text-lg font-bold">{extras.coatCaption}</h3>
              <p className="text-sm leading-relaxed text-muted">{extras.coatDetails}</p>
            </div>
          </div>
        </article>

        <div className="timeline">
          {sections.map((key) => (
            <article key={key} className="timeline-item reveal">
              <h2 className="mb-3 text-2xl">{t.sections[key].title}</h2>
              <Rich html={t.sections[key].content} className="leading-relaxed" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
