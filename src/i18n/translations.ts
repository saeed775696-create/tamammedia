import ar from "./ar";
import en from "./en";

export type Lang = "ar" | "en";

// القاموس الشامل: يدمج ar.ts و en.ts مع دعم المفاتيح المتداخلة
export const translations: Record<Lang, typeof ar> = {
  ar,
  en,
};
