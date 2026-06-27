import "./globals.css";
import LayoutHeader from "@/components/LayoutHeader";
import LayoutFooter from "@/components/LayoutFooter";
import ClientScripts from "@/components/ClientScripts";
import { LanguageProvider } from "@/context/LanguageContext";
import StructuredData from "@/components/StructuredData";

export const metadata = {
  metadataBase: new URL("https://tamammedia.vercel.app/"),

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

  authors: [{ name: "تمام ميديا" }],
  creator: "تمام ميديا",
  publisher: "تمام ميديا",

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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <LanguageProvider>
          <ClientScripts />
          <LayoutHeader />
          <main>{children}</main>
          <LayoutFooter />
          <StructuredData />
        </LanguageProvider>
      </body>
    </html>
  );
}