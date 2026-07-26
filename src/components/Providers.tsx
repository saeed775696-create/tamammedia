"use client";

import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "@/context/LanguageContext";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import type { SiteSettings } from "@/types/site-settings";

/**
 * يجمع كل الـ context providers في مكان واحد.
 *
 * SessionProvider مطلوب لـ:
 * - useSession() في DashboardNav
 * - signIn() / signOut() في login و dashboard
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
    <SessionProvider>
      <SiteSettingsProvider settings={settings}>
        <LanguageProvider>{children}</LanguageProvider>
      </SiteSettingsProvider>
    </SessionProvider>
  );
}
