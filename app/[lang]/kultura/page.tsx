import { Rich } from "@/components/rich";
import { getDictionary, type Dictionary } from "@/lib/i18n";
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
  const t = (await getDictionary()).culturalDays;

  return (
    <section className="section">
      <div className="page">
        <h1 className="section-title">{t.pageTitle}</h1>
        <p className="section-subtitle">{t.pageSubtitle}</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {calendar.map(([group, month, keys]) => {
            const days = t[group] as unknown as Record<string, { name: string; desc: string }>;
            return (
              <div key={group} className="card card-hover reveal">
                <h2 className="mb-3 text-xl">{t.months[month]}</h2>
                <ul className="space-y-2">
                  {keys.map((key) => (
                    <li key={key}>
                      <Rich as="strong" html={days[key].name} /> – <Rich as="span" html={days[key].desc} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
