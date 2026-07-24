"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, ArrowLeft, ArrowRight, Smartphone, Monitor, ShoppingCart, ShieldCheck } from "lucide-react";

export default function TechServicePage() {
  const { lang } = useLanguage();

  return (
    <>
      {/* ─── Hero Section ─── */}
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
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180 z-20">
          <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
             <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f8fafc"></path>
          </svg>
        </div>

        <div className="mx-auto max-w-[1200px] px-5 relative z-30 text-center">
          <span className="inline-flex items-center gap-2 py-2 px-6 bg-white/10 backdrop-blur-md border border-white/10 text-[accent-500] rounded-full text-sm font-bold mb-6 shadow-xl tracking-wide">
            <Sparkles size={16} />
            {lang === "ar" ? "حلول رقمية متقدمة" : "Advanced Digital Solutions"}
          </span>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white drop-shadow-2xl">
            {lang === "ar" ? "الخدمات التقنية" : "Tech Services"}
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            {lang === "ar"
              ? "حلول تقنية متطورة ومخصصة لدفع عجلة نمو أعمالك نحو المستقبل الرقمي."
              : "Advanced and customized tech solutions to drive your business growth towards the digital future."}
          </p>

          <div className="flex items-center justify-center gap-3 text-sm font-semibold bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full inline-flex mx-auto border border-white/5 shadow-lg">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-[accent-500]/50">•</span>
            <span className="text-[accent-500] drop-shadow-md">{lang === "ar" ? "الخدمات التقنية" : "Tech Services"}</span>
          </div>
        </div>
      </section>

      {/* ─── Services Grid ─── */}
      <section className="py-24 bg-[var(--color-surface-50)] relative">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            
            {/* App Development */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_40px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_50px_-5px_rgba(15,23,42,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-8">
                <Image src="/imgs/service imgs/real/app_development_real_1784859099327.jpg" alt="App Development" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <Smartphone size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-brand-900)] mb-3 group-hover:text-blue-600 transition-colors">
                {lang === "ar" ? "تطوير التطبيقات" : "App Development"}
              </h3>
              <p className="text-slate-500 leading-relaxed flex-1">
                {lang === "ar"
                  ? "تطبيقات iOS و Android أصلية ومدمجة، بالإضافة لتطبيقات الويب التفاعلية (PWA) المصممة لتجربة مستخدم لا تُنسى."
                  : "Native and cross-platform iOS & Android apps, along with interactive web apps (PWA) designed for an unforgettable UX."}
              </p>
            </div>

            {/* Web Development */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_40px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_50px_-5px_rgba(15,23,42,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-8">
                <Image src="/imgs/service imgs/real/tech_solutions_1784854112279.jpg" alt="Web Development" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <Monitor size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-brand-900)] mb-3 group-hover:text-blue-600 transition-colors">
                {lang === "ar" ? "تطوير المواقع" : "Web Development"}
              </h3>
              <p className="text-slate-500 leading-relaxed flex-1">
                {lang === "ar"
                  ? "مواقع مؤسسية سريعة، لوحات تحكم متكاملة، أنظمة مخصصة، ومدونات مبنية بأحدث التقنيات وأقواها."
                  : "Fast corporate sites, integrated dashboards, custom systems, and blogs built with the latest technologies."}
              </p>
            </div>

            {/* E-Commerce */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_40px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_50px_-5px_rgba(15,23,42,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-8">
                <Image src="/imgs/service imgs/real/marketing_campaigns_1784854104204.jpg" alt="E-Commerce" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <ShoppingCart size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-brand-900)] mb-3 group-hover:text-blue-600 transition-colors">
                {lang === "ar" ? "المتاجر الإلكترونية" : "E-Commerce"}
              </h3>
              <p className="text-slate-500 leading-relaxed flex-1">
                {lang === "ar"
                  ? "متاجر إلكترونية متكاملة مع بوابات دفع محلية وعالمية، أنظمة إدارة المخزون، وربط بشركات الشحن والتوصيل."
                  : "Complete e-commerce stores with payment gateways, inventory management, and shipping integrations."}
              </p>
            </div>

            {/* Hosting & Security */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_40px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_50px_-5px_rgba(15,23,42,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-8">
                <Image src="/imgs/service imgs/real/app_development_1784854095919.jpg" alt="Hosting & Security" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <ShieldCheck size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-brand-900)] mb-3 group-hover:text-blue-600 transition-colors">
                {lang === "ar" ? "استضافة وأمن معلومات" : "Hosting & Security"}
              </h3>
              <p className="text-slate-500 leading-relaxed flex-1">
                {lang === "ar"
                  ? "استضافات سحابية فائقة السرعة والموثوقية، شهادات SSL، حماية قوية من الهجمات والاختراقات للحفاظ على بياناتك."
                  : "Ultra-fast cloud hosting, SSL certificates, and robust protection against hacks to keep your data secure."}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-20 relative overflow-hidden bg-[var(--color-brand-900)]">
        <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-3xl z-0"></div>
        <div className="mx-auto max-w-[1200px] px-5 relative z-10">
          <div className="max-w-3xl mx-auto text-center bg-white/5 backdrop-blur-lg border border-white/10 p-12 rounded-[2.5rem] shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              {lang === "ar" ? "هل تبحث عن شريك تقني؟" : "Looking for a tech partner?"}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {lang === "ar"
                ? "نحن هنا لتمكين مشاريعك بأحدث ما توصلت إليه التكنولوجيا. دعنا نبرمج المستقبل معاً."
                : "We are here to empower your projects with the latest technology. Let's code the future together."}
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-500 hover:scale-105 hover:shadow-[0_10px_30px_-5px_rgba(37,99,235,0.5)] transition-all group">
              {lang === "ar" ? "اطلب هذه الخدمة" : "Request Service"}
              <ArrowLeft size={20} className={`transform transition-transform group-hover:-translate-x-1 ${lang === "ar" ? "" : "rotate-180 group-hover:translate-x-1 group-hover:-translate-x-0"}`} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}