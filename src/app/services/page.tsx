"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";

/* =========================================================
   صفحة "الخدمات الرئيسية" (Main Services Page)
   تم تطبيق الهوية البصرية (TM4M) بالكامل باستخدام Tailwind CSS
   - ألوان الهوية: الكحلي (brand-900) والبرتقالي (accent-500)
   - أشكال هندسية حادة (Polygon) مستوحاة من الشعار
   - تأثيرات Hover احترافية
   ========================================================= */

// بيانات الخدمات لتنظيف كود الـ JSX
const mainServices = [
  {
    id: "creative",
    href: "/services/creative",
    icon: "/imgs/service imgs/creative_identity.webp",
    titleAr: "الخدمات الإبداعية",
    titleEn: "Creative Services",
    descAr: "هوية بصرية، تصميم جرافيكي، إدارة سوشيال ميديا، موشن جرافيك، تصوير وإنتاج فيديو.",
    descEn: "Branding, graphic design, social media, motion graphics, video production.",
  },
  {
    id: "tech",
    href: "/services/tech",
    icon: "/imgs/service imgs/app_development.webp",
    titleAr: "الخدمات التقنية",
    titleEn: "Tech Services",
    descAr: "تطوير مواقع وتطبيقات، متاجر إلكترونية، استضافة وأمن معلومات، دعم فني.",
    descEn: "Web & app development, e-commerce, hosting & security, technical support.",
  },
  {
    id: "integrated",
    href: "/services/integrated",
    icon: "/imgs/service imgs/marketing_strategies (1).webp",
    titleAr: "الحلول المتكاملة",
    titleEn: "Integrated Solutions",
    descAr: "خطط تسويقية، حملات رقمية وميدانية، استشارات استراتيجية، تحليل بيانات.",
    descEn: "Marketing strategies, campaigns, consulting, data analysis.",
  },
];

// بيانات منهجية العمل
const methodology = [
  { num: "01", titleAr: "تحليل وفهم", titleEn: "Analysis", descAr: "ندرس احتياجاتك والسوق بدقة وعناية.", descEn: "We study your needs and market carefully." },
  { num: "02", titleAr: "استراتيجية مخصصة", titleEn: "Custom Strategy", descAr: "نضع خطة محكمة تناسب أهدافك وتطلعاتك.", descEn: "We create a tailored plan for your goals." },
  { num: "03", titleAr: "تنفيذ إبداعي", titleEn: "Creative Execution", descAr: "إنتاج احترافي بأحدث الأدوات والتقنيات.", descEn: "High-quality production using modern tools." },
  { num: "04", titleAr: "تحسين وقياس", titleEn: "Optimization", descAr: "متابعة مستمرة وقياس للأداء لضمان النجاح.", descEn: "Continuous tracking and performance measurement." },
];

