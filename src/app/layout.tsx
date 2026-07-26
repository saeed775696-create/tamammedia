import "./globals.css";
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

export const viewport = {
  themeColor: "#21214f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "تمام ميديا | وكالة تسويق رقمي في اليمن",
    template: "%s | تمام ميديا",
  },

  description:
    "تمام ميديا وكالة تسويق رقمي يمنية متخصصة في بناء العلامات التجارية، تطوير المواقع، إدارة وسائل التواصل الاجتماعي وحلول تسويقية متكاملة.",

  keywords: [
    "تمام ميديا",
    "تسويق رقمي اليمن",
    "وكالة تسويق تعز",
    "بناء علامة تجارية اليمن",
    "تطوير مواقع اليمن",
    "SEO اليمن",
    "تسويق سوشيال ميديا اليمن",
    "حلول تسويقية اليمن",
  ],

  authors: [{ name: "تمام ميديا", url: siteConfig.url }],
  creator: "تمام ميديا",
  publisher: "تمام ميديا",

  alternates: {
    canonical: siteConfig.url,
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
    title: "تمام ميديا | وكالة تسويق رقمي في اليمن",
    description:
      "وكالة تسويق رقمي متكاملة في اليمن - بناء العلامات التجارية وتطوير المواقع.",
    url: siteConfig.url,
    siteName: "تمام ميديا",
    locale: "ar_YE",
    type: "website",
    images: [
      {
        url: "/imgs/2-3.png",
        width: 1200,
        height: 630,
        alt: "شعار تمام ميديا",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "تمام ميديا | وكالة تسويق رقمي في اليمن",
    description: "وكالة تسويق رقمي يمنية متخصصة في بناء العلامات التجارية",
    images: ["/imgs/2-3.png"],
  },

  icons: {
    icon: "/imgs/favicon-32x32.png",
    apple: "/imgs/favicon-32x32.png",
  },
};

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
          <ClientScripts />
          <ScrollProgress />
          <LayoutHeader />
          <main id="main-content" className="flex-grow" tabIndex={-1}>{children}</main>
          <LayoutFooter />
          <BackToTop />
          <StructuredData nonce={nonce} />
          <TawkChat />
        </Providers>
      </body>
    </html>
  );
}
