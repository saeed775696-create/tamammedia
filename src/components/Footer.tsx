"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import {
  ChevronDown,
  MapPin,
  Mail,
  Phone,
  Clock,
} from "lucide-react";

/* =========================================================================
   Footer — Complete Rebuild
   =========================================================================
   - 4-column grid (1-col mobile, 2-col sm, 4-col lg)
   - Contact icons aligned with text via `items-start` + `mt-0.5` on icon
   - Collapsible sections on mobile (accordion), always expanded on sm+
   - Copyright bar: flex-col on mobile, flex-row justify-between on sm+
   - Floating widgets (WhatsApp / Back-to-top) live in ONE place:
     FloatingWhatsApp + ui/BackToTop — NOT duplicated here.
   - Logical properties (start-/end-/ps-/pe-/ms-/me-) for true RTL/LTR flip
   ========================================================================= */

export default function Footer() {
  const { lang } = useLanguage();
  const { branding, contact, social, footer } = useSiteSettings();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="relative bg-brand-950 text-white overflow-hidden">
      {/* ── Decorative Background Blobs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 start-1/4 w-[min(500px,60vw)] aspect-square bg-accent-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 end-1/4 w-[min(400px,50vw)] aspect-square bg-brand-500/5 rounded-full blur-[100px]" />
      </div>

      {/* ── Main Container ── */}
      <div className="container-site pt-16 sm:pt-20 pb-8 sm:pb-10">
        {/* ============================================================
            TOP SECTION — Brand, Socials & Contact Info
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-12 sm:pb-14 border-b border-white/10">
          {/* ── Brand Info (5 cols on lg) ── */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-7">
            {/* Logo + Name — same real brand mark as the Navbar */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-md flex items-center justify-center p-1.5 shrink-0">
                <Image
                  src={branding.logoUrl}
                  width={40}
                  height={40}
                  className="w-full h-auto object-contain"
                  alt={branding.nameEn}
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-white truncate">
                  {lang === "ar" ? branding.nameAr : branding.nameEn}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/50 tracking-wide">
                  {lang === "ar" ? branding.taglineAr : branding.taglineEn}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/60 leading-relaxed text-sm sm:text-[15px] max-w-lg">
              {lang === "ar" ? footer.descriptionAr : footer.descriptionEn}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-10 h-10 bg-white/5 hover:bg-accent-500 border border-white/10 hover:border-accent-500 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg
                  width="16"
                  height="16"
                  className="sm:w-[18px] sm:h-[18px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-10 h-10 bg-white/5 hover:bg-accent-500 border border-white/10 hover:border-accent-500 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg
                  width="16"
                  height="16"
                  className="sm:w-[18px] sm:h-[18px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-10 h-10 bg-white/5 hover:bg-accent-500 border border-white/10 hover:border-accent-500 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg
                  width="16"
                  height="16"
                  className="sm:w-[18px] sm:h-[18px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                className="w-10 h-10 bg-white/5 hover:bg-green-500 border border-white/10 hover:border-green-500 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg
                  width="16"
                  height="16"
                  className="sm:w-[18px] sm:h-[18px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Contact Info (7 cols on lg) ── */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-5">
              {/* Email — items-start for proper icon/text alignment */}
              <a
                href={`mailto:${contact.email}`}
                className="flex items-start gap-3 sm:gap-4 group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-all duration-300 shrink-0 mt-0.5">
                  <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs text-white/40 mb-0.5">
                    {lang === "ar" ? "البريد الإلكتروني" : "Email"}
                  </p>
                  <p
                    className="text-xs sm:text-sm text-white/80 group-hover:text-white transition-colors truncate"
                    dir="ltr"
                  >
                    {contact.email}
                  </p>
                </div>
              </a>

              {/* Phone — items-start for proper icon/text alignment */}
              <a
                href={`tel:+${contact.phone}`}
                className="flex items-start gap-3 sm:gap-4 group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-all duration-300 shrink-0 mt-0.5">
                  <Phone size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs text-white/40 mb-0.5">
                    {lang === "ar" ? "الهاتف" : "Phone"}
                  </p>
                  <p
                    className="text-xs sm:text-sm text-white/80 group-hover:text-white transition-colors truncate"
                    dir="ltr"
                  >
                    {contact.phoneDisplay}
                  </p>
                </div>
              </a>

              {/* Location — items-start for proper icon/text alignment */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent-500 shrink-0 mt-0.5">
                  <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs text-white/40 mb-0.5">
                    {lang === "ar" ? "الموقع" : "Location"}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 truncate">
                    {lang === "ar" ? contact.locationAr : contact.locationEn}
                  </p>
                </div>
              </div>

              {/* Working Hours — items-start for proper icon/text alignment */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent-500 shrink-0 mt-0.5">
                  <Clock size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs text-white/40 mb-0.5">
                    {lang === "ar" ? "ساعات العمل" : "Working Hours"}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 truncate">
                    {lang === "ar" ? contact.workingHoursAr : contact.workingHoursEn}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            MIDDLE SECTION — 4-Column Link Grid
            ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 py-12 sm:py-14 border-b border-white/10">
          {/* ── Quick Links ── */}
          <div>
            <button
              onClick={() => toggleSection("links")}
              className="flex items-center justify-between w-full mb-0 sm:mb-5 sm:cursor-default group"
            >
              <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider group-hover:text-accent-500 transition-colors">
                {lang === "ar" ? "روابط سريعة" : "Quick Links"}
              </h4>
              <ChevronDown
                size={16}
                className={`sm:hidden transition-transform duration-300 text-white/40 ${
                  openSection === "links" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`flex flex-col overflow-hidden transition-all duration-300 sm:!max-h-none sm:!opacity-100 ${
                openSection === "links"
                  ? "max-h-64 opacity-100 mt-3 sm:mt-0"
                  : "max-h-0 opacity-0 sm:max-h-none sm:opacity-100"
              }`}
            >
              {[
                { href: "/", labelAr: "الرئيسية", labelEn: "Home" },
                { href: "/about", labelAr: "من نحن", labelEn: "About Us" },
                { href: "/services", labelAr: "خدماتنا", labelEn: "Services" },
                {
                  href: "/portfolio",
                  labelAr: "أعمالنا",
                  labelEn: "Portfolio",
                },
                { href: "/contact", labelAr: "اتصل بنا", labelEn: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs sm:text-sm text-white/50 hover:text-accent-500 py-1.5 sm:py-2 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-accent-500 transition-colors shrink-0" />
                  <span className="truncate">
                    {lang === "ar" ? link.labelAr : link.labelEn}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Services ── */}
          <div>
            <button
              onClick={() => toggleSection("services")}
              className="flex items-center justify-between w-full mb-0 sm:mb-5 sm:cursor-default group"
            >
              <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider group-hover:text-accent-500 transition-colors">
                {lang === "ar" ? "خدماتنا" : "Our Services"}
              </h4>
              <ChevronDown
                size={16}
                className={`sm:hidden transition-transform duration-300 text-white/40 ${
                  openSection === "services" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`flex flex-col overflow-hidden transition-all duration-300 sm:!max-h-none sm:!opacity-100 ${
                openSection === "services"
                  ? "max-h-64 opacity-100 mt-3 sm:mt-0"
                  : "max-h-0 opacity-0 sm:max-h-none sm:opacity-100"
              }`}
            >
              {[
                {
                  href: "/services/creative",
                  labelAr: "الخدمات الإبداعية",
                  labelEn: "Creative Services",
                },
                {
                  href: "/services/tech",
                  labelAr: "الخدمات التقنية",
                  labelEn: "Tech Services",
                },
                {
                  href: "/services/integrated",
                  labelAr: "الحلول المتكاملة",
                  labelEn: "Integrated Solutions",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs sm:text-sm text-white/50 hover:text-accent-500 py-1.5 sm:py-2 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-accent-500 transition-colors shrink-0" />
                  <span className="truncate">
                    {lang === "ar" ? link.labelAr : link.labelEn}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── More Links ── */}
          <div>
            <button
              onClick={() => toggleSection("more")}
              className="flex items-center justify-between w-full mb-0 sm:mb-5 sm:cursor-default group"
            >
              <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider group-hover:text-accent-500 transition-colors">
                {lang === "ar" ? "المزيد" : "More"}
              </h4>
              <ChevronDown
                size={16}
                className={`sm:hidden transition-transform duration-300 text-white/40 ${
                  openSection === "more" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`flex flex-col overflow-hidden transition-all duration-300 sm:!max-h-none sm:!opacity-100 ${
                openSection === "more"
                  ? "max-h-64 opacity-100 mt-3 sm:mt-0"
                  : "max-h-0 opacity-0 sm:max-h-none sm:opacity-100"
              }`}
            >
              {[
                {
                  href: "/services/creative",
                  labelAr: "التصميم الجرافيكي",
                  labelEn: "Graphic Design",
                },
                {
                  href: "/services/tech",
                  labelAr: "تطوير المواقع",
                  labelEn: "Web Development",
                },
                {
                  href: "/services/integrated",
                  labelAr: "التسويق الرقمي",
                  labelEn: "Digital Marketing",
                },
                {
                  href: "/portfolio",
                  labelAr: "دراسات الحالة",
                  labelEn: "Case Studies",
                },
              ].map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="text-xs sm:text-sm text-white/50 hover:text-accent-500 py-1.5 sm:py-2 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-accent-500 transition-colors shrink-0" />
                  <span className="truncate">
                    {lang === "ar" ? link.labelAr : link.labelEn}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── CTA Box ── */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-5 hidden lg:block">
              {lang === "ar" ? "ابدأ مشروعك" : "Start Your Project"}
            </h4>
            {/* Desktop CTA */}
            <div className="hidden lg:block bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                {lang === "ar"
                  ? "هل لديك مشروع في ذهنك؟ دعنا نساعدك في تحويل فكرتك إلى واقع رقمي مميز."
                  : "Have a project in mind? Let us help you turn your idea into a distinctive digital reality."}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl gradient-accent text-white text-xs sm:text-sm font-semibold hover:shadow-lg hover:shadow-accent-500/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                {lang === "ar" ? "تواصل معنا" : "Get in Touch"}
                <svg
                  width="14"
                  height="14"
                  className="sm:w-4 sm:h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d={
                      lang === "ar"
                        ? "M19 12H5M12 19l-7-7 7-7"
                        : "M5 12h14M12 5l7 7-7 7"
                    }
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================================
            MOBILE CTA — Shown only on small screens
            ============================================================ */}
        <div className="lg:hidden py-8 sm:py-10 border-b border-white/10">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-4 sm:p-5 text-center space-y-3">
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              {lang === "ar"
                ? "هل لديك مشروع في ذهنك؟ دعنا نساعدك في تحويل فكرتك إلى واقع رقمي مميز."
                : "Have a project in mind? Let us help you turn your idea into a distinctive digital reality."}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl gradient-accent text-white text-xs sm:text-sm font-semibold hover:shadow-lg hover:shadow-accent-500/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              {lang === "ar" ? "تواصل معنا" : "Get in Touch"}
              <svg
                width="14"
                height="14"
                className="sm:w-4 sm:h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d={
                    lang === "ar"
                      ? "M19 12H5M12 19l-7-7 7-7"
                      : "M5 12h14M12 5l7 7-7 7"
                  }
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* ============================================================
            BOTTOM SECTION — Copyright Bar
            flex-col on mobile, flex-row justify-between on sm+
            ============================================================ */}
        <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/40">
          <p className="text-center sm:text-start">
            © {new Date().getFullYear()}{" "}
            <span className="text-white/60 font-medium">
              {lang === "ar" ? `${branding.nameAr} | ${branding.nameEn}` : branding.nameEn}
            </span>{" "}
            - {lang === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}
          </p>
          <p className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center text-center sm:text-end">
            <span>
              {lang === "ar" ? "تصميم وتطوير" : "Designed by"}
            </span>
            <span className="text-accent-500 font-semibold">
              {footer.designerName}
            </span>
            <span className="hidden sm:inline">|</span>
            <a
              href={`tel:+${footer.designerPhone}`}
              className="text-white/50 hover:text-accent-500 transition-colors inline-flex items-center gap-1"
              dir="ltr"
            >
              <Phone size={10} className="sm:w-3 sm:h-3" />
              {footer.designerPhoneDisplay}
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
}
