"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, Target, Lightbulb, HeartHandshake, CheckCircle2 } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import PageHero from "@/components/PageHero";

export default function AboutPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ─── Hero Banner ─── */}
      <PageHero
        badge={isAr ? "تعرف على قصتنا" : "Get to know our story"}
        title={isAr ? "من نحن" : "About Us"}
        description={
          isAr
            ? "نحن لا نقدم مجرد تصميم أو خدمة تقنية، بل نبني حضوراً متكاملاً للعلامات التجارية نحو التميز."
            : "We don't just provide design or tech services, we build complete brand presence towards excellence."
        }
        breadcrumbs={[
          { label: isAr ? "الرئيسية" : "Home", href: "/" },
          { label: isAr ? "من نحن" : "About" },
        ]}
        dividerFill="#ffffff"
      />

      {/* --- 2. قسم "من نحن؟" --- */}
      <section className="section-y-md bg-white relative z-10">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            
            {/* Text Section (Right side in RTL) */}
            <div className="order-1 lg:order-none">
              <span className="section-eyebrow mb-6">
                {isAr ? "شريكك الرقمي" : "Your Digital Partner"}
              </span>
              <h2 className="text-h1 text-brand-900 mb-8">
                {isAr ? "من نحن وماذا نمثل؟" : "Who we are and what we represent?"}
              </h2>
              
              <div className="space-y-6 text-body-lg text-surface-600 leading-loose mb-12 max-w-prose">
                <p>
                  {isAr
                    ? "تمام ميديا هي شركة يمنية متخصصة في تقديم الحلول الرقمية والتسويقية المتكاملة برؤية عصرية ومبتكرة."
                    : "Tamam Media is a Yemeni company specialized in integrated digital marketing solutions with a modern and innovative vision."}
                </p>
                <p className="font-semibold text-brand-900 text-h4 leading-relaxed">
                  {isAr
                    ? "اسمنا يعكس وعدنا: الإتقان والاكتمال والرضا. نسعى دائماً لأن نكون الشريك الاستراتيجي الأول لعملائنا في رحلة نجاحهم الرقمي."
                    : "Our name reflects our promise: excellence, completeness, and satisfaction. We strive to be the first strategic partner for our clients."}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 md:gap-5">
                {[
                  isAr ? "خبرة محلية وعالمية" : "Local & Global Expertise",
                  isAr ? "حلول ذكية ومبتكرة" : "Smart & Innovative Solutions",
                  isAr ? "فريق عمل محترف" : "Professional Team",
                  isAr ? "أسعار تنافسية ممتازة" : "Competitive Pricing",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-surface-100 shadow-sm hover:border-accent-500/30 transition-colors duration-300">
                    <CheckCircle2 className="text-accent-500 w-5 h-5 flex-shrink-0" />
                    <span className="font-semibold text-brand-900 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Orbit Section (Left side in RTL) */}
            <div className="order-2 lg:order-none relative w-full flex justify-center items-center min-h-[400px] md:min-h-[500px] py-10">
              
              {/* Outer Dashed Orbit */}
              <div className="absolute w-[300px] h-[300px] md:w-[420px] md:h-[420px] border-[2px] border-dashed border-gray-200 rounded-full animate-[spin_40s_linear_infinite]"></div>
              
              {/* Inner Dashed Orbit */}
              <div className="absolute w-[200px] h-[200px] md:w-[280px] md:h-[280px] border-[2px] border-dashed border-accent-500/40 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>

              {/* Central Logo Core */}
              <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-brand-900 to-[#3a3a7a] rounded-full flex flex-col items-center justify-center shadow-[0_0_40px_rgba(33,33,79,0.3)] border-4 border-white">
                <span className="text-white text-3xl md:text-5xl font-black">T</span>
                <div className="absolute inset-0 rounded-full animate-ping bg-accent-500 opacity-20 duration-1000"></div>
              </div>

              {/* Orbiting Icons */}
              {/* Facebook */}
              <div className="absolute top-[0%] md:top-[5%] left-[50%] -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-100 hover:scale-110 transition-transform text-[#1877F2] animate-[bounce_3s_infinite]">
                <FaFacebookF className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              
              {/* Instagram */}
              <div className="absolute bottom-[0%] md:bottom-[5%] left-[50%] -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-100 hover:scale-110 transition-transform text-[#E4405F] animate-[bounce_4s_infinite]">
                <FaInstagram className="w-6 h-6 md:w-7 md:h-7" />
              </div>

              {/* Twitter/X */}
              <div className="absolute top-[50%] left-[0%] md:left-[2%] -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-100 hover:scale-110 transition-transform text-[#1DA1F2] animate-[bounce_3.5s_infinite]">
                <FaTwitter className="w-5 h-5 md:w-6 md:h-6" />
              </div>

              {/* LinkedIn */}
              <div className="absolute top-[50%] right-[0%] md:right-[2%] -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-100 hover:scale-110 transition-transform text-[#0A66C2] animate-[bounce_4.5s_infinite]">
                <FaLinkedinIn className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              
              {/* YouTube */}
              <div className="absolute top-[15%] right-[10%] md:right-[12%] w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-100 hover:scale-110 transition-transform text-[#FF0000] animate-[bounce_3.2s_infinite]">
                <FaYoutube className="w-6 h-6 md:w-7 md:h-7" />
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* --- 3. الرؤية، والرسالة، والقيم (Bento Box Layout) --- */}
      <section className="section-y-md bg-slate-50 relative z-10">
        <div className="container-site relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-8 max-w-5xl mx-auto">
            
            {/* Vision */}
            <div className="card-base p-8 md:p-10 group flex flex-col items-start">
              <div className="w-14 h-14 bg-accent-500 rounded-2xl flex items-center justify-center mb-8 shadow-md">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-h3 text-brand-900 mb-4 group-hover:text-accent-600 transition-colors duration-300">
                {isAr ? "رؤيتنا" : "Our Vision"}
              </h3>
              <p className="text-body-lg text-surface-600 leading-loose">
                {isAr
                  ? "الريادة في الحلول الرقمية والتسويقية المتكاملة، وتشكيل مستقبل الصناعة الإبداعية في المنطقة بأعلى معايير الجودة."
                  : "Leadership in integrated digital marketing solutions, shaping the future of the creative industry in the region."}
              </p>
            </div>

            {/* Mission */}
            <div className="relative z-10 bg-gradient-to-br from-brand-900 to-brand-800 p-8 md:p-10 rounded-2xl shadow-xl group border border-brand-800 hover:border-accent-500 transition-all duration-500 flex flex-col items-start">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8">
                <Target className="w-7 h-7 text-accent-500" />
              </div>
              <h3 className="text-h3 text-white mb-4">
                {isAr ? "رسالتنا" : "Our Mission"}
              </h3>
              <p className="text-body-lg text-slate-300 leading-loose font-medium">
                {isAr
                  ? "مساعدة الشركات والعلامات التجارية على بناء حضور قوي وفعّال، وتحقيق أهدافها من خلال حلول تسويقية مبتكرة وشراكة استراتيجية مستدامة."
                  : "Helping businesses build a strong presence and achieve their goals through innovative marketing solutions and sustainable partnerships."}
              </p>
            </div>

            {/* Values */}
            <div className="card-base p-8 md:p-10 group flex flex-col items-start">
              <div className="w-14 h-14 bg-accent-500 rounded-2xl flex items-center justify-center mb-8 shadow-md">
                <HeartHandshake className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-h3 text-brand-900 mb-4 group-hover:text-accent-600 transition-colors duration-300">
                {isAr ? "قيمنا" : "Our Values"}
              </h3>
              <ul className="text-body-lg text-surface-600 leading-loose space-y-3 w-full">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-500"></div>
                  {isAr ? "الإتقان في كل تفصيلة" : "Excellence in every detail"}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-500"></div>
                  {isAr ? "الشفافية المطلقة" : "Absolute Transparency"}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-500"></div>
                  {isAr ? "الالتزام بالمواعيد" : "Commitment to Deadlines"}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-500"></div>
                  {isAr ? "التركيز على النتائج" : "Focus on Results"}
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* فاصل هندسي مموج بلون ذهبي جميل */}
      <div className="w-full overflow-hidden leading-[0] bg-slate-50">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[40px] md:h-[80px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="var(--color-accent-500)"
            opacity=".25"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="var(--color-accent-500)"
            opacity=".5"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="var(--color-accent-500)"
          ></path>
        </svg>
      </div>

      {/* --- 5. الدعوة لاتخاذ إجراء (CTA) --- */}
      <section className="section-y relative overflow-hidden bg-brand-900">
        <div className="absolute inset-0 bg-accent-500/10 backdrop-blur-3xl z-0"></div>
        <div className="container-site relative z-10">
          <div className="max-w-4xl mx-auto text-center card-base-glass p-10 md:p-14">
            <h2 className="text-h1 text-white mb-6">
              {isAr ? "هل أنت مستعد لتعزيز حضورك الرقمي؟" : "Ready to grow your digital presence?"}
            </h2>
            <p className="text-body-lg text-white/80 mb-10 max-w-2xl mx-auto leading-loose">
              {isAr
                ? "تواصل مع فريقنا اليوم ودعنا نبدأ قصة نجاحك الجديدة في عالم الأعمال."
                : "Contact our team today and let's start your new success story in the business world."}
            </p>
            <Link href="/contact" className="btn-lg btn-primary inline-flex items-center justify-center gap-3 group">
              {isAr ? "طلب عرض سعر" : "Request a Quote"}
              <ArrowLeft size={22} className={`transform transition-transform group-hover:-translate-x-2 ${isAr ? "" : "rotate-180 group-hover:translate-x-2 group-hover:-translate-x-0"}`} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}