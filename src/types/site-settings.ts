export type LocalizedText = {
  ar: string;
  en: string;
};

export type HeroCard = LocalizedText & {
  imageUrl: string;
};

export type HeroStat = LocalizedText & {
  value: string;
};

export type SiteSettings = {
  branding: {
    nameAr: string;
    nameEn: string;
    logoUrl: string;
    taglineAr: string;
    taglineEn: string;
  };
  contact: {
    email: string;
    phone: string;
    phoneDisplay: string;
    locationAr: string;
    locationEn: string;
    workingHoursAr: string;
    workingHoursEn: string;
    mapEmbedUrl: string;
  };
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
    whatsapp: string;
  };
  analytics: {
    googleMeasurementId: string;
  };
  hero: {
    badgeAr: string;
    badgeEn: string;
    headingAr: string;
    headingEn: string;
    accentAr: string;
    accentEn: string;
    descriptionAr: string;
    descriptionEn: string;
    primaryCtaAr: string;
    primaryCtaEn: string;
    secondaryCtaAr: string;
    secondaryCtaEn: string;
    cards: HeroCard[];
    stats: HeroStat[];
  };
  homeAbout: {
    eyebrowAr: string;
    eyebrowEn: string;
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
  };
  footer: {
    descriptionAr: string;
    descriptionEn: string;
    designerName: string;
    designerPhone: string;
    designerPhoneDisplay: string;
  };
};
