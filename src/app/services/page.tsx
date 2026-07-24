"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
      <section className="relative bg-[brand-900] pt-56 pb-48 min-h-[60vh] flex flex-col justify-center overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[accent-500]/20 rounded-full blur-[120px] pointer-events-none animate-pulse -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#4a4a8f]/30 rounded-full blur-[140px] pointer-events-none translate-y-1/4 -translate-x-1/4"></div>

        {/* زخرفة هندسية متطورة */}
        <div 
          className="absolute top-0 right-0 w-full md:w-3/4 h-full bg-gradient-to-bl from-[accent-500]/10 via-transparent to-transparent pointer-events-none"
          style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        ></div>
        
        {/* Divider SVG for smooth transition */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
             <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>

        <div className="mx-auto max-w-[1200px] px-5 relative z-10 text-center">
          <span className="inline-block py-2 px-6 bg-white/10 backdrop-blur-md border border-white/10 text-[accent-500] rounded-full text-sm font-bold mb-6 shadow-xl tracking-wide">
            {isAr ? "مرحباً بك في عالم الإبداع" : "Welcome to the Creative World"}
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white drop-shadow-2xl">
            {isAr ? "خدماتنا" : "Our Services"}
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            {isAr
              ? "حلول متكاملة وإبداعية لتطوير حضورك الرقمي والميداني وتحقيق أهدافك بفاعلية، مبنية على خبرات عميقة وشغف لا ينضب."
              : "Integrated and creative solutions to develop your digital and field presence, built on deep expertise and passion."}
          </p>
          
          <div className="flex items-center justify-center gap-3 text-sm font-semibold bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full inline-flex mx-auto border border-white/5 shadow-lg">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300">
              {isAr ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-[accent-500]/50">•</span>
            <span className="text-[accent-500] drop-shadow-md">{isAr ? "خدماتنا" : "Services"}</span>
          </div>
        </div>
      </section>

      {/* --- 2. مجالات الخبرة (Main Services Grid) --- */}
      <section className="py-16 md:py-24 relative z-20">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-4 bg-white border border-[accent-500] text-[accent-500] rounded-full text-sm font-bold mb-4 shadow-sm">
              {isAr ? "ماذا نقدم" : "What We Offer"}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[brand-900] pb-2 leading-relaxed">
              {isAr ? "مجالات خبرتنا" : "Our Expertise"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainServices.map((service) => (
              <Link
                href={service.href}
                key={service.id}
                className="group block bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-10 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-[accent-500] relative overflow-hidden text-center"
              >
                {/* شكل مثلث هندسي في الزاوية */}
                <div 
                  className="absolute top-0 rtl:left-0 ltr:right-0 w-20 h-20 bg-[surface-100] group-hover:bg-[accent-500] transition-colors duration-500 z-0"
                  style={{ clipPath: isAr ? 'polygon(100% 0, 0 0, 0 100%)' : 'polygon(100% 0, 0 0, 100% 100%)' }}
                ></div>

                <div className="relative z-10">
                  <div className="w-24 h-24 mx-auto bg-[surface-100] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 p-4 border-b-4 border-transparent group-hover:border-[brand-900]">
                    <Image
                      src={service.icon}
                      alt={isAr ? service.titleAr : service.titleEn}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[brand-900] mb-4 group-hover:text-[accent-500] transition-colors duration-300">
                    {isAr ? service.titleAr : service.titleEn}
                  </h3>
                  
                  <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                    {isAr ? service.descAr : service.descEn}
                  </p>
                  
                  <span className="inline-flex items-center gap-2 text-[brand-900] font-bold group-hover:text-[accent-500] transition-colors duration-300">
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
      <div className="w-full overflow-hidden leading-[0] bg-[surface-100]">
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
      <section className="py-16 md:py-24 bg-[surface-100] overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-[brand-900]">
              {isAr ? "منهجية العمل" : "Our Process"}
            </h2>
            <div className="w-20 h-1 bg-[accent-500] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative">
            {/* خط واصل بين الخطوات (يظهر في الشاشات الكبيرة فقط) */}
            <div className="hidden lg:block absolute top-12 rtl:right-[12%] rtl:left-[12%] ltr:left-[12%] ltr:right-[12%] h-0.5 bg-gray-200 z-0 overflow-hidden rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-[accent-500]/30 via-[accent-500] to-[accent-500]/30 w-full"
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
                <div className="w-24 h-24 mx-auto bg-white border-2 border-[brand-900] text-[brand-900] flex items-center justify-center mb-6 transform rotate-45 group-hover:bg-[accent-500] group-hover:border-[accent-500] group-hover:text-white group-hover:rotate-0 transition-all duration-500 shadow-lg relative">
                  {/* تأثير النبض الخارجي */}
                  <div className="absolute inset-0 border-2 border-[accent-500] opacity-0 group-hover:opacity-100 group-hover:animate-ping rounded-sm"></div>
                  
                  <span className="text-3xl font-black transform -rotate-45 group-hover:rotate-0 transition-transform duration-500 block relative z-10">
                    {step.num}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold text-[brand-900] mb-3">
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
            fill="surface-100"
          ></path>
        </svg>
      </div>

      {/* --- أرقامنا تتحدث (Statistics) --- */}
      <section className="py-16 bg-white relative">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: "10+", labelAr: "سنوات خبرة", labelEn: "Years Experience" },
              { num: "150+", labelAr: "مشروع منجز", labelEn: "Completed Projects" },
              { num: "50+", labelAr: "شريك نجاح", labelEn: "Success Partners" },
              { num: "24/7", labelAr: "دعم مستمر", labelEn: "Continuous Support" },
            ].map((stat, i) => (
              <div key={i} className="text-center group p-6 rounded-3xl hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 border border-transparent hover:border-gray-100">
                <div className="text-4xl md:text-6xl font-black text-[brand-900] mb-3 group-hover:scale-110 transition-transform duration-500">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[brand-900] to-[accent-500] group-hover:from-[accent-500] group-hover:to-[accent-400]">
                    {stat.num}
                  </span>
                </div>
                <div className="text-gray-500 font-bold text-sm md:text-base tracking-wide">
                  {isAr ? stat.labelAr : stat.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. الدعوة لاتخاذ إجراء (CTA) --- */}
      <section className="pt-32 pb-24 relative">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="bg-[brand-900] rounded-[2.5rem] py-12 md:py-20 px-10 md:px-16 text-center border-b-8 border-[accent-500] shadow-2xl relative overflow-hidden min-h-[300px] flex flex-col items-center justify-center">
            {/* زخرفة خلفية للـ CTA */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[accent-500] opacity-10 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 relative z-10 leading-relaxed max-w-3xl mx-auto">
              {isAr ? "هل أنت مستعد لتعزيز حضورك الرقمي؟" : "Ready to grow your digital presence?"}
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-12 relative z-10 max-w-2xl mx-auto font-medium leading-loose">
              {isAr ? "تواصل مع فريقنا اليوم ودعنا نبدأ قصة نجاحك الجديدة في عالم الأعمال." : "Contact our team today and let's start your new success story in the business world."}
            </p>
            
            <div className="relative z-10 flex justify-center w-full">
              <Link 
                href="/contact" 
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[accent-500] to-[accent-400] text-white hover:from-white hover:to-white hover:text-[brand-900] transition-all duration-300 font-extrabold py-5 px-12 rounded-2xl text-xl shadow-[0_8px_30px_rgba(218,136,39,0.3)] hover:shadow-[0_8px_40px_rgba(255,255,255,0.4)] hover:-translate-y-1"
              >
                {isAr ? "طلب عرض سعر" : "Request a Quote"}
                {isAr ? (
                  <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                )}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}