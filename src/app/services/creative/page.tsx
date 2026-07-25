"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, Paintbrush, Video, Camera, Megaphone, Layout } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function CreativeServicePage() {
  const { lang } = useLanguage();

  return (
    <>
      {/* ─── Hero Section ─── */}
      <PageHero
        badge={lang === "ar" ? "اصنع هويتك بقوة" : "Build Your Identity"}
        title={lang === "ar" ? "الخدمات الإبداعية" : "Creative Services"}
        description={
          lang === "ar"
            ? "نصنع هوية علامتك التجارية ونجعلها تتحدث بلغة الإبداع الذي يلفت الأنظار ويأسر القلوب."
            : "We craft your brand identity and make it speak the language of creativity that catches eyes and captures hearts."
        }
        breadcrumbs={[
          { label: lang === "ar" ? "الرئيسية" : "Home", href: "/" },
          { label: lang === "ar" ? "الخدمات الإبداعية" : "Creative Services" },
        ]}
      />

      {/* ─── Services Grid ─── */}
      <section className="section-y-md bg-[var(--color-surface-50)] relative">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
            
            {/* Visual Identity */}
            <div className="card-base group flex flex-col p-6 md:p-8">
              <div className="relative w-full aspect-media rounded-xl overflow-hidden mb-6">
                <Image src="/imgs/service imgs/real/visual_identity_real_1784858982810.jpg" alt="Visual Identity" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-3 right-3 w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white border border-white/30">
                  <Layout size={20} />
                </div>
              </div>
              <h3 className="text-h4 text-brand-900 mb-3 group-hover:text-accent-600 transition-colors">
                {lang === "ar" ? "تصميم الهوية البصرية" : "Visual Identity Design"}
              </h3>
              <p className="text-body text-surface-600 leading-loose flex-1">
                {lang === "ar"
                  ? "شعارات، أدلة الهوية، اختيار الألوان والخطوط المؤسسية التي تمثل رؤيتك بأفضل صورة."
                  : "Logos, brand guidelines, and corporate colors & fonts that best represent your vision."}
              </p>
            </div>

            {/* Graphic Design */}
            <div className="card-base group flex flex-col p-6 md:p-8">
              <div className="relative w-full aspect-media rounded-xl overflow-hidden mb-6">
                <Image src="/imgs/service imgs/real/graphic_design_real_1784854299182.jpg" alt="Graphic Design" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <Paintbrush size={24} />
                </div>
              </div>
              <h3 className="text-h4 text-brand-900 mb-3 group-hover:text-accent-600 transition-colors">
                {lang === "ar" ? "التصميم الجرافيكي" : "Graphic Design"}
              </h3>
              <p className="text-body text-surface-600 leading-loose flex-1">
                {lang === "ar"
                  ? "منشورات، بروشورات، إعلانات مطبوعة ورقمية مصممة باحترافية عالية لزيادة التفاعل."
                  : "Posts, brochures, and print & digital ads designed professionally to increase engagement."}
              </p>
            </div>

            {/* Social Media */}
            <div className="card-base group flex flex-col p-6 md:p-8">
              <div className="relative w-full aspect-media rounded-xl overflow-hidden mb-6">
                <Image src="/imgs/service imgs/real/social_media_real_1784854275011.jpg" alt="Social Media" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <Megaphone size={24} />
                </div>
              </div>
              <h3 className="text-h4 text-brand-900 mb-3 group-hover:text-accent-600 transition-colors">
                {lang === "ar" ? "إدارة السوشيال ميديا" : "Social Media Management"}
              </h3>
              <p className="text-body text-surface-600 leading-loose flex-1">
                {lang === "ar"
                  ? "إنشاء محتوى إبداعي، جدولة، تفاعل، وإدارة حملات إعلانية ممولة للوصول لجمهورك."
                  : "Creative content creation, scheduling, engagement & paid ad campaigns to reach your audience."}
              </p>
            </div>

            {/* Photography & Production */}
            <div className="card-base group flex flex-col p-6 md:p-8 lg:col-start-2">
              <div className="relative w-full aspect-media rounded-xl overflow-hidden mb-6">
                <Image src="/imgs/service imgs/real/photography_real_1784858992445.jpg" alt="Photography" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <Camera size={24} />
                </div>
              </div>
              <h3 className="text-h4 text-brand-900 mb-3 group-hover:text-accent-600 transition-colors">
                {lang === "ar" ? "التصوير والإنتاج" : "Photography & Production"}
              </h3>
              <p className="text-body text-surface-600 leading-loose flex-1">
                {lang === "ar"
                  ? "تصوير فوتوغرافي لمنتجاتك، فيديوهات ترويجية، أعمال مونتاج وإخراج فني عالي الجودة."
                  : "Product photography, promotional videos, editing, and high-quality art direction."}
              </p>
            </div>

            {/* Motion Graphics */}
            <div className="card-base group flex flex-col p-6 md:p-8 lg:col-start-3">
              <div className="relative w-full aspect-media rounded-xl overflow-hidden mb-6">
                <Image src="/imgs/service imgs/real/motion_graphics_real_1784859000812.jpg" alt="Motion Graphics" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                  <Video size={24} />
                </div>
              </div>
              <h3 className="text-h4 text-brand-900 mb-3 group-hover:text-accent-600 transition-colors">
                {lang === "ar" ? "الموشن جرافيك" : "Motion Graphics"}
              </h3>
              <p className="text-body text-surface-600 leading-loose flex-1">
                {lang === "ar"
                  ? "رسوم متحركة جذابة، فيديوهات إعلانية قصيرة، وإنفوجرافيك يشرح رسالتك بوضوح."
                  : "Attractive animations, short ads, and infographics that explain your message clearly."}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="section-y-md relative overflow-hidden bg-brand-900">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl z-0"></div>
        <div className="container-site relative z-10">
          <div className="max-w-3xl mx-auto text-center card-base-glass p-10 md:p-12">
            <h2 className="text-h2 text-white mb-6">
              {lang === "ar" ? "هل أنت مستعد للبدء؟" : "Ready to get started?"}
            </h2>
            <p className="text-body-lg text-white/80 mb-8 max-w-xl mx-auto leading-loose">
              {lang === "ar"
                ? "تواصل معنا الآن لنحول أفكارك الإبداعية إلى واقع ملموس يحقق أهدافك بنجاح."
                : "Contact us now to turn your creative ideas into a tangible reality that successfully achieves your goals."}
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