"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { lang } = useLanguage();

  return (
    <>
      {/* BANNER */}
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">

            <h1>{lang === "ar" ? "اتصل بنا" : "Contact Us"}</h1>

            <p>
              {lang === "ar"
                ? "نحن دائماً هنا للإجابة على استفساراتك"
                : "We are always here to help you"}
            </p>

            <div className="breadcrumb">
              <Link href="/">
                {lang === "ar" ? "الرئيسية" : "Home"}
              </Link>{" "}
              /{" "}
              <span>
                {lang === "ar" ? "اتصل بنا" : "Contact"}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="section">
        <div className="container">

          <div className="section-header">
            <div className="section-badge">
              <i className="fas fa-headset"></i>{" "}
              {lang === "ar" ? "تواصل معنا" : "Get in Touch"}
            </div>

            <h2 className="section-title">
              {lang === "ar" ? "نحن هنا لمساعدتك" : "We Are Here to Help"}
            </h2>

            <p className="section-desc">
              {lang === "ar"
                ? "تواصل معنا وسنرد عليك في أسرع وقت ممكن"
                : "Contact us and we will respond as soon as possible"}
            </p>
          </div>

          <div className="contact-grid">

            {/* INFO */}
            <div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4>{lang === "ar" ? "الموقع" : "Location"}</h4>
                  <p>تعز – اليمن</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4>{lang === "ar" ? "البريد" : "Email"}</h4>
                  <p>
                    <a href="mailto:tamammedia9@gmail.com">
                      tamammedia9@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h4>{lang === "ar" ? "الهاتف" : "Phone"}</h4>
                  <p dir="ltr">
                    <a href="tel:+967733579558">
                      +967 733 579 558
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div>
                  <h4>WhatsApp</h4>
                  <a href="https://wa.me/96777552639" target="_blank">
                    {lang === "ar" ? "راسلنا مباشرة" : "Chat Now"}
                  </a>
                </div>
              </div>

              {/* SOCIAL */}
              <div className="social-links">
                <a href="https://www.facebook.com/share/1GkrJ1sxy8/" target="_blank">
                  <i className="fab fa-facebook-f"></i>
                </a>

                <a href="https://www.instagram.com/tamammedia9" target="_blank">
                  <i className="fab fa-instagram"></i>
                </a>

                <a href="https://wa.me/96777552639" target="_blank">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>

            </div>

            {/* FORM */}
            <div>
              <form className="contact-form">

                <div className="form-group">
                  <label>{lang === "ar" ? "الاسم الكامل" : "Full Name"}</label>
                  <input type="text" required />
                </div>

                <div className="form-group">
                  <label>{lang === "ar" ? "رقم الهاتف" : "Phone"}</label>
                  <input type="tel" required />
                </div>

                <div className="form-group">
                  <label>
                    {lang === "ar" ? "الخدمة المطلوبة" : "Service"}
                  </label>

                  <select>
                    <option>
                      {lang === "ar" ? "اختر خدمة" : "Select Service"}
                    </option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Development</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>{lang === "ar" ? "الرسالة" : "Message"}</label>
                  <textarea required />
                </div>

                <button type="submit" className="btn btn-primary">
                  {lang === "ar" ? "إرسال الرسالة" : "Send Message"}
                </button>

                <a
                  href="https://wa.me/96777552639"
                  target="_blank"
                  className="whatsapp-btn"
                >
                  WhatsApp
                </a>

              </form>
            </div>

          </div>

          {/* MAP */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61203.45!2d44.0!3d13.58"
              loading="lazy"
            />
          </div>

        </div>
      </section>
    </>
  );
}