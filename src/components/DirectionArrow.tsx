"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DirectionArrow({ className, ...props }: LucideProps) {
  const { lang } = useLanguage();
  return <ArrowLeft className={cn(className, lang !== "ar" && "rotate-180")} {...props} />;
}
