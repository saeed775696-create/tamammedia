"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function ContactPage() {
  const { lang } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    // حقل honeypot مخفي — البوتات تملؤه تلقائيًا
    website: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // حماية بسيطة من البوتات (honeypot)
    if (form.website) {
      setError("تم رفض الإرسال");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
          language: lang,
        }),
      });

      // التحقق من نجاح الإرسال فعلًا (كان هذا الخطأ قبل الإصلاح)
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          errData?.error?.message ||
            (lang === "ar" ? "فشل الإرسال، حاول مجددًا" : "Failed to send, try again")
        );
      }

      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>{lang === "ar" ? "اتصل بنا" : "Contact Us"}</h1>
            <p>
              {lang === "ar"
                ? "نحن هنا للإجابة على استفساراتك"
                : "We are here to answer your inquiries"}
            </p>
            <div className="breadcrumb">
              <Link href="/">{lang === "ar" ? "الرئيسية" : "Home"}</Link> /{" "}
              <span>{lang === "ar" ? "اتصل بنا" : "Contact"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* معلومات الاتصال */}
            <div>
              {/* بريد */}
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <h4>{lang === "ar" ? "البريد الإلكتروني" : "Email"}</h4>
                  <a href="mailto:tamammedia9@gmail.com">tamammedia9@gmail.com</a>
                </div>
              </div>

              {/* هاتف */}
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h4>{lang === "ar" ? "الهاتف" : "Phone"}</h4>
                  <a href="tel:+967733579558">+967 733 579 558</a>
                </div>
              </div>

              {/* موقع */}
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4>{lang === "ar" ? "الموقع" : "Location"}</h4>
                  <p>{lang === "ar" ? "تعز – اليمن" : "Taiz – Yemen"}</p>
                </div>
              </div>

              {/* روابط التواصل الاجتماعي */}
              <div className="social-links">
                <a href="https://wa.me/967733579558" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a href="https://www.facebook.com/tamammedia1/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/tamammedia9" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>

              {/* خريطة */}
              <div className="map-container" style={{ marginTop: 20 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3868.4872934213544!2d44.0197!3d13.5765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1601b4c8c0c0c0c1%3A0x0!2z2KfZhNiv2YrZitip!5e0!3m2!1sar!2s!4v1690000000000"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: "var(--radius)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="موقع تمام ميديا"
                ></iframe>
              </div>
            </div>

            {/* نموذج الاتصال */}
            {sent ? (
              <div className="contact-form" style={{ textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
                <h3>{lang === "ar" ? "تم الإرسال بنجاح" : "Message Sent"}</h3>
                <p>{lang === "ar" ? "سنرد عليك في أقرب وقت" : "We will reply shortly"}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {/* honeypot مخفي — البوتات تملؤه */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="form-group">
                  <label>{lang === "ar" ? "الاسم" : "Name"}</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>{lang === "ar" ? "البريد الإلكتروني" : "Email"}</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>{lang === "ar" ? "الهاتف" : "Phone"}</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>{lang === "ar" ? "الخدمة المطلوبة" : "Service"}</label>
                  <select name="service" value={form.service} onChange={handleChange}>
                    <option value="">{lang === "ar" ? "اختر الخدمة" : "Select Service"}</option>
                    <option value="branding">{lang === "ar" ? "هوية بصرية" : "Branding"}</option>
                    <option value="video">{lang === "ar" ? "فيديو" : "Video"}</option>
                    <option value="social">{lang === "ar" ? "سوشيال ميديا" : "Social Media"}</option>
                    <option value="web">{lang === "ar" ? "مواقع" : "Web"}</option>
                    <option value="ecommerce">{lang === "ar" ? "متجر إلكتروني" : "E-Commerce"}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{lang === "ar" ? "الرسالة" : "Message"}</label>
                  <textarea name="message" rows={4} value={form.message} onChange={handleChange} required></textarea>
                </div>

                {error && (
                  <div style={{ color: "#dc2626", marginBottom: 12, fontSize: "0.9rem" }}>
                    ⚠️ {error}
                  </div>
                )}

                <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
                  {loading ? (lang === "ar" ? "جارٍ الإرسال..." : "Sending...") : lang === "ar" ? "إرسال" : "Send"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
