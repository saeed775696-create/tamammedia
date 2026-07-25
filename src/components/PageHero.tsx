"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  badge: string;
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  dividerFill?: string;
  icon?: React.ReactNode;
}

/**
 * Unified inner-page hero — aligned with the site design system.
 */
export default function PageHero({
  badge,
  title,
  description,
  breadcrumbs,
  dividerFill = "#f8fafc",
  icon,
}: PageHeroProps) {
  return (
    <section className="relative section-bg-brand pt-32 pb-24 md:pt-40 md:pb-32 min-h-[42vh] flex flex-col justify-center overflow-hidden">
      {/* Decorative orbs */}
      <div
        className="absolute top-0 end-0 w-[min(24rem,55vw)] aspect-square bg-accent-500/15 rounded-full blur-[100px] pointer-events-none -translate-y-1/3 translate-x-1/4"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 start-0 w-[min(20rem,50vw)] aspect-square bg-brand-500/20 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/4"
        aria-hidden="true"
      />

      {/* Geometric accent */}
      <div
        className="absolute inset-y-0 end-0 w-full md:w-3/4 bg-gradient-to-bl from-accent-500/10 via-transparent to-transparent pointer-events-none"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        aria-hidden="true"
      />

      {/* Wave divider */}
      <div className="absolute bottom-0 start-0 w-full overflow-hidden leading-[0] rotate-180 z-20">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[40px] md:h-[64px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill={dividerFill}
          />
        </svg>
      </div>

      <div className="container-site relative z-30 text-center">
        <span className="section-eyebrow text-white/90 border-white/15 bg-white/10 shadow-lg mb-8">
          {icon ?? <Sparkles size={16} className="text-accent-300 shrink-0" />}
          {badge}
        </span>

        <h1 className="text-display text-white mb-5 max-w-3xl mx-auto text-balance">
          {title}
        </h1>

        {description && (
          <p className="text-body-lg text-slate-200 max-w-2xl mx-auto mb-10 leading-loose font-medium">
            {description}
          </p>
        )}

        <nav
          aria-label="Breadcrumb"
          className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-label-xl font-medium bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 shadow-md"
        >
          {breadcrumbs.map((item, i) => (
            <span key={i} className="flex items-center gap-3">
              {i > 0 && (
                <span className="text-accent-500/50" aria-hidden="true">
                  •
                </span>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-slate-300 hover:text-white transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-accent-400">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
