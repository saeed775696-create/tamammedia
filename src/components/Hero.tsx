"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Code2, Layers3, Megaphone, Palette, ShoppingBag, Sparkles, Workflow } from "lucide-react";
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

function networkSlots(count: number) {
  if (count === 1) return [{ x: 50, y: 50 }];

  const compactLayouts: Record<number, { x: number; y: number }[]> = {
    2: [{ x: 50, y: 16 }],
    3: [{ x: 21, y: 30 }, { x: 79, y: 70 }],
    4: [{ x: 20, y: 24 }, { x: 80, y: 24 }, { x: 50, y: 82 }],
  };

  if (compactLayouts[count]) {
    return [{ x: 50, y: 50 }, ...compactLayouts[count]];
  }

  return [
    { x: 50, y: 50 },
    ...Array.from({ length: count - 1 }, (_, index) => {
      const angle = (-90 + (360 / (count - 1)) * index) * (Math.PI / 180);
      const radius = 37;
      return {
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
      };
    }),
  ];
}

function DesktopServiceNetwork({
  cards,
  lang,
}: {
  cards: HeroCard[];
  lang: Lang;
}) {
  const nodes = cards.slice(0, 6);
  const slots = networkSlots(nodes.length);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (nodes.length < 2) return;

    const desktopMotion = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let intervalId: number | undefined;

    const updateRotation = () => {
      if (intervalId !== undefined) window.clearInterval(intervalId);
      intervalId = undefined;

      if (desktopMotion.matches) {
        intervalId = window.setInterval(() => {
          setRotation((current) => (current + 1) % nodes.length);
        }, 4800);
      }
    };

    updateRotation();
    desktopMotion.addEventListener("change", updateRotation);

    return () => {
      if (intervalId !== undefined) window.clearInterval(intervalId);
      desktopMotion.removeEventListener("change", updateRotation);
    };
  }, [nodes.length]);

  if (!nodes.length) return null;

  const nodeIcons = [Palette, Code2, Megaphone, ShoppingBag, Layers3, Workflow];

  return (
    <aside
      aria-label={lang === "ar" ? "شبكة خدماتنا" : "Our service network"}
      className="pointer-events-none absolute inset-y-0 end-8 hidden w-[34%] max-w-[500px] items-center lg:flex xl:end-12"
    >
      <div className="relative h-[420px] w-full overflow-hidden rounded-[2rem] border border-white/20 bg-brand-950/25 shadow-2xl shadow-brand-950/40 backdrop-blur-md xl:h-[500px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="service-network-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="50%" stopColor="rgba(251,146,60,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
            </linearGradient>
          </defs>
          {slots.slice(1).map((slot, index) => (
            <line
              key={`${slot.x}-${slot.y}`}
              x1="50"
              y1="50"
              x2={slot.x}
              y2={slot.y}
              stroke="url(#service-network-line)"
              strokeWidth="0.45"
              strokeDasharray={index % 2 === 0 ? "2 2" : undefined}
            />
          ))}
          <circle cx="50" cy="50" r="3.2" fill="rgba(251,146,60,0.2)" />
        </svg>

        <span className="absolute top-5 end-5 z-40 rounded-full border border-white/15 bg-brand-950/45 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/90 backdrop-blur-md">
          {lang === "ar" ? "خدمات مترابطة" : "Connected services"}
        </span>

        {nodes.map((node, index) => {
          const slotIndex = (index + rotation) % slots.length;
          const slot = slots[slotIndex];
          const isCentral = slotIndex === 0;
          const Icon = nodeIcons[index % nodeIcons.length];

          return (
            <article
              key={`${node.imageUrl}-${index}`}
              style={{
                left: `${slot.x}%`,
                top: `${slot.y}%`,
                transform: `translate(-50%, -50%) scale(${isCentral ? 1.08 : 0.94})`,
                zIndex: isCentral ? 30 : 10,
              }}
              className={`absolute flex aspect-square w-24 flex-col items-center justify-center rounded-2xl border px-2 text-center shadow-xl transition-[left,top,transform,opacity] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] xl:w-28 ${
                isCentral
                  ? "border-accent-300/80 bg-accent-500/25 text-white shadow-[0_18px_40px_rgba(251,146,60,0.3)]"
                  : "border-white/20 bg-brand-950/60 text-white/90 shadow-brand-950/30"
              }`}
            >
              <Icon size={isCentral ? 24 : 20} className={isCentral ? "text-accent-200" : "text-white/75"} strokeWidth={1.8} />
              <p className="mt-2 line-clamp-2 text-[10px] font-bold leading-snug xl:text-[11px]">
                {lang === "ar" ? node.ar : node.en}
              </p>
            </article>
          );
        })}
      </div>
    </aside>
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
        <DesktopServiceNetwork cards={hero.cards} lang={lang} />

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
