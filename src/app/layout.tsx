import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RevealObserver } from "@/components/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MOSAC — Uganda Motorsport, Rally Heritage & Esports",
    template: "%s | MOSAC",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: "MOSAC — Motorsport Africa Club",
    locale: "en_UG",
    images: [{ url: `${site.url}/images/photos/kigezi-2022-night-arch.jpg`, width: 2400, height: 1600 }],
  },
  twitter: { card: "summary_large_image" },
  // Keep previews out of search engines until launch (03, section U).
  robots: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0b111b",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: site.legalName,
  alternateName: "MOSAC",
  foundingDate: String(site.founded),
  sport: "Motorsport",
  url: site.url,
  memberOf: { "@type": "SportsOrganization", name: "Federation of Motorsport Clubs of Uganda", url: site.fmuUrl },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-UG" suppressHydrationWarning>
      <head>
        {/* Enables reveal-on-scroll styles only when JavaScript runs. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only z-[100] bg-gold px-4 py-3 font-bold text-midnight focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
