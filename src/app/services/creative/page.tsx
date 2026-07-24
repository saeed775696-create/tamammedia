"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, ArrowLeft, ArrowRight, Paintbrush, Video, Camera, Megaphone, Layout } from "lucide-react";

export default function CreativeServicePage() {
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
            {lang === "ar" ? "اصنع هويتك بقوة" : "Build Your Identity"}
          </span>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white drop-shadow-2xl">
            {lang === "ar" ? "الخدمات الإبداعية" : "Creative Services"}
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            {lang === "ar"
              ? "نصنع هوية علامتك التجارية ونجعلها تتحدث بلغة الإبداع الذي يلفت الأنظار ويأسر القلوب."
              : "We craft your brand identity and make it speak the language of creativity that catches eyes and captures hearts."}
          </p>

          <div className="flex items-center justify-center gap-3 text-sm font-semibold bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full inline-flex mx-auto border border-white/5 shadow-lg">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-[accent-500]/50">•</span>
            <span className="text-[accent-500] drop-shadow-md">{lang === "ar" ? "الخدمات الإبداعية" : "Creative Services"}</span>
          </div>
        </div>
      </section>

      {/* ─── Services Grid ─── */}
      <section className="py-24 bg-[var(--color-surface-50)] relative">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Visual Identity */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_40px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_50px_-5px_rgba(15,23,42,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-8">
                <Image src="/imgs/service imgs/real/visual_identity_real_1784858982810.jpg" alt="Visual Identity" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <Layout size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-brand-900)] mb-3 group-hover:text-[var(--color-accent-600)] transition-colors">
                {lang === "ar" ? "تصميم الهوية البصرية" : "Visual Identity Design"}
              </h3>
              <p className="text-slate-500 leading-relaxed flex-1">
                {lang === "ar"
                  ? "شعارات، أدلة الهوية، اختيار الألوان والخطوط المؤسسية التي تمثل رؤيتك بأفضل صورة."
                  : "Logos, brand guidelines, and corporate colors & fonts that best represent your vision."}
              </p>
            </div>

            {/* Graphic Design */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_40px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_50px_-5px_rgba(15,23,42,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-8">
                <Image src="/imgs/service imgs/real/graphic_design_real_1784854299182.jpg" alt="Graphic Design" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <Paintbrush size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-brand-900)] mb-3 group-hover:text-[var(--color-accent-600)] transition-colors">
                {lang === "ar" ? "التصميم الجرافيكي" : "Graphic Design"}
              </h3>
              <p className="text-slate-500 leading-relaxed flex-1">
                {lang === "ar"
                  ? "منشورات، بروشورات، إعلانات مطبوعة ورقمية مصممة باحترافية عالية لزيادة التفاعل."
                  : "Posts, brochures, and print & digital ads designed professionally to increase engagement."}
              </p>
            </div>

            {/* Social Media */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_40px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_50px_-5px_rgba(15,23,42,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-8">
                <Image src="/imgs/service imgs/real/social_media_real_1784854275011.jpg" alt="Social Media" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <Megaphone size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-brand-900)] mb-3 group-hover:text-[var(--color-accent-600)] transition-colors">
                {lang === "ar" ? "إدارة السوشيال ميديا" : "Social Media Management"}
              </h3>
              <p className="text-slate-500 leading-relaxed flex-1">
                {lang === "ar"
                  ? "إنشاء محتوى إبداعي، جدولة، تفاعل، وإدارة حملات إعلانية ممولة للوصول لجمهورك."
                  : "Creative content creation, scheduling, engagement & paid ad campaigns to reach your audience."}
              </p>
            </div>

            {/* Photography & Production */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_40px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_50px_-5px_rgba(15,23,42,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col lg:col-start-2">
              <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-8">
                <Image src="/imgs/service imgs/real/photography_real_1784858992445.jpg" alt="Photography" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <Camera size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-brand-900)] mb-3 group-hover:text-[var(--color-accent-600)] transition-colors">
                {lang === "ar" ? "التصوير والإنتاج" : "Photography & Production"}
              </h3>
              <p className="text-slate-500 leading-relaxed flex-1">
                {lang === "ar"
                  ? "تصوير فوتوغرافي لمنتجاتك، فيديوهات ترويجية، أعمال مونتاج وإخراج فني عالي الجودة."
                  : "Product photography, promotional videos, editing, and high-quality art direction."}
              </p>
            </div>

            {/* Motion Graphics */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_40px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_50px_-5px_rgba(15,23,42,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col lg:col-start-3">
              <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-8">
                <Image src="/imgs/service imgs/real/motion_graphics_real_1784859000812.jpg" alt="Motion Graphics" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <Video size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-brand-900)] mb-3 group-hover:text-[var(--color-accent-600)] transition-colors">
                {lang === "ar" ? "الموشن جرافيك" : "Motion Graphics"}
              </h3>
              <p className="text-slate-500 leading-relaxed flex-1">
                {lang === "ar"
                  ? "رسوم متحركة جذابة، فيديوهات إعلانية قصيرة، وإنفوجرافيك يشرح رسالتك بوضوح."
                  : "Attractive animations, short ads, and infographics that explain your message clearly."}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-20 relative overflow-hidden bg-[var(--color-brand-900)]">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl z-0"></div>
        <div className="mx-auto max-w-[1200px] px-5 relative z-10">
          <div className="max-w-3xl mx-auto text-center bg-white/10 backdrop-blur-lg border border-white/20 p-12 rounded-[2.5rem] shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              {lang === "ar" ? "هل أنت مستعد للبدء؟" : "Ready to get started?"}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {lang === "ar"
                ? "تواصل معنا الآن لنحول أفكارك الإبداعية إلى واقع ملموس يحقق أهدافك بنجاح."
                : "Contact us now to turn your creative ideas into a tangible reality that successfully achieves your goals."}
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-accent-500)] text-white rounded-full font-bold text-lg hover:bg-[var(--color-accent-600)] hover:scale-105 hover:shadow-[0_10px_30px_-5px_rgba(218,136,39,0.5)] transition-all group">
              {lang === "ar" ? "اطلب هذه الخدمة" : "Request Service"}
              <ArrowLeft size={20} className={`transform transition-transform group-hover:-translate-x-1 ${lang === "ar" ? "" : "rotate-180 group-hover:translate-x-1 group-hover:-translate-x-0"}`} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}