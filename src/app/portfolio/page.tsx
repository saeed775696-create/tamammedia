"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { extractItems } from "@/lib/api/extract";
import { Sparkles, Star } from "lucide-react";
import DirectionArrow from "@/components/DirectionArrow";

interface PortfolioItem {
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

export default function PortfolioPage() {
  const { lang } = useLanguage();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        setItems(extractItems<PortfolioItem>(data));
      })
      .catch(() => {
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, []);

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
<section className="relative bg-brand-900 pt-56 pb-48 min-h-[50vh] flex flex-col justify-center overflow-hidden">
         {/* Animated Background Orbs */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse -translate-y-1/4 translate-x-1/4"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-700/30 rounded-full blur-[140px] pointer-events-none translate-y-1/4 -translate-x-1/4"></div>

         {/* زخرفة هندسية متطورة */}
         <div
           className="absolute top-0 right-0 w-full md:w-3/4 h-full bg-gradient-to-bl from-accent-500/10 via-transparent to-transparent pointer-events-none clip-polygon-top-right"
         ></div>
        
        {/* Divider SVG for smooth transition */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180 z-20">
          <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
             <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f8fafc"></path>
          </svg>
        </div>

        <div className="mx-auto max-w-[1200px] px-5 relative z-30 text-center">
          <span className="inline-flex items-center gap-2 py-2 px-6 bg-white/10 backdrop-blur-md border border-white/10 text-accent-500 rounded-full text-sm font-bold mb-6 shadow-xl tracking-wide">
            <Sparkles size={16} />
            {lang === "ar" ? "إبداع يتحدث عن نفسه" : "Creativity Speaks for Itself"}
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white drop-shadow-2xl leading-snug md:leading-[1.4]">
            {lang === "ar" ? "معرض أعمالنا" : "Our Portfolio"}
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-[1.8] font-medium">
            {lang === "ar"
              ? "استعرض مشاريعنا الناجحة في مختلف المجالات، حيث دمجنا بين الفن والتقنية لنصنع أعمالاً تفخر بها."
              : "Explore our successful projects across different fields, where we merged art and technology to create works you'll be proud of."}
          </p>

          <div className="flex items-center justify-center gap-3 text-sm font-semibold bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full inline-flex mx-auto border border-white/5 shadow-lg">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-accent-500/50">•</span>
            <span className="text-accent-500 drop-shadow-md">{lang === "ar" ? "أعمالنا" : "Portfolio"}</span>
          </div>
        </div>
      </section>

      {/* ─── Portfolio Grid Section ─── */}
      <section className="py-32 relative z-10 bg-slate-50">
        <div className="mx-auto max-w-[1200px] px-5 max-w-7xl">
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--color-brand-800)]"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles size={40} className="text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4 leading-normal">
                {lang === "ar" ? "لا توجد أعمال بعد" : "No works yet"}
              </h3>
              <p className="text-slate-500 leading-relaxed">
                {lang === "ar" ? "ترقبوا المزيد من الأعمال الإبداعية قريباً." : "Stay tuned for more creative works soon."}
              </p>
            </div>
          ) : (
            <>
              {/* Filters */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedItems.map((item) => (
                  <Link href={`/portfolio/${item.id}`} key={item.id} className="group block relative rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_-5px_rgba(33,33,79,0.15)] hover:-translate-y-2 transition-all duration-500 aspect-[4/3] bg-white">
                    <Image src={item.imageUrl} alt={lang === "ar" ? item.titleAr : item.titleEn} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block px-4 py-1.5 text-xs font-bold text-white bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                          {lang === "ar"
                            ? categoryLabels[item.category]?.ar || item.category
                            : categoryLabels[item.category]?.en || item.category}
                        </span>
                        {item.featured && (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent-500/20 backdrop-blur-md border border-accent-500/30 text-accent-500" title={lang === "ar" ? "مميز" : "Featured"}>
                            <Star size={14} className="fill-current" />
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-accent-500 transition-colors line-clamp-2 leading-snug md:leading-normal">
                        {lang === "ar" ? item.titleAr : item.titleEn}
                      </h3>
                      {item.clientName && (
                        <p className="text-slate-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed mt-1">
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
<section className="py-32 relative overflow-hidden bg-brand-900 mt-16">
         <div className="absolute inset-0 bg-accent-500/10 backdrop-blur-3xl z-0"></div>
         <div className="mx-auto max-w-[1200px] px-5 relative z-10">
           <div className="max-w-4xl mx-auto text-center bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-16 rounded-[3rem] shadow-2xl">
             <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-6 leading-relaxed md:leading-[1.5]">
               {lang === "ar" ? "مستعدون لتحويل أفكارك إلى واقع؟" : "Ready to turn your ideas into reality?"}
             </h2>
             <p className="text-white/80 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-[1.8]">
               {lang === "ar"
                 ? "تواصل معنا اليوم وكن قصة النجاح التالية في معرض أعمالنا المتميز."
                 : "Contact us today and become the next success story in our distinguished portfolio."}
             </p>
             <Link href="/contact" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-accent-500 text-white rounded-full font-bold text-lg hover:bg-accent-600 hover:scale-105 hover:shadow-[0_10px_30px_-5px_rgba(218,136,39,0.5)] transition-all group">
               {lang === "ar" ? "ابدأ مشروعك الآن" : "Start Your Project Now"}
               <DirectionArrow size={24} className="transform transition-transform group-hover:-translate-x-2" />
             </Link>
           </div>
         </div>
       </section>
    </div>
  );
}