// Kept apart from i18n.ts so the proxy can use it without pulling in next/root-params.
export const locales = ["en", "hu", "de", "sk"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  hu: "Magyar",
  de: "Deutsch",
  sk: "Slovenčina",
};

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Fills {name} placeholders: fmt("Round {n}", { n: 2 }). */
export function fmt(text: string, vars: Record<string, string | number>) {
  return text.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`));
}
