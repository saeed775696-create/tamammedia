"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import type { SiteSettings } from "@/types/site-settings";

/**
 * يجمع كل الـ context providers في مكان واحد.
 *
 * LanguageProvider مطلوب لـ:
 * - useLanguage() في كل الصفحات العامة
 */
export default function Providers({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsProvider settings={settings}>
      <LanguageProvider>{children}</LanguageProvider>
    </SiteSettingsProvider>
  );
}
