import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { connection } from "next/server";
import { headers } from "next/headers";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-cairo",
});

import LayoutHeader from "@/components/LayoutHeader";
import LayoutFooter from "@/components/LayoutFooter";
import ClientScripts from "@/components/ClientScripts";
import Providers from "@/components/Providers";
import StructuredData from "@/components/StructuredData";
import TawkChat from "@/components/TawkChat";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import { siteConfig } from "@/config/site";
import { getSiteSettings } from "@/lib/site-settings.server";
import { absoluteUrl, summarizeForSearch } from "@/lib/seo";

// Global content is administered at runtime, so the layout must not be frozen
// into the production build before the current settings can be read.
export const dynamic = "force-dynamic";

/* =========================================================
   التحسينات المطبّقة:
   1. دمج خط "Alexandria" عبر رابط خارجي (مؤقتاً بسبب مشاكل الاتصال).
   2. كائن Viewport لضبط لون متصفح الجوال بلون الهوية (#21214f).
   3. تحسينات SEO (canonical, robots, openGraph).
   4. antialiased لجودة عرض الخطوط.
   ========================================================= */

export const viewport: Viewport = {
  themeColor: "#21214f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const description = summarizeForSearch(settings.seo.descriptionAr);
  const socialImage = absoluteUrl(settings.seo.ogImageUrl);

  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: settings.branding.nameAr,
    title: {
      default: settings.seo.titleAr,
      template: `%s | ${settings.branding.nameAr}`,
    },
    description,
    authors: [{ name: settings.branding.nameAr, url: siteConfig.url }],
    creator: settings.branding.nameAr,
    publisher: settings.branding.nameAr,
    category: "التسويق الرقمي وتطوير المواقع",
    alternates: {
      canonical: siteConfig.url,
    },
    manifest: "/manifest.webmanifest",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    verification: {
      google: settings.seo.googleSiteVerification || undefined,
      other: settings.seo.bingSiteVerification
        ? { "msvalidate.01": settings.seo.bingSiteVerification }
        : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: settings.seo.titleAr,
      description,
      url: siteConfig.url,
      siteName: `${settings.branding.nameAr} | ${settings.branding.nameEn}`,
      locale: "ar_YE",
      type: "website",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: settings.seo.titleAr,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seo.titleAr,
      description,
      images: [socialImage],
    },
    icons: {
      icon: "/icon",
      shortcut: "/imgs/favicon-32x32.png",
      apple: "/icon",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Content comes from the dashboard and must be rendered per request rather
  // than captured as a static fallback during the production build.
  await connection();
  const nonce = (await headers()).get("x-nonce") || undefined;
  const settings = await getSiteSettings();

  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${cairo.className} antialiased min-h-screen flex flex-col bg-surface-50 text-brand-900`}
      >
        <a
          href="#main-content"
          className="sr-only fixed start-4 top-4 z-[1100] rounded-lg bg-brand-900 px-4 py-2 font-bold text-white shadow-lg focus:not-sr-only focus:outline-none focus:ring-4 focus:ring-accent-400"
        >
          الانتقال إلى المحتوى
        </a>
        <Providers settings={settings}>
          <ClientScripts nonce={nonce} />
          <ScrollProgress />
          <LayoutHeader />
          <main id="main-content" className="flex-grow" tabIndex={-1}>{children}</main>
          <LayoutFooter />
          <BackToTop />
          <StructuredData nonce={nonce} settings={settings} />
          <TawkChat />
        </Providers>
      </body>
    </html>
  );
}
