"use client";
import Hero from "@/components/Hero";
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
  const { lang } = useLanguage();

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
     {/* ========== TEAM SECTION ========== */}
<section className="section">
  <div className="container">
    <div className="section-header">
      <div className="section-badge">
        <Users size={16} />
        {lang === "ar" ? "فريقنا" : "Our Team"}
      </div>
      <h2 className="section-title">
        {lang === "ar" ? "خبراء خلف كل مشروع" : "Experts Behind Every Project"}
      </h2>
      <p className="section-desc">
        {lang === "ar"
          ? "نخبة من المبدعين والمطورين والمسوقين يعملون معاً لتحقيق رؤيتك"
          : "A team of creatives, developers, and marketers working together to realize your vision"}
      </p>
    </div>

    <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
      
      {/* وسيم */}
      <div className="service-category" style={{ textAlign: "center" }}>
        <div style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          overflow: "hidden",
          margin: "0 auto 16px",
          border: "3px solid var(--secondary)",
        }}>
          <img
            src="/imgs/teampics/waseem.jpeg"
            alt="وسيم"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",    // يضمن عدم اقتصاص الوجه من الأعلى
            }}
          />
        </div>
        <h3 className="service-cat-title" style={{ marginBottom: 6 }}>وسيم</h3>
        <p style={{ color: "var(--secondary)", fontWeight: 600, fontSize: 14, marginBottom: 10 }}>
          {lang === "ar" ? "المدير التنفيذي" : "CEO"}
        </p>
        <p style={{ color: "var(--gray)", fontSize: 13 }}>
          {lang === "ar" ? "خبرة في التسويق الرقمي" : "Digital marketing expert"}
        </p>
      </div>

      {/* سعيد */}
      <div className="service-category" style={{ textAlign: "center" }}>
        <div style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          overflow: "hidden",
          margin: "0 auto 16px",
          border: "3px solid var(--secondary)",
        }}>
          <img
            src="/imgs/teampics/saeed.png"
            alt="سعيد"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        </div>
        <h3 className="service-cat-title" style={{ marginBottom: 6 }}>سعيد</h3>
        <p style={{ color: "var(--secondary)", fontWeight: 600, fontSize: 14, marginBottom: 10 }}>
          {lang === "ar" ? "المطور الرئيسي" : "Lead Developer"}
        </p>
        <p style={{ color: "var(--gray)", fontSize: 13 }}>
          {lang === "ar" ? "خبير في تطوير المواقع والتطبيقات" : "Web & app development expert"}
        </p>
      </div>

      {/* عبدالرحمن */}
      <div className="service-category" style={{ textAlign: "center" }}>
        <div style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          overflow: "hidden",
          margin: "0 auto 16px",
          border: "3px solid var(--secondary)",
        }}>
          <img
            src="/imgs/teampics/abdulrahman.jpeg"
            alt="عبدالرحمن"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        </div>
        <h3 className="service-cat-title" style={{ marginBottom: 6 }}>عبدالرحمن</h3>
        <p style={{ color: "var(--secondary)", fontWeight: 600, fontSize: 14, marginBottom: 10 }}>
          {lang === "ar" ? "مصمم إبداعي" : "Creative Designer"}
        </p>
        <p style={{ color: "var(--gray)", fontSize: 13 }}>
          {lang === "ar" ? "متخصص في الهوية البصرية والجرافيك" : "Branding & graphic specialist"}
        </p>
      </div>
      
    </div>
  </div>
</section>

{/* ========== PARTNERS SECTION ========== */}
<section className="section section-light">
  <div className="container">
    <div className="section-header">
      <div className="section-badge">
        <Sparkles size={16} />
        {lang === "ar" ? "شركاؤنا" : "Our Partners"}
      </div>
      <h2 className="section-title">
        {lang === "ar" ? "نفخر بالعمل معهم" : "Proud to Work With"}
      </h2>
      <p className="section-desc">
        {lang === "ar"
          ? "شراكات استراتيجية مع أبرز الجهات المحلية والإقليمية"
          : "Strategic partnerships with leading local and regional entities"}
      </p>
    </div>

    {/* شعارات الشركاء */}
    <div
      className="services-grid"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "30px",
        alignItems: "center",
        justifyItems: "center",
        marginTop: 40,
      }}
    >
      {/* شريك حقيقي: شرفة */}
      <a
        href="https://www.shurfa.org"
        target="_blank"
        rel="noopener noreferrer"
        className="service-category"
        style={{
          padding: "20px",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          boxShadow: "var(--shadow)",
          cursor: "pointer",
          transition: "var(--transition)",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <img
          src="/assets/ourparteners/شرفه-0١2-0١.png"
          alt="شرفة"
          style={{
            width: "100%",
            maxWidth: 130,
            height: "auto",
            objectFit: "contain",
          }}
        />
      </a>

      {/* شريك حقيقي: وعي للتراث */}
      <a
        href="https://waeey.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="service-category"
        style={{
          padding: "20px",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          boxShadow: "var(--shadow)",
          cursor: "pointer",
          transition: "var(--transition)",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <img
          src="/assets/ourparteners/وعي للتراث.jpg"
          alt="وعي للتراث"
          style={{
            width: "100%",
            maxWidth: 130,
            height: "auto",
            objectFit: "contain",
          }}
        />
      </a>

      {/* Partner 3 (مؤقت) */}
      <div
        className="service-category"
        style={{
          padding: "20px",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          boxShadow: "var(--shadow)",
          cursor: "default",
          transition: "var(--transition)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <img
          src="/imgs/service imgs/graphic_design.png"
          alt="Partner 3"
          style={{ width: "100%", maxWidth: 120, height: "auto", objectFit: "contain", filter: "grayscale(0.5) opacity(0.7)" }}
        />
      </div>

      {/* Partner 4 (مؤقت) */}
      <div
        className="service-category"
        style={{
          padding: "20px",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          boxShadow: "var(--shadow)",
          cursor: "default",
          transition: "var(--transition)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <img
          src="/imgs/service imgs/app_development.png"
          alt="Partner 4"
          style={{ width: "100%", maxWidth: 120, height: "auto", objectFit: "contain", filter: "grayscale(0.5) opacity(0.7)" }}
        />
      </div>
    </div>
  </div>
</section>
    </>
  );
}