import type { Metadata, Viewport } from "next";
import { Inter, Merriweather } from "next/font/google";
import { ViewTransition } from "react";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getDictionary, getLocale, locales } from "@/lib/i18n";
import "../globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"] });
const merriweather = Merriweather({ variable: "--font-merriweather", subsets: ["latin", "latin-ext"], weight: ["400", "700"] });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  const site = process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
  return {
    metadataBase: new URL(site),
    title: { template: "%s | Furnovskyland", default: "Furnovskyland" },
    description: t.intro.description.replace(/<[^>]+>/g, ""),
    manifest: "/manifest.json",
    icons: { icon: "/IMG/banner.webp" },
    openGraph: { type: "website", siteName: "Furnovskyland", images: ["/IMG/banner.webp"] },
  };
}

export const viewport: Viewport = { themeColor: "#3d0812" };

// Runs before first paint so dark mode never flashes light.
const themeScript = `try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t}catch(e){}`;

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  return (
    <html lang={await getLocale()} className={`${inter.variable} ${merriweather.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">
          <ViewTransition>{children}</ViewTransition>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
