"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles } from "lucide-react";
import DirectionArrow from "./DirectionArrow";

/* =========================================================================
   Hero — Refined UI/UX Overhaul
   =========================================================================
   - Cairo font with fluid typography (text-base/lg body, scaled headings)
   - Generous section padding (py-20 md:py-32)
   - Breathing room: max-w-2xl for text, gap-8 between elements
   - Softer shadows (shadow-xl instead of shadow-2xl) and rounded-2xl/3xl
   - Fluid decorative blobs via min() + vw
   ========================================================================= */

const heroCards = [
  { titleAr: "إدارة التواصل", titleEn: "Social Media", img: "/imgs/services/social_media_real.jpg" },
  { titleAr: "حملات تسويقية", titleEn: "Marketing Campaigns", img: "/imgs/services/marketing_real.jpg" },
  { titleAr: "الإعلانات الممولة", titleEn: "Advertising", img: "/imgs/services/advertising_real.jpg" },
  { titleAr: "التصميم الجرافيكي", titleEn: "Graphic Design", img: "/imgs/services/graphic_design_real.jpg" },
];

export default function Hero() {
  const { lang } = useLanguage();

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden section-bg-brand">
      {/* ── Decorative Blobs (fluid, no fixed px) ── */}
      <div
        className="absolute top-[-10%] start-[5%] w-[min(500px,60vw)] aspect-square bg-accent-500/15 rounded-full blur-[80px] md:blur-[120px] pointer-events-none animate-float z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-10%] end-[5%] w-[min(600px,70vw)] aspect-square bg-blue-500/10 rounded-full blur-[80px] md:blur-[140px] pointer-events-none animate-pulse-glow z-0"
        aria-hidden="true"
      />
      {/* Glass overlay — softened */}
      <div
        className="absolute inset-0 bg-white/[0.02] backdrop-blur-[40px] shadow-[inset_0_0_60px_rgba(255,255,255,0.04)] border-y border-white/5 z-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-site relative z-10 w-full pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* ── Visual Side: order-2 on mobile (text first), order-2 on desktop ── */}
          <div
            className="lg:col-span-5 relative w-full h-[340px] sm:h-[460px] md:h-[540px] lg:h-[560px] flex items-center justify-center overflow-hidden rounded-3xl order-2"
            dir="ltr"
          >
            {/* Edge fade masks — soften the scrolling strip's cut-off points */}
            <div className="absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-brand-900/70 to-transparent z-10 pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-brand-900/70 to-transparent z-10 pointer-events-none" aria-hidden="true" />

            {/* Auto-scrolling card strip — per-card `me-*` (not parent gap)
                so the -50% marquee keyframe loops seamlessly */}
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-4 will-change-transform">
              {[...heroCards, ...heroCards].map((item, i) => (
                <div
                  key={i}
                  className="relative w-[190px] sm:w-[230px] md:w-[260px] aspect-portrait me-5 sm:me-6 shrink-0 rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-white/5 backdrop-blur-sm group transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                >
                  <Image
                    src={item.img}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
                    alt={item.titleEn}
                    sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, 260px"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                  {/* Card text */}
                  <div className="absolute bottom-6 start-5 end-5 text-white text-start z-20">
                    <p className="font-bold text-lg sm:text-xl mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      {lang === "ar" ? item.titleAr : item.titleEn}
                    </p>
                    <p className="text-xs text-accent-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-medium tracking-wider uppercase">
                      Tamam Media
                    </p>
                  </div>
                  {/* Hover border */}
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-2xl transition-colors duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

          {/* ── Text Side: order-1 on mobile (headline first), order-1 on desktop ── */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-start order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 gradient-glass px-5 py-2.5 rounded-full text-label-xl font-medium mb-8 backdrop-blur-md shadow-lg transition-all duration-500 hover:scale-105">
              <Sparkles size={16} className="animate-pulse text-accent-300" />
              {lang === "ar"
                ? "وكالة تسويق رقمي متكاملة"
                : "Integrated Digital Marketing Agency"}
            </div>

            {/* Headline — constrained width + balanced line breaks */}
            <h1 className="text-display text-white drop-shadow-md mb-6 max-w-2xl text-balance">
              {lang === "ar" ? "نحو حضور أقوى" : "Towards a Stronger Presence"}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-accent-500 drop-shadow-none block">
                {lang === "ar" ? "بصناعة رقمية" : "Digital Excellence"}
              </span>
            </h1>

            {/* Subheadline — max-w-2xl for readability + leading-loose for Arabic */}
            <p className="text-body-lg text-slate-200 mb-10 max-w-2xl leading-loose font-medium">
              {lang === "ar"
                ? "نبني حضوراً رقمياً وميدانياً متكاملاً ينقل علامتك التجارية إلى آفاق جديدة بخطوات مدروسة وتصاميم إبداعية."
                : "We build an integrated digital and on-ground presence that takes your brand to new heights with creative designs."}
            </p>

            {/* ── Dual CTAs — generous gap ── */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-5 mb-14">
              {/* Primary CTA (Solid) */}
              <Link
                href="/contact"
                className="btn-md btn-primary inline-flex items-center justify-center text-sm md:text-base"
              >
                {lang === "ar" ? "ابدأ مشروعك" : "Start Project"}
                <DirectionArrow size={20} />
              </Link>

              {/* Secondary CTA (Outlined) */}
              <Link
                href="/services"
                className="btn-md btn-outline text-white border-white/30 hover:border-white/60 hover:text-white inline-flex items-center justify-center gap-2 text-sm md:text-base"
              >
                {lang === "ar" ? "استكشف الخدمات" : "Explore Services"}
                <DirectionArrow size={20} />
              </Link>
            </div>

            {/* ── Stats Row — more breathing room ── */}
            <div className="flex gap-10 lg:gap-14 justify-center lg:justify-start flex-wrap pt-8 border-t border-white/10 w-full max-w-md lg:max-w-none">
              <div className="group flex flex-col items-center lg:items-start gap-1.5">
                <span className="text-2xl md:text-3xl font-bold text-white group-hover:scale-110 transition-transform">
                  +50
                </span>
                <span className="text-xs text-accent-300 font-medium uppercase tracking-widest">
                  {lang === "ar" ? "عميل سعيد" : "Happy Clients"}
                </span>
              </div>
              <div className="group flex flex-col items-center lg:items-start gap-1.5">
                <span className="text-2xl md:text-3xl font-bold text-white group-hover:scale-110 transition-transform">
                  +120
                </span>
                <span className="text-xs text-accent-300 font-medium uppercase tracking-widest">
                  {lang === "ar" ? "مشروع منجز" : "Projects Done"}
                </span>
              </div>
              <div className="group flex flex-col items-center lg:items-start gap-1.5">
                <span className="text-2xl md:text-3xl font-bold text-white group-hover:scale-110 transition-transform">
                  100%
                </span>
                <span className="text-xs text-accent-300 font-medium uppercase tracking-widest">
                  {lang === "ar" ? "ضمان الجودة" : "Quality Assured"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}