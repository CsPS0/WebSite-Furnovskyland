import { Rich } from "@/components/rich";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const t = await getDictionary();
  return pageMetadata("egyeb/", t.other.pageTitle, t.other.pageSubtitle);
}

export default async function OtherPage() {
  const t = (await getDictionary()).other;
  const faq = [t.faq.join, t.faq.citizenship, t.faq.visit];

  return (
    <section className="section">
      <div className="page">
        <h1 className="section-title">{t.pageTitle}</h1>
        <p className="section-subtitle">{t.pageSubtitle}</p>
        <div className="timeline">
          <article className="timeline-item reveal">
            <h2 className="mb-4 text-2xl">{t.faq.title}</h2>
            <dl className="space-y-4">
              {faq.map((item) => (
                <div key={item.question}>
                  <Rich as="dt" html={item.question} className="font-semibold" />
                  <Rich as="dd" html={item.answer} />
                </div>
              ))}
            </dl>
          </article>
          <article className="timeline-item reveal">
            <h2 className="mb-4 text-2xl">{t.resources.title}</h2>
            <h3 className="mb-1 text-lg">{t.resources.documents.title}</h3>
            <Rich html={t.resources.documents.description} className="mb-4" />
            <h3 className="mb-1 text-lg">{t.resources.guides.title}</h3>
            <Rich html={t.resources.guides.description} />
          </article>
        </div>
      </div>
    </section>
  );
}
