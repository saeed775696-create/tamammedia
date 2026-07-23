"use client";

import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "@/context/LanguageContext";

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
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </SessionProvider>
  );
}
