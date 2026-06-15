"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function LayoutFooter() {
  const pathname = usePathname();

  // إخفاء الفوتر في لوحة التحكم وصفحة الدخول
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/login")) {
    return null;
  }

  return <Footer />;
}