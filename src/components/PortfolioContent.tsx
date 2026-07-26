"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, Star } from "lucide-react";
import DirectionArrow from "@/components/DirectionArrow";
import PageHero from "@/components/PageHero";

// نوع مبسّط يُمرَّر من الـ Server Component
export interface PortfolioItemData {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  imageUrl: string;
  category: string;
  clientName?: string;
  featured: boolean;
}

const categoryLabels: Record<string, { en: string; ar: string }> = {
  all: { en: "All", ar: "الكل" },
  branding: { en: "Branding", ar: "هوية بصرية" },
  video: { en: "Video", ar: "فيديو" },
  social: { en: "Social Media", ar: "سوشيال ميديا" },
  web: { en: "Web", ar: "مواقع" },
  website: { en: "Website", ar: "موقع إلكتروني" },
  ecommerce: { en: "E-Commerce", ar: "متجر إلكتروني" },
};

export default function PortfolioContent({
  items,
  showHero = true,
}: {
  items: PortfolioItemData[];
  showHero?: boolean;
}) {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = Array.from(new Set(items.map((item) => item.category)));

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const sortedItems = [...filteredItems].sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ─── Hero Banner ─── */}
      {showHero && <PageHero
        badge={lang === "ar" ? "إبداع يتحدث عن نفسه" : "Creativity Speaks for Itself"}
        title={lang === "ar" ? "معرض أعمالنا" : "Our Portfolio"}
        description={
          lang === "ar"
            ? "استعرض مشاريعنا الناجحة في مختلف المجالات، حيث دمجنا بين الفن والتقنية لنصنع أعمالاً تفخر بها."
            : "Explore our successful projects across different fields, where we merged art and technology to create works you'll be proud of."
        }
        breadcrumbs={[
          { label: lang === "ar" ? "الرئيسية" : "Home", href: "/" },
          { label: lang === "ar" ? "أعمالنا" : "Portfolio" },
        ]}
      />}

      {/* ─── Portfolio Grid Section ─── */}
      <section className="section-y relative z-10 bg-slate-50">
        <div className="container-site">
          {items.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-5">
                <Sparkles size={36} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 leading-normal">
                {lang === "ar" ? "لا توجد أعمال بعد" : "No works yet"}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {lang === "ar" ? "ترقبوا المزيد من الأعمال الإبداعية قريباً." : "Stay tuned for more creative works soon."}
              </p>
            </div>
          ) : (
            <>
              {/* Filters */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-sm ${
                    activeCategory === "all"
                      ? "bg-brand-800 text-white shadow-md scale-105"
                      : "bg-white text-slate-600 hover:bg-slate-100 hover:text-brand-900"
                  }`}
                >
                  {lang === "ar" ? "الكل" : "All"}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-sm ${
                      activeCategory === cat
                        ? "bg-brand-800 text-white shadow-md scale-105"
                        : "bg-white text-slate-600 hover:bg-slate-100 hover:text-brand-900"
                    }`}
                  >
                    {lang === "ar"
                      ? categoryLabels[cat]?.ar || cat
                      : categoryLabels[cat]?.en || cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
                {sortedItems.map((item) => (
                  <Link href={`/portfolio/${item.id}`} key={item.id} className="group block relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500 aspect-card bg-white">
                    <Image src={item.imageUrl} alt={lang === "ar" ? item.titleAr : item.titleEn} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" quality={65} />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                          {lang === "ar"
                            ? categoryLabels[item.category]?.ar || item.category
                            : categoryLabels[item.category]?.en || item.category}
                        </span>
                        {item.featured && (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent-500/20 backdrop-blur-md border border-accent-500/30 text-accent-500" title={lang === "ar" ? "مميز" : "Featured"}>
                            <Star size={12} className="fill-current" />
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-accent-500 transition-colors line-clamp-2 leading-snug">
                        {lang === "ar" ? item.titleAr : item.titleEn}
                      </h3>
                      {item.clientName && (
                        <p className="text-slate-300 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed mt-1">
                          {lang === "ar" ? "العميل:" : "Client:"} {item.clientName}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="section-y-md relative overflow-hidden bg-brand-900">
         <div className="absolute inset-0 bg-accent-500/10 backdrop-blur-3xl z-0"></div>
         <div className="container-site relative z-10">
           <div className="max-w-3xl mx-auto text-center card-base-glass p-10 md:p-12">
             <h2 className="text-h2 text-white mb-4">
               {lang === "ar" ? "مستعدون لتحويل أفكارك إلى واقع؟" : "Ready to turn your ideas into reality?"}
             </h2>
             <p className="text-white/80 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
               {lang === "ar"
                 ? "تواصل معنا اليوم وكن قصة النجاح التالية في معرض أعمالنا المتميز."
                 : "Contact us today and become the next success story in our distinguished portfolio."}
             </p>
             <Link href="/contact" className="btn-md btn-primary inline-flex group">
               {lang === "ar" ? "ابدأ مشروعك الآن" : "Start Your Project Now"}
               <DirectionArrow size={20} className="transform transition-transform group-hover:-translate-x-2" />
             </Link>
           </div>
         </div>
       </section>
    </div>
  );
}
