import "../styles/style.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ClientScripts from "@/components/ClientScripts";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata = {
  metadataBase: new URL("https://your-domain.com"),

  title: {
    default: "Tamam Media | Digital Marketing Agency in Yemen",
    template: "%s | Tamam Media",
  },

  description:
    "Tamam Media is a Yemeni digital marketing agency specializing in branding, web development, social media management, and integrated marketing solutions.",

  keywords: [
    "Tamam Media",
    "Digital Marketing Yemen",
    "Marketing Agency Taiz",
    "Branding Yemen",
    "Web Development Yemen",
    "SEO Yemen",
    "Social Media Marketing Yemen",
  ],

  authors: [{ name: "Tamam Media" }],
  creator: "Tamam Media",
  publisher: "Tamam Media",

  openGraph: {
    title: "Tamam Media",
    description:
      "Integrated digital marketing & branding agency in Yemen.",
    url: "https://your-domain.com",
    siteName: "Tamam Media",
    locale: "ar_YE",
    type: "website",
    images: [
      {
        url: "/imgs/2-3.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Tamam Media",
    description: "Digital Marketing Agency in Yemen",
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
  const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tamam Media",
  url: "https://your-domain.com",
  logo: "https://your-domain.com/imgs/2-3.png",
  description:
    "Digital marketing agency in Yemen offering branding, web development, and integrated marketing solutions.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Taiz",
    addressCountry: "Yemen",
  },
  sameAs: [],
};
  return (
    <html lang="ar" dir="rtl">
      <body>
        <LanguageProvider>
          <ClientScripts />
          <Navbar />

          <main>{children}</main>

          <Footer />
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}