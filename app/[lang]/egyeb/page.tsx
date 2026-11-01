import { Download, ExternalLink, FileText, Map as MapIcon } from "lucide-react";
import { Rich } from "@/components/rich";
import { constitutions, laws, maps, type ResourceDocument } from "@/data/documents";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const t = await getDictionary();
  return pageMetadata("egyeb/", t.other.pageTitle, t.other.pageSubtitle);
}

export default async function OtherPage() {
  const t = (await getDictionary()).other;
  const faq = [t.faq.join, t.faq.citizenship, t.faq.visit];
  const items = t.resources.items;

  function renderDocList(docs: ResourceDocument[]) {
    return (
      <ul className="divide-y divide-border">
        {docs.map((doc) => {
          const info = items[doc.key];
          return (
            <li key={doc.key} className="flex flex-col justify-between gap-3 py-3 sm:flex-row sm:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{info.title}</span>
                  <span className="rounded bg-surface-alt px-2 py-0.5 font-mono text-xs text-muted">{doc.date}</span>
                </div>
                <p className="text-sm text-muted">{info.desc}</p>
              </div>
              <a
                href={doc.href}
                target="_blank"
                rel="noreferrer"
                download={doc.download || undefined}
                className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition hover:border-secondary hover:text-secondary sm:self-center"
              >
                {doc.download ? <Download className="size-4" /> : <ExternalLink className="size-4" />}
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
      <div className="page max-w-4xl space-y-8">
        <div>
          <h1 className="section-title">{t.pageTitle}</h1>
          <p className="section-subtitle">{t.pageSubtitle}</p>
        </div>

        <article className="card reveal">
          <h2 className="mb-4 text-2xl">{t.faq.title}</h2>
          <dl className="space-y-4">
            {faq.map((item) => (
              <div key={item.question}>
                <Rich as="dt" html={item.question} className="font-semibold" />
                <Rich as="dd" html={item.answer} className="mt-1 text-muted" />
              </div>
            ))}
          </dl>
        </article>

        <article className="card reveal">
          <div className="mb-2 flex items-center gap-2">
            <FileText className="size-6 text-secondary" />
            <h2 className="text-2xl">{t.resources.documents.title}</h2>
          </div>
          <Rich html={t.resources.documents.description} className="mb-4 text-muted" />
          <h3 className="mt-4 mb-2 text-lg font-semibold">{t.resources.sections.constitutions}</h3>
          {renderDocList(constitutions)}
          <h3 className="mt-6 mb-2 text-lg font-semibold">{t.resources.sections.laws}</h3>
          {renderDocList(laws)}
        </article>

        <article className="card reveal">
          <div className="mb-2 flex items-center gap-2">
            <MapIcon className="size-6 text-secondary" />
            <h2 className="text-2xl">{t.resources.sections.maps}</h2>
          </div>
          <Rich html={t.resources.sections.mapsDesc} className="mb-4 text-muted" />
          {renderDocList(maps)}
        </article>

        <article className="card reveal">
          <h2 className="mb-3 text-2xl">{t.resources.guides.title}</h2>
          <Rich html={t.resources.guides.description} className="space-y-3" />
        </article>
      </div>
    </section>
  );
}
