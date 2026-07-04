"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown, Menu, X, ArrowLeft } from "lucide-react";

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
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner max-w-7xl w-full mx-auto px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="nav-logo" onClick={closeMobile}>
          <Image src="/imgs/2-3.png" width={45} height={45} className="w-[45px] h-auto" alt="Tamam Media" priority />
          <h1>{lang === "ar" ? "تمام ميديا" : "Tamam Media"}</h1>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links desktop hidden md:flex items-center gap-2">
          <Link href="/" className={`text-[15px] px-4 py-2.5 ${isActive("/") ? "active" : ""}`}>
            {lang === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <Link href="/about" className={`text-[15px] px-4 py-2.5 ${isActive("/about") ? "active" : ""}`}>
            {lang === "ar" ? "من نحن" : "About"}
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className={`text-[15px] px-4 py-2.5 inline-flex items-center gap-1 ${isActive("/services") ? "active" : ""}`}
            >
              {lang === "ar" ? "خدماتنا" : "Services"}
              <ChevronDown size={14} />
            </Link>
            {servicesOpen && (
              <div className="absolute top-full right-0 bg-white rounded-2xl shadow-[0_10px_40px_rgba(33,33,79,0.15)] py-2 min-w-[200px] z-[1001] border border-[#eef0f5]">
                <Link 
                  href="/services/creative" 
                  onClick={() => setServicesOpen(false)} 
                  className="flex items-center gap-2.5 px-5 py-2.5 text-[var(--primary)] font-semibold transition-colors hover:bg-[#f8f9fc]"
                >
                  {lang === "ar" ? "الإبداعية" : "Creative"}
                </Link>
                <Link 
                  href="/services/tech" 
                  onClick={() => setServicesOpen(false)} 
                  className="flex items-center gap-2.5 px-5 py-2.5 text-[var(--primary)] font-semibold transition-colors hover:bg-[#f8f9fc]"
                >
                  {lang === "ar" ? "التقنية" : "Tech"}
                </Link>
                <Link 
                  href="/services/integrated" 
                  onClick={() => setServicesOpen(false)} 
                  className="flex items-center gap-2.5 px-5 py-2.5 text-[var(--primary)] font-semibold transition-colors hover:bg-[#f8f9fc]"
                >
                  {lang === "ar" ? "المتكاملة" : "Integrated"}
                </Link>
              </div>
            )}
          </div>

          <Link href="/portfolio" className={`text-[15px] px-4 py-2.5 ${isActive("/portfolio") ? "active" : ""}`}>
            {lang === "ar" ? "أعمالنا" : "Portfolio"}
          </Link>
          <Link href="/contact" className={`text-[15px] px-4 py-2.5 ${isActive("/contact") ? "active" : ""}`}>
            {lang === "ar" ? "اتصل بنا" : "Contact"}
          </Link>

          {/* Lang Button */}
          <button className="lang-btn text-[13px] px-4 py-2" onClick={toggleLang}>
            {lang === "ar" ? "EN" : "AR"}
          </button>

          {/* Portfolio CTA */}
          <Link
            href="/portfolio"
            className="btn btn-primary px-6 py-3 text-sm ms-2 inline-flex items-center gap-1.5"
          >
            {lang === "ar" ? "معرض أعمالنا" : "Our Portfolio"}
            <ArrowLeft size={16} className={lang === "ar" ? "" : "rotate-180"} />
          </Link>
        </div>

        {/* Mobile Button */}
        <button className="menu-btn block md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Menu */}
        {mobileOpen && (
          <>
            <div className="overlay" onClick={closeMobile} />
            <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
              <button className="mobile-close" onClick={closeMobile}>
                <X size={28} />
              </button>
              <Link href="/" onClick={closeMobile} className="px-6 py-3.5 text-lg">
                {lang === "ar" ? "الرئيسية" : "Home"}
              </Link>
              <Link href="/about" onClick={closeMobile} className="px-6 py-3.5 text-lg">
                {lang === "ar" ? "من نحن" : "About"}
              </Link>
              <Link href="/services" onClick={closeMobile} className="px-6 py-3.5 text-lg font-bold">
                {lang === "ar" ? "خدماتنا" : "Services"}
              </Link>
              <Link href="/services/creative" onClick={closeMobile} className="px-10 py-2.5 text-base">
                {lang === "ar" ? "الإبداعية" : "Creative"}
              </Link>
              <Link href="/services/tech" onClick={closeMobile} className="px-10 py-2.5 text-base">
                {lang === "ar" ? "التقنية" : "Tech"}
              </Link>
              <Link href="/services/integrated" onClick={closeMobile} className="px-10 py-2.5 text-base">
                {lang === "ar" ? "المتكاملة" : "Integrated"}
              </Link>
              <Link href="/portfolio" onClick={closeMobile} className="px-6 py-3.5 text-lg">
                {lang === "ar" ? "أعمالنا" : "Portfolio"}
              </Link>
              <Link href="/contact" onClick={closeMobile} className="px-6 py-3.5 text-lg">
                {lang === "ar" ? "اتصل بنا" : "Contact"}
              </Link>
              <button
                className="lang-btn mt-5 w-fit self-center text-sm px-5 py-2.5"
                onClick={() => {
                  toggleLang();
                  closeMobile();
                }}
              >
                {lang === "ar" ? "English" : "العربية"}
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}