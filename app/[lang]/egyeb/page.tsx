import Image from "next/image";
import { Compass, Download, ExternalLink, FileText, HelpCircle, Map as MapIcon } from "lucide-react";
import { Rich } from "@/components/rich";
import { constitutions, laws, maps, type ResourceDocument } from "@/data/documents";
import { nationPortal } from "@/data/nation";
import { getDictionary, getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const t = await getDictionary();
  return pageMetadata("egyeb/", t.other.pageTitle, t.other.pageSubtitle);
}

export default async function OtherPage() {
  const [dict, locale] = [await getDictionary(), await getLocale()];
  const t = dict.other;
  const faq = [t.faq.join, t.faq.citizenship, t.faq.visit];
  const items = t.resources.items;
  const extras = nationPortal[locale].otherExtras;

  function renderDocList(docs: ResourceDocument[]) {
    return (
      <ul className="divide-y divide-border">
        {docs.map((doc) => {
          const info = items[doc.key];
          return (
            <li key={doc.key} className="flex flex-col justify-between gap-3 py-3.5 sm:flex-row sm:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-serif font-bold text-heading">{info.title}</span>
                  <span className="badge-gold font-mono text-[11px]">{doc.date}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{info.desc}</p>
              </div>
              <a
                href={doc.href}
                target="_blank"
                rel="noreferrer"
                download={doc.download || undefined}
                className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-border bg-surface-alt px-3.5 py-2 text-xs font-semibold text-heading transition hover:border-accent hover:text-secondary sm:self-center"
              >
                {doc.download ? <Download className="size-4 text-secondary" /> : <ExternalLink className="size-4 text-secondary" />}
                {doc.download ? t.resources.documents.link : t.resources.guides.link}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <section className="section">
      <div className="page max-w-5xl space-y-10">
        <div>
          <h1 className="section-title">{t.pageTitle}</h1>
          <p className="section-subtitle">{t.pageSubtitle}</p>
        </div>

        <article className="card reveal">
          <div className="mb-2 flex items-center gap-2.5">
            <FileText className="size-6 text-secondary" />
            <h2 className="text-2xl">{t.resources.documents.title}</h2>
          </div>
          <Rich html={t.resources.documents.description} className="mb-5 text-sm text-muted" />
          <h3 className="mt-4 mb-2 border-b border-border pb-2 text-lg font-bold text-heading">
            {t.resources.sections.constitutions}
          </h3>
          {renderDocList(constitutions)}
          <h3 className="mt-8 mb-2 border-b border-border pb-2 text-lg font-bold text-heading">
            {t.resources.sections.laws}
          </h3>
          {renderDocList(laws)}
        </article>

        <article className="card reveal">
          <div className="mb-2 flex items-center gap-2.5">
            <MapIcon className="size-6 text-secondary" />
            <h2 className="text-2xl">{t.resources.sections.maps}</h2>
          </div>
          <Rich html={t.resources.sections.mapsDesc} className="mb-6 text-sm text-muted" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {maps.map((doc) => {
              const info = items[doc.key];
              return (
                <div
                  key={doc.key}
                  className="flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface-alt"
                >
                  <div>
                    <div className="relative flex h-44 items-center justify-center border-b border-border bg-bg p-3">
                      <Image
                        src={doc.href}
                        alt={info.title}
                        width={280}
                        height={180}
                        className="max-h-36 w-auto rounded object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <span className="badge-gold mb-2 font-mono text-[11px]">{doc.date}</span>
                      <h3 className="mb-1 text-base font-bold text-heading">{info.title}</h3>
                      <p className="text-xs leading-relaxed text-muted">{info.desc}</p>
                    </div>
                  </div>
                  <div className="border-t border-border p-4 pt-3">
                    <a
                      href={doc.href}
                      download
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-primary hover:text-white"
                    >
                      <Download className="size-4" />
                      {t.resources.documents.link} PNG
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="card reveal">
          <div className="mb-2 flex items-center gap-2.5">
            <Compass className="size-6 text-secondary" />
            <h2 className="text-2xl">{extras.directoryTitle}</h2>
          </div>
          <p className="mb-6 text-sm text-muted">{extras.directorySubtitle}</p>
          <div className="space-y-6">
            {extras.categories.map((cat) => (
              <div key={cat.title}>
                <h3 className="mb-3 border-b border-border pb-1.5 text-lg font-bold text-heading">{cat.title}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {cat.channels.map((ch) => (
                    <a
                      key={ch.name}
                      href={ch.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start justify-between gap-3 rounded-xl border border-border bg-surface-alt p-4 text-text transition hover:border-accent hover:text-text"
                    >
                      <div>
                        <p className="font-mono text-sm font-bold text-secondary">{ch.name}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted">{ch.desc}</p>
                      </div>
                      <ExternalLink className="mt-0.5 size-4 shrink-0 text-secondary" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="card reveal">
          <h2 className="mb-3 text-2xl">{t.resources.guides.title}</h2>
          <Rich html={t.resources.guides.description} className="space-y-3 text-sm leading-relaxed" />
        </article>

        <article className="card reveal">
          <div className="mb-4 flex items-center gap-2.5">
            <HelpCircle className="size-6 text-secondary" />
            <h2 className="text-2xl">{t.faq.title}</h2>
          </div>
          <dl className="divide-y divide-border">
            {faq.map((item) => (
              <div key={item.question} className="py-4 first:pt-0 last:pb-0">
                <Rich as="dt" html={item.question} className="font-serif text-base font-bold text-heading" />
                <Rich as="dd" html={item.answer} className="mt-1.5 text-sm leading-relaxed text-muted" />
              </div>
            ))}
          </dl>
        </article>
      </div>
    </section>
  );
}
