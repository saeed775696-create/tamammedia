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

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[1000] w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(15,23,42,0.08)] border-b border-surface-200/50"
          : "bg-white/70 backdrop-blur-lg border-b border-transparent"
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
            <span className="font-bold text-lg md:text-xl text-brand-900 hidden sm:block">
              {lang === "ar" ? branding.nameAr : branding.nameEn}
            </span>
          </Link>

          {/* ── Desktop Navigation (Center + End) ── */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Nav Links */}
            <Link
              href="/"
              className={`text-[15px] font-semibold px-4 py-2.5 rounded-full transition-colors ${
                isActive("/")
                  ? "bg-brand-800/5 text-brand-800"
                  : "text-slate-600 hover:bg-slate-100 hover:text-brand-900"
              }`}
            >
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>

            <Link
              href="/about"
              className={`text-[15px] font-semibold px-4 py-2.5 rounded-full transition-colors ${
                isActive("/about")
                  ? "bg-brand-800/5 text-brand-800"
                  : "text-slate-600 hover:bg-slate-100 hover:text-brand-900"
              }`}
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
                className={`text-[15px] font-semibold px-4 py-2.5 rounded-full transition-colors inline-flex items-center gap-1 ${
                  isActive("/services") || servicesOpen
                    ? "bg-brand-800/5 text-brand-800"
                    : "text-slate-600 hover:bg-slate-100 hover:text-brand-900"
                }`}
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
                className={`absolute top-full end-0 pt-4 transition-all duration-300 w-[450px] ${
                  servicesOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-4 pointer-events-none"
                }`}
              >
                <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_rgba(33,33,79,0.15)] p-5 border border-surface-200/50 grid grid-cols-2 gap-3">
                  <div className="col-span-2 pb-2 border-b border-slate-100">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                      {lang === "ar"
                        ? "اختر الخدمة المناسبة"
                        : "Choose a Service"}
                    </span>
                  </div>

                  <Link
                    href="/services/creative"
                    onClick={() => setServicesOpen(false)}
                    className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent-500/10 text-accent-600 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-accent-500 group-hover/item:text-white transition-all">
                      <Paintbrush size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-900 mb-1 group-hover/item:text-accent-600 transition-colors">
                        {lang === "ar" ? "الحلول الإبداعية" : "Creative"}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {lang === "ar"
                          ? "تصميم هويات، جرافيكس، وصناعة محتوى"
                          : "Branding, graphics, and content creation"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/services/tech"
                    onClick={() => setServicesOpen(false)}
                    className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-blue-500 group-hover/item:text-white transition-all">
                      <MonitorSmartphone size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-900 mb-1 group-hover/item:text-blue-600 transition-colors">
                        {lang === "ar" ? "الحلول التقنية" : "Tech"}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {lang === "ar"
                          ? "برمجة تطبيقات، مواقع، وحلول برمجية"
                          : "App/Web dev & software solutions"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/services/integrated"
                    onClick={() => setServicesOpen(false)}
                    className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-50 transition-all col-span-2 mt-2 bg-brand-800/5 border border-brand-800/10"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-800 text-white flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-all">
                      <Layers size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-900 mb-1 group-hover/item:text-brand-700 transition-colors">
                        {lang === "ar" ? "الحلول المتكاملة" : "Integrated"}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {lang === "ar"
                          ? "إدارة حملات شاملة لنمو متسارع ومستدام لعلامتك التجارية"
                          : "Comprehensive campaigns for rapid growth"}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/portfolio"
              className={`text-[15px] font-semibold px-4 py-2.5 rounded-full transition-colors ${
                isActive("/portfolio")
                  ? "bg-brand-800/5 text-brand-800"
                  : "text-slate-600 hover:bg-slate-100 hover:text-brand-900"
              }`}
            >
              {lang === "ar" ? "أعمالنا" : "Portfolio"}
            </Link>

            {/* Divider */}
            <div className="w-px h-6 bg-slate-200 mx-3" />

            {/* ── Language Switcher ── */}
            <button
              onClick={toggleLang}
              className="text-[13px] font-bold px-3 py-2 text-slate-500 hover:text-brand-900 transition-colors cursor-pointer rounded-full hover:bg-slate-100"
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
              className="bg-brand-800 text-white font-bold px-5 py-2.5 rounded-full text-[13px] md:text-sm ms-2 inline-flex items-center gap-1.5 hover:bg-brand-900 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              {lang === "ar" ? hero.primaryCtaAr : hero.primaryCtaEn}
              <ArrowLeft
                size={16}
                className={lang === "ar" ? "" : "rotate-180"}
              />
            </Link>
          </div>

          {/* ── Mobile Hamburger Button ── */}
          <button
            type="button"
            className="block lg:hidden p-2 text-brand-900 bg-slate-100 rounded-full active:scale-90 transition-transform"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
