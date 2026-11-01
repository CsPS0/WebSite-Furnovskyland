import { Rich } from "@/components/rich";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const t = await getDictionary();
  return pageMetadata("tortenelem/", t.history.pageTitle, t.history.pageSubtitle);
}

export default async function HistoryPage() {
  const t = (await getDictionary()).history;
  const sections = ["foundation", "expansion", "modernEra", "geography", "government", "flag"] as const;

  return (
    <section className="section">
      <div className="page">
        <h1 className="section-title">{t.pageTitle}</h1>
        <p className="section-subtitle">{t.pageSubtitle}</p>
        <div className="timeline">
          {sections.map((key) => (
            <article key={key} className="timeline-item reveal">
              <h2 className="mb-3 text-2xl">{t.sections[key].title}</h2>
              <Rich html={t.sections[key].content} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
