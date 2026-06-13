"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";

export default function ConditionalLayoutClient() {
  const pathname = usePathname();
  const hideLayout = pathname?.startsWith("/dashboard") || pathname?.startsWith("/login");

  if (hideLayout) return null;

  return (
    <>
      <Navbar />
      <FloatingWhatsApp />
      <Footer />
    </>
  );
}