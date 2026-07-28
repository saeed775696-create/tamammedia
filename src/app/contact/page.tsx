"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import PageHero from "@/components/PageHero";
import DeferredMap from "@/components/DeferredMap";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const { lang } = useLanguage();
  const { branding, contact, social } = useSiteSettings();
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
      <PageHero
        badge={lang === "ar" ? "نحن هنا لمساعدتك" : "We're Here to Help"}
        title={lang === "ar" ? "اتصل بنا" : "Contact Us"}
        description={
          lang === "ar"
            ? "نحن هنا للإجابة على استفساراتك ومناقشة مشروعك القادم."
            : "We're here to answer your questions and discuss your next project."
        }
        breadcrumbs={[
          { label: lang === "ar" ? "الرئيسية" : "Home", href: "/" },
          { label: lang === "ar" ? "اتصل بنا" : "Contact" },
        ]}
        dividerFill="#ffffff"
      />

      {/* Contact Content */}
      <section className="section-y-md bg-white relative">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
            {/* معلومات الاتصال */}
            <div>
              {/* بريد */}
              <div className="flex items-start gap-4 p-5 md:p-6 bg-surface-50 rounded-2xl mb-5 transition-colors hover:bg-accent-500/5 border border-surface-100">
                <div className="w-12 h-12 min-w-[48px] bg-gradient-to-br from-brand-900 to-brand-700 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-label-xl text-brand-900 mb-1">{lang === "ar" ? "البريد الإلكتروني" : "Email"}</h4>
                  <a href={`mailto:${contact.email}`} className="text-body text-surface-600 hover:text-accent-600 transition-colors">{contact.email}</a>
                </div>
              </div>

              {/* هاتف */}
              <div className="flex items-start gap-4 p-5 md:p-6 bg-surface-50 rounded-2xl mb-5 transition-colors hover:bg-accent-500/5 border border-surface-100">
                <div className="w-12 h-12 min-w-[48px] bg-gradient-to-br from-brand-900 to-brand-700 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-label-xl text-brand-900 mb-1">{lang === "ar" ? "الهاتف" : "Phone"}</h4>
                  <a href={`tel:+${contact.phone}`} className="text-body text-surface-600 hover:text-accent-600 transition-colors" dir="ltr">{contact.phoneDisplay}</a>
                </div>
              </div>

              {/* موقع */}
              <div className="flex items-start gap-4 p-5 md:p-6 bg-surface-50 rounded-2xl mb-5 transition-colors hover:bg-accent-500/5 border border-surface-100">
                <div className="w-12 h-12 min-w-[48px] bg-gradient-to-br from-brand-900 to-brand-700 rounded-xl flex items-center justify-center text-white shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-label-xl text-brand-900 mb-1">{lang === "ar" ? "الموقع" : "Location"}</h4>
                  <p className="text-body text-surface-600">{lang === "ar" ? contact.locationAr : contact.locationEn}</p>
                </div>
              </div>

              {/* روابط التواصل الاجتماعي */}
              <div className="flex items-center gap-3 mt-8">
                <a href={social.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-accent-500 hover:text-white transition-all" aria-label="WhatsApp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-accent-500 hover:text-white transition-all" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-accent-500 hover:text-white transition-all" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266-.058-1.644-.07-4.85-.07-3.204 0-3.584.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>

              {/* خريطة */}
              <div className="mt-8 aspect-[16/10] w-full rounded-2xl overflow-hidden border border-surface-100 shadow-sm">
                <DeferredMap
                  embedUrl={contact.mapEmbedUrl}
                  title={branding.nameAr}
                  location={lang === "ar" ? contact.locationAr : contact.locationEn}
                  language={lang}
                />
              </div>
            </div>

            {/* نموذج الاتصال */}
            {sent ? (
              <div className="card-base p-8 md:p-10 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-h3 text-brand-900 mb-2">{lang === "ar" ? "تم الإرسال بنجاح" : "Message Sent"}</h3>
                <p className="text-body text-surface-600">{lang === "ar" ? "سنرد عليك في أقرب وقت" : "We will reply shortly"}</p>
              </div>
            ) : (
              <form className="card-base p-8 md:p-10" onSubmit={handleSubmit} aria-busy={loading}>
                {/* honeypot مخفي — البوتات تملؤه */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-brand-900 mb-2">{lang === "ar" ? "الاسم" : "Name"}</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} aria-label={lang === "ar" ? "الاسم" : "Name"} autoComplete="name" maxLength={120} required className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl text-sm font-medium bg-slate-50 focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-accent-500/10 transition-all" />
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-brand-900 mb-2">{lang === "ar" ? "البريد الإلكتروني" : "Email"}</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} aria-label={lang === "ar" ? "البريد الإلكتروني" : "Email"} autoComplete="email" maxLength={254} required className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl text-sm font-medium bg-slate-50 focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-accent-500/10 transition-all" />
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-brand-900 mb-2">{lang === "ar" ? "الهاتف" : "Phone"}</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} aria-label={lang === "ar" ? "رقم الهاتف" : "Phone"} autoComplete="tel" maxLength={40} className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl text-sm font-medium bg-slate-50 focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-accent-500/10 transition-all" />
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-brand-900 mb-2">{lang === "ar" ? "الخدمة المطلوبة" : "Service"}</label>
                  <select name="service" value={form.service} onChange={handleChange} aria-label={lang === "ar" ? "الخدمة المطلوبة" : "Service"} className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl text-sm font-medium bg-slate-50 focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-accent-500/10 transition-all">
                    <option value="">{lang === "ar" ? "اختر الخدمة" : "Select Service"}</option>
                    <option value="branding">{lang === "ar" ? "هوية بصرية" : "Branding"}</option>
                    <option value="video">{lang === "ar" ? "فيديو" : "Video"}</option>
                    <option value="social">{lang === "ar" ? "سوشيال ميديا" : "Social Media"}</option>
                    <option value="web">{lang === "ar" ? "مواقع" : "Web"}</option>
                    <option value="ecommerce">{lang === "ar" ? "متجر إلكتروني" : "E-Commerce"}</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-brand-900 mb-2">{lang === "ar" ? "الرسالة" : "Message"}</label>
                  <textarea name="message" rows={4} value={form.message} onChange={handleChange} aria-label={lang === "ar" ? "الرسالة" : "Message"} maxLength={5000} required className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl text-sm font-medium bg-slate-50 focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-accent-500/10 transition-all resize-none"></textarea>
                </div>

                {error && (
                  <div className="text-red-600 mb-4 text-sm font-medium" role="alert">
                    ⚠️ {error}
                  </div>
                )}

                <button type="submit" className="btn-md btn-primary w-full" disabled={loading}>
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
