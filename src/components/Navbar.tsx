"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown, Menu, X, ArrowLeft, Paintbrush, MonitorSmartphone, Layers } from "lucide-react";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");
  const closeMobile = () => setMobileOpen(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={`fixed w-full z-[1000] transition-all duration-500 ${scrolled ? "top-0 md:top-4" : "top-0 md:top-6"}`}>
      <div className={`mx-auto w-full transition-all duration-500 ${scrolled ? "md:max-w-5xl" : "md:max-w-6xl"}`}>
        <div className={`flex items-center justify-between px-4 md:px-6 py-3 transition-all duration-500 
          ${scrolled ? "bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-b md:border border-slate-200/50 md:rounded-full" : "bg-white/60 md:bg-white/40 backdrop-blur-md shadow-sm border-b md:border border-white/20 md:rounded-full"}`}>
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" onClick={closeMobile}>
            <div className="relative w-10 h-10 md:w-11 md:h-11 bg-white rounded-full shadow-sm flex items-center justify-center p-1">
              <Image src="/imgs/2-3.png" width={40} height={40} className="w-full h-auto object-contain" alt="Tamam Media" priority />
            </div>
            <h1 className="font-bold text-lg md:text-xl text-[var(--color-brand-900)] tracking-tight">{lang === "ar" ? "تمام ميديا" : "Tamam Media"}</h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className={`text-[15px] font-semibold px-4 py-2.5 rounded-full transition-colors ${isActive("/") ? "bg-[var(--color-brand-800)]/5 text-[var(--color-brand-800)]" : "text-slate-600 hover:bg-slate-100 hover:text-[var(--color-brand-900)]"}`}>
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <Link href="/about" className={`text-[15px] font-semibold px-4 py-2.5 rounded-full transition-colors ${isActive("/about") ? "bg-[var(--color-brand-800)]/5 text-[var(--color-brand-800)]" : "text-slate-600 hover:bg-slate-100 hover:text-[var(--color-brand-900)]"}`}>
              {lang === "ar" ? "من نحن" : "About"}
            </Link>

            {/* Mega Menu Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`text-[15px] font-semibold px-4 py-2.5 rounded-full transition-colors inline-flex items-center gap-1 ${isActive("/services") || servicesOpen ? "bg-[var(--color-brand-800)]/5 text-[var(--color-brand-800)]" : "text-slate-600 hover:bg-slate-100 hover:text-[var(--color-brand-900)]"}`}
              >
                <Link href="/services">{lang === "ar" ? "خدماتنا" : "Services"}</Link>
                <ChevronDown size={14} className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Mega Menu Panel */}
              <div className={`absolute top-full right-0 pt-4 transition-all duration-300 w-[450px] ${servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-4"}`}>
                <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_rgba(33,33,79,0.15)] p-5 border border-[#eef0f5] grid grid-cols-2 gap-3">
                  <div className="col-span-2 mb-2 pb-2 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">{lang === "ar" ? "اختر الخدمة المناسبة" : "Choose a Service"}</h3>
                  </div>
                  
                  <Link href="/services/creative" onClick={() => setServicesOpen(false)} className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-[#f8f9fc] transition-all">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-accent-500)]/10 text-[var(--color-accent-600)] flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-[var(--color-accent-500)] group-hover/item:text-white transition-all">
                      <Paintbrush size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-brand-900)] mb-1 group-hover/item:text-[var(--color-accent-600)] transition-colors">{lang === "ar" ? "الحلول الإبداعية" : "Creative"}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{lang === "ar" ? "تصميم هويات، جرافيكس، وصناعة محتوى" : "Branding, graphics, and content creation"}</p>
                    </div>
                  </Link>

                  <Link href="/services/tech" onClick={() => setServicesOpen(false)} className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-[#f8f9fc] transition-all">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-blue-500 group-hover/item:text-white transition-all">
                      <MonitorSmartphone size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-brand-900)] mb-1 group-hover/item:text-blue-600 transition-colors">{lang === "ar" ? "الحلول التقنية" : "Tech"}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{lang === "ar" ? "برمجة تطبيقات، مواقع، وحلول برمجية" : "App/Web dev & software solutions"}</p>
                    </div>
                  </Link>

                  <Link href="/services/integrated" onClick={() => setServicesOpen(false)} className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-[#f8f9fc] transition-all col-span-2 mt-2 bg-[var(--color-brand-800)]/5 border border-[var(--color-brand-800)]/10">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-brand-800)] text-white flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-all">
                      <Layers size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-brand-900)] mb-1 group-hover/item:text-[var(--color-brand-700)] transition-colors">{lang === "ar" ? "الحلول المتكاملة" : "Integrated"}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{lang === "ar" ? "إدارة حملات شاملة لنمو متسارع ومستدام لعلامتك التجارية" : "Comprehensive campaigns for rapid growth"}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/portfolio" className={`text-[15px] font-semibold px-4 py-2.5 rounded-full transition-colors ${isActive("/portfolio") ? "bg-[var(--color-brand-800)]/5 text-[var(--color-brand-800)]" : "text-slate-600 hover:bg-slate-100 hover:text-[var(--color-brand-900)]"}`}>
              {lang === "ar" ? "أعمالنا" : "Portfolio"}
            </Link>

            <div className="w-[1px] h-6 bg-slate-200 mx-1"></div>

            {/* Lang Button */}
            <button className="text-[13px] font-bold px-3 py-2 text-slate-500 hover:text-[var(--color-brand-900)] transition-colors cursor-pointer" onClick={toggleLang}>
              {lang === "ar" ? "EN" : "AR"}
            </button>

            {/* Contact CTA */}
            <Link
              href="/contact"
              className="bg-[var(--color-brand-800)] text-white font-bold px-5 py-2.5 rounded-full text-[13px] md:text-sm ms-1 inline-flex items-center gap-1.5 hover:bg-[var(--color-brand-900)] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              {lang === "ar" ? "اطلب خدمة" : "Get a Quote"}
              <ArrowLeft size={16} className={lang === "ar" ? "" : "rotate-180"} />
            </Link>
          </div>

          {/* Mobile Button */}
          <button className="block md:hidden p-2 text-[var(--color-brand-900)] bg-slate-100 rounded-full" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100 p-4 max-h-[85vh] overflow-y-auto z-50">
            <div className="flex flex-col gap-2">
              <Link href="/" onClick={closeMobile} className="px-4 py-3 text-lg font-bold text-[var(--color-brand-900)] rounded-xl hover:bg-slate-50">
                {lang === "ar" ? "الرئيسية" : "Home"}
              </Link>
              <Link href="/about" onClick={closeMobile} className="px-4 py-3 text-lg font-bold text-[var(--color-brand-900)] rounded-xl hover:bg-slate-50">
                {lang === "ar" ? "من نحن" : "About"}
              </Link>
              
              <div className="bg-slate-50 rounded-xl p-2 mt-2">
                <Link href="/services" onClick={closeMobile} className="px-2 py-2 text-lg font-bold text-[var(--color-brand-900)] block">
                  {lang === "ar" ? "خدماتنا" : "Services"}
                </Link>
                <div className="flex flex-col gap-1 mt-2 border-t border-slate-200 pt-2">
                  <Link href="/services/creative" onClick={closeMobile} className="px-4 py-2 text-base text-slate-600 hover:text-[var(--color-brand-900)]">
                    {lang === "ar" ? "الإبداعية" : "Creative"}
                  </Link>
                  <Link href="/services/tech" onClick={closeMobile} className="px-4 py-2 text-base text-slate-600 hover:text-[var(--color-brand-900)]">
                    {lang === "ar" ? "التقنية" : "Tech"}
                  </Link>
                  <Link href="/services/integrated" onClick={closeMobile} className="px-4 py-2 text-base text-[var(--color-brand-800)] font-bold">
                    {lang === "ar" ? "المتكاملة" : "Integrated"}
                  </Link>
                </div>
              </div>

              <Link href="/portfolio" onClick={closeMobile} className="px-4 py-3 text-lg font-bold text-[var(--color-brand-900)] rounded-xl hover:bg-slate-50 mt-2">
                {lang === "ar" ? "أعمالنا" : "Portfolio"}
              </Link>
              <Link href="/contact" onClick={closeMobile} className="px-4 py-3 text-lg font-bold text-[var(--color-brand-900)] rounded-xl hover:bg-slate-50">
                {lang === "ar" ? "اتصل بنا" : "Contact"}
              </Link>
              <button
                className="mt-4 w-full bg-[var(--color-brand-800)] text-white font-bold text-base px-5 py-4 rounded-xl"
                onClick={() => {
                  toggleLang();
                  closeMobile();
                }}
              >
                {lang === "ar" ? "English" : "العربية"}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}