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
    fetch("/api/team")
      .then((r) => r.json())
      .then((data) => setTeam(Array.isArray(data) ? data : []))
      .catch(() => setTeam([]));

    fetch("/api/partners")
      .then((r) => r.json())
      .then((data) => setPartners(Array.isArray(data) ? data : []))
      .catch(() => setPartners([]));
  }, []);

  return (
    <>
      <Hero />

      {/* ========== SERVICES ========== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge"><Sparkles size={16} />{lang === "ar" ? "خدماتنا" : "Our Services"}</div>
            <h2 className="section-title">{lang === "ar" ? "حلول متكاملة تحت سقف واحد" : "All-in-One Solutions"}</h2>
            <p className="section-desc">{lang === "ar" ? "نقدم لك كل ما تحتاجه لبناء حضور رقمي قوي ومؤثر" : "Everything you need to build a strong digital presence"}</p>
          </div>

          <div className="services-preview">
            <div className="service-card">
              <img src="/imgs/service imgs/photography.png" alt="" style={{ width: 80, height: 80, objectFit: "cover", margin: "0 auto 20px", borderRadius: 14 }} />
              <h3>{lang === "ar" ? "الخدمات الإبداعية" : "Creative Services"}</h3>
              <p>{lang === "ar" ? "هوية بصرية، تصميم جرافيكي، إدارة سوشيال ميديا، تصوير وإنتاج فيديو." : "Branding, graphic design, social media, video production."}</p>
              <Link href="/services/creative" className="btn btn-outline-dark" style={{ color: 'var(--primary)' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--primary)'; }}>
                {lang === "ar" ? "تفاصيل الخدمة" : "Service Details"} <ArrowLeft size={18} style={{ transform: lang === 'ar' ? 'rotate(0deg)' : 'rotate(180deg)' }} />
              </Link>
            </div>
            <div className="service-card">
              <img src="/imgs/service imgs/web_design.png" alt="" style={{ width: 80, height: 80, objectFit: "cover", margin: "0 auto 20px", borderRadius: 14 }} />
              <h3>{lang === "ar" ? "الخدمات التقنية" : "Tech Services"}</h3>
              <p>{lang === "ar" ? "تطوير مواقع وتطبيقات، متاجر إلكترونية، استضافة وأمن معلومات." : "Web & app development, e-commerce, hosting & security."}</p>
              <Link href="/services/tech" className="btn btn-outline-dark" style={{ color: 'var(--primary)' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--primary)'; }}>
                {lang === "ar" ? "تفاصيل الخدمة" : "Service Details"} <ArrowLeft size={18} style={{ transform: lang === 'ar' ? 'rotate(0deg)' : 'rotate(180deg)' }} />
              </Link>
            </div>
            <div className="service-card">
              <img src="/imgs/service imgs/marketing_campaigns.png" alt="" style={{ width: 80, height: 80, objectFit: "cover", margin: "0 auto 20px", borderRadius: 14 }} />
              <h3>{lang === "ar" ? "الحلول المتكاملة" : "Integrated Solutions"}</h3>
              <p>{lang === "ar" ? "خطط تسويقية، حملات رقمية وميدانية، استشارات استراتيجية." : "Marketing strategies, campaigns, and consulting."}</p>
              <Link href="/services/integrated" className="btn btn-outline-dark" style={{ color: 'var(--primary)' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--primary)'; }}>
                {lang === "ar" ? "تفاصيل الخدمة" : "Service Details"} <ArrowLeft size={18} style={{ transform: lang === 'ar' ? 'rotate(0deg)' : 'rotate(180deg)' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section className="section section-light">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-wrapper">
              <div className="about-image">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" alt="Tamam Media" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
            <div>
              <div className="section-badge" style={{ marginBottom: 16 }}><Users size={16} />{lang === "ar" ? "من نحن" : "About Us"}</div>
              <h2 className="section-title" style={{ textAlign: "right", marginBottom: 16 }}>{lang === "ar" ? "تعرف على تمام ميديا" : "About Tamam Media"}</h2>
              <p style={{ fontSize: "1.05rem", lineHeight: 2, color: "var(--gray)", marginBottom: 20 }}>{lang === "ar" ? "تمام ميديا هي شركة يمنية متخصصة في تقديم الحلول الرقمية والتسويقية المتكاملة. نعمل على تمكين العلامات التجارية من المنافسة بقوة في السوق." : "Tamam Media is a Yemeni company specialized in providing integrated digital and marketing solutions. We empower brands to compete strongly."}</p>
              <Link href="/about" className="btn btn-primary">{lang === "ar" ? "اقرأ قصتنا" : "Read Our Story"} <ArrowLeft size={18} style={{ transform: lang === 'ar' ? 'rotate(0deg)' : 'rotate(180deg)' }} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TEAM ========== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge"><Users size={16} />{lang === "ar" ? "فريقنا" : "Our Team"}</div>
            <h2 className="section-title">{lang === "ar" ? "خبراء خلف كل مشروع" : "Experts Behind Every Project"}</h2>
          </div>
          {team.length === 0 ? (
            <p className="text-center text-gray-500 py-8">{lang === "ar" ? "لا يوجد أعضاء بعد." : "No team members yet."}</p>
          ) : (
            <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "24px" }}>
              {team.map((member) => (
                <div key={member.id} className="service-category" style={{ textAlign: "center", padding: "32px 20px" }}>
                  <div style={{ width: 96, height: 96, borderRadius: "50%", overflow: "hidden", margin: "0 auto 16px", border: "3px solid var(--secondary)" }}>
                    <img src={member.imageUrl || "/imgs/2-3.png"} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <h3 className="service-cat-title" style={{ fontSize: "1.1rem", marginBottom: 6 }}>{member.name}</h3>
                  <p style={{ color: "var(--secondary)", fontWeight: 600, fontSize: "0.9rem" }}>{member.role}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========== PARTNERS ========== */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <div className="section-badge"><Sparkles size={16} />{lang === "ar" ? "شركاؤنا" : "Our Partners"}</div>
            <h2 className="section-title">{lang === "ar" ? "نفخر بالعمل معهم" : "Proud to Work With"}</h2>
          </div>
          {partners.length === 0 ? (
            <p className="text-center text-gray-500 py-8">{lang === "ar" ? "لا يوجد شركاء بعد." : "No partners yet."}</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "40px", marginTop: 20 }}>
              {partners.map((partner) => (
                <a key={partner.id} href={partner.website || "#"} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", background: "#fff", borderRadius: "var(--radius)", boxShadow: "var(--shadow)", transition: "var(--transition)", cursor: "pointer", maxWidth: 160, flex: "1 1 140px" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <img src={partner.imageUrl} alt={partner.name} style={{ maxWidth: "100%", maxHeight: 80, objectFit: "contain" }} />
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}