import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { BookOpen, Box, Drama, FileText, House, Landmark, Vote } from "lucide-react";
import { getDictionary, getLocale, localeNames } from "@/lib/i18n";
import { LanguageSwitcher, MobileNav, NavLinks, ThemeToggle, type NavItem } from "./nav-client";
import { UserMenu } from "./user-menu";
import banner from "@/public/IMG/banner.webp";

export async function getNavItems(): Promise<NavItem[]> {
  const [locale, t] = [await getLocale(), await getDictionary()];
  const icon = "size-4 shrink-0";
  return [
    { href: `/${locale}/`, label: t.nav.home, icon: <House className={icon} /> },
    { href: `/${locale}/politika/`, label: t.nav.politics, icon: <Landmark className={icon} /> },
    { href: `/${locale}/szavazas/`, label: t.nav.votes, icon: <Vote className={icon} /> },
    { href: `/${locale}/tortenelem/`, label: t.nav.history, icon: <BookOpen className={icon} /> },
    { href: `/${locale}/minecraft/`, label: t.nav.minecraft, icon: <Box className={icon} /> },
    { href: `/${locale}/kultura/`, label: t.nav.culture, icon: <Drama className={icon} /> },
    { href: `/${locale}/egyeb/`, label: t.nav.other, icon: <FileText className={icon} /> },
  ];
}

export async function Header() {
  const [locale, t, items] = [await getLocale(), await getDictionary(), await getNavItems()];

  return (
    <header className="sticky top-0 z-50 border-t-2 border-b border-t-accent border-b-border bg-glass backdrop-blur-md">
      <nav className="page flex max-w-7xl items-center justify-between gap-4 py-3">
        <Link href={`/${locale}/`} className="flex shrink-0 items-center gap-3 text-heading hover:text-heading">
          <Image src={banner} alt="" className="h-11 w-auto drop-shadow-xs" priority />
          <div className="max-[440px]:sr-only">
            <span className="block font-serif text-lg leading-tight font-bold sm:text-xl">Furnovskyland</span>
            <span className="hidden text-[11px] font-medium tracking-wider text-muted uppercase sm:block">
              {t.footer.copyright}
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-5 xl:flex">
          <NavLinks
            items={items}
            className="relative flex items-center gap-1.5 py-2 text-sm font-semibold text-heading after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:text-secondary hover:after:w-full aria-[current=page]:text-secondary aria-[current=page]:after:w-full"
          />
        </div>

        <div className="flex items-center sm:gap-2.5">
          <LanguageSwitcher locales={Object.entries(localeNames)} label={t.nav.language} />
          <ThemeToggle label={t.nav.theme} />
          <Suspense fallback={<span className="inline-block w-24" />}>
            <UserMenu />
          </Suspense>
          <MobileNav items={items} label={t.nav.menu} />
        </div>
      </nav>
    </header>
  );
}
