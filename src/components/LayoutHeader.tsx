"use client";

import { useHideLayout } from "@/hooks/useHideLayout";
import Navbar from "./Navbar";
import FloatingWhatsApp from "./FloatingWhatsApp";

export default function LayoutHeader() {
  const hideLayout = useHideLayout();

  if (hideLayout) return null;

  return (
    <>
      <Navbar />
      <FloatingWhatsApp />
    </>
  );
}
