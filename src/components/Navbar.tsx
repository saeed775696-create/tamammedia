"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import {
  ChevronDown,
  Menu,
  X,
  ArrowLeft,
  Paintbrush,
  MonitorSmartphone,
  Layers,
} from "lucide-react";

/* =========================================================================
   Navbar — Complete Rebuild
   =========================================================================
   - Logical properties (start-/end-/ps-/pe-/ms-/me-) for true RTL/LTR flip
   - Sticky header with backdrop-blur on scroll
   - Logo on start, centered nav links, lang switcher + CTA on end
   - Mobile hamburger with slide-in drawer from logical end
   - Mega-menu dropdown with `end-0` (not `right-0`)
   ========================================================================= */

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const { branding, hero } = useSiteSettings();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Scroll detection for sticky background transition
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega-menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");
  const closeMobile = () => setMobileOpen(false);
  const isActive = (path: string) => pathname === path;
  const usesDarkHero =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname === "/services" ||
    pathname.startsWith("/services/") ||
    pathname === "/portfolio";
  const darkAtTop = !scrolled && usesDarkHero;
  const desktopLinkClasses = (active: boolean) =>
    `text-[15px] font-semibold px-4 py-2.5 rounded-full transition-colors ${
      darkAtTop
        ? active
          ? "bg-white/15 text-white"
          : "text-white/75 hover:bg-white/10 hover:text-white"
        : active
          ? "bg-brand-800/5 text-brand-800"
          : "text-slate-600 hover:bg-slate-100 hover:text-brand-900"
    }`;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[1000] w-full transition-all duration-500 ${
        darkAtTop
          ? "border-b border-white/10 bg-brand-950/45 shadow-[0_8px_30px_rgba(15,18,48,0.12)] backdrop-blur-xl"
          : "bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(15,23,42,0.08)] border-b border-surface-200/50"
      }`}
    >
      <div className="container-site min-w-0">
        <div className="flex h-16 min-w-0 items-center justify-between md:h-[72px]">
          {/* ── Logo (Start) ── */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            onClick={closeMobile}
          >
            <div className="relative w-10 h-10 md:w-11 md:h-11 bg-white rounded-full shadow-sm flex items-center justify-center p-1">
              <Image
                src={branding.logoUrl}
                width={40}
                height={40}
                className="w-full h-auto object-contain"
                alt={branding.nameEn}
                priority
              />
            </div>
            <span
              className={`hidden text-lg font-bold transition-colors duration-500 sm:block md:text-xl ${
                darkAtTop ? "text-white" : "text-brand-900"
              }`}
            >
              {lang === "ar" ? branding.nameAr : branding.nameEn}
            </span>
          </Link>

          {/* ── Desktop Navigation (Center + End) ── */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Nav Links */}
            <Link
              href="/"
              className={desktopLinkClasses(isActive("/"))}
            >
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>

            <Link
              href="/about"
              className={desktopLinkClasses(isActive("/about"))}
            >
              {lang === "ar" ? "من نحن" : "About"}
            </Link>

            {/* ── Services Mega Menu ── */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                className={`${desktopLinkClasses(
                  pathname.startsWith("/services") || servicesOpen
                )} inline-flex items-center gap-1`}
              >
                {lang === "ar" ? "خدماتنا" : "Services"}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </Link>

              {/* Mega Menu Panel — uses end-0 (logical) */}
              <div
                className={`absolute top-full end-0 w-[400px] pt-3 transition-all duration-300 ${
                  servicesOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-4 pointer-events-none"
                }`}
              >
                <div className="flex flex-col gap-1.5 rounded-2xl border border-surface-200/60 bg-white/95 p-3 shadow-[0_20px_60px_rgba(33,33,79,0.16)] backdrop-blur-2xl">
                  <div className="border-b border-slate-100 px-3 pt-1 pb-2.5">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                      {lang === "ar"
                        ? "اختر الخدمة المناسبة"
                        : "Choose a Service"}
                    </span>
                  </div>

                  <Link
                    href="/services/creative"
                    onClick={() => setServicesOpen(false)}
                    className="group/item flex items-center gap-4 rounded-2xl border border-transparent px-3 py-3 transition-all duration-200 hover:border-accent-500/15 hover:bg-accent-500/[0.06]"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-600 transition-all duration-200 group-hover/item:scale-105 group-hover/item:bg-accent-500 group-hover/item:text-white">
                      <Paintbrush size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="mb-0.5 font-bold text-brand-900 transition-colors group-hover/item:text-accent-600">
                        {lang === "ar" ? "الحلول الإبداعية" : "Creative"}
                      </h4>
                      <p className="line-clamp-1 text-xs leading-relaxed text-slate-500">
                        {lang === "ar"
                          ? "تصميم هويات، جرافيكس، وصناعة محتوى"
                          : "Branding, graphics, and content creation"}
                      </p>
                    </div>
                    <ArrowLeft
                      size={17}
                      className={`shrink-0 text-slate-300 transition-all duration-200 group-hover/item:text-accent-600 ${
                        lang === "ar" ? "group-hover/item:-translate-x-1" : "rotate-180 group-hover/item:translate-x-1"
                      }`}
                    />
                  </Link>

                  <Link
                    href="/services/tech"
                    onClick={() => setServicesOpen(false)}
                    className="group/item flex items-center gap-4 rounded-2xl border border-transparent px-3 py-3 transition-all duration-200 hover:border-blue-500/15 hover:bg-blue-500/[0.06]"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 transition-all duration-200 group-hover/item:scale-105 group-hover/item:bg-blue-500 group-hover/item:text-white">
                      <MonitorSmartphone size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="mb-0.5 font-bold text-brand-900 transition-colors group-hover/item:text-blue-600">
                        {lang === "ar" ? "الحلول التقنية" : "Tech"}
                      </h4>
                      <p className="line-clamp-1 text-xs leading-relaxed text-slate-500">
                        {lang === "ar"
                          ? "برمجة تطبيقات، مواقع، وحلول برمجية"
                          : "App/Web dev & software solutions"}
                      </p>
                    </div>
                    <ArrowLeft
                      size={17}
                      className={`shrink-0 text-slate-300 transition-all duration-200 group-hover/item:text-blue-600 ${
                        lang === "ar" ? "group-hover/item:-translate-x-1" : "rotate-180 group-hover/item:translate-x-1"
                      }`}
                    />
                  </Link>

                  <Link
                    href="/services/integrated"
                    onClick={() => setServicesOpen(false)}
                    className="group/item flex items-center gap-4 rounded-2xl border border-brand-800/10 bg-brand-800/[0.04] px-3 py-3 transition-all duration-200 hover:border-brand-800/20 hover:bg-brand-800/[0.08]"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-800 text-white transition-all duration-200 group-hover/item:scale-105 group-hover/item:bg-brand-700">
                      <Layers size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="mb-0.5 font-bold text-brand-900 transition-colors group-hover/item:text-brand-700">
                        {lang === "ar" ? "الحلول المتكاملة" : "Integrated"}
                      </h4>
                      <p className="line-clamp-1 text-xs leading-relaxed text-slate-500">
                        {lang === "ar"
                          ? "إدارة حملات شاملة لنمو متسارع ومستدام لعلامتك التجارية"
                          : "Comprehensive campaigns for rapid growth"}
                      </p>
                    </div>
                    <ArrowLeft
                      size={17}
                      className={`shrink-0 text-slate-300 transition-all duration-200 group-hover/item:text-brand-700 ${
                        lang === "ar" ? "group-hover/item:-translate-x-1" : "rotate-180 group-hover/item:translate-x-1"
                      }`}
                    />
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/portfolio"
              className={desktopLinkClasses(isActive("/portfolio"))}
            >
              {lang === "ar" ? "أعمالنا" : "Portfolio"}
            </Link>

            {/* Divider */}
            <div
              className={`mx-3 h-6 w-px transition-colors duration-500 ${
                darkAtTop ? "bg-white/20" : "bg-slate-200"
              }`}
            />

            {/* ── Language Switcher ── */}
            <button
              onClick={toggleLang}
              className={`cursor-pointer rounded-full px-3 py-2 text-[13px] font-bold transition-colors ${
                darkAtTop
                  ? "text-white/75 hover:bg-white/10 hover:text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-brand-900"
              }`}
              aria-label={
                lang === "ar"
                  ? "Switch to English"
                  : "التبديل إلى العربية"
              }
            >
              {lang === "ar" ? "EN" : "AR"}
            </button>

            {/* ── CTA Button (End) ── */}
            <Link
              href="/contact"
              className="ms-2 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-accent-500 px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_8px_22px_rgba(245,120,45,0.28)] transition-all hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-[0_10px_26px_rgba(245,120,45,0.36)] md:text-sm"
            >
              {lang === "ar" ? hero.primaryCtaAr : hero.primaryCtaEn}
              <ArrowLeft
                size={16}
                className={lang === "ar" ? "" : "rotate-180"}
              />
            </Link>
          </div>

          {/* ── Mobile Hamburger Button ── */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/contact"
              onClick={closeMobile}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-3 py-2 text-xs font-bold text-white shadow-[0_6px_18px_rgba(245,120,45,0.3)] transition-all active:scale-95 hover:bg-accent-600 min-[390px]:px-3.5"
              aria-label={lang === "ar" ? hero.primaryCtaAr : hero.primaryCtaEn}
            >
              <span className="hidden min-[390px]:inline">{lang === "ar" ? hero.primaryCtaAr : hero.primaryCtaEn}</span>
              <ArrowLeft size={17} className={lang === "ar" ? "" : "rotate-180"} />
            </Link>
            <button
              type="button"
              className={`rounded-full p-2 transition-all active:scale-90 ${
                darkAtTop
                  ? "bg-white/10 text-white hover:bg-white/15"
                  : "bg-slate-100 text-brand-900"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu Overlay + Drawer ── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-[998] lg:hidden"
            onClick={closeMobile}
          />

          {/* Slide-in Drawer from logical end */}
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            tabIndex={-1}
            className="fixed inset-y-0 end-0 z-[999] flex h-[100dvh] max-h-[100dvh] w-[300px] max-w-[85vw] flex-col overflow-hidden bg-white shadow-2xl animate-slide-in-end lg:hidden"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 p-4">
              <Link
                href="/"
                className="flex items-center gap-3"
                onClick={closeMobile}
              >
                <div className="relative w-9 h-9 bg-white rounded-full shadow-sm flex items-center justify-center p-1">
                  <Image
                    src={branding.logoUrl}
                    width={36}
                    height={36}
                    className="w-full h-auto object-contain"
                    alt={branding.nameEn}
                  />
                </div>
                <span className="font-bold text-lg text-brand-900">
                  {lang === "ar" ? branding.nameAr : branding.nameEn}
                </span>
              </Link>
              <button
                type="button"
                onClick={closeMobile}
                className="p-2 text-slate-500 hover:text-brand-900 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain p-4 pb-8">
              <Link
                href="/"
                onClick={closeMobile}
                className={`px-4 py-3 text-base font-bold rounded-xl transition-colors ${
                  isActive("/")
                    ? "bg-brand-800/5 text-brand-800"
                    : "text-brand-900 hover:bg-slate-50"
                }`}
              >
                {lang === "ar" ? "الرئيسية" : "Home"}
              </Link>

              <Link
                href="/about"
                onClick={closeMobile}
                className={`px-4 py-3 text-base font-bold rounded-xl transition-colors ${
                  isActive("/about")
                    ? "bg-brand-800/5 text-brand-800"
                    : "text-brand-900 hover:bg-slate-50"
                }`}
              >
                {lang === "ar" ? "من نحن" : "About"}
              </Link>

              {/* Services submenu */}
              <div className="bg-slate-50 rounded-xl p-2 mt-2">
                <Link
                  href="/services"
                  onClick={closeMobile}
                  className="px-4 py-2 text-base font-bold text-brand-900 block"
                >
                  {lang === "ar" ? "خدماتنا" : "Services"}
                </Link>
                <div className="flex flex-col gap-1 mt-2 border-t border-slate-200 pt-2">
                  <Link
                    href="/services/creative"
                    onClick={closeMobile}
                    className="px-4 py-2 text-sm text-slate-600 hover:text-brand-900 rounded-lg hover:bg-white transition-colors"
                  >
                    {lang === "ar" ? "الإبداعية" : "Creative"}
                  </Link>
                  <Link
                    href="/services/tech"
                    onClick={closeMobile}
                    className="px-4 py-2 text-sm text-slate-600 hover:text-brand-900 rounded-lg hover:bg-white transition-colors"
                  >
                    {lang === "ar" ? "التقنية" : "Tech"}
                  </Link>
                  <Link
                    href="/services/integrated"
                    onClick={closeMobile}
                    className="px-4 py-2 text-sm text-brand-800 font-bold rounded-lg hover:bg-white transition-colors"
                  >
                    {lang === "ar" ? "المتكاملة" : "Integrated"}
                  </Link>
                </div>
              </div>

              <Link
                href="/portfolio"
                onClick={closeMobile}
                className={`px-4 py-3 text-base font-bold rounded-xl transition-colors ${
                  isActive("/portfolio")
                    ? "bg-brand-800/5 text-brand-800"
                    : "text-brand-900 hover:bg-slate-50"
                }`}
              >
                {lang === "ar" ? "أعمالنا" : "Portfolio"}
              </Link>

              <Link
                href="/contact"
                onClick={closeMobile}
                className="px-4 py-3 text-base font-bold text-brand-900 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {lang === "ar" ? "اتصل بنا" : "Contact"}
              </Link>

              {/* Language Toggle */}
              <button
                type="button"
                onClick={() => {
                  toggleLang();
                  closeMobile();
                }}
                className="mt-4 w-full bg-brand-800 text-white font-bold text-base px-5 py-4 rounded-xl hover:bg-brand-900 transition-colors"
              >
                {lang === "ar" ? "English" : "العربية"}
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
