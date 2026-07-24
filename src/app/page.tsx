"use client";

import Hero from "@/components/Hero";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Sparkles, Users } from "lucide-react";
import { extractItems } from "@/lib/api/extract";
import DirectionArrow from "@/components/DirectionArrow";

// تعريف أنواع البيانات لتجنب استخدام any
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  order?: number;
}

interface Partner {
  id: string;
  name: string;
  imageUrl: string;
  website?: string;
  order?: number;
}

export default function HomePage() {
  const { lang } = useLanguage();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);

  // ... باقي الكود كما هو بدون تعديل (useEffect, return, إلخ)
  useEffect(() => {
    fetch("/api/team")
      .then((r) => r.json())
      .then((data) => setTeam(extractItems<TeamMember>(data)))
      .catch(() => setTeam([]));

    fetch("/api/partners")
      .then((r) => r.json())
      .then((data) => setPartners(extractItems<Partner>(data)))
      .catch(() => setPartners([]));
  }, []);

  return (
    <>
      <Hero />

      {/* ========== الخدمات (Bento Grid) ========== */}
      <section className="py-24 bg-[var(--color-surface-50)] relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-brand-800)]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-accent-500)]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="mx-auto max-w-[1200px] px-5 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-brand-800)]/5 text-[var(--color-brand-800)] font-bold text-sm mb-6 border border-[var(--color-brand-800)]/10 backdrop-blur-sm">
              <Sparkles size={16} className="text-[var(--color-accent-500)]" />
              {lang === "ar" ? "خدماتنا" : "Our Services"}
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[var(--color-brand-900)] tracking-tight">
              {lang === "ar"
                ? "حلول متكاملة تحت سقف واحد"
                : "All-in-One Solutions"}
            </h2>
            <p className="text-lg text-[var(--color-surface-600)] leading-relaxed">
              {lang === "ar"
                ? "نقدم لك كل ما تحتاجه لبناء حضور رقمي قوي ومؤثر. من الفكرة وحتى التنفيذ الكامل."
                : "Everything you need to build a strong digital presence. From concept to full execution."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* الخدمات الإبداعية */}
            <div className="group relative rounded-3xl overflow-hidden bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[var(--color-brand-800)]/10 transition-all duration-500 hover:-translate-y-2 border border-slate-100 flex flex-col">
              <div className="h-56 w-full relative overflow-hidden">
                 <Image src="/imgs/services/graphic_design_real.jpg" fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt="Creative Services" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                 <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 text-white">
                    <Sparkles size={24} />
                 </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-[var(--color-brand-900)] mb-3">
                   {lang === "ar" ? "الخدمات الإبداعية" : "Creative Services"}
                </h3>
                <p className="text-[var(--color-surface-600)] leading-relaxed flex-1">
                  {lang === "ar"
                    ? "هوية بصرية، تصميم جرافيكي، إدارة منصات التواصل الاجتماعي، تصوير وإنتاج مرئي عالي الجودة."
                    : "Branding, graphic design, social media management, high-quality photography and video production."}
                </p>
                <Link href="/services/creative" className="mt-6 inline-flex items-center gap-2 font-bold text-accent-600 hover:text-brand-800 transition-colors group/link">
                  {lang === "ar" ? "اكتشف المزيد" : "Discover More"}
                  <DirectionArrow size={18} className="transform group-hover/link:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* الخدمات التقنية */}
            <div className="group relative rounded-3xl overflow-hidden bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[var(--color-brand-800)]/10 transition-all duration-500 hover:-translate-y-2 border border-slate-100 flex flex-col md:translate-y-8">
              <div className="h-56 w-full relative overflow-hidden">
                 <Image src="/imgs/services/tech_solutions.jpg" fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt="Tech Services" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                 <div className="absolute bottom-4 right-4 bg-[var(--color-accent-500)]/80 backdrop-blur-md p-3 rounded-2xl border border-white/30 text-white shadow-lg shadow-[var(--color-accent-500)]/30">
                    <div className="w-6 h-6 border-2 border-white rounded-md flex items-center justify-center font-mono text-xs">&lt;/&gt;</div>
                 </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-[var(--color-brand-900)] mb-3">
                   {lang === "ar" ? "الخدمات التقنية" : "Tech Services"}
                </h3>
                <p className="text-[var(--color-surface-600)] leading-relaxed flex-1">
                  {lang === "ar"
                    ? "تطوير مواقع وتطبيقات الموبايل بأحدث التقنيات، إنشاء متاجر إلكترونية احترافية، استضافة وحلول سحابية."
                    : "Web and mobile app development using the latest technologies, e-commerce creation, hosting and cloud solutions."}
                </p>
                <Link href="/services/tech" className="mt-6 inline-flex items-center gap-2 font-bold text-accent-600 hover:text-brand-800 transition-colors group/link">
                  {lang === "ar" ? "اكتشف المزيد" : "Discover More"}
                  <DirectionArrow size={18} className="transform group-hover/link:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* الحلول المتكاملة */}
            <div className="group relative rounded-3xl overflow-hidden bg-[var(--color-brand-900)] shadow-xl shadow-[var(--color-brand-900)]/20 hover:shadow-2xl hover:shadow-[var(--color-brand-900)]/40 transition-all duration-500 hover:-translate-y-2 border border-[var(--color-brand-800)] flex flex-col">
              <div className="absolute inset-0 bg-white/5 opacity-10 pointer-events-none"></div>
              <div className="h-56 w-full relative overflow-hidden">
                 <Image src="/imgs/services/marketing_real.jpg" fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt="Integrated Solutions" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-900)] to-transparent"></div>
                 <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-[var(--color-accent-400)]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                 </div>
              </div>
              <div className="p-8 flex-1 flex flex-col relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3">
                   {lang === "ar" ? "الحلول المتكاملة" : "Integrated Solutions"}
                </h3>
                <p className="text-slate-300 leading-relaxed flex-1">
                  {lang === "ar"
                    ? "خطط تسويقية شاملة، إدارة حملات رقمية وميدانية، استشارات استراتيجية لنمو أعمالك وقيادة السوق."
                    : "Comprehensive marketing plans, digital and on-ground campaign management, strategic consulting for business growth."}
                </p>
                <Link href="/services/integrated" className="mt-6 inline-flex items-center gap-2 font-bold text-accent-400 hover:text-white transition-colors group/link">
                  {lang === "ar" ? "اكتشف المزيد" : "Discover More"}
                  <DirectionArrow size={18} className="transform group-hover/link:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-8 flex-wrap mt-20 mb-16">
            <Link href="/services" className="px-10 py-5 text-lg rounded-xl bg-brand-800 text-white font-bold hover:bg-brand-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
              {lang === "ar" ? "عرض جميع الخدمات" : "View All Services"}
              <DirectionArrow size={20} />
            </Link>
            <Link href="/portfolio" className="px-10 py-5 text-lg rounded-xl bg-white text-brand-800 font-bold border-2 border-slate-200 hover:border-brand-300 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm hover:shadow">
              {lang === "ar" ? "معرض الأعمال" : "Our Portfolio"}
              <ArrowRight size={20} className={`transform ${lang === "ar" ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== من نحن ========== */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual Side (Overlapping Images) */}
            <div className="relative h-[450px] md:h-[550px] w-full group">
              <div className="absolute top-0 right-0 md:right-10 w-4/5 h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white z-10 transition-transform duration-700 group-hover:-translate-y-4">
                <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" alt="Tamam Media Team" fill className="object-cover" />
                <div className="absolute inset-0 bg-[var(--color-brand-900)]/10 mix-blend-overlay"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-2/3 h-[250px] md:h-[300px] rounded-3xl overflow-hidden shadow-2xl border-[8px] border-white z-20 transition-transform duration-700 group-hover:translate-y-4 group-hover:translate-x-4">
                <Image src="/imgs/services/marketing_real.jpg" alt="Tamam Media Office" fill className="object-cover" />
              </div>
              {/* Floating Badge */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-30 bg-white p-5 md:p-6 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center justify-center animate-[float_6s_ease-in-out_infinite]">
                 <span className="text-3xl md:text-4xl font-black text-[var(--color-accent-500)] mb-1">+10</span>
                 <span className="text-xs md:text-sm font-bold text-slate-500 text-center leading-tight">{lang === "ar" ? "سنوات من" : "Years of"}<br/>{lang === "ar" ? "الخبرة" : "Experience"}</span>
              </div>
            </div>

            {/* Text Side */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-brand-800)]/5 text-[var(--color-brand-800)] font-bold text-sm mb-6 border border-[var(--color-brand-800)]/10">
                <Users size={16} className="text-[var(--color-accent-500)]" />
                {lang === "ar" ? "من نحن" : "About Us"}
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[var(--color-brand-900)] tracking-tight leading-tight">
                {lang === "ar" ? "شريكك الاستراتيجي في" : "Your Strategic Partner in"}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-600)] to-[var(--color-accent-500)]">
                  {lang === "ar" ? "النمو الرقمي" : "Digital Growth"}
                </span>
              </h2>
              <p className="text-lg text-[var(--color-surface-600)] leading-relaxed mb-8">
                {lang === "ar"
                  ? "تمام ميديا هي وكالة تسويق رقمي متكاملة، نجمع بين الإبداع الفني والخبرة التقنية لنقدم حلولاً مبتكرة تصنع الفارق الحقيقي لعلامتك التجارية في السوق."
                  : "Tamam Media is an integrated digital marketing agency. We combine artistic creativity with technical expertise to deliver innovative solutions that make a real difference for your brand."}
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  lang === "ar" ? "استراتيجيات مبنية على البيانات" : "Data-driven strategies",
                  lang === "ar" ? "فريق خبراء متخصص بشغف" : "Passionate expert team",
                  lang === "ar" ? "نتائج قابلة للقياس والنمو" : "Measurable & scalable results"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[var(--color-brand-900)] font-semibold text-lg">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-accent-500)]/20 flex items-center justify-center text-[var(--color-accent-600)] shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/about" className="px-8 py-4 rounded-xl bg-brand-800 text-white font-bold hover:bg-brand-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 inline-flex items-center gap-2">
                {lang === "ar" ? "اكتشف قصتنا" : "Discover Our Story"}
                <DirectionArrow size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== الفريق ========== */}
      <section className="py-24 bg-[var(--color-surface-50)] relative">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="flex justify-center w-full">
            <div className="text-center max-w-2xl my-16">
              <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-brand-800)]/5 text-[var(--color-brand-800)] font-bold text-sm mb-6 border border-[var(--color-brand-800)]/10">
                <Users size={16} className="text-[var(--color-accent-500)]" />
                {lang === "ar" ? "فريقنا" : "Our Team"}
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[var(--color-brand-900)] tracking-tight">
                {lang === "ar" ? "خبراء خلف كل مشروع" : "Experts Behind Every Project"}
              </h2>
            </div>
          </div>

          {team.length === 0 ? (
            <p className="text-center text-[var(--color-surface-500)] py-8 font-medium">
              {lang === "ar" ? "لا يوجد أعضاء بعد." : "No team members yet."}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.id} className="group relative bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[var(--color-brand-800)]/10 transition-all duration-500 hover:-translate-y-2 border border-slate-100 flex flex-col items-center text-center overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[var(--color-brand-800)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative w-40 h-40 rounded-full mb-6 z-10 shrink-0">
                    <div className="absolute inset-0 rounded-full border-4 border-[var(--color-accent-500)] opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                    <Image
                      src={member.imageUrl || "/imgs/2-3.png"}
                      alt={member.name}
                      fill
                      className="object-cover object-top rounded-full border-4 border-white shadow-md relative z-10"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-brand-900)] mb-2 relative z-10 group-hover:text-[var(--color-accent-600)] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-[var(--color-surface-500)] relative z-10">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========== الشركاء ========== */}
      <section className="bg-white relative overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-5 relative z-10">
          <div className="flex justify-center w-full">
            <div className="text-center max-w-2xl my-16">
              <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-brand-800)]/5 text-[var(--color-brand-800)] font-bold text-sm mb-6 border border-[var(--color-brand-800)]/10">
                <Sparkles size={16} className="text-[var(--color-accent-500)]" />
                {lang === "ar" ? "شركاؤنا" : "Our Partners"}
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[var(--color-brand-900)] tracking-tight">
                {lang === "ar" ? "نفخر بالعمل معهم" : "Proud to Work With"}
              </h2>
            </div>
          </div>

          {partners.length === 0 ? (
            <p className="text-center text-[var(--color-surface-500)] py-8 font-medium">
              {lang === "ar" ? "لا يوجد شركاء بعد." : "No partners yet."}
            </p>
          ) : (
            <div className="relative w-full overflow-hidden py-4" dir="ltr">
               <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
               <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
               
               <div className="flex w-max gap-8 md:gap-16 items-center animate-marquee hover:[animation-play-state:paused]">
                  {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                     <a
                       key={`${partner.id}-${index}`}
                       href={partner.website || "#"}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="group flex items-center justify-center w-40 h-24 md:w-48 md:h-28 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:border-[var(--color-brand-200)] transition-all duration-300 shrink-0 p-4"
                     >
                       <div className="relative w-full h-full">
                         <Image
                           src={partner.imageUrl}
                           alt={partner.name}
                           fill
                           className="object-contain filter md:grayscale md:opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                         />
                       </div>
                     </a>
                  ))}
                </div>
            </div>
          )}
        </div>
</section>
     </>
   );
 }