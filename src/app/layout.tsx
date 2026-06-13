import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ClientScripts from "@/components/ClientScripts";
import { LanguageProvider } from "@/context/LanguageContext";
import { headers } from "next/headers";

export const metadata = {
  // ... metadata بدون تغيير ...
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/login");

  return (
    <html lang="ar" dir="rtl">
      <body>
        <LanguageProvider>
          <ClientScripts />
          {!isDashboard && (
            <>
              <Navbar />
              <FloatingWhatsApp />
            </>
          )}
          <main>{children}</main>
          {!isDashboard && <Footer />}
        </LanguageProvider>
      </body>
    </html>
  );
}