"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
    <nav
      className={`navbar${scrolled ? " scrolled" : ""}`}
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.96)"
          : "rgba(255,255,255,0.75)",
        backdropFilter: "blur(20px)",
        padding: "12px 0",              // زيادة الارتفاع
      }}
    >
      <div className="nav-inner" style={{ maxWidth: "1280px" }}>
        {/* الشعار - بدون تغيير */}
        <Link href="/" className="nav-logo" onClick={closeMobile}>
          <img src="/imgs/2-3.png" style={{ width: 45 }} alt="Tamam" />
          <h1>{lang === "ar" ? "تمام ميديا" : "Tamam Media"}</h1>
        </Link>

        {/* روابط سطح المكتب */}
        <div className="nav-links desktop" style={{ gap: 8 }}>
          <Link href="/" className={isActive("/") ? "active" : ""} style={{ fontSize: 15, padding: "10px 16px" }}>
            {lang === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <Link href="/about" className={isActive("/about") ? "active" : ""} style={{ fontSize: 15, padding: "10px 16px" }}>
            {lang === "ar" ? "من نحن" : "About"}
          </Link>

          {/* قائمة منسدلة للخدمات */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className={isActive("/services") ? "active" : ""}
              style={{ fontSize: 15, padding: "10px 16px", display: "inline-flex", alignItems: "center", gap: 4 }}
            >
              {lang === "ar" ? "خدماتنا" : "Services"}
              <ChevronDown size={14} />
            </Link>
            {servicesOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  background: "#fff",
                  borderRadius: 14,
                  boxShadow: "0 10px 40px rgba(33,33,79,0.15)",
                  padding: "8px 0",
                  minWidth: 200,
                  zIndex: 1001,
                  border: "1px solid #eef0f5",
                }}
              >
                <Link href="/services/creative" onClick={() => setServicesOpen(false)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", color: "var(--primary)", fontWeight: 600, transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f9fc")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  {lang === "ar" ? "الإبداعية" : "Creative"}
                </Link>
                <Link href="/services/tech" onClick={() => setServicesOpen(false)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", color: "var(--primary)", fontWeight: 600, transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f9fc")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  {lang === "ar" ? "التقنية" : "Tech"}
                </Link>
                <Link href="/services/integrated" onClick={() => setServicesOpen(false)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", color: "var(--primary)", fontWeight: 600, transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f9fc")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  {lang === "ar" ? "المتكاملة" : "Integrated"}
                </Link>
              </div>
            )}
          </div>

          <Link href="/portfolio" className={isActive("/portfolio") ? "active" : ""} style={{ fontSize: 15, padding: "10px 16px" }}>
            {lang === "ar" ? "أعمالنا" : "Portfolio"}
          </Link>
          <Link href="/contact" className={isActive("/contact") ? "active" : ""} style={{ fontSize: 15, padding: "10px 16px" }}>
            {lang === "ar" ? "اتصل بنا" : "Contact"}
          </Link>

          {/* زر اللغة */}
          <button className="lang-btn" onClick={toggleLang} style={{ fontSize: 13, padding: "8px 16px" }}>
            {lang === "ar" ? "EN" : "AR"}
          </button>

          {/* زر معرض أعمالنا (بدلاً من اطلب عرض سعر) */}
          <Link
            href="/portfolio"
            className="btn btn-primary"
            style={{
              padding: "12px 26px",
              fontSize: 14,
              marginInlineStart: 8,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {lang === "ar" ? "معرض أعمالنا" : "Our Portfolio"}
            <ArrowLeft size={16} style={{ transform: lang === "ar" ? "rotate(0deg)" : "rotate(180deg)" }} />
          </Link>
        </div>

        {/* زر الجوال */}
        <button className="menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* القائمة الجانبية للجوال */}
        {mobileOpen && (
          <>
            <div className="overlay" onClick={closeMobile} />
            <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
              <button className="mobile-close" onClick={closeMobile}>
                <X size={28} />
              </button>
              <Link href="/" onClick={closeMobile} style={{ padding: "14px 24px", fontSize: 18 }}>
                {lang === "ar" ? "الرئيسية" : "Home"}
              </Link>
              <Link href="/about" onClick={closeMobile} style={{ padding: "14px 24px", fontSize: 18 }}>
                {lang === "ar" ? "من نحن" : "About"}
              </Link>
              <Link href="/services" onClick={closeMobile} style={{ padding: "14px 24px", fontSize: 18, fontWeight: "bold" }}>
                {lang === "ar" ? "خدماتنا" : "Services"}
              </Link>
              <Link href="/services/creative" onClick={closeMobile} style={{ padding: "10px 40px", fontSize: 16 }}>
                {lang === "ar" ? "الإبداعية" : "Creative"}
              </Link>
              <Link href="/services/tech" onClick={closeMobile} style={{ padding: "10px 40px", fontSize: 16 }}>
                {lang === "ar" ? "التقنية" : "Tech"}
              </Link>
              <Link href="/services/integrated" onClick={closeMobile} style={{ padding: "10px 40px", fontSize: 16 }}>
                {lang === "ar" ? "المتكاملة" : "Integrated"}
              </Link>
              <Link href="/portfolio" onClick={closeMobile} style={{ padding: "14px 24px", fontSize: 18 }}>
                {lang === "ar" ? "أعمالنا" : "Portfolio"}
              </Link>
              <Link href="/contact" onClick={closeMobile} style={{ padding: "14px 24px", fontSize: 18 }}>
                {lang === "ar" ? "اتصل بنا" : "Contact"}
              </Link>
              <button
                className="lang-btn"
                style={{ marginTop: 20, width: "fit-content", alignSelf: "center", fontSize: 14, padding: "10px 20px" }}
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