"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles } from "lucide-react";
import DirectionArrow from "./DirectionArrow";

export default function Hero() {
  const { lang } = useLanguage();

  const cards = [
    { titleAr: "إدارة التواصل", titleEn: "Social Media", img: "/imgs/services/social_media_real.jpg" },
    { titleAr: "حملات تسويقية", titleEn: "Marketing Campaigns", img: "/imgs/services/marketing_real.jpg" },
    { titleAr: "الإعلانات الممولة", titleEn: "Advertising", img: "/imgs/services/advertising_real.jpg" },
    { titleAr: "التصميم الجرافيكي", titleEn: "Graphic Design", img: "/imgs/services/graphic_design_real.jpg" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-900 via-[#18183f] to-brand-800">
      <div className="absolute top-[-20%] right-[10%] w-[600px] h-[600px] bg-accent-500/20 rounded-full blur-[100px] pointer-events-none animate-float z-0"></div>
      <div className="absolute bottom-[-20%] left-[10%] w-[800px] h-[800px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow z-0"></div>
      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[40px] shadow-[inset_0_0_80px_rgba(255,255,255,0.05)] border-y border-white/10 z-0 pointer-events-none"></div>

      <div className="mx-auto max-w-[1200px] px-5 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-accent-400 px-5 py-2.5 rounded-full text-sm font-bold mb-6">
              <Sparkles size={16} />
              {lang === "ar"
                ? "وكالة تسويق رقمي متكاملة"
                : "Integrated Digital Marketing Agency"}
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white">
              {lang === "ar" ? "نحو حضور أقوى" : "Towards a Stronger Presence"}{" "}
              <span className="text-accent-500">{lang === "ar" ? "بصناعة رقمية" : "Digital Excellence"}</span>
            </h1>

            <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
              {lang === "ar"
                ? "نبني حضوراً رقمياً وميدانياً متكاملاً ينقل علامتك التجارية إلى آفاق جديدة."
                : "We build integrated digital and on-ground presence that takes your brand to new heights."}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-accent-500 text-white font-bold px-10 py-4 rounded-xl hover:bg-accent-400 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                {lang === "ar" ? "ابدأ مشروعك" : "Start Project"}
                <DirectionArrow size={18} />
              </Link>

              <Link href="/services" className="inline-flex items-center justify-center gap-2 bg-transparent text-white font-bold px-10 py-4 rounded-xl border-2 border-white/30 hover:bg-white/10 hover:border-white transition-all">
                {lang === "ar" ? "استكشف الخدمات" : "Explore Services"}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform group-hover:-translate-x-1 ${lang === "ar" ? "rotate-180" : ""}`}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              </Link>
            </div>

            <div className="flex gap-10 flex-wrap">
              <div>
                <div className="text-3xl font-black text-accent-500 mb-1">+50</div>
                <div className="text-xs text-white/70 font-semibold">{lang === "ar" ? "عميل" : "Clients"}</div>
              </div>
              <div>
                <div className="text-3xl font-black text-accent-500 mb-1">+120</div>
                <div className="text-xs text-white/70 font-semibold">{lang === "ar" ? "مشروع" : "Projects"}</div>
              </div>
              <div>
                <div className="text-3xl font-black text-accent-500 mb-1">100%</div>
                <div className="text-xs text-white/70 font-semibold">{lang === "ar" ? "رضا العملاء" : "Satisfaction"}</div>
              </div>
            </div>
          </div>

          <div className="relative w-full h-[450px] md:h-[550px] flex items-center overflow-hidden mask-fade" dir="ltr">
            <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
              {[...cards, ...cards].map((item, i) => (
                <div key={i} className="relative w-[260px] md:w-[320px] h-[380px] md:h-[460px] shrink-0 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 bg-white/5 backdrop-blur-md group transition-transform duration-500 hover:-translate-y-4 cursor-pointer">
                  <Image src={item.img} fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-110" alt={item.titleEn} />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>
                  <div className="absolute bottom-8 left-6 right-6 text-white text-right z-20">
                    <p className="font-bold text-2xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{lang === "ar" ? item.titleAr : item.titleEn}</p>
                    <p className="text-sm text-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-medium tracking-wider uppercase">Tamam Media</p>
                  </div>
                  <div className="absolute inset-0 border-[2px] border-white/0 group-hover:border-white/20 rounded-3xl transition-colors duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
