import type { SiteSettings } from "@/types/site-settings";

export const defaultSiteSettings: SiteSettings = {
  branding: {
    nameAr: "تمام ميديا",
    nameEn: "Tamam Media",
    logoUrl: "/imgs/2-3.png",
    taglineAr: "حلول رقمية متكاملة",
    taglineEn: "Integrated Digital Solutions",
  },
  contact: {
    email: "tamammedia9@gmail.com",
    phone: "967733579558",
    phoneDisplay: "+967 733 579 558",
    locationAr: "تعز – اليمن",
    locationEn: "Taiz – Yemen",
    workingHoursAr: "الأحد - الخميس: 9 ص - 6 م",
    workingHoursEn: "Sun - Thu: 9 AM - 6 PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3868.4872934213544!2d44.0197!3d13.5765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1601b4c8c0c0c0c1%3A0x0!2z2KfZhNiv2YrZitip!5e0!3m2!1sar!2s!4v1690000000000",
  },
  social: {
    facebook: "https://www.facebook.com/tamammedia1/",
    instagram: "https://www.instagram.com/tamammedia9",
    linkedin: "https://www.linkedin.com/in/tamam-media-0914b1418",
    whatsapp: "https://wa.me/967733579558",
  },
  hero: {
    badgeAr: "وكالة تسويق رقمي متكاملة",
    badgeEn: "Integrated Digital Marketing Agency",
    headingAr: "نحو حضور أقوى",
    headingEn: "Towards a Stronger Presence",
    accentAr: "بصناعة رقمية",
    accentEn: "Digital Excellence",
    descriptionAr:
      "نبني حضوراً رقمياً وميدانياً متكاملاً ينقل علامتك التجارية إلى آفاق جديدة بخطوات مدروسة وتصاميم إبداعية.",
    descriptionEn:
      "We build an integrated digital and on-ground presence that takes your brand to new heights with creative designs.",
    primaryCtaAr: "ابدأ مشروعك",
    primaryCtaEn: "Start Project",
    secondaryCtaAr: "استكشف الخدمات",
    secondaryCtaEn: "Explore Services",
    cards: [
      { ar: "إدارة التواصل", en: "Social Media", imageUrl: "/imgs/services/social_media_real.jpg" },
      { ar: "حملات تسويقية", en: "Marketing Campaigns", imageUrl: "/imgs/services/marketing_real.jpg" },
      { ar: "الإعلانات الممولة", en: "Advertising", imageUrl: "/imgs/services/advertising_real.jpg" },
      { ar: "التصميم الجرافيكي", en: "Graphic Design", imageUrl: "/imgs/services/graphic_design_real.jpg" },
    ],
    stats: [
      { value: "+50", ar: "عميل سعيد", en: "Happy Clients" },
      { value: "+120", ar: "مشروع منجز", en: "Projects Done" },
      { value: "100%", ar: "ضمان الجودة", en: "Quality Assured" },
    ],
  },
  homeAbout: {
    eyebrowAr: "من نحن",
    eyebrowEn: "About Us",
    titleAr: "نصنع فرقاً حقيقياً لعلامتك التجارية",
    titleEn: "We create a real difference for your brand",
    descriptionAr:
      "تمام ميديا وكالة تسويق رقمي متكاملة تجمع بين الإبداع والخبرة التقنية لنصنع حضوراً مؤثراً ونمواً مستداماً لعملائنا.",
    descriptionEn:
      "Tamam Media is an integrated digital marketing agency that combines creativity and technical expertise to build an impactful presence and sustainable growth for our clients.",
  },
  footer: {
    descriptionAr:
      "شركة يمنية متخصصة في الحلول الرقمية والتسويقية المتكاملة. نقدم خدمات إبداعية وتقنية تساعد عملاءنا على النمو والتميز في العالم الرقمي.",
    descriptionEn:
      "A Yemeni company specialized in integrated digital and marketing solutions. We provide creative and technical services that help our clients grow and excel in the digital world.",
    designerName: "Saeed Alshadadi / سعيد الشدادي",
    designerPhone: "967736458132",
    designerPhoneDisplay: "+967 736 458 132",
  },
};

function mergeSection<T extends Record<string, unknown>>(defaults: T, value: unknown): T {
  return {
    ...defaults,
    ...(value && typeof value === "object" && !Array.isArray(value) ? value : {}),
  };
}

export function normalizeSiteSettings(value: unknown): SiteSettings {
  const source = value && typeof value === "object" && !Array.isArray(value)
    ? (value as Partial<SiteSettings>)
    : {};
  const hero = mergeSection(defaultSiteSettings.hero, source.hero);

  return {
    branding: mergeSection(defaultSiteSettings.branding, source.branding),
    contact: mergeSection(defaultSiteSettings.contact, source.contact),
    social: mergeSection(defaultSiteSettings.social, source.social),
    hero: {
      ...hero,
      cards: Array.isArray(source.hero?.cards) && source.hero.cards.length > 0
        ? source.hero.cards
        : defaultSiteSettings.hero.cards,
      stats: Array.isArray(source.hero?.stats) && source.hero.stats.length > 0
        ? source.hero.stats
        : defaultSiteSettings.hero.stats,
    },
    homeAbout: mergeSection(defaultSiteSettings.homeAbout, source.homeAbout),
    footer: mergeSection(defaultSiteSettings.footer, source.footer),
  };
}
