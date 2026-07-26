"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";
import { translations, Lang } from "@/i18n/translations";

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LangContextType | null>(null);

function getStoredLanguage(): Lang {
  if (typeof window === "undefined") return "ar";
  const saved = localStorage.getItem("lang");
  return saved === "ar" || saved === "en" ? saved : "ar";
}

function subscribeToLanguage(callback: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === "lang") callback();
  };

  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const storedLang = useSyncExternalStore<Lang>(
    subscribeToLanguage,
    getStoredLanguage,
    () => "ar"
  );
  const [selectedLang, setSelectedLang] = useState<Lang | null>(null);
  const lang = selectedLang ?? storedLang;

  useEffect(() => {
    document.documentElement.lang = lang;
    // يقلب التخطيط حسب اللغة: RTL للعربية، LTR للإنجليزية
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const changeLang = (l: Lang) => {
    setSelectedLang(l);
    localStorage.setItem("lang", l);
  };

  // دالة الترجمة الذكية: تدعم المفاتيح المتداخلة مثل "dashboard.home"
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = translations[lang];
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // fallback: يظهر المفتاح نفسه إذا لم يجد الترجمة
      }
    }
    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be inside provider");
  return ctx;
}
