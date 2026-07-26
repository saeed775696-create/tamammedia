"use client";

import { createContext, useContext } from "react";
import { defaultSiteSettings } from "@/config/site-settings";
import type { SiteSettings } from "@/types/site-settings";

const SiteSettingsContext = createContext<SiteSettings>(defaultSiteSettings);

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
