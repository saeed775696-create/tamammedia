"use client";

import Hero from "@/components/Hero";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { ArrowRight, Lightbulb, Rocket, Sparkles, Users } from "lucide-react";
import DirectionArrow from "@/components/DirectionArrow";
import { isSafeExternalUrl } from "@/lib/utils";

/* =========================================================================
   HomeContent — Refined UI/UX Overhaul
   =========================================================================
   - Generous section padding (py-20 md:py-28)
   - Cards: p-7 md:p-8 with larger gaps (gap-7 md:gap-10)
   - All paragraphs constrained with max-w-prose or max-w-2xl
   - leading-loose on all Arabic body text
   - Softer shadows (shadow-md / shadow-lg instead of shadow-2xl)
   - Consistent rounded-2xl corners
   - Logical properties (start-/end-/ps-/pe-/ms-/me-) for RTL/LTR flip
   ========================================================================= */

export interface HomeTeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
}

export interface HomePartner {
  id: string;
  name: string;
  imageUrl: string;
  website?: string;
}

interface HomeContentProps {
  team: HomeTeamMember[];
  partners: HomePartner[];
  includeHero?: boolean;
}

export default function HomeContent({ team, partners, includeHero = true }: HomeContentProps) {
  const { lang } = useLanguage();
  const { homeAbout } = useSiteSettings();

  return (
    <>
      {/* =================================================================
          HERO
          ================================================================= */}
      {includeHero && <Hero />}

      {/* A concise value rail makes the first scroll feel intentional without
          relying on unverifiable client-count or revenue claims. */}
      <section
        aria-label={lang === "ar" ? "منهجية العمل" : "How we work"}
        className="relative z-30 -mt-6 pb-3 sm:-mt-10 sm:pb-6"
      >
        <div className="container-site">
          <div className="grid overflow-hidden rounded-2xl border border-white/70 bg-white/95 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:grid-cols-3 sm:rounded-3xl">
            {[
              {
                icon: Lightbulb,
                number: "01",
                titleAr: "نفهم الهدف أولاً",
                titleEn: "Start with clarity",
                textAr: "نحوّل احتياجك إلى اتجاه واضح قبل أن يبدأ التنفيذ.",
                textEn: "We turn the need into a clear direction before execution.",
              },
              {
                icon: Sparkles,
                number: "02",
                titleAr: "نصنع تجربة تُتذكر",
                titleEn: "Make it memorable",
                textAr: "تصميم ومحتوى يبدوان متماسكين في كل نقطة تواصل.",
                textEn: "Design and content that feel consistent at every touchpoint.",
              },
              {
                icon: Rocket,
                number: "03",
                titleAr: "نطوّر ما ينجح",
                titleEn: "Build on what works",
                textAr: "نُحسّن باستمرار لتبقى التجربة جاهزة للنمو.",
                textEn: "We keep improving so the experience stays ready to grow.",
              },
            ].map(({ icon: Icon, number, titleAr, titleEn, textAr, textEn }, index) => (
              <div
                key={number}
                className={`group relative flex gap-4 px-5 py-5 sm:px-6 sm:py-7 lg:px-8 ${
                  index < 2 ? "border-b border-surface-200/80 sm:border-b-0 sm:border-e" : ""
                }`}
              >
                <span className="absolute end-5 top-4 text-xs font-bold tracking-[0.18em] text-brand-900/10 transition-colors duration-300 group-hover:text-accent-500/30 sm:end-6 sm:top-5">
                  {number}
                </span>
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-900 text-accent-300 shadow-lg shadow-brand-900/15 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-3">
                  <Icon size={20} strokeWidth={2.25} aria-hidden="true" />
                </div>
                <div className="relative z-10 min-w-0 pt-0.5">
                  <h2 className="mb-1 text-sm font-bold text-brand-900 sm:text-base">
                    {lang === "ar" ? titleAr : titleEn}
                  </h2>
                  <p className="text-xs leading-relaxed text-surface-600 sm:text-sm">
                    {lang === "ar" ? textAr : textEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          SERVICES — Generous Grid (1→2→3 columns)
          ================================================================= */}
      <section className="section-y section-bg-pattern relative overflow-hidden">
        {/* Decorative blobs */}
        <div
          className="absolute top-0 end-0 w-[min(300px,50vw)] aspect-square bg-brand-800/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 start-0 w-[min(300px,50vw)] aspect-square bg-accent-500/3 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"
          aria-hidden="true"
        />

        <div className="container-site relative z-10">
          {/* Section Header */}
          <div className="section-header">
            <div className="section-eyebrow">
              <Sparkles size={16} className="text-accent-500" />
              {lang === "ar" ? "خدماتنا المميزة" : "Our Premium Services"}
            </div>
            <h2 className="text-h1 text-brand-900 mb-6">
              {lang === "ar"
                ? "حلول متكاملة تحت سقف واحد"
                : "All-in-One Solutions"}
            </h2>
            <p className="text-body-lg text-surface-600 leading-loose max-w-xl mx-auto">
              {lang === "ar"
                ? "نقدم لك كل ما تحتاجه لبناء حضور رقمي قوي ومؤثر. من الفكرة وحتى التنفيذ الكامل."
                : "Everything you need to build a strong digital presence. From concept to full execution."}
            </p>
          </div>

          {/* Services Grid: 1-col mobile, 2-col md, 3-col lg */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10">
            {/* ── Creative Services Card ── */}
            <div className="card-base group flex flex-col">
              <div className="relative w-full aspect-media overflow-hidden rounded-t-2xl">
                <Image
                  src="/imgs/services/graphic_design_real.jpg"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Creative Services"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={65}
                />
                <div className="absolute inset-0 gradient-overlay" />
                <div className="absolute bottom-5 start-5 gradient-glass p-3 rounded-xl border border-white/20 text-white shadow-lg">
                  <Sparkles size={22} className="text-accent-300" />
                </div>
                <div className="absolute top-5 end-5 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-label font-medium text-brand-900 border border-white shadow-md">
                  {lang === "ar" ? "إبداعي" : "Creative"}
                </div>
              </div>
              <div className="p-7 md:p-8 flex-1 flex flex-col">
                <h3 className="text-h4 text-brand-900 mb-4">
                  {lang === "ar" ? "الخدمات الإبداعية" : "Creative Services"}
                </h3>
                <p className="text-body text-surface-600 leading-loose flex-1 mb-6">
                  {lang === "ar"
                    ? "هوية بصرية، تصميم جرافيكي، إدارة منصات التواصل الاجتماعي، تصوير وإنتاج مرئي عالي الجودة."
                    : "Branding, graphic design, social media management, high-quality photography and video production."}
                </p>
                <Link
                  href="/services/creative"
                  className="mt-auto inline-flex items-center gap-2 font-semibold text-accent-600 hover:text-accent-800 transition-colors group/link text-sm"
                >
                  {lang === "ar" ? "اكتشف المزيد" : "Discover More"}
                  <DirectionArrow
                    size={18}
                    className="transform group-hover/link:-translate-x-2 transition-transform duration-300"
                  />
                </Link>
              </div>
            </div>

            {/* ── Tech Services Card ── */}
            <div className="card-base group flex flex-col">
              <div className="relative w-full aspect-media overflow-hidden rounded-t-2xl">
                <Image
                  src="/imgs/services/tech_solutions.jpg"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Tech Services"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={65}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-4 end-4 bg-accent-500/80 backdrop-blur-md p-3 rounded-xl border border-white/30 text-white shadow-lg shadow-accent-500/20">
                  <div className="w-6 h-6 border-2 border-white rounded-md flex items-center justify-center font-mono text-xs">
                    {"</>"}
                  </div>
                </div>
              </div>
              <div className="p-7 md:p-8 flex-1 flex flex-col">
                <h3 className="text-h4 text-brand-900 mb-4">
                  {lang === "ar" ? "الخدمات التقنية" : "Tech Services"}
                </h3>
                <p className="text-body text-surface-600 leading-loose flex-1 mb-6">
                  {lang === "ar"
                    ? "تطوير مواقع وتطبيقات الموبايل بأحدث التقنيات، إنشاء متاجر إلكترونية احترافية، استضافة وحلول سحابية."
                    : "Web and mobile app development using the latest technologies, e-commerce creation, hosting and cloud solutions."}
                </p>
                <Link
                  href="/services/tech"
                  className="mt-auto inline-flex items-center gap-2 font-semibold text-accent-600 hover:text-brand-800 transition-colors group/link text-sm"
                >
                  {lang === "ar" ? "اكتشف المزيد" : "Discover More"}
                  <DirectionArrow
                    size={18}
                    className="transform group-hover/link:-translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>

            {/* ── Integrated Solutions Card ── */}
            <div className="card-base group flex flex-col">
              <div className="relative w-full aspect-media overflow-hidden rounded-t-2xl">
                <Image
                  src="/imgs/services/marketing_real.jpg"
                  fill
                  className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  alt="Integrated Solutions"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={65}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/20 to-transparent" />
                <div className="absolute bottom-4 end-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white text-brand-800 shadow-lg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
              </div>
              <div className="p-7 md:p-8 flex-1 flex flex-col">
                <h3 className="text-h4 text-brand-900 mb-4">
                  {lang === "ar" ? "الحلول المتكاملة" : "Integrated Solutions"}
                </h3>
                <p className="text-body text-surface-600 leading-loose flex-1 mb-6">
                  {lang === "ar"
                    ? "خطط تسويقية شاملة، إدارة حملات رقمية وميدانية، استشارات استراتيجية لنمو أعمالك وقيادة السوق."
                    : "Comprehensive marketing plans, digital and on-ground campaign management, strategic consulting for business growth."}
                </p>
                <Link
                  href="/services/integrated"
                  className="mt-auto inline-flex items-center gap-2 font-semibold text-accent-600 hover:text-accent-800 transition-colors group/link text-sm"
                >
                  {lang === "ar" ? "اكتشف المزيد" : "Discover More"}
                  <DirectionArrow
                    size={18}
                    className="transform group-hover/link:-translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* View All / Portfolio Links */}
          <div className="flex justify-center gap-5 flex-wrap mt-16 md:mt-20 mb-8">
            <Link
              href="/services"
              className="px-7 sm:px-9 py-3.5 sm:py-4 text-sm sm:text-base rounded-xl bg-brand-800 text-white font-semibold hover:bg-brand-900 transition-all shadow-md hover:shadow-lg hover:-translate-y-1 inline-flex items-center gap-2"
            >
              {lang === "ar" ? "عرض جميع الخدمات" : "View All Services"}
              <DirectionArrow size={18} />
            </Link>
            <Link
              href="/portfolio"
              className="px-7 sm:px-9 py-3.5 sm:py-4 text-sm sm:text-base rounded-xl bg-white text-brand-800 font-semibold border-2 border-slate-200 hover:border-brand-300 hover:bg-slate-50 transition-all inline-flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              {lang === "ar" ? "معرض الأعمال" : "Our Portfolio"}
              <ArrowRight
                size={18}
                className={lang === "ar" ? "rotate-180" : ""}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================================
          ABOUT US — Split Layout (Text + Visual) with breathing room
          ================================================================= */}
      <section className="defer-render section-y bg-white relative overflow-hidden">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 xl:gap-24 items-center">
            {/* ── Visual Side (Overlapping Images + Floating Badge) ── */}
            <div className="relative h-[360px] sm:h-[440px] md:h-[520px] w-full group">
              {/* Main image */}
              <div className="absolute top-0 start-0 lg:start-8 w-[82%] aspect-[4/5] max-h-[420px] rounded-3xl overflow-hidden shadow-xl border-4 border-white z-10 transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Tamam Media Team"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  quality={65}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/20 via-brand-900/5 to-transparent" />
              </div>
              {/* Secondary image */}
              <div className="absolute bottom-0 end-0 lg:end-6 w-[58%] aspect-[4/3] max-h-[280px] rounded-3xl overflow-hidden shadow-xl border-4 border-white z-20 transition-all duration-700 group-hover:translate-y-2 group-hover:translate-x-2 group-hover:shadow-2xl">
                <Image
                  src="/imgs/services/marketing_real.jpg"
                  alt="Tamam Media Office"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  sizes="(max-width: 1024px) 66vw, 30vw"
                  quality={65}
                />
              </div>
              {/* Floating Stats Badge */}
              <div className="absolute top-1/2 start-0 -translate-y-1/2 -translate-x-2 lg:-translate-x-5 z-30 bg-white rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col items-center justify-center shadow-lg border border-surface-200/60 animate-[float_6s_ease-in-out_infinite]">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent-500 mb-1">
                  +10
                </span>
                <span className="text-label-xl font-medium text-surface-600 text-center leading-tight">
                  {lang === "ar" ? "سنوات من" : "Years of"}
                  <br />
                  {lang === "ar" ? "الخبرة" : "Experience"}
                </span>
              </div>
            </div>

            {/* ── Text Side ── */}
            <div className="relative z-10">
              <div className="section-eyebrow mb-6">
                <Users size={16} className="text-accent-500" />
                {lang === "ar" ? homeAbout.eyebrowAr : homeAbout.eyebrowEn}
              </div>
              <h2 className="text-h1 text-brand-900 mb-6 leading-tight">
                {lang === "ar" ? homeAbout.titleAr : homeAbout.titleEn}
              </h2>
              <p className="text-body-lg text-surface-600 leading-loose mb-8 max-w-prose">
                {lang === "ar" ? homeAbout.descriptionAr : homeAbout.descriptionEn}
              </p>

              {/* Checkmark List — more spacing */}
              <ul className="space-y-4 mb-10">
                {[
                  lang === "ar" ? "استراتيجيات مبنية على البيانات" : "Data-driven strategies",
                  lang === "ar" ? "فريق خبراء متخصص بشغف" : "Passionate expert team",
                  lang === "ar" ? "نتائج قابلة للقياس والنمو" : "Measurable & scalable results",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-brand-900 font-semibold text-base"
                  >
                    <div className="w-7 h-7 rounded-full bg-accent-500/15 flex items-center justify-center text-accent-600 shrink-0">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/about"
                className="px-7 py-3.5 rounded-xl bg-brand-800 text-white font-semibold hover:bg-brand-900 transition-all shadow-md hover:shadow-lg hover:-translate-y-1 inline-flex items-center gap-2 text-sm"
              >
                {lang === "ar" ? "اكتشف قصتنا" : "Discover Our Story"}
                <DirectionArrow size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          TEAM — Responsive Grid (1→2→3→4 columns) with softer styling
          ================================================================= */}
      <section className="defer-render section-y section-bg-light relative">
        <div className="container-site">
          {/* Section Header */}
          <div className="flex justify-center w-full">
            <div className="section-header">
              <div className="section-eyebrow">
                <Users size={16} className="text-accent-500" />
                {lang === "ar" ? "فريقنا المتميز" : "Our Expert Team"}
              </div>
              <h2 className="text-h1 text-brand-900 mb-6">
                {lang === "ar"
                  ? "خبراء خلف كل مشروع"
                  : "Experts Behind Every Project"}
              </h2>
              <p className="text-body text-surface-600 leading-loose">
                {lang === "ar"
                  ? "فريق من المحترفين المختصين يعملون يداً بيد لتحقيق أهدافك."
                  : "A team of specialized professionals working hand-in-hand to achieve your goals."}
              </p>
            </div>
          </div>

          {/* Team Grid */}
          {team.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-body-lg text-surface-500 font-medium">
                {lang === "ar" ? "لا يوجد أعضاء بعد." : "No team members yet."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 md:gap-10">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="card-base group text-center flex flex-col p-7 md:p-8"
                >
                  {/* Avatar — slightly smaller, cleaner */}
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full mb-6 mx-auto shrink-0">
                    {/* Decorative ring */}
                    <div className="absolute inset-0 rounded-full border-[3px] border-accent-500/20 opacity-60 group-hover:opacity-100 group-hover:scale-110 group-hover:border-accent-500 transition-all duration-500" />
                    <Image
                      src={member.imageUrl || "/imgs/2-3.png"}
                      alt={member.name}
                      fill
                      className="object-cover object-top rounded-full border-[3px] border-white shadow-md relative z-10 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 128px, 160px"
                      quality={65}
                    />
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-h5 text-brand-900 mb-1 group-hover:text-accent-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-label text-surface-500 mb-5">
                    {member.role}
                  </p>

                  {/* Bio (optional) — constrained width */}
                  {member.bio && (
                    <p className="text-body-sm text-surface-500 leading-relaxed mb-5 px-2 flex-1 max-w-prose mx-auto">
                      {member.bio}
                    </p>
                  )}

                  {/* Social Icons — push to bottom */}
                  <div className="flex justify-center gap-3 mt-auto pt-5 border-t border-surface-100">
                    <button
                      className="w-9 h-9 btn-ghost rounded-full flex items-center justify-center"
                      aria-label="Facebook"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </button>
                    <button
                      className="w-9 h-9 btn-ghost rounded-full flex items-center justify-center"
                      aria-label="LinkedIn"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =================================================================
          PARTNERS — Auto-scrolling Marquee with softer edges
          ================================================================= */}
      <section className="defer-render section-y-md bg-white relative overflow-hidden">
        <div className="container-site relative z-10">
          {/* Section Header */}
          <div className="flex justify-center w-full">
            <div className="section-header mb-12 md:mb-14">
              <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brand-800/5 text-brand-800 font-medium text-label-xl mb-6 border border-brand-800/10 shadow-sm">
                <Sparkles size={16} className="text-accent-500" />
                {lang === "ar" ? "شركاؤنا" : "Our Partners"}
              </div>
              <h2 className="text-h2 text-brand-900">
                {lang === "ar" ? "نفخر بالعمل معهم" : "Proud to Work With"}
              </h2>
            </div>
          </div>

          {/* Partners Marquee */}
          {partners.length === 0 ? (
            <p className="text-center text-surface-500 py-8 font-medium">
              {lang === "ar" ? "لا يوجد شركاء بعد." : "No partners yet."}
            </p>
          ) : (
            <div className="relative w-full overflow-hidden py-4" dir="ltr" style={{ overflowX: 'hidden', overflowY: 'visible' }}>
              {/* Fade edges — softer */}
              <div className="absolute inset-y-0 start-0 w-12 sm:w-20 md:w-36 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 end-0 w-12 sm:w-20 md:w-36 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

              {/* Per-item `me-*` (not parent gap) so the -50% marquee loops seamlessly */}
              <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused] will-change-transform">
                {[...partners, ...partners, ...partners, ...partners].map(
                  (partner, index) => (
                    <a
                      key={`${partner.id}-${index}`}
                      href={isSafeExternalUrl(partner.website) ? partner.website : undefined}
                      target={isSafeExternalUrl(partner.website) ? "_blank" : undefined}
                      rel={isSafeExternalUrl(partner.website) ? "noopener noreferrer" : undefined}
                      aria-label={partner.website ? `Visit ${partner.name}` : partner.name}
                      className="group flex items-center justify-center w-32 sm:w-36 md:w-44 h-16 sm:h-20 md:h-24 me-8 md:me-14 bg-white rounded-xl shadow-sm border border-surface-100 hover:shadow-md hover:-translate-y-1 hover:border-brand-200 transition-all duration-300 shrink-0 p-4"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={partner.imageUrl}
                          alt={partner.name}
                          fill
                          className="object-contain filter md:grayscale md:opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                          sizes="(max-width: 768px) 128px, 176px"
                        />
                      </div>
                    </a>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
