"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, Target, TrendingUp, BarChart3, Briefcase } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function IntegratedServicePage() {
  const { lang } = useLanguage();

  return (
    <>
      {/* ─── Hero Section ─── */}
      <PageHero
        badge={lang === "ar" ? "تسويق وحلول متكاملة" : "Marketing & Integrated Solutions"}
        title={lang === "ar" ? "الحلول المتكاملة" : "Integrated Solutions"}
        description={
          lang === "ar"
            ? "خطط وحملات تسويقية شاملة واستشارات استراتيجية لضمان نجاح وتوسع أعمالك في السوق."
            : "Comprehensive marketing plans, campaigns, and strategic consulting to ensure your business's success and expansion."
        }
        breadcrumbs={[
          { label: lang === "ar" ? "الرئيسية" : "Home", href: "/" },
          { label: lang === "ar" ? "الحلول المتكاملة" : "Integrated Solutions" },
        ]}
      />

      {/* ─── Services Grid ─── */}
      <section className="section-y-md bg-surface-50 relative">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-8 lg:gap-10 max-w-5xl mx-auto">
            
            {/* Marketing Strategies */}
            <div className="card-base group flex flex-col p-6 md:p-8">
              <div className="relative w-full aspect-media rounded-xl overflow-hidden mb-6">
                <Image src="/imgs/service imgs/real/marketing_real_1784854282989.jpg" alt="Marketing Strategies" fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" quality={65} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <Target size={24} />
                </div>
              </div>
              <h3 className="text-h4 text-brand-900 mb-3 group-hover:text-emerald-600 transition-colors">
                {lang === "ar" ? "خطط تسويقية" : "Marketing Strategies"}
              </h3>
              <p className="text-body text-surface-600 leading-loose flex-1">
                {lang === "ar"
                  ? "دراسة السوق بعمق، تحليل المنافسين، وبناء استراتيجيات ذكية ومدروسة لضمان التفوق."
                  : "In-depth market research, competitor analysis, and building smart, well-thought-out strategies to ensure superiority."}
              </p>
            </div>

            {/* Digital & Field Campaigns */}
            <div className="card-base group flex flex-col p-6 md:p-8">
              <div className="relative w-full aspect-media rounded-xl overflow-hidden mb-6">
                <Image src="/imgs/service imgs/real/advertising_real_1784854291002.jpg" alt="Digital & Field Campaigns" fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" quality={65} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <TrendingUp size={24} />
                </div>
              </div>
              <h3 className="text-h4 text-brand-900 mb-3 group-hover:text-emerald-600 transition-colors">
                {lang === "ar" ? "حملات رقمية وميدانية" : "Digital & Field Campaigns"}
              </h3>
              <p className="text-body text-surface-600 leading-loose flex-1">
                {lang === "ar"
                  ? "إطلاق وإدارة إعلانات جوجل وفيسبوك، تنظيم الفعاليات، وتطوير حملات ترويجية تصل للجمهور المستهدف."
                  : "Launching & managing Google and Facebook ads, organizing events, and developing promotional campaigns that reach the target audience."}
              </p>
            </div>

            {/* Data Analysis */}
            <div className="card-base group flex flex-col p-6 md:p-8">
              <div className="relative w-full aspect-media rounded-xl overflow-hidden mb-6">
                <Image src="/imgs/service imgs/real/tech_solutions_1784854112279.jpg" alt="Data Analysis" fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" quality={65} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <BarChart3 size={24} />
                </div>
              </div>
              <h3 className="text-h4 text-brand-900 mb-3 group-hover:text-emerald-600 transition-colors">
                {lang === "ar" ? "تحليل البيانات" : "Data Analysis"}
              </h3>
              <p className="text-body text-surface-600 leading-loose flex-1">
                {lang === "ar"
                  ? "إعداد تقارير دورية دقيقة، تحليلات شاملة للأداء، وتقديم توصيات استراتيجية مستندة على البيانات الحقيقية."
                  : "Preparing accurate periodic reports, comprehensive performance analytics, and providing strategic recommendations based on real data."}
              </p>
            </div>

            {/* Strategic Consulting */}
            <div className="card-base group flex flex-col p-6 md:p-8">
              <div className="relative w-full aspect-media rounded-xl overflow-hidden mb-6">
                <Image src="/imgs/service imgs/real/brand_identity_1784854043969.jpg" alt="Strategic Consulting" fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" quality={65} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <Briefcase size={24} />
                </div>
              </div>
              <h3 className="text-h4 text-brand-900 mb-3 group-hover:text-emerald-600 transition-colors">
                {lang === "ar" ? "استشارات استراتيجية" : "Strategic Consulting"}
              </h3>
              <p className="text-body text-surface-600 leading-loose flex-1">
                {lang === "ar"
                  ? "عقد جلسات استشارية مع خبراء التسويق، إعداد خطط منهجية، مع المتابعة المستمرة للتطوير."
                  : "Holding consulting sessions with marketing experts, preparing methodological plans, with continuous follow-up for development."}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="section-y-md relative overflow-hidden bg-brand-900">
        <div className="absolute inset-0 bg-emerald-900/10 backdrop-blur-3xl z-0"></div>
        <div className="container-site relative z-10">
          <div className="max-w-3xl mx-auto text-center card-base-glass p-10 md:p-12">
            <h2 className="text-h2 text-white mb-6">
              {lang === "ar" ? "هل تحتاج إلى خطة متكاملة؟" : "Need an integrated plan?"}
            </h2>
            <p className="text-body-lg text-white/80 mb-8 max-w-xl mx-auto leading-loose">
              {lang === "ar"
                ? "نحن هنا لمساعدتك في تحقيق أهدافك التجارية عبر خطط استراتيجية شاملة وحملات مدروسة بعناية."
                : "We are here to help you achieve your business goals through comprehensive strategic plans and carefully designed campaigns."}
            </p>
            <Link href="/contact" className="btn-lg btn-primary inline-flex items-center justify-center gap-2 group">
              {lang === "ar" ? "اطلب استشارة مجانية" : "Request Free Consultation"}
              <ArrowLeft size={20} className={`transform transition-transform group-hover:-translate-x-1 ${lang === "ar" ? "" : "rotate-180 group-hover:translate-x-1 group-hover:-translate-x-0"}`} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
