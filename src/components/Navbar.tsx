"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-inner">

        {/* Logo */}
        <Link href="/" className="nav-logo" onClick={closeMenu}>
          <img src="/imgs/tamam logo.png" style={{ width: 45 }} />
          <h1>{lang === "ar" ? "تمام ميديا" : "Tamam Media"}</h1>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links desktop">
          <Link className={isActive("/") ? "active" : ""} href="/">
            {lang === "ar" ? "الرئيسية" : "Home"}
          </Link>

          <Link className={isActive("/about") ? "active" : ""} href="/about">
            {lang === "ar" ? "من نحن" : "About"}
          </Link>

          <Link className={isActive("/services") ? "active" : ""} href="/services">
            {lang === "ar" ? "خدماتنا" : "Services"}
          </Link>

          <Link className={isActive("/portfolio") ? "active" : ""} href="/portfolio">
            {lang === "ar" ? "أعمالنا" : "Portfolio"}
          </Link>

          <Link className={isActive("/contact") ? "active" : ""} href="/contact">
            {lang === "ar" ? "اتصل بنا" : "Contact"}
          </Link>

          <button
            className="lang-btn"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
          >
            {lang === "ar" ? "EN" : "AR"}
          </button>
        </div>

        {/* Toggle Button */}
        <button className="menu-btn" onClick={toggleMenu}>
          {open ? "✕" : "☰"}
        </button>

        {/* Overlay */}
        {open && <div className="overlay" onClick={closeMenu}></div>}

        {/* Mobile Menu */}
        <div className={`mobile-menu ${open ? "open" : ""}`}>

          <Link className={isActive("/") ? "active" : ""} href="/" onClick={closeMenu}>
            {lang === "ar" ? "الرئيسية" : "Home"}
          </Link>

          <Link className={isActive("/about") ? "active" : ""} href="/about" onClick={closeMenu}>
            {lang === "ar" ? "من نحن" : "About"}
          </Link>

          <Link className={isActive("/services") ? "active" : ""} href="/services" onClick={closeMenu}>
            {lang === "ar" ? "خدماتنا" : "Services"}
          </Link>

          <Link className={isActive("/portfolio") ? "active" : ""} href="/portfolio" onClick={closeMenu}>
            {lang === "ar" ? "أعمالنا" : "Portfolio"}
          </Link>

          <Link className={isActive("/contact") ? "active" : ""} href="/contact" onClick={closeMenu}>
            {lang === "ar" ? "اتصل بنا" : "Contact"}
          </Link>

          <button
            className="lang-btn"
            onClick={() => {
              setLang(lang === "ar" ? "en" : "ar");
              closeMenu();
            }}
          >
            {lang === "ar" ? "EN" : "AR"}
          </button>
        </div>

      </div>
    </nav>
  );
}