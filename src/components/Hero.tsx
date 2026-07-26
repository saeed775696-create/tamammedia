"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import type { Lang } from "@/i18n/translations";
import type { HeroCard, HeroStat } from "@/types/site-settings";
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

function HeroStats({
  stats,
  lang,
  className,
}: {
  stats: HeroStat[];
  lang: Lang;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap justify-center gap-8 border-t border-white/10 pt-6 ${className ?? ""}`}>
      {stats.map((stat, index) => (
        <div key={`${stat.value}-${index}`} className="group flex flex-col items-center gap-1.5 lg:items-start">
          <span className="text-2xl font-bold text-white transition-transform group-hover:scale-110 md:text-3xl">
            {stat.value}
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-accent-300">
            {lang === "ar" ? stat.ar : stat.en}
          </span>
        </div>
      ))}
    </div>
  );
}

function MobileProjectShowcase({
  cards,
  lang,
  brandName,
}: {
  cards: HeroCard[];
  lang: Lang;
  brandName: string;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollToCard = useCallback((index: number) => {
    if (!cards.length) return;

    const normalizedIndex = ((index % cards.length) + cards.length) % cards.length;
    const card = carouselRef.current?.querySelector<HTMLElement>(
      `[data-hero-card-index="${normalizedIndex}"]`
    );

    card?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "nearest",
      inline: "start",
    });
    setActiveIndex(normalizedIndex);
  }, [cards.length]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || cards.length < 2) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible) {
          setActiveIndex(Number(mostVisible.target.getAttribute("data-hero-card-index")));
        }
      },
      { root: carousel, threshold: [0.55, 0.75] }
    );

    const cardsInCarousel = carousel.querySelectorAll<HTMLElement>("[data-hero-card-index]");
    cardsInCarousel.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [cards.length]);

  useEffect(() => {
    if (cards.length < 2 || isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % cards.length;
        const nextCard = carouselRef.current?.querySelector<HTMLElement>(
          `[data-hero-card-index="${nextIndex}"]`
        );
        nextCard?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
        return nextIndex;
      });
    }, 5500);

    return () => window.clearInterval(intervalId);
  }, [cards.length, isPaused]);

  return (
    <section
      aria-label={lang === "ar" ? "مشاريع مختارة" : "Featured projects"}
      className="order-2 min-w-0 lg:hidden"
    >
      <div className="-mx-4 px-4 sm:-mx-6 sm:px-6">
        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onFocusCapture={() => setIsPaused(true)}
          onPointerDown={() => setIsPaused(true)}
        >
          {cards.map((card, index) => (
            <article
              key={`${card.imageUrl}-${index}`}
              data-hero-card-index={index}
              className="relative aspect-[16/10] w-[86%] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/15 bg-brand-950 shadow-xl shadow-brand-950/30"
            >
              <Image
                src={card.imageUrl}
                fill
                className="object-cover"
                alt={lang === "ar" ? card.ar : card.en}
                sizes="(max-width: 640px) 86vw, 500px"
                quality={65}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/35 to-transparent" />
              <span className="absolute top-3 end-3 rounded-full border border-white/15 bg-brand-950/45 px-2.5 py-1 text-xs font-bold text-white/90 backdrop-blur-md">
                {String(index + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5 text-start text-white">
                <p className="text-lg font-bold leading-snug">{lang === "ar" ? card.ar : card.en}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-300">
                  {brandName}
                </p>
              </div>
            </article>
          ))}
        </div>

        {cards.length > 1 && (
          <div className="mt-1 flex items-center justify-center gap-2" aria-label={lang === "ar" ? "التنقل بين المشاريع" : "Project navigation"}>
            {cards.map((card, index) => (
              <button
                key={`${card.imageUrl}-control-${index}`}
                type="button"
                aria-pressed={activeIndex === index}
                aria-label={lang === "ar" ? `عرض المشروع ${index + 1}` : `Show project ${index + 1}`}
                onClick={() => {
                  setIsPaused(true);
                  scrollToCard(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 ${
                  activeIndex === index ? "w-7 bg-accent-400" : "w-2 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Hero() {
  const { lang } = useLanguage();
  const { hero, branding } = useSiteSettings();

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-x-clip section-bg-brand">
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

      <div className="container-site relative z-10 w-full min-w-0 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          {/* ── Visual Side: order-2 on mobile (text first), order-2 on desktop ── */}
          <div
            className="relative order-2 hidden h-[560px] w-full min-w-0 items-center justify-center overflow-hidden rounded-3xl lg:col-span-5 lg:flex"
            dir="ltr"
          >
            {/* Edge fade masks — soften the scrolling strip's cut-off points */}
            <div className="absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-brand-900/70 to-transparent z-10 pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-brand-900/70 to-transparent z-10 pointer-events-none" aria-hidden="true" />

            {/* Auto-scrolling card strip — per-card `me-*` (not parent gap)
                so the -50% marquee keyframe loops seamlessly */}
            <div className="flex h-full w-max items-stretch animate-marquee py-4 will-change-transform hover:[animation-play-state:paused]">
              {[...hero.cards, ...hero.cards].map((item, i) => (
                <div
                  key={i}
                  className="group relative me-4 h-full w-[130px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 sm:me-6 sm:w-[230px] md:w-[260px]"
                >
                  <Image
                    src={item.imageUrl}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
                    alt={item.en}
                    sizes="(max-width: 640px) 150px, (max-width: 768px) 220px, 260px"
                    quality={65}
                    loading="lazy"
                    fetchPriority="auto"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                  {/* Card text */}
                  <div className="absolute bottom-6 start-5 end-5 text-white text-start z-20">
                    <p className="mb-1 translate-y-2 text-base font-bold transition-transform duration-500 group-hover:translate-y-0 sm:text-xl">
                      {lang === "ar" ? item.ar : item.en}
                    </p>
                    <p className="text-xs text-accent-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-medium tracking-wider uppercase">
                      {branding.nameEn}
                    </p>
                  </div>
                  {/* Hover border */}
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-2xl transition-colors duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

          {/* ── Text Side: order-1 on mobile (headline first), order-1 on desktop ── */}
          <MobileProjectShowcase cards={hero.cards} lang={lang} brandName={branding.nameEn} />

          <div className="order-1 flex min-w-0 flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 gradient-glass px-5 py-2.5 rounded-full text-label-xl font-medium mb-8 backdrop-blur-md shadow-lg transition-all duration-500 hover:scale-105">
              <Sparkles size={16} className="animate-pulse text-accent-300" />
              {lang === "ar"
                ? hero.badgeAr
                : hero.badgeEn}
            </div>

            {/* Headline — constrained width + balanced line breaks */}
            <h1 className="text-display mb-6 w-full max-w-2xl text-balance text-white drop-shadow-md">
              {lang === "ar" ? hero.headingAr : hero.headingEn}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-accent-500 drop-shadow-none block">
                {lang === "ar" ? hero.accentAr : hero.accentEn}
              </span>
            </h1>

            {/* Subheadline — max-w-2xl for readability + leading-loose for Arabic */}
            <p className="text-body-lg mb-10 w-full max-w-2xl text-slate-200 leading-loose font-medium">
              {lang === "ar" ? hero.descriptionAr : hero.descriptionEn}
            </p>

            {/* ── Dual CTAs — generous gap ── */}
            <div className="mb-0 flex w-full max-w-sm flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-5 lg:mb-14 lg:max-w-none lg:justify-start">
              {/* Primary CTA (Solid) */}
              <Link
                href="/contact"
                className="btn-base btn-md btn-primary inline-flex w-full items-center justify-center text-sm sm:w-auto md:text-base"
              >
                {lang === "ar" ? hero.primaryCtaAr : hero.primaryCtaEn}
                <DirectionArrow size={20} />
              </Link>

              {/* Secondary CTA (Outlined) */}
              <Link
                href="/services"
                className="btn-base btn-md btn-hero-outline inline-flex w-full items-center justify-center text-sm sm:w-auto md:text-base"
              >
                {lang === "ar" ? hero.secondaryCtaAr : hero.secondaryCtaEn}
                <DirectionArrow size={20} />
              </Link>
            </div>

            {/* ── Stats Row — more breathing room ── */}
            <HeroStats stats={hero.stats} lang={lang} className="hidden w-full max-w-md justify-center gap-10 pt-8 lg:flex lg:max-w-none lg:justify-start lg:gap-14" />
          </div>

          <HeroStats stats={hero.stats} lang={lang} className="order-3 w-full justify-center gap-8 pt-6 lg:hidden" />
        </div>
      </div>
    </section>
  );
}
