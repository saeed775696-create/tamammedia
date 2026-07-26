"use client";

import { useLanguage } from "@/context/LanguageContext";
import PageHero from "@/components/PageHero";

export default function PortfolioHero() {
  const { lang } = useLanguage();

  return (
    <PageHero
      badge={lang === "ar" ? "إبداع يتحدث عن نفسه" : "Creativity Speaks for Itself"}
      title={lang === "ar" ? "معرض أعمالنا" : "Our Portfolio"}
      description={
        lang === "ar"
          ? "استعرض مشاريعنا الناجحة في مختلف المجالات، حيث دمجنا بين الفن والتقنية لنصنع أعمالاً تفخر بها."
          : "Explore our successful projects across different fields, where we merged art and technology to create works you'll be proud of."
      }
      breadcrumbs={[
        { label: lang === "ar" ? "الرئيسية" : "Home", href: "/" },
        { label: lang === "ar" ? "أعمالنا" : "Our Portfolio" },
      ]}
    />
  );
}
