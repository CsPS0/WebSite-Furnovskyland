"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, type ReactNode } from "react";
import { Globe, Menu, Moon, Sun, X } from "lucide-react";

export type NavItem = { href: string; label: string; icon: ReactNode };

function isActive(pathname: string, href: string) {
  // Home is /en/, every other page lives below it.
  return href.split("/").length <= 3 ? pathname === href : pathname.startsWith(href);
}

type LinksProps = { items: NavItem[]; className: string };

// usePathname() is request data, so it sits behind Suspense; the fallback is the same links without the active marker.
export function NavLinks(props: LinksProps) {
  return (
    <Suspense fallback={<Links {...props} pathname="" />}>
      <ActiveLinks {...props} />
    </Suspense>
  );
}

function ActiveLinks(props: LinksProps) {
  return <Links {...props} pathname={usePathname()} />;
}

function Links({ items, className, pathname }: LinksProps & { pathname: string }) {
  return items.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      aria-current={isActive(pathname, item.href) ? "page" : undefined}
      className={className}
    >
      {item.icon}
      <span>{item.label}</span>
    </Link>
  ));
}

/** Full-screen menu for small screens, built on the popover attribute so it needs no open/close state. */
export function MobileNav({ items, label }: { items: NavItem[]; label: string }) {
  return (
    <>
      <button popoverTarget="mobile-nav" aria-label={label} className="p-2 text-heading xl:hidden">
        <Menu className="size-6" />
      </button>
      <Suspense>
        <HideOnNavigate id="mobile-nav" />
      </Suspense>
      <div
        id="mobile-nav"
        popover="auto"
        className="m-0 h-dvh w-full max-w-none flex-col items-center justify-center gap-4 bg-primary-dark text-white open:flex"
      >
        <button popoverTarget="mobile-nav" popoverTargetAction="hide" aria-label={label} className="absolute top-5 right-5 p-2 text-white">
          <X className="size-7" />
        </button>
        <NavLinks
          items={items}
          className="flex items-center gap-3 py-2 text-2xl font-semibold text-white hover:text-accent aria-[current=page]:text-accent"
        />
      </div>
    </>
  );
}

/** Closes a popover menu after a client-side navigation. */
function HideOnNavigate({ id }: { id: string }) {
  const pathname = usePathname();
  useEffect(() => document.getElementById(id)?.hidePopover(), [id, pathname]);
  return null;
}

function LanguageLinks({ locales, pathname }: { locales: [string, string][]; pathname: string }) {
  const rest = pathname.split("/").slice(2).join("/");
  return locales.map(([code, name]) => (
    <Link
      key={code}
      href={`/${code}/${rest}`}
      hrefLang={code}
      lang={code}
      className="block border-b border-border px-4 py-3 text-text last:border-0 hover:bg-bg hover:text-secondary"
    >
      {name}
    </Link>
  ));
}

function CurrentLanguageLinks({ locales }: { locales: [string, string][] }) {
  return <LanguageLinks locales={locales} pathname={usePathname()} />;
}

export function LanguageSwitcher({ locales, label }: { locales: [string, string][]; label: string }) {
  return (
    <>
      <button
        popoverTarget="language-menu"
        title={label}
        className="flex items-center gap-2 py-2 font-semibold text-heading hover:text-secondary [anchor-name:--lang]"
      >
        <Globe className="size-4" />
        <span className="sr-only">{label}</span>
      </button>
      <Suspense>
        <HideOnNavigate id="language-menu" />
      </Suspense>
      <div
        id="language-menu"
        popover="auto"
        // Without anchor positioning the browser centers the popover, which is still usable.
        className="min-w-40 overflow-hidden supports-[position-area:bottom]:m-0 supports-[position-area:bottom]:mt-2 rounded-lg border border-border bg-surface p-0 shadow-lg [position-anchor:--lang] [position-area:bottom_span-left]"
      >
        <Suspense fallback={<LanguageLinks locales={locales} pathname="" />}>
          <CurrentLanguageLinks locales={locales} />
        </Suspense>
      </div>
    </>
  );
}

export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  // Both icons are rendered and CSS picks one, so the server never has to know the theme.
  return (
    <button onClick={toggle} aria-label={label} title={label} className="p-2 text-heading hover:text-secondary">
      <Moon className="size-5 dark:hidden" />
      <Sun className="hidden size-5 dark:block" />
    </button>
  );
}
