import { Rich } from "@/components/rich";
import { government, senate } from "@/data/government";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const t = await getDictionary();
  return pageMetadata("politika/", t.politics.pageTitle);
}

export default async function PoliticsPage() {
  const t = (await getDictionary()).politics;
  const lp = t.legislative_process;
  const affairs = t.senate.affairs;

  return (
    <section className="section">
      <div className="page max-w-4xl space-y-8">
        <h1 className="section-title">{t.pageTitle}</h1>

        <article className="card reveal">
          <h2 className="mb-3 text-2xl">{t.state_structure.title}</h2>
          <Rich html={t.state_structure.content} />
        </article>

        <article className="card reveal">
          <h2 className="mb-3 text-2xl">{lp.title}</h2>
          <Rich html={lp.intro} className="mb-3" />
          <ul className="mb-4 ml-6 list-disc space-y-1">
            {[lp.organic_law, lp.bill, lp.act, lp.decree].map((html) => (
              <Rich key={html} as="li" html={html} />
            ))}
          </ul>
          <Rich html={lp.act_submit} className="mb-3" />
          <ol className="ml-6 list-decimal space-y-1">
            {[lp.step1, lp.step2, lp.step3].map((html) => (
              <Rich key={html} as="li" html={html} />
            ))}
          </ol>
        </article>

        <article className="card reveal">
          <h2 className="mb-3 text-2xl">{t.senate.title}</h2>
          <Rich html={t.senate.p1} className="mb-3" />
          <ul className="mb-4 ml-6 list-disc space-y-1">
            {[affairs.internal, affairs.foreign, affairs.minecraft, affairs.constitutional, affairs.recruitment].map((html) => (
              <Rich key={html} as="li" html={html} />
            ))}
          </ul>
          <Rich html={t.senate.p2} />
        </article>

        <article className="card reveal">
          <h2 className="mb-3 text-2xl">{t.supreme_court.title}</h2>
          <Rich html={t.supreme_court.content} />
        </article>

        <article className="card reveal overflow-hidden p-0 sm:p-0">
          <h2 className="p-6 pb-4 text-2xl sm:px-8">{t.current_gov.title}</h2>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t.current_gov.table.role}</th>
                  <th>{t.current_gov.table.name}</th>
                  <th>{t.current_gov.table.responsibilities}</th>
                </tr>
              </thead>
              <tbody>
                {government.map((row) => (
                  <tr key={row.name}>
                    <td className="font-semibold">{t.roles[row.role]}</td>
                    <td>{row.name}</td>
                    <td>{t.duties[row.duty]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="card reveal overflow-hidden p-0 sm:p-0">
          <h2 className="p-6 pb-4 text-2xl sm:px-8">{t.current_senate.title}</h2>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t.current_senate.table.role}</th>
                  <th>{t.current_senate.table.name}</th>
                </tr>
              </thead>
              <tbody>
                {senate.map((row) => (
                  <tr key={row.role}>
                    <td className="font-semibold">{t.roles[row.role]}</td>
                    <td>{row.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="card reveal">
          <h2 className="mb-3 text-2xl">{t.current_supreme_court.title}</h2>
          <Rich html={t.current_supreme_court.content} />
        </article>
      </div>
    </section>
  );
}
