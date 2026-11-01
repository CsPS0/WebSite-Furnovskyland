import { Award, Calendar, ExternalLink, Newspaper } from "lucide-react";
import { Rich } from "@/components/rich";
import { nationPortal } from "@/data/nation";
import { getDictionary, getLocale, type Dictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Days = Dictionary["culturalDays"];
type Month = keyof Days["months"];

// Calendar order; the key lists match the order of holidays within each group.
const calendar: [keyof Days, Month, string[]][] = [
  ["jan", "january", ["1", "6", "7-13"]],
  ["feb", "february", ["movable", "26-28"]],
  ["mar", "march", ["1", "15", "17", "23"]],
  ["mar-apr", "march_april", ["movable"]],
  ["apr", "april", ["15", "23"]],
  ["may", "may", ["mothers", "1", "8", "17-23", "24-30", "31"]],
  ["may-jun", "may_june", ["movable"]],
  ["jun", "june", ["1", "4", "15", "fathers"]],
  ["jul", "july", ["4", "5", "festival"]],
  ["aug", "august", ["5", "20", "23", "29"]],
  ["sep", "september", ["1", "15"]],
  ["oct", "october", ["3", "6", "23", "31"]],
  ["nov", "november", ["1", "11", "17", "30", "thanksgiving"]],
  ["nov-dec", "november_december", ["advent"]],
  ["dec", "december", ["1", "16", "24", "25-26", "31"]],
];

export async function generateMetadata() {
  const t = await getDictionary();
  return pageMetadata("kultura/", t.culturalDays.pageTitle, t.culturalDays.pageSubtitle);
}

export default async function CulturePage() {
  const [dict, locale] = [await getDictionary(), await getLocale()];
  const t = dict.culturalDays;
  const extras = nationPortal[locale].cultureExtras;

  return (
    <section className="section">
      <div className="page space-y-14">
        <div>
          <h1 className="section-title">{t.pageTitle}</h1>
          <p className="section-subtitle">{t.pageSubtitle}</p>
        </div>

        <article className="card reveal">
          <div className="mb-2 flex items-center gap-2.5 text-secondary">
            <Award className="size-6 shrink-0" />
            <h2 className="text-2xl">{extras.constitutionalTitle}</h2>
          </div>
          <p className="mb-6 text-sm text-muted">{extras.constitutionalSubtitle}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {extras.nationalHolidays.map((item) => (
              <div
                key={item.date}
                className="flex flex-col justify-between rounded-xl border border-accent/40 bg-surface-alt p-5"
              >
                <div>
                  <span className="badge-gold mb-2.5">{item.date}</span>
                  <h3 className="mb-2 text-lg font-bold text-heading">{item.name}</h3>
                  <p className="text-xs leading-relaxed text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <div>
          <h2 className="section-title">{extras.institutionsTitle}</h2>
          <p className="section-subtitle">{extras.institutionsSubtitle}</p>
          <div className="grid gap-6 md:grid-cols-3">
            {extras.institutions.map((inst) => (
              <article key={inst.title} className="card card-hover reveal flex flex-col justify-between">
                <div>
                  <span className="badge-gold mb-3">{inst.badge}</span>
                  <div className="mb-2 flex items-center gap-2 text-secondary">
                    <Newspaper className="size-5 shrink-0" />
                    <h3 className="text-lg font-bold">{inst.title}</h3>
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-muted">{inst.desc}</p>
                </div>
                <div className="border-t border-border pt-3">
                  <a
                    href={inst.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-primary"
                  >
                    {inst.cta}
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-8 flex items-center justify-center gap-2.5">
            <Calendar className="size-6 text-secondary" />
            <h2 className="text-center font-serif text-2xl font-bold text-heading sm:text-3xl">{t.pageTitle}</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {calendar.map(([group, month, keys]) => {
              const days = t[group] as unknown as Record<string, { name: string; desc: string }>;
              return (
                <div key={group} className="card card-hover reveal">
                  <h3 className="mb-3 border-b border-border pb-2 text-xl text-heading">{t.months[month]}</h3>
                  <ul className="space-y-2.5 text-sm">
                    {keys.map((key) => (
                      <li key={key} className="leading-relaxed">
                        <Rich as="strong" html={days[key].name} className="text-heading" /> –{" "}
                        <Rich as="span" html={days[key].desc} className="text-muted" />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
