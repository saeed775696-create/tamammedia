"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, Lang, TranslationKey } from "@/i18n/translations";

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LangContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  // load saved language safely
  useEffect(() => {
    const saved = localStorage.getItem("lang");

    if (saved === "ar" || saved === "en") {
      setLang(saved);
    } else {
      setLang("ar");
      localStorage.setItem("lang", "ar");
    }
  }, []);

  // update html attributes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  const t = (key: TranslationKey) => {
    return translations[lang][key];
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