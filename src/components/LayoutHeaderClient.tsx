"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import FloatingWhatsAppClient from "./FloatingWhatsAppClient";

type Props = {
  content: Record<string, string>;
};

export default function LayoutHeaderClient({ content }: Props) {
  const pathname = usePathname();

  // إخفاء الشريط والواتساب في لوحة التحكم وصفحة الدخول
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/login")) {
    return null;
  }

  return (
    <>
      <Navbar />
      <FloatingWhatsAppClient content={content} />
    </>
  );
}
