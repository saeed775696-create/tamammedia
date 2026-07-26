"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import type { Lang } from "@/i18n/translations";
import type { HeroCard, HeroStat } from "@/types/site-settings";
import DirectionArrow from "./DirectionArrow";

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

function HeroBannerVisual({
  card,
  lang,
  brandName,
}: {
  card?: HeroCard;
  lang: Lang;
  brandName: string;
}) {
  const title = card ? (lang === "ar" ? card.ar : card.en) : brandName;

  return (
    <div
      className="relative order-2 h-[230px] w-full min-w-0 overflow-hidden rounded-3xl border border-white/15 bg-brand-950 shadow-2xl shadow-brand-950/30 sm:h-[360px] lg:col-span-5 lg:h-[560px]"
      aria-label={lang === "ar" ? "صورة رئيسية من أعمالنا" : "Featured work"}
    >
      {card ? (
        <Image
          src={card.imageUrl}
          fill
          className="object-cover opacity-90"
          alt={title}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 42vw"
          quality={70}
          loading="eager"
          fetchPriority="high"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-800 to-brand-950" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/35 to-transparent" />
      <div className="absolute -top-16 -end-12 size-48 rounded-full bg-accent-400/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-16 -start-12 size-44 rounded-full bg-blue-400/15 blur-3xl" aria-hidden="true" />

      <div className="absolute inset-x-0 bottom-0 p-5 text-start text-white sm:p-7">
        <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold text-white/90 backdrop-blur-md">
          {lang === "ar" ? "من أعمالنا" : "From our work"}
        </span>
        <h2 className="mt-3 line-clamp-2 text-xl font-bold leading-snug sm:text-2xl">{title}</h2>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-300">
          {brandName}
        </p>
      </div>
    </div>
  );
}

export default function Hero() {
  const { lang } = useLanguage();
  const { hero, branding } = useSiteSettings();

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-x-clip section-bg-brand">
      <div
        className="pointer-events-none absolute top-[-10%] start-[5%] z-0 aspect-square w-[min(500px,60vw)] rounded-full bg-accent-500/15 blur-[80px] animate-float md:blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-10%] end-[5%] z-0 aspect-square w-[min(600px,70vw)] rounded-full bg-blue-500/10 blur-[80px] animate-pulse-glow md:blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 border-y border-white/5 bg-white/[0.02] shadow-[inset_0_0_60px_rgba(255,255,255,0.04)] backdrop-blur-[40px]"
        aria-hidden="true"
      />

      <div className="container-site relative z-10 w-full min-w-0 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <HeroBannerVisual card={hero.cards[0]} lang={lang} brandName={branding.nameEn} />

          <div className="order-1 flex min-w-0 flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-start">
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-label-xl font-medium gradient-glass shadow-lg transition-transform duration-500 hover:scale-105">
              <Sparkles size={16} className="animate-pulse text-accent-300" />
              {lang === "ar" ? hero.badgeAr : hero.badgeEn}
            </div>

            <h1 className="mb-6 w-full max-w-2xl text-balance text-display text-white drop-shadow-md">
              {lang === "ar" ? hero.headingAr : hero.headingEn}{" "}
              <span className="block bg-gradient-to-r from-accent-300 via-accent-400 to-accent-500 bg-clip-text text-transparent drop-shadow-none">
                {lang === "ar" ? hero.accentAr : hero.accentEn}
              </span>
            </h1>

            <p className="mb-10 w-full max-w-2xl text-body-lg font-medium leading-loose text-slate-200">
              {lang === "ar" ? hero.descriptionAr : hero.descriptionEn}
            </p>

            <div className="mb-0 flex w-full max-w-sm flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-5 lg:mb-14 lg:max-w-none lg:justify-start">
              <Link
                href="/contact"
                className="btn-base btn-md btn-primary inline-flex w-full items-center justify-center text-sm sm:w-auto md:text-base"
              >
                {lang === "ar" ? hero.primaryCtaAr : hero.primaryCtaEn}
                <DirectionArrow size={20} />
              </Link>

              <Link
                href="/services"
                className="btn-base btn-md btn-hero-outline inline-flex w-full items-center justify-center text-sm sm:w-auto md:text-base"
              >
                {lang === "ar" ? hero.secondaryCtaAr : hero.secondaryCtaEn}
                <DirectionArrow size={20} />
              </Link>
            </div>

            <HeroStats
              stats={hero.stats}
              lang={lang}
              className="hidden w-full max-w-md justify-center gap-10 pt-8 lg:flex lg:max-w-none lg:justify-start lg:gap-14"
            />
          </div>

          <HeroStats stats={hero.stats} lang={lang} className="order-3 w-full justify-center gap-8 pt-6 lg:hidden" />
        </div>
      </div>
    </section>
  );
}
