import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import en from "@/messages/en.json";
import hu from "@/messages/hu.json";
import de from "@/messages/de.json";
import sk from "@/messages/sk.json";
import { hasLocale, type Locale } from "./i18n-config";

export { fmt, hasLocale, localeNames, locales, type Locale } from "./i18n-config";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, hu, de, sk };

/** The current page's locale, from the [lang] root segment. Server Components only. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()];
}

/** For Server Actions and Route Handlers, which can't read root params. */
export function dictionaryFor(locale: string): Dictionary {
  return dictionaries[hasLocale(locale) ? locale : "en"];
}
