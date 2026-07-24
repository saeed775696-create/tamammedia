"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, ArrowLeft, ArrowRight, Target, TrendingUp, BarChart3, Briefcase } from "lucide-react";

export default function IntegratedServicePage() {
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
            {lang === "ar" ? "تسويق وحلول متكاملة" : "Marketing & Integrated Solutions"}
          </span>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white drop-shadow-2xl">
            {lang === "ar" ? "الحلول المتكاملة" : "Integrated Solutions"}
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            {lang === "ar"
              ? "خطط وحملات تسويقية شاملة واستشارات استراتيجية لضمان نجاح وتوسع أعمالك في السوق."
              : "Comprehensive marketing plans, campaigns, and strategic consulting to ensure your business's success and expansion."}
          </p>

          <div className="flex items-center justify-center gap-3 text-sm font-semibold bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full inline-flex mx-auto border border-white/5 shadow-lg">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-[accent-500]/50">•</span>
            <span className="text-[accent-500] drop-shadow-md">{lang === "ar" ? "الحلول المتكاملة" : "Integrated Solutions"}</span>
          </div>
        </div>
      </section>

      {/* ─── Services Grid ─── */}
      <section className="py-24 bg-[var(--color-surface-50)] relative">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            
            {/* Marketing Strategies */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_40px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_50px_-5px_rgba(15,23,42,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-8">
                <Image src="/imgs/service imgs/real/marketing_real_1784854282989.jpg" alt="Marketing Strategies" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <Target size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-brand-900)] mb-3 group-hover:text-emerald-600 transition-colors">
                {lang === "ar" ? "خطط تسويقية" : "Marketing Strategies"}
              </h3>
              <p className="text-slate-500 leading-relaxed flex-1">
                {lang === "ar"
                  ? "دراسة السوق بعمق، تحليل المنافسين، وبناء استراتيجيات ذكية ومدروسة لضمان التفوق."
                  : "In-depth market research, competitor analysis, and building smart, well-thought-out strategies to ensure superiority."}
              </p>
            </div>

            {/* Digital & Field Campaigns */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_40px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_50px_-5px_rgba(15,23,42,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-8">
                <Image src="/imgs/service imgs/real/advertising_real_1784854291002.jpg" alt="Digital & Field Campaigns" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <TrendingUp size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-brand-900)] mb-3 group-hover:text-emerald-600 transition-colors">
                {lang === "ar" ? "حملات رقمية وميدانية" : "Digital & Field Campaigns"}
              </h3>
              <p className="text-slate-500 leading-relaxed flex-1">
                {lang === "ar"
                  ? "إطلاق وإدارة إعلانات جوجل وفيسبوك، تنظيم الفعاليات، وتطوير حملات ترويجية تصل للجمهور المستهدف."
                  : "Launching & managing Google and Facebook ads, organizing events, and developing promotional campaigns that reach the target audience."}
              </p>
            </div>

            {/* Data Analysis */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_40px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_50px_-5px_rgba(15,23,42,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-8">
                <Image src="/imgs/service imgs/real/tech_solutions_1784854112279.jpg" alt="Data Analysis" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <BarChart3 size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-brand-900)] mb-3 group-hover:text-emerald-600 transition-colors">
                {lang === "ar" ? "تحليل البيانات" : "Data Analysis"}
              </h3>
              <p className="text-slate-500 leading-relaxed flex-1">
                {lang === "ar"
                  ? "إعداد تقارير دورية دقيقة، تحليلات شاملة للأداء، وتقديم توصيات استراتيجية مستندة على البيانات الحقيقية."
                  : "Preparing accurate periodic reports, comprehensive performance analytics, and providing strategic recommendations based on real data."}
              </p>
            </div>

            {/* Strategic Consulting */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_40px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_50px_-5px_rgba(15,23,42,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-8">
                <Image src="/imgs/service imgs/real/brand_identity_1784854043969.jpg" alt="Strategic Consulting" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <Briefcase size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-brand-900)] mb-3 group-hover:text-emerald-600 transition-colors">
                {lang === "ar" ? "استشارات استراتيجية" : "Strategic Consulting"}
              </h3>
              <p className="text-slate-500 leading-relaxed flex-1">
                {lang === "ar"
                  ? "عقد جلسات استشارية مع خبراء التسويق، إعداد خطط منهجية، مع المتابعة المستمرة للتطوير."
                  : "Holding consulting sessions with marketing experts, preparing methodological plans, with continuous follow-up for development."}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-20 relative overflow-hidden bg-[var(--color-brand-900)]">
        <div className="absolute inset-0 bg-emerald-900/10 backdrop-blur-3xl z-0"></div>
        <div className="mx-auto max-w-[1200px] px-5 relative z-10">
          <div className="max-w-3xl mx-auto text-center bg-white/5 backdrop-blur-lg border border-white/10 p-12 rounded-[2.5rem] shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              {lang === "ar" ? "هل تحتاج إلى خطة متكاملة؟" : "Need an integrated plan?"}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {lang === "ar"
                ? "نحن هنا لمساعدتك في تحقيق أهدافك التجارية عبر خطط استراتيجية شاملة وحملات مدروسة بعناية."
                : "We are here to help you achieve your business goals through comprehensive strategic plans and carefully designed campaigns."}
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-full font-bold text-lg hover:bg-emerald-500 hover:scale-105 hover:shadow-[0_10px_30px_-5px_rgba(16,185,129,0.5)] transition-all group">
              {lang === "ar" ? "اطلب استشارة مجانية" : "Request Free Consultation"}
              <ArrowLeft size={20} className={`transform transition-transform group-hover:-translate-x-1 ${lang === "ar" ? "" : "rotate-180 group-hover:translate-x-1 group-hover:-translate-x-0"}`} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}