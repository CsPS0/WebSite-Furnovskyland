import Link from "next/link";
import { cacheLife } from "next/cache";
import { Mail } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { DiscordIcon } from "./icons";
import { getNavItems } from "./header";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const [t, items, year] = [await getDictionary(), await getNavItems(), await currentYear()];
  const c = t.footer.contact;

  return (
    <footer className="mt-auto bg-primary-dark text-white/80">
      <div className="page grid gap-10 py-14 sm:grid-cols-2">
        <div>
          <h2 className="mb-5 text-xl text-accent">{c.title}</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <Mail className="size-4" />
              <a href={`mailto:${c.email}`} className="text-white/80 hover:text-accent">{c.email}</a>
            </li>
            <li className="flex items-center gap-3">
              <DiscordIcon className="size-4" />
              {c.discord}
            </li>
            <li className="flex items-center gap-3">
              <span className="w-4 text-center font-bold">f</span>
              {c.facebook}
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-5 text-xl text-accent">{t.footer.quickLinks.title}</h2>
          <ul className="grid grid-cols-2 gap-3">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/80 hover:text-accent">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="page flex flex-col items-center justify-between gap-2 text-center text-sm text-white/60 sm:flex-row">
          <p>© {year} {t.footer.copyright}</p>
          <p>
            {t.footer.maintainedBy}{" "}
            <a
              href="https://yoursit.ee/csps"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-white/80 underline decoration-white/30 underline-offset-4 transition hover:text-accent hover:decoration-accent"
            >
              CsPS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
