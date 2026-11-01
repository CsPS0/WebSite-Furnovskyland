import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { ExternalLink, Mail } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { DiscordIcon } from "./icons";
import { getNavItems } from "./header";
import banner from "@/public/IMG/banner.webp";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const [t, items, year] = [await getDictionary(), await getNavItems(), await currentYear()];
  const c = t.footer.contact;

  return (
    <footer className="mt-auto border-t-2 border-accent bg-primary-dark text-white/85">
      <div className="page grid gap-10 py-14 md:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image src={banner} alt="" className="h-12 w-auto" />
            <div>
              <p className="font-serif text-lg font-bold text-white">Furnovskyland</p>
              <p className="text-xs tracking-wider text-accent uppercase">{t.footer.copyright}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/70">{t.hero.discover}</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 text-accent" />
              <a href={`mailto:${c.email}`} className="text-white/80 hover:text-accent">
                {c.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <DiscordIcon className="size-4 text-accent" />
              <span>{c.discord}</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold tracking-wider text-accent uppercase">{t.footer.quickLinks.title}</h2>
          <ul className="grid grid-cols-2 gap-2.5 text-sm">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/80 hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold tracking-wider text-accent uppercase">{t.join.discord.title}</h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href="https://discord.gg/UjcUnNhNfk"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-white/80 hover:text-accent"
              >
                {t.join.discord.button} (discord.gg/UjcUnNhNfk) <ExternalLink className="size-3.5" />
              </a>
            </li>
            <li>
              <a
                href="https://discord.com/channels/836271168977764363/879265701746053160"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-white/80 hover:text-accent"
              >
                #verification-room <ExternalLink className="size-3.5" />
              </a>
            </li>
            <li>
              <a
                href="https://discord.com/channels/836271168977764363/1439559280410755223"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-white/80 hover:text-accent"
              >
                #roleplay-informations <ExternalLink className="size-3.5" />
              </a>
            </li>
            <li>
              <a
                href="https://discord.com/channels/836271168977764363/1563296282712481963"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-white/80 hover:text-accent"
              >
                #federal-gazette <ExternalLink className="size-3.5" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="page flex flex-col items-center justify-between gap-2 text-center text-xs text-white/60 sm:flex-row">
          <p>© 2018–{year} {t.footer.copyright}</p>
          <p>
            {t.footer.maintainedBy}{" "}
            <a
              href="https://yoursit.ee/csps"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-white/85 underline decoration-accent/50 underline-offset-4 transition hover:text-accent hover:decoration-accent"
            >
              CsPS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
