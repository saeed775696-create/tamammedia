"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

/* =========================================================
   صفحة "الخدمات الرئيسية" (Main Services Page)
   تم تطبيق الهوية البصرية (TM4M) بالكامل باستخدام Tailwind CSS
   - ألوان الهوية: الكحلي (#21214f) والبرتقالي (#da8827)
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
      <section className="relative bg-[#21214f] pt-40 pb-28 overflow-hidden border-b-4 border-[#da8827]">
        {/* زخرفة هندسية */}
        <div 
          className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-gradient-to-l from-[#da8827]/15 to-transparent pointer-events-none"
          style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        ></div>
        
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            {isAr ? "خدماتنا" : "Our Services"}
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            {isAr
              ? "حلول متكاملة وإبداعية لتطوير حضورك الرقمي والميداني وتحقيق أهدافك بفاعلية."
              : "Integrated and creative solutions to develop your digital and field presence."}
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm font-semibold">
            <Link href="/" className="text-gray-400 hover:text-[#da8827] transition-colors duration-300">
              {isAr ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-[#da8827]">{isAr ? "خدماتنا" : "Services"}</span>
          </div>
        </div>
      </section>

      {/* --- 2. مجالات الخبرة (Main Services Grid) --- */}
      <section className="py-24 relative z-20 -mt-10">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-4 bg-white border border-[#da8827] text-[#da8827] rounded-full text-sm font-bold mb-4 shadow-sm">
              {isAr ? "ماذا نقدم" : "What We Offer"}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#21214f]">
              {isAr ? "مجالات خبرتنا" : "Our Expertise"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainServices.map((service) => (
              <Link
                href={service.href}
                key={service.id}
                className="group block bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-10 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-[#da8827] relative overflow-hidden text-center"
              >
                {/* شكل مثلث هندسي في الزاوية */}
                <div 
                  className="absolute top-0 rtl:left-0 ltr:right-0 w-20 h-20 bg-[#f4f4f8] group-hover:bg-[#da8827] transition-colors duration-500 z-0"
                  style={{ clipPath: isAr ? 'polygon(100% 0, 0 0, 0 100%)' : 'polygon(100% 0, 0 0, 100% 100%)' }}
                ></div>

                <div className="relative z-10">
                  <div className="w-24 h-24 mx-auto bg-[#f4f4f8] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 p-4 border-b-4 border-transparent group-hover:border-[#21214f]">
                    <Image
                      src={service.icon}
                      alt={isAr ? service.titleAr : service.titleEn}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#21214f] mb-4 group-hover:text-[#da8827] transition-colors duration-300">
                    {isAr ? service.titleAr : service.titleEn}
                  </h3>
                  
                  <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                    {isAr ? service.descAr : service.descEn}
                  </p>
                  
                  <span className="inline-flex items-center gap-2 text-[#21214f] font-bold group-hover:text-[#da8827] transition-colors duration-300">
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

      {/* --- 3. منهجية العمل (Methodology) --- */}
      <section className="py-24 bg-[#f4f4f8] border-t border-gray-200 overflow-hidden">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-[#21214f]">
              {isAr ? "منهجية العمل" : "Our Process"}
            </h2>
            <div className="w-20 h-1 bg-[#da8827] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative">
            {/* خط واصل بين الخطوات (يظهر في الشاشات الكبيرة فقط) */}
            <div className="hidden lg:block absolute top-12 rtl:right-[12%] rtl:left-[12%] ltr:left-[12%] ltr:right-[12%] h-0.5 bg-gray-300 z-0"></div>

            {methodology.map((step, index) => (
              <div key={index} className="relative z-10 text-center group">
                {/* الرقم الهندسي (مربع مائل) */}
                <div className="w-24 h-24 mx-auto bg-white border-2 border-[#21214f] text-[#21214f] flex items-center justify-center mb-6 transform rotate-45 group-hover:bg-[#da8827] group-hover:border-[#da8827] group-hover:text-white group-hover:rotate-0 transition-all duration-500 shadow-lg">
                  <span className="text-3xl font-black transform -rotate-45 group-hover:rotate-0 transition-transform duration-500 block">
                    {step.num}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold text-[#21214f] mb-3">
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

      {/* --- 4. الدعوة لاتخاذ إجراء (CTA) --- */}
      <section className="py-20 relative">
        <div className="container">
          <div className="bg-[#21214f] rounded-3xl p-10 md:p-16 text-center border-b-8 border-[#da8827] shadow-2xl relative overflow-hidden">
            {/* زخرفة خلفية للـ CTA */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#da8827] opacity-20 rounded-full blur-3xl pointer-events-none"></div>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 relative z-10">
              {isAr ? "هل أنت مستعد لتعزيز حضورك الرقمي؟" : "Ready to grow your digital presence?"}
            </h2>
            <p className="text-gray-300 text-lg mb-10 relative z-10">
              {isAr ? "تواصل مع فريقنا اليوم ودعنا نبدأ قصة نجاحك الجديدة." : "Contact our team today and let's start your success story."}
            </p>
            
            <Link 
              href="/contact" 
              className="relative z-10 inline-block bg-[#da8827] text-white hover:bg-white hover:text-[#21214f] transition-colors duration-300 font-bold py-4 px-10 rounded-lg text-lg shadow-lg"
            >
              {isAr ? "طلب عرض سعر" : "Request a Quote"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}