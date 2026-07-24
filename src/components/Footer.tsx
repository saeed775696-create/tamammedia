"use client";
import Link from "next/link";
import { useState } from "react";
import { siteConfig, whatsappLink } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown, MessageCircle } from "lucide-react";

export default function Footer() {
  const { lang } = useLanguage();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-brand-950 text-white/70 relative">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div className="md:col-span-2 md:text-center md:flex md:flex-col md:items-center">
            <h3 className="text-xl font-bold text-white mb-2">
              {lang === "ar" ? "تمام ميديا | Tamam Media" : "Tamam Media"}
            </h3>
            <p className="text-[0.95rem] leading-[1.9] max-md:max-w-xs">
              {lang === "ar"
                ? "شركة يمنية متخصصة في الحلول الرقمية والتسويقية المتكاملة."
                : "A Yemeni company specialized in integrated digital and marketing solutions."}
            </p>
            <div className="flex gap-2.5 max-md:justify-center mt-5">
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" title="Facebook" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-accent-500 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-accent-500 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-accent-500 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>

          <div className="max-md:border-b max-md:border-white/10 max-md:pb-4">
            <button
              onClick={() => toggleSection('links')}
              className="flex items-center justify-between w-full md:cursor-default"
            >
              <h4 className="text-lg font-bold text-white mb-0 md:!mb-[14px]">
                {lang === "ar" ? "روابط سريعة" : "Quick Links"}
              </h4>
              <ChevronDown size={20} className={`md:hidden transition-transform duration-300 text-slate-400 ${openSection === 'links' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`flex flex-col overflow-hidden transition-all duration-300 md:!max-h-none md:!opacity-100 ${openSection === 'links' ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0 md:mt-0'}`}>
              <Link href="/" className="text-sm py-1">{lang === "ar" ? "الرئيسية" : "Home"}</Link>
              <Link href="/about" className="text-sm py-1">{lang === "ar" ? "من نحن" : "About"}</Link>
              <Link href="/services" className="text-sm py-1">{lang === "ar" ? "خدماتنا" : "Services"}</Link>
              <Link href="/portfolio" className="text-sm py-1">{lang === "ar" ? "أعمالنا" : "Portfolio"}</Link>
              <Link href="/contact" className="text-sm py-1">{lang === "ar" ? "اتصل بنا" : "Contact"}</Link>
            </div>
          </div>

          <div className="max-md:border-b max-md:border-white/10 max-md:pb-4 max-md:pt-4">
            <button
              onClick={() => toggleSection('services')}
              className="flex items-center justify-between w-full md:cursor-default"
            >
              <h4 className="text-lg font-bold text-white mb-0 md:!mb-[14px]">
                {lang === "ar" ? "خدماتنا" : "Services"}
              </h4>
              <ChevronDown size={20} className={`md:hidden transition-transform duration-300 text-slate-400 ${openSection === 'services' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`flex flex-col overflow-hidden transition-all duration-300 md:!max-h-none md:!opacity-100 ${openSection === 'services' ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0 md:mt-0'}`}>
              <Link href="/services/creative" className="text-sm py-1">{lang === "ar" ? "الخدمات الإبداعية" : "Creative Services"}</Link>
              <Link href="/services/tech" className="text-sm py-1">{lang === "ar" ? "الخدمات التقنية" : "Tech Services"}</Link>
              <Link href="/services/integrated" className="text-sm py-1">{lang === "ar" ? "الحلول المتكاملة" : "Integrated Solutions"}</Link>
            </div>
          </div>

          <div className="max-md:pb-4 max-md:pt-4">
            <button
              onClick={() => toggleSection('contact')}
              className="flex items-center justify-between w-full md:cursor-default"
            >
              <h4 className="text-lg font-bold text-white mb-0 md:!mb-[14px]">
                {lang === "ar" ? "تواصل" : "Contact"}
              </h4>
              <ChevronDown size={20} className={`md:hidden transition-transform duration-300 text-slate-400 ${openSection === 'contact' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`flex flex-col overflow-hidden transition-all duration-300 md:!max-h-none md:!opacity-100 ${openSection === 'contact' ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0 md:mt-0'}`}>
              <a href={`mailto:${siteConfig.email}`} className="text-sm py-1">{siteConfig.email}</a>
              <a href={`tel:+${siteConfig.phone}`} className="text-sm py-1" dir="ltr">{siteConfig.phoneDisplay}</a>
              <span className="text-sm py-1">{lang === "ar" ? siteConfig.location.ar : siteConfig.location.en}</span>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row justify-between gap-4 items-center text-sm">
          <p>© {new Date().getFullYear()} {lang === "ar" ? "تمام ميديا | Tamam Media - جميع الحقوق محفوظة" : "Tamam Media - All rights reserved"}</p>
          <p className="!mt-0 text-[0.85rem] opacity-80">
            {lang === "ar" ? "تصميم وتطوير" : "Designed by"}{" "}
            <span className="text-accent-500 font-bold">
              {siteConfig.designerName}
            </span>{" "}
            |{" "}
            <a
              href={`tel:+${siteConfig.designerPhone}`}
              className="text-inherit no-underline inline-block ms-1.5"
              dir="ltr"
            >
              {siteConfig.designerPhoneDisplay}
            </a>
          </p>
        </div>
      </div>

      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform animate-pulse-glow">
          <MessageCircle size={28} />
        </a>
      </div>
    </footer>
  );
}
