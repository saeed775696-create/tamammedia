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

type NetworkPoint = { x: number; y: number };

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

function networkSlots(count: number): NetworkPoint[] {
  if (count === 1) return [{ x: 50, y: 50 }];

  const compactLayouts: Record<number, NetworkPoint[]> = {
    2: [{ x: 50, y: 15 }],
    3: [{ x: 20, y: 29 }, { x: 80, y: 71 }],
    4: [{ x: 19, y: 23 }, { x: 81, y: 23 }, { x: 50, y: 83 }],
  };

  if (compactLayouts[count]) {
    return [{ x: 50, y: 50 }, ...compactLayouts[count]];
  }

  return [
    { x: 50, y: 50 },
    ...Array.from({ length: count - 1 }, (_, index) => {
      const angle = (-90 + (360 / (count - 1)) * index) * (Math.PI / 180);
      const radius = 38;
      return {
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
      };
    }),
  ];
}

function curvedNetworkPath(slot: NetworkPoint, index: number) {
  const middleX = (50 + slot.x) / 2;
  const middleY = (50 + slot.y) / 2;
  const deltaX = slot.x - 50;
  const deltaY = slot.y - 50;
  const curveDirection = index % 2 === 0 ? 1 : -1;
  const controlX = middleX - deltaY * 0.16 * curveDirection;
  const controlY = middleY + deltaX * 0.16 * curveDirection;

  return `M 50 50 Q ${controlX} ${controlY} ${slot.x} ${slot.y}`;
}

function DesktopServiceConstellation({
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
  const paths = slots.slice(1).map(curvedNetworkPath);

  return (
    <aside
      aria-label={lang === "ar" ? "كوكبة خدماتنا" : "Our service constellation"}
      className="pointer-events-none absolute inset-y-0 end-3 hidden w-[40%] max-w-[550px] items-center lg:flex xl:end-8"
    >
      <div className="relative h-[460px] w-full overflow-visible xl:h-[540px]">
        <div className="absolute inset-[22%] rounded-full bg-accent-500/10 blur-[70px]" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-300/10 shadow-[0_0_80px_rgba(251,146,60,0.16)]" aria-hidden="true" />

        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="constellation-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.03)" />
              <stop offset="45%" stopColor="rgba(251,146,60,0.75)" />
              <stop offset="100%" stopColor="rgba(125,211,252,0.2)" />
            </linearGradient>
            <radialGradient id="constellation-core">
              <stop offset="0%" stopColor="rgba(251,146,60,0.65)" />
              <stop offset="100%" stopColor="rgba(251,146,60,0)" />
            </radialGradient>
            <filter id="constellation-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <ellipse cx="50" cy="50" rx="38" ry="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.28" strokeDasharray="1.4 2.2" />
          <ellipse cx="50" cy="50" rx="27" ry="27" fill="none" stroke="rgba(251,146,60,0.12)" strokeWidth="0.24" strokeDasharray="0.8 3" />

          {paths.map((path, index) => (
            <g key={path}>
              <path d={path} fill="none" stroke="url(#constellation-line)" strokeWidth="0.46" strokeLinecap="round" />
              <circle className="service-network-motion" r="0.75" fill="#fdba74" filter="url(#constellation-glow)">
                <animateMotion
                  path={path}
                  dur={`${3.8 + index * 0.35}s`}
                  begin={`${index * 0.45}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}

          <circle cx="50" cy="50" r="6" fill="url(#constellation-core)" />
          <circle cx="50" cy="50" r="1.15" fill="#fdba74" filter="url(#constellation-glow)" />
        </svg>

        <div className="absolute top-2 end-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/65">
          <span className="size-1.5 rounded-full bg-accent-300 shadow-[0_0_12px_rgba(253,186,116,0.9)]" />
          {lang === "ar" ? "منظومة خدمات متكاملة" : "Integrated service system"}
        </div>

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
                transform: `translate(-50%, -50%) scale(${isCentral ? 1.12 : 0.94})`,
                transitionDelay: `${index * 65}ms`,
                zIndex: isCentral ? 30 : 10,
              }}
              className="absolute aspect-square w-[92px] transition-[left,top,transform] duration-[1250ms] ease-[cubic-bezier(0.22,1,0.36,1)] xl:w-[108px]"
            >
              <div
                className={`absolute inset-1 rotate-45 rounded-[26%] border transition-colors duration-700 ${
                  isCentral
                    ? "border-accent-200/70 bg-accent-400/15 shadow-[0_0_34px_rgba(251,146,60,0.32)]"
                    : "border-white/15 bg-white/[0.025]"
                }`}
              />
              <div
                className={`absolute inset-0 rounded-[30%] border backdrop-blur-xl transition-colors duration-700 ${
                  isCentral
                    ? "border-accent-200/75 bg-brand-950/75 shadow-[0_20px_50px_rgba(15,23,42,0.45)]"
                    : "border-white/20 bg-brand-950/65 shadow-[0_14px_34px_rgba(15,23,42,0.35)]"
                }`}
              />

              <div className="relative z-10 flex h-full flex-col items-center justify-center px-2 text-center text-white">
                <span className={`absolute top-2 end-2 text-[8px] font-bold tabular-nums ${isCentral ? "text-accent-200" : "text-white/35"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon size={isCentral ? 24 : 19} className={isCentral ? "text-accent-200" : "text-white/70"} strokeWidth={1.7} />
                <p className={`mt-2 line-clamp-2 font-bold leading-snug ${isCentral ? "text-[11px] xl:text-xs" : "text-[9px] xl:text-[10px]"}`}>
                  {lang === "ar" ? node.ar : node.en}
                </p>
              </div>
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
        <DesktopServiceConstellation cards={hero.cards} lang={lang} />

        <div className="flex w-full max-w-3xl flex-col items-center text-center lg:max-w-[53%] lg:items-start lg:text-start">
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
