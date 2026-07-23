"use client";

import { usePathname } from "next/navigation";
import FooterClient from "./FooterClient";
import { useState, useEffect } from "react";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

type Props = {
  content: Record<string, string>;
};

/**
 * يلف FooterClient ويخفيه في صفحات dashboard و login.
 */
export default function Footer({ content }: Props) {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/login")) {
    return null;
  }

  return <FooterClient content={content} />;
}
