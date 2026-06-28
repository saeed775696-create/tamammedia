"use client";

import Hero from "@/components/Hero";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft, Sparkles, Users } from "lucide-react";

export default function HomePage() {
  const { lang } = useLanguage();
  const [team, setTeam] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/team").then(r => r.json()).then(setTeam).catch(() => {});
    fetch("/api/partners").then(r => r.json()).then(setPartners).catch(() => {});
  }, []);

  return (
    <>
      <Hero />

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
      {/* الخدمات الإبداعية */}
      <div className="service-card">
        <img
          src="/imgs/service imgs/photography.png"
          alt={lang === "ar" ? "الخدمات الإبداعية" : "Creative Services"}
          style={{ width: 80, height: 80, objectFit: "cover", margin: "0 auto 20px", borderRadius: 14 }}
        />
        <h3>{lang === "ar" ? "الخدمات الإبداعية" : "Creative Services"}</h3>
        <p>
          {lang === "ar"
            ? "هوية بصرية، تصميم جرافيكي، إدارة سوشيال ميديا، تصوير وإنتاج فيديو."
            : "Branding, graphic design, social media, video production."}
        </p>
        <Link
          href="/services/creative"
          className="btn btn-outline-dark"
          style={{ color: 'var(--primary)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--primary)'; }}
        >
          {lang === "ar" ? "تفاصيل الخدمة" : "Service Details"}
          <ArrowLeft size={18} style={{ transform: lang === 'ar' ? 'rotate(0deg)' : 'rotate(180deg)' }} />
        </Link>
      </div>

      {/* الخدمات التقنية */}
      <div className="service-card">
        <img
          src="/imgs/service imgs/web_design.png"
          alt={lang === "ar" ? "الخدمات التقنية" : "Tech Services"}
          style={{ width: 80, height: 80, objectFit: "cover", margin: "0 auto 20px", borderRadius: 14 }}
        />
        <h3>{lang === "ar" ? "الخدمات التقنية" : "Tech Services"}</h3>
        <p>
          {lang === "ar"
            ? "تطوير مواقع وتطبيقات، متاجر إلكترونية، استضافة وأمن معلومات."
            : "Web & app development, e-commerce, hosting & security."}
        </p>
        <Link
          href="/services/tech"
          className="btn btn-outline-dark"
          style={{ color: 'var(--primary)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--primary)'; }}
        >
          {lang === "ar" ? "تفاصيل الخدمة" : "Service Details"}
          <ArrowLeft size={18} style={{ transform: lang === 'ar' ? 'rotate(0deg)' : 'rotate(180deg)' }} />
        </Link>
      </div>

      {/* الحلول المتكاملة */}
      <div className="service-card">
        <img
          src="/imgs/service imgs/marketing_campaigns.png"
          alt={lang === "ar" ? "الحلول المتكاملة" : "Integrated Solutions"}
          style={{ width: 80, height: 80, objectFit: "cover", margin: "0 auto 20px", borderRadius: 14 }}
        />
        <h3>{lang === "ar" ? "الحلول المتكاملة" : "Integrated Solutions"}</h3>
        <p>
          {lang === "ar"
            ? "خطط تسويقية، حملات رقمية وميدانية، استشارات استراتيجية."
            : "Marketing strategies, campaigns, and consulting."}
        </p>
        <Link
          href="/services/integrated"
          className="btn btn-outline-dark"
          style={{ color: 'var(--primary)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--primary)'; }}
        >
          {lang === "ar" ? "تفاصيل الخدمة" : "Service Details"}
          <ArrowLeft size={18} style={{ transform: lang === 'ar' ? 'rotate(0deg)' : 'rotate(180deg)' }} />
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

      {/* ========== ABOUT ========== */}
      {/* ... قسم من نحن كما هو ... */}

      {/* ========== TEAM (ديناميكي) ========== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge"><Users size={16} />{lang === "ar" ? "فريقنا" : "Our Team"}</div>
            <h2 className="section-title">{lang === "ar" ? "خبراء خلف كل مشروع" : "Experts Behind Every Project"}</h2>
          </div>
          {team.length === 0 ? (
            <p className="text-center text-gray-500">لا يوجد أعضاء بعد</p>
          ) : (
            <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
              {team.map((member) => (
                <div key={member.id} className="service-category" style={{ textAlign: "center" }}>
                  <div style={{ width: 100, height: 100, borderRadius: "50%", overflow: "hidden", margin: "0 auto 16px", border: "3px solid var(--secondary)" }}>
                    <img
                      src={member.imageUrl || "/imgs/2-3.png"}
                      alt={member.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                    />
                  </div>
                  <h3>{member.name}</h3>
                  <p style={{ color: "var(--secondary)", fontWeight: 600 }}>{member.role}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========== PARTNERS (ديناميكي) ========== */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <div className="section-badge"><Sparkles size={16} />{lang === "ar" ? "شركاؤنا" : "Our Partners"}</div>
            <h2 className="section-title">{lang === "ar" ? "نفخر بالعمل معهم" : "Proud to Work With"}</h2>
          </div>
          {partners.length === 0 ? (
            <p className="text-center text-gray-500">لا يوجد شركاء بعد</p>
          ) : (
            <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", alignItems: "center", justifyItems: "center" }}>
              {partners.map((partner) => (
                <a
                  key={partner.id}
                  href={partner.website || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-category"
                  style={{ padding: 20, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", border: "none", boxShadow: "var(--shadow)", cursor: "pointer" }}
                >
                  <img src={partner.imageUrl} alt={partner.name} style={{ maxWidth: 130, height: "auto", objectFit: "contain" }} />
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}