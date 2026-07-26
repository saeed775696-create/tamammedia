"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, Smartphone, Monitor, ShoppingCart, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function TechServicePage() {
  const { lang } = useLanguage();

  return (
    <>
      {/* ─── Hero Section ─── */}
      <PageHero
        badge={lang === "ar" ? "حلول رقمية متقدمة" : "Advanced Digital Solutions"}
        title={lang === "ar" ? "الخدمات التقنية" : "Tech Services"}
        description={
          lang === "ar"
            ? "حلول تقنية متطورة ومخصصة لدفع عجلة نمو أعمالك نحو المستقبل الرقمي."
            : "Advanced and customized tech solutions to drive your business growth towards the digital future."
        }
        breadcrumbs={[
          { label: lang === "ar" ? "الرئيسية" : "Home", href: "/" },
          { label: lang === "ar" ? "الخدمات التقنية" : "Tech Services" },
        ]}
      />

      {/* ─── Services Grid ─── */}
      <section className="section-y-md bg-surface-50 relative">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-8 lg:gap-10 max-w-5xl mx-auto">
            
            {/* App Development */}
            <div className="card-base group flex flex-col p-6 md:p-8">
              <div className="relative w-full aspect-media rounded-xl overflow-hidden mb-6">
                <Image src="/imgs/service imgs/real/app_development_real_1784859099327.jpg" alt="App Development" fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" quality={65} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <Smartphone size={24} />
                </div>
              </div>
              <h3 className="text-h4 text-brand-900 mb-3 group-hover:text-blue-600 transition-colors">
                {lang === "ar" ? "تطوير التطبيقات" : "App Development"}
              </h3>
              <p className="text-body text-surface-600 leading-loose flex-1">
                {lang === "ar"
                  ? "تطبيقات iOS و Android أصلية ومدمجة، بالإضافة لتطبيقات الويب التفاعلية (PWA) المصممة لتجربة مستخدم لا تُنسى."
                  : "Native and cross-platform iOS & Android apps, along with interactive web apps (PWA) designed for an unforgettable UX."}
              </p>
            </div>

            {/* Web Development */}
            <div className="card-base group flex flex-col p-6 md:p-8">
              <div className="relative w-full aspect-media rounded-xl overflow-hidden mb-6">
                <Image src="/imgs/service imgs/real/tech_solutions_1784854112279.jpg" alt="Web Development" fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" quality={65} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <Monitor size={24} />
                </div>
              </div>
              <h3 className="text-h4 text-brand-900 mb-3 group-hover:text-blue-600 transition-colors">
                {lang === "ar" ? "تطوير المواقع" : "Web Development"}
              </h3>
              <p className="text-body text-surface-600 leading-loose flex-1">
                {lang === "ar"
                  ? "مواقع مؤسسية سريعة، لوحات تحكم متكاملة، أنظمة مخصصة، ومدونات مبنية بأحدث التقنيات وأقواها."
                  : "Fast corporate sites, integrated dashboards, custom systems, and blogs built with the latest technologies."}
              </p>
            </div>

            {/* E-Commerce */}
            <div className="card-base group flex flex-col p-6 md:p-8">
              <div className="relative w-full aspect-media rounded-xl overflow-hidden mb-6">
                <Image src="/imgs/service imgs/real/marketing_campaigns_1784854104204.jpg" alt="E-Commerce" fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" quality={65} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <ShoppingCart size={24} />
                </div>
              </div>
              <h3 className="text-h4 text-brand-900 mb-3 group-hover:text-blue-600 transition-colors">
                {lang === "ar" ? "المتاجر الإلكترونية" : "E-Commerce"}
              </h3>
              <p className="text-body text-surface-600 leading-loose flex-1">
                {lang === "ar"
                  ? "متاجر إلكترونية متكاملة مع بوابات دفع محلية وعالمية، أنظمة إدارة المخزون، وربط بشركات الشحن والتوصيل."
                  : "Complete e-commerce stores with payment gateways, inventory management, and shipping integrations."}
              </p>
            </div>

            {/* Hosting & Security */}
            <div className="card-base group flex flex-col p-6 md:p-8">
              <div className="relative w-full aspect-media rounded-xl overflow-hidden mb-6">
                <Image src="/imgs/service imgs/real/app_development_1784854095919.jpg" alt="Hosting & Security" fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" quality={65} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <ShieldCheck size={24} />
                </div>
              </div>
              <h3 className="text-h4 text-brand-900 mb-3 group-hover:text-blue-600 transition-colors">
                {lang === "ar" ? "استضافة وأمن معلومات" : "Hosting & Security"}
              </h3>
              <p className="text-body text-surface-600 leading-loose flex-1">
                {lang === "ar"
                  ? "استضافات سحابية فائقة السرعة والموثوقية، شهادات SSL، حماية قوية من الهجمات والاختراقات للحفاظ على بياناتك."
                  : "Ultra-fast cloud hosting, SSL certificates, and robust protection against hacks to keep your data secure."}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="section-y-md relative overflow-hidden bg-brand-900">
        <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-3xl z-0"></div>
        <div className="container-site relative z-10">
          <div className="max-w-3xl mx-auto text-center card-base-glass p-10 md:p-12">
            <h2 className="text-h2 text-white mb-6">
              {lang === "ar" ? "هل تبحث عن شريك تقني؟" : "Looking for a tech partner?"}
            </h2>
            <p className="text-body-lg text-white/80 mb-8 max-w-xl mx-auto leading-loose">
              {lang === "ar"
                ? "نحن هنا لتمكين مشاريعك بأحدث ما توصلت إليه التكنولوجيا. دعنا نبرمج المستقبل معاً."
                : "We are here to empower your projects with the latest technology. Let's code the future together."}
            </p>
            <Link href="/contact" className="btn-lg btn-primary inline-flex items-center justify-center gap-2 group">
              {lang === "ar" ? "اطلب هذه الخدمة" : "Request Service"}
              <ArrowLeft size={20} className={`transform transition-transform group-hover:-translate-x-1 ${lang === "ar" ? "" : "rotate-180 group-hover:translate-x-1 group-hover:-translate-x-0"}`} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
