"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import type { Lang } from "@/i18n/translations";
import type { HeroCard, HeroStat } from "@/types/site-settings";
import DirectionArrow from "./DirectionArrow";

function HeroStats({ stats, lang }: { stats: HeroStat[]; lang: Lang }) {
  return (
    <div className="mt-10 flex w-full max-w-xl flex-wrap justify-center gap-8 border-t border-white/15 pt-7 lg:justify-start lg:gap-14">
      {stats.map((stat, index) => (
        <div key={`${stat.value}-${index}`} className="flex flex-col items-center gap-1.5 lg:items-start">
          <span className="text-2xl font-bold text-white md:text-3xl">{stat.value}</span>
          <span className="text-xs font-medium uppercase tracking-widest text-accent-200">
            {lang === "ar" ? stat.ar : stat.en}
          </span>
        </div>
      ))}
    </div>
  );
}

function DesktopProjectReel({
  cards,
  lang,
  brandName,
}: {
  cards: HeroCard[];
  lang: Lang;
  brandName: string;
}) {
  if (!cards.length) return null;

  return (
    <div className="pointer-events-none absolute inset-y-0 end-8 hidden w-[34%] max-w-[500px] items-center lg:flex xl:end-12">
      <div className="relative h-[420px] w-full overflow-hidden rounded-[2rem] border border-white/20 bg-brand-950/25 p-4 shadow-2xl shadow-brand-950/40 backdrop-blur-md xl:h-[500px]">
        <div className="pointer-events-none absolute inset-y-0 start-0 z-20 w-12 bg-gradient-to-r from-brand-950/80 to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 end-0 z-20 w-12 bg-gradient-to-l from-brand-950/80 to-transparent" aria-hidden="true" />
        <span className="absolute top-5 start-5 z-30 rounded-full border border-white/15 bg-brand-950/45 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/90 backdrop-blur-md">
          {lang === "ar" ? "من أعمالنا" : "Our work"}
        </span>

        <div className="flex h-full w-max items-stretch animate-marquee py-1 will-change-transform" dir="ltr">
          {[...cards, ...cards].map((card, index) => (
            <article
              key={`${card.imageUrl}-${index}`}
              className="relative me-4 h-full w-[180px] shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-brand-950/40 shadow-xl xl:me-5 xl:w-[220px]"
            >
              <Image
                src={card.imageUrl}
                fill
                loading="lazy"
                quality={65}
                sizes="220px"
                className="object-cover opacity-85"
                alt={lang === "ar" ? card.ar : card.en}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-start text-white">
                <p className="line-clamp-2 text-sm font-bold leading-snug">{lang === "ar" ? card.ar : card.en}</p>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-accent-300">{brandName}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { lang } = useLanguage();
  const { hero, branding } = useSiteSettings();
  const banner = hero.cards[0];
  const bannerTitle = banner ? (lang === "ar" ? banner.ar : banner.en) : branding.nameEn;
  const contentGradient = lang === "ar"
    ? "bg-gradient-to-l from-brand-950/95 via-brand-900/75 to-brand-900/25"
    : "bg-gradient-to-r from-brand-950/95 via-brand-900/75 to-brand-900/25";

  return (
    <section className="relative flex min-h-[100dvh] overflow-hidden bg-brand-950 text-white">
      {banner ? (
        <Image
          src={banner.imageUrl}
          alt={bannerTitle}
          fill
          priority
          sizes="100vw"
          quality={72}
          className="object-cover object-center"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-800 to-brand-950" />
      )}

      <div className="pointer-events-none absolute inset-0 bg-brand-950/35" aria-hidden="true" />
      <div className={`pointer-events-none absolute inset-0 ${contentGradient}`} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.14),transparent_35%)]" aria-hidden="true" />

      <div className="container-site relative z-10 flex min-h-[100dvh] w-full items-center pt-24 pb-20 md:pt-32 md:pb-28">
        <DesktopProjectReel cards={hero.cards} lang={lang} brandName={branding.nameEn} />

        <div className="flex w-full max-w-3xl flex-col items-center text-center lg:max-w-[55%] lg:items-start lg:text-start">
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-label-xl font-medium shadow-lg backdrop-blur-md">
            <Sparkles size={16} className="text-accent-300" />
            {lang === "ar" ? hero.badgeAr : hero.badgeEn}
          </div>

          <h1 className="mb-6 w-full text-balance text-display text-white drop-shadow-lg">
            {lang === "ar" ? hero.headingAr : hero.headingEn}{" "}
            <span className="block bg-gradient-to-r from-accent-200 via-accent-300 to-accent-400 bg-clip-text text-transparent">
              {lang === "ar" ? hero.accentAr : hero.accentEn}
            </span>
          </h1>

          <p className="mb-9 w-full max-w-2xl text-body-lg font-medium leading-loose text-white/90 drop-shadow-sm">
            {lang === "ar" ? hero.descriptionAr : hero.descriptionEn}
          </p>

          <Link
            href="/services"
            className="btn-base btn-md btn-hero-outline inline-flex w-full items-center justify-center border-white/45 bg-brand-950/20 text-sm shadow-lg backdrop-blur-sm hover:border-white hover:bg-white/15 sm:w-auto md:text-base"
          >
            {lang === "ar" ? hero.secondaryCtaAr : hero.secondaryCtaEn}
            <DirectionArrow size={20} />
          </Link>

          <HeroStats stats={hero.stats} lang={lang} />
        </div>
      </div>
    </section>
  );
}
