"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import FloatingWhatsApp from "./FloatingWhatsApp";

export default function LayoutHeader() {
  const pathname = usePathname();

  // إخفاء الشريط والواتساب في لوحة التحكم وصفحة الدخول
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/login")) {
    return null;
  }

  return (
    <>
      <Navbar />
      <FloatingWhatsApp />
    </>
  );
}