export default function ServicesPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div className="bg-white min-h-screen">
      {/* --- 1. الترويسة (Hero Banner) --- */}
      <PageHero
        badge={isAr ? "مرحباً بك في عالم الإبداع" : "Welcome to the Creative World"}
        title={isAr ? "خدماتنا" : "Our Services"}
        description={
          isAr
            ? "حلول متكاملة وإبداعية لتطوير حضورك الرقمي والميداني وتحقيق أهدافك بفاعلية، مبنية على خبرات عميقة وشغف لا ينضب."
            : "Integrated and creative solutions to develop your digital and field presence, built on deep expertise and passion."
        }
        breadcrumbs={[
          { label: isAr ? "الرئيسية" : "Home", href: "/" },
          { label: isAr ? "خدماتنا" : "Services" },
        ]}
        dividerFill="#ffffff"
      />

      {/* --- 2. مجالات الخبرة (Main Services Grid) --- */}
      <section className="section-y-md relative z-20">
        <div className="container-site">
          <div className="section-header">
            <span className="section-eyebrow">
              {isAr ? "ماذا نقدم" : "What We Offer"}
            </span>
            <h2 className="text-h1 text-brand-900">
              {isAr ? "مجالات خبرتنا" : "Our Expertise"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-8">
            {mainServices.map((service) => (
              <Link
                href={service.href}
                key={service.id}
                className="group block card-base p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden text-center"
              >
                {/* شكل مثلث هندسي في الزاوية */}
                <div 
                  className="absolute top-0 rtl:left-0 ltr:right-0 w-16 h-16 bg-surface-100 group-hover:bg-accent-500 transition-colors duration-500 z-0"
                  style={{ clipPath: isAr ? 'polygon(100% 0, 0 0, 0 100%)' : 'polygon(100% 0, 0 0, 100% 100%)' }}
                ></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto bg-surface-100 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 p-3 border-b-4 border-transparent group-hover:border-brand-900">
                    <Image
                      src={service.icon}
                      alt={isAr ? service.titleAr : service.titleEn}
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  
                  <h3 className="text-h4 text-brand-900 mb-3 group-hover:text-accent-600 transition-colors duration-300">
                    {isAr ? service.titleAr : service.titleEn}
                  </h3>
                  
                  <p className="text-body text-surface-600 leading-loose mb-6">
                    {isAr ? service.descAr : service.descEn}
                  </p>
                  
                  <span className="inline-flex items-center gap-2 text-brand-900 font-bold text-sm group-hover:text-accent-500 transition-colors duration-300">
                    {isAr ? "تفاصيل الخدمة" : "Service Details"}
                    <svg className={`w-4 h-4 ${isAr ? 'rtl:rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- الفاصل الشكلي (Shape Divider) --- */}
      <div className="w-full overflow-hidden leading-[0] bg-surface-100">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[90px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform: "rotate(180deg)" }}
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>

      {/* --- 3. منهجية العمل (Methodology) --- */}
      <section className="section-y-md bg-surface-100 overflow-hidden">
        <div className="container-site">
          <div className="section-header">
            <h2 className="text-h1 text-brand-900">
              {isAr ? "منهجية العمل" : "Our Process"}
            </h2>
            <div className="w-16 h-1 bg-accent-500 mx-auto mt-5 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 relative">
            {/* خط واصل بين الخطوات (يظهر في الشاشات الكبيرة فقط) */}
            <div className="hidden lg:block absolute top-12 rtl:right-[12%] rtl:left-[12%] ltr:left-[12%] ltr:right-[12%] h-0.5 bg-gray-200 z-0 overflow-hidden rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-accent-500/30 via-accent-500 to-accent-500/30 w-full"
                style={{
                  animation: "pulseWidth 3s ease-in-out infinite",
                  transformOrigin: isAr ? "right" : "left"
                }}
              ></div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
              @keyframes pulseWidth {
                0% { transform: scaleX(0); opacity: 0.2; }
                50% { transform: scaleX(1); opacity: 1; }
                100% { transform: scaleX(0); opacity: 0.2; }
              }
            `}} />

            {methodology.map((step, index) => (
              <div key={index} className="relative z-10 text-center group">
                {/* الرقم الهندسي (مربع مائل) */}
                <div className="w-24 h-24 mx-auto bg-white border-2 border-brand-900 text-brand-900 flex items-center justify-center mb-6 transform rotate-45 group-hover:bg-accent-500 group-hover:border-accent-500 group-hover:text-white group-hover:rotate-0 transition-all duration-500 shadow-lg relative">
                  {/* تأثير النبض الخارجي */}
                  <div className="absolute inset-0 border-2 border-accent-500 opacity-0 group-hover:opacity-100 group-hover:animate-ping rounded-sm"></div>
                  
                  <span className="text-3xl font-black transform -rotate-45 group-hover:rotate-0 transition-transform duration-500 block relative z-10">
                    {step.num}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold text-brand-900 mb-3">
                  {isAr ? step.titleAr : step.titleEn}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed max-w-[250px] mx-auto">
                  {isAr ? step.descAr : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* فاصل سفلي للمنهجية */}
      <div className="w-full overflow-hidden leading-[0] bg-white">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[40px] md:h-[70px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="var(--color-surface-100)"
          ></path>
        </svg>
      </div>

      {/* --- أرقامنا تتحدث (Statistics) --- */}
      <section className="section-y-md bg-white relative">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { num: "10+", labelAr: "سنوات خبرة", labelEn: "Years Experience" },
              { num: "150+", labelAr: "مشروع منجز", labelEn: "Completed Projects" },
              { num: "50+", labelAr: "شريك نجاح", labelEn: "Success Partners" },
              { num: "24/7", labelAr: "دعم مستمر", labelEn: "Continuous Support" },
            ].map((stat, i) => (
              <div key={i} className="text-center group p-4 rounded-2xl hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 border border-transparent hover:border-gray-100">
                <div className="text-3xl md:text-5xl font-black text-brand-900 mb-2 group-hover:scale-110 transition-transform duration-500">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-900 to-accent-500 group-hover:from-accent-500 group-hover:to-accent-400">
                    {stat.num}
                  </span>
                </div>
                <div className="text-gray-500 font-bold text-xs md:text-sm tracking-wide">
                  {isAr ? stat.labelAr : stat.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. الدعوة لاتخاذ إجراء (CTA) --- */}
      <section className="section-y-md relative">
        <div className="container-site">
          <div className="bg-brand-900 rounded-3xl py-12 md:py-16 px-8 md:px-12 text-center border-b-4 border-accent-500 shadow-xl relative overflow-hidden flex flex-col items-center justify-center">
            {/* زخرفة خلفية للـ CTA */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500 opacity-10 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

            <h2 className="text-h2 text-white mb-4 relative z-10 max-w-2xl mx-auto">
              {isAr ? "هل أنت مستعد لتعزيز حضورك الرقمي؟" : "Ready to grow your digital presence?"}
            </h2>
            <p className="text-gray-300 text-sm md:text-base mb-8 relative z-10 max-w-xl mx-auto font-medium leading-relaxed">
              {isAr ? "تواصل مع فريقنا اليوم ودعنا نبدأ قصة نجاحك الجديدة في عالم الأعمال." : "Contact our team today and let's start your new success story in the business world."}
            </p>
            
            <div className="relative z-10 flex justify-center w-full">
              <Link 
                href="/contact" 
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent-500 to-accent-400 text-white hover:from-white hover:to-white hover:text-brand-900 transition-all duration-300 font-extrabold py-4 px-10 rounded-xl text-lg shadow-[0_8px_30px_rgba(218,136,39,0.3)] hover:shadow-[0_8px_40px_rgba(255,255,255,0.4)] hover:-translate-y-1"
              >
                {isAr ? "طلب عرض سعر" : "Request a Quote"}
                {isAr ? (
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}