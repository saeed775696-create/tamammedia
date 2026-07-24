/**
 * إعدادات الموقع الموحدة.
 * مصدر واحد للحقيقة لكل الروابط وأرقام الهواتف والبريد.
 * أي تغيير هنا ينعكس على كل الصفحات.
 */
export const siteConfig = {
  /** الرابط الأساسي للموقع (بدون شرطة مائلة في النهاية) */
  url: process.env.NEXT_PUBLIC_APP_URL || "https://tamammedia.tech",

  /** الاسم التجاري */
  name: {
    ar: "تمام ميديا",
    en: "Tamam Media",
  },

  /** البريد الإلكتروني الرسمي */
  email: "tamammedia9@gmail.com",

  /** رقم الهاتف الموحد للواتساب والمكالمات (بدون +) */
  phone: "967733579558",
  phoneDisplay: "+967 733 579 558",

  /** الموقع الجغرافي */
  location: {
    ar: "تعز – اليمن",
    en: "Taiz – Yemen",
  },

  /** رقم مصمم الموقع (يظهر في الفوتر فقط) */
  designerPhone: "967736458132",
  designerPhoneDisplay: "+967 736 458 132",
  designerName: "Saeed Alshadadi / سعيد الشدادي",

  /** روابط التواصل الاجتماعي */
  social: {
    facebook: "https://www.facebook.com/tamammedia1/",
    instagram: "https://www.instagram.com/tamammedia9",
    linkedin: "https://www.linkedin.com/in/tamam-media-0914b1418",
    whatsapp: "https://wa.me/967733579558",
  },

  /** ساعات العمل */
  workingHours: {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "09:00",
    closes: "18:00",
  },
} as const;

/** رابط واتساب جاهز مع رسالة */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
