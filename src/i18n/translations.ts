export type Lang = "ar" | "en";

export type TranslationKey =
  | "home"
  | "about"
  | "services"
  | "portfolio"
  | "contact"
  | "heroTitle1"
  | "heroTitle2"
  | "heroDesc"
  | "startProject"
  | "exploreServices";

export const translations: Record<Lang, Record<TranslationKey, string>> = {
  ar: {
    home: "الرئيسية",
    about: "من نحن",
    services: "خدماتنا",
    portfolio: "أعمالنا",
    contact: "اتصل بنا",

    heroTitle1: "نحو حضور أقوى",
    heroTitle2: "ونمو أذكى",
    heroDesc: "نبني حضوراً رقمياً وميدانياً متكاملاً للعلامات التجارية.",

    startProject: "ابدأ مشروعك",
    exploreServices: "استكشف الخدمات",
  },

  en: {
    home: "Home",
    about: "About",
    services: "Services",
    portfolio: "Portfolio",
    contact: "Contact",

    heroTitle1: "Stronger Presence",
    heroTitle2: "Smarter Growth",
    heroDesc: "We build integrated digital presence for brands.",

    startProject: "Start Project",
    exploreServices: "Explore Services",
  },
};
