import "./globals.css";
import LayoutHeader from "@/components/LayoutHeader";
import LayoutFooter from "@/components/LayoutFooter";
import ClientScripts from "@/components/ClientScripts";
import Providers from "@/components/Providers";
import StructuredData from "@/components/StructuredData";
import TawkChat from "@/components/TawkChat";
import { siteConfig } from "@/config/site";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body
        className="font-[Alexandria,sans-serif] antialiased min-h-screen flex flex-col overflow-x-hidden bg-white text-gray-900"
      >
        <Providers>
          <ClientScripts />
          <LayoutHeader />
          <main className="flex-grow">{children}</main>
          <LayoutFooter />
          <StructuredData />
          <TawkChat />
        </Providers>
      </body>
    </html>
  );
}
