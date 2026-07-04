import "./globals.css";
import { Alexandria } from "next/font/google";
import LayoutHeader from "@/components/LayoutHeader";
import LayoutFooter from "@/components/LayoutFooter";
import ClientScripts from "@/components/ClientScripts";
import { LanguageProvider } from "@/context/LanguageContext";
import StructuredData from "@/components/StructuredData";

/* =========================================================
   التحسينات التي تمت:
   1. دمج خط "Alexandria" بشكل أصلي عبر next/font لتحسين الأداء (بدون Layout Shift).
   2. إضافة كائن Viewport لضبط لون متصفح الجوال (themeColor) بلون الهوية الكحلي (#21214f).
   3. تحسينات SEO إضافية (canonical, robots).
   4. تطبيق كلاسات عامة على body لتحسين جودة عرض الخطوط (antialiased).
   ========================================================= */

// تحسين تحميل خط الهوية البصرية
const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-alexandria",
  display: "swap",
});

// تخصيص لون المتصفح ليتطابق مع الهوية البصرية (الأزرق الداكن)
export const viewport = {
  themeColor: "#21214f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  metadataBase: new URL("https://tamammedia.tech"),

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

  authors: [{ name: "تمام ميديا", url: "https://tamammedia.tech" }],
  creator: "تمام ميديا",
  publisher: "تمام ميديا",

  alternates: {
    canonical: "https://tamammedia.tech",
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
    url: "https://tamammedia.tech",
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
    apple: "/imgs/apple-touch-icon.png", // مستحسن لأجهزة آبل
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={alexandria.variable}>
      {/* 
        تمت إضافة antialiased لجعل الخط أكثر نعومة ووضوحاً
        و flex flex-col min-h-screen لضمان بقاء الفوتر في الأسفل دائماً 
      */}
      <body className={`${alexandria.className} antialiased min-h-screen flex flex-col overflow-x-hidden bg-white text-gray-900`}>
        <LanguageProvider>
          <ClientScripts />
          <LayoutHeader />
          <main className="flex-grow">{children}</main>
          <LayoutFooter />
          <StructuredData />
        </LanguageProvider>
      </body>
    </html>
  );
}