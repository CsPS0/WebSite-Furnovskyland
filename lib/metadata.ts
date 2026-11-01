import type { Metadata } from "next";
import { getLocale, locales } from "./i18n";

/** Title plus canonical and hreflang links for a page at /{lang}/{path}. */
export async function pageMetadata(path: string, title?: string, description?: string): Promise<Metadata> {
  const locale = await getLocale();
  return {
    ...(title && { title }),
    ...(description && { description }),
    alternates: {
      canonical: `/${locale}/${path}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/${path}`])),
    },
  };
}
