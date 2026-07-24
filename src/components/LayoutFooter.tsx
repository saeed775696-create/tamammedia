"use client";

import { useHideLayout } from "@/hooks/useHideLayout";
import Footer from "./Footer";

export default function LayoutFooter() {
  const hideLayout = useHideLayout();

  if (hideLayout) return null;

  return <Footer />;
}
