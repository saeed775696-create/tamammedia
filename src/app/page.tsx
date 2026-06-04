"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Palette, 
  Code, 
  TrendingUp, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Users,
  CheckCircle
} from "lucide-react";

export default function HomePage() {
  const { lang, t } = useLanguage();

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <Sparkles size={16} />
                {lang === "ar" ? "وكالة تسويق رقمي متكاملة" : "Integrated Digital Marketing Agency"}
              </div>

              <h1 className="hero-title">
                {lang === "ar" ? "نحو حضور أقوى" : "Towards a Stronger Presence"}{" "}
                <span className="highlight">
                  {lang === "ar" ? "بصناعة رقمية" : "Digital Excellence"}
                </span>
              </h1>

              <p className="hero-subtitle">
                {lang === "ar"
                  ? "نبني حضوراً رقمياً وميدانياً متكاملاً ينقل علامتك التجارية إلى آفاق جديدة."
                  : "We build integrated digital and on-ground presence that takes your brand to new heights."}
              </p>

              <div className="hero-btns">
                <Link href="/contact" className="btn btn-primary">
                  {lang === "ar" ? "ابدأ مشروعك" : "Start Project"}
                  <ArrowLeft size={18} style={{ transform: lang === 'ar' ? 'rotate(0deg)' : 'rotate(180deg)' }} />
                </Link>

                <Link href="/services" className="btn btn-outline">
                  {lang === "ar" ? "استكشف الخدمات" : "Explore Services"}
                  <ArrowRight size={18} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </Link>
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="number">+50</div>
                  <div className="label">{lang === "ar" ? "عميل" : "Clients"}</div>
                </div>
                <div className="hero-stat">
                  <div className="number">+120</div>
                  <div className="label">{lang === "ar" ? "مشروع" : "Projects"}</div>
                </div>
                <div className="hero-stat">
                  <div className="number">100%</div>
                  <div className="label">{lang === "ar" ? "رضا العملاء" : "Satisfaction"}</div>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card">
                <img
                  src="/imgs/2-3.png"
                  alt="Tamam Media"
                  style={{ display: "block", margin: "0 auto 20px", maxWidth: "160px" }}
                />
                <p style={{ fontWeight: 600, fontSize: "16px" }}>
                  {lang === "ar"
                    ? "تمام للحلول التسويقية الرقمية المتكاملة"
                    : "Integrated Digital Marketing Solutions"}
                </p>
                <div style={{ width: "60px", height: "3px", background: "var(--secondary)", margin: "16px auto" }} />
                <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
                  <div>
                    <span className="number">تعز</span>
                    <div className="label">{lang === "ar" ? "اليمن" : "Yemen"}</div>
                  </div>
                  <div>
                    <span className="number">{lang === "ar" ? "إبداع" : "Creative"}</span>
                    <div className="label">{lang === "ar" ? "بلا حدود" : "Without Limits"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES SECTION ========== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Sparkles size={16} />
              {lang === "ar" ? "خدماتنا" : "Our Services"}
            </div>
            <h2 className="section-title">
              {lang === "ar" ? "حلول متكاملة تحت سقف واحد" : "All-in-One Solutions"}
            </h2>
            <p className="section-desc">
              {lang === "ar"
                ? "نقدم لك كل ما تحتاجه لبناء حضور رقمي قوي ومؤثر"
                : "Everything you need to build a strong digital presence"}
            </p>
          </div>

          <div className="services-preview">
            <div className="service-card">
              <div className="service-icon">
                <Palette size={32} />
              </div>
              <h3>{lang === "ar" ? "الخدمات الإبداعية" : "Creative Services"}</h3>
              <p>
                {lang === "ar"
                  ? "هوية بصرية، تصميم جرافيكي، إدارة سوشيال ميديا، تصوير وإنتاج فيديو."
                  : "Branding, design, social media, and video production."}
              </p>
              <Link href="/services">
                {lang === "ar" ? "تفاصيل الخدمة" : "Service Details"}
                <ArrowLeft size={16} style={{ transform: lang === 'ar' ? 'rotate(0deg)' : 'rotate(180deg)' }} />
              </Link>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Code size={32} />
              </div>
              <h3>{lang === "ar" ? "الخدمات التقنية" : "Tech Services"}</h3>
              <p>
                {lang === "ar"
                  ? "تطوير مواقع وتطبيقات، متاجر إلكترونية، استضافة وأمن معلومات."
                  : "Web & app development, e-commerce, hosting & security."}
              </p>
              <Link href="/services">
                {lang === "ar" ? "تفاصيل الخدمة" : "Service Details"}
                <ArrowLeft size={16} style={{ transform: lang === 'ar' ? 'rotate(0deg)' : 'rotate(180deg)' }} />
              </Link>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <TrendingUp size={32} />
              </div>
              <h3>{lang === "ar" ? "الحلول المتكاملة" : "Integrated Solutions"}</h3>
              <p>
                {lang === "ar"
                  ? "خطط تسويقية، حملات رقمية وميدانية، استشارات استراتيجية."
                  : "Marketing strategies, campaigns, and consulting."}
              </p>
              <Link href="/services">
                {lang === "ar" ? "تفاصيل الخدمة" : "Service Details"}
                <ArrowLeft size={16} style={{ transform: lang === 'ar' ? 'rotate(0deg)' : 'rotate(180deg)' }} />
              </Link>
            </div>
          </div>

          <div className="cta-buttons">
            <Link href="/services" className="btn btn-primary">
              {lang === "ar" ? "جميع الخدمات" : "All Services"}
              <ArrowLeft size={18} style={{ transform: lang === 'ar' ? 'rotate(0deg)' : 'rotate(180deg)' }} />
            </Link>
            <Link href="/portfolio" className="btn btn-outline-dark">
              {lang === "ar" ? "أعمالنا" : "Portfolio"}
              <ArrowRight size={18} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== ABOUT SECTION ========== */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Users size={16} />
              {lang === "ar" ? "من نحن" : "About Us"}
            </div>
            <h2 className="section-title">
              {lang === "ar" ? "تعرف على تمام ميديا" : "About Tamam Media"}
            </h2>
            <p className="section-desc">
              {lang === "ar" ? "شريكك الرقمي الأول في اليمن" : "Your digital partner in Yemen"}
            </p>
          </div>

          <div className="about-home-grid">
            <div className="about-home-content">
              <p>
                {lang === "ar"
                  ? "تمام ميديا هي شركة يمنية متخصصة في تقديم الحلول الرقمية والتسويقية المتكاملة. نعمل على تمكين العلامات التجارية من المنافسة بقوة في السوق."
                  : "Tamam Media is a Yemeni company specialized in providing integrated digital and marketing solutions. We empower brands to compete strongly."}
              </p>
              <p>
                {lang === "ar"
                  ? "نؤمن بأن العلامة التجارية تحتاج إلى حضور قوي واستراتيجية ذكية مبنية على الإبداع والبيانات."
                  : "We believe every brand needs a strong presence and a smart strategy built on creativity and data."}
              </p>
              <Link href="/about" className="btn btn-primary" style={{ marginTop: "20px" }}>
                {lang === "ar" ? "اقرأ قصتنا" : "Read Our Story"}
                <ArrowLeft size={18} style={{ transform: lang === 'ar' ? 'rotate(0deg)' : 'rotate(180deg)' }} />
              </Link>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=350&fit=crop"
                alt="Tamam Media Team"
                className="about-home-image"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}