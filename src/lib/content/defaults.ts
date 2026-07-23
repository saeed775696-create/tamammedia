/**
 * قيم افتراضية لمحتوى الموقع.
 * تُستخدم عند أول تشغيل أو كـ fallback عند عدم وجود قيمة في DB.
 */
export const DEFAULT_CONTENT = {
  // ===== الصفحة الرئيسية - Hero =====
  "hero.badge.ar": "وكالة تسويق رقمي متكاملة",
  "hero.badge.en": "Integrated Digital Marketing Agency",
  "hero.title1.ar": "نحو حضور أقوى",
  "hero.title1.en": "Towards a Stronger Presence",
  "hero.title2.ar": "بصناعة رقمية",
  "hero.title2.en": "Digital Excellence",
  "hero.subtitle.ar":
    "نبني حضوراً رقمياً وميدانياً متكاملاً ينقل علامتك التجارية إلى آفاق جديدة.",
  "hero.subtitle.en":
    "We build integrated digital and on-ground presence that takes your brand to new heights.",
  "hero.cta1.ar": "ابدأ مشروعك",
  "hero.cta1.en": "Start Project",
  "hero.cta2.ar": "استكشف الخدمات",
  "hero.cta2.en": "Explore Services",
  "hero.stat1.value": "+50",
  "hero.stat1.label.ar": "عميل",
  "hero.stat1.label.en": "Clients",
  "hero.stat2.value": "+120",
  "hero.stat2.label.ar": "مشروع",
  "hero.stat2.label.en": "Projects",
  "hero.stat3.value": "100%",
  "hero.stat3.label.ar": "رضا العملاء",
  "hero.stat3.label.en": "Satisfaction",

  // ===== من نحن =====
  "about.title.ar": "تعرف على تمام ميديا",
  "about.title.en": "About Tamam Media",
  "about.subtitle.ar": "تعرّف على قصتنا، رؤيتنا، وقيمنا",
  "about.subtitle.en": "Learn about our story, vision, and values",
  "about.p1.ar":
    "تمام ميديا هي شركة يمنية متخصصة في تقديم الحلول الرقمية والتسويقية المتكاملة.",
  "about.p1.en":
    "Tamam Media is a Yemeni company specialized in providing integrated digital marketing solutions.",
  "about.p2.ar":
    "لا نقدم مجرد تصميم أو خدمة تقنية، بل نبني حضوراً متكاملاً للعلامات التجارية.",
  "about.p2.en":
    "We don't just provide design or tech services, we build complete brand presence.",
  "about.p3.ar": "اسمنا يعكس وعدنا: الإتقان والاكتمال والرضا.",
  "about.p3.en":
    "Our name reflects our promise: excellence, completeness, and satisfaction.",
  "about.vision.ar": "الريادة في الحلول الرقمية والتسويقية المتكاملة.",
  "about.vision.en": "Leadership in integrated digital marketing solutions.",
  "about.mission.ar": "مساعدة الشركات على بناء حضور قوي وفعّال.",
  "about.mission.en": "Helping businesses build strong digital presence.",
  "about.values.ar": "الإتقان، الشفافية، الالتزام، النتائج.",
  "about.values.en": "Excellence, transparency, commitment, results.",

  // ===== معلومات التواصل =====
  "contact.phone": "967733579558",
  "contact.phoneDisplay": "+967 733 579 558",
  "contact.email": "tamammedia9@gmail.com",
  "contact.address.ar": "تعز – اليمن",
  "contact.address.en": "Taiz – Yemen",
  "contact.whatsapp": "967733579558",
  "contact.facebook": "https://www.facebook.com/tamammedia1/",
  "contact.instagram": "https://www.instagram.com/tamammedia9",
  "contact.linkedin": "https://www.linkedin.com/in/tamam-media-0914b1418",
  "contact.hours.days": "الأحد - الخميس",
  "contact.hours.time": "9:00 ص - 6:00 م",

  // ===== SEO =====
  "seo.title": "تمام ميديا | وكالة تسويق رقمي في اليمن",
  "seo.description":
    "تمام ميديا وكالة تسويق رقمي يمنية متخصصة في بناء العلامات التجارية، تطوير المواقع، إدارة وسائل التواصل الاجتماعي وحلول تسويقية متكاملة.",
  "seo.keywords":
    "تمام ميديا,تسويق رقمي اليمن,وكالة تسويق تعز,بناء علامة تجارية اليمن,تطوير مواقع اليمن,SEO اليمن",

  // ===== إعدادات عامة =====
  "general.siteName.ar": "تمام ميديا",
  "general.siteName.en": "Tamam Media",
  "general.designerName": "Saeed Alshadadi / سعيد الشدادي",
  "general.designerPhone": "967736458132",
  "general.designerPhoneDisplay": "+967 736 458 132",
} as const;

export type ContentKey = keyof typeof DEFAULT_CONTENT;

/** كل المفاتيح مرتبة حسب الفئة */
export const CONTENT_SECTIONS = [
  {
    id: "hero",
    label: "القسم الرئيسي (Hero)",
    keys: Object.keys(DEFAULT_CONTENT).filter((k) => k.startsWith("hero.")),
  },
  {
    id: "about",
    label: "من نحن",
    keys: Object.keys(DEFAULT_CONTENT).filter((k) => k.startsWith("about.")),
  },
  {
    id: "contact",
    label: "معلومات التواصل",
    keys: Object.keys(DEFAULT_CONTENT).filter((k) => k.startsWith("contact.")),
  },
  {
    id: "seo",
    label: "تحسين محركات البحث (SEO)",
    keys: Object.keys(DEFAULT_CONTENT).filter((k) => k.startsWith("seo.")),
  },
  {
    id: "general",
    label: "إعدادات عامة",
    keys: Object.keys(DEFAULT_CONTENT).filter((k) => k.startsWith("general.")),
  },
] as const;
