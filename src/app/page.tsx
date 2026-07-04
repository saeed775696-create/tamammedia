"use client";

import Hero from "@/components/Hero";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, Sparkles, Users } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
}

interface Partner {
  id: string;
  name: string;
  website?: string;
  imageUrl: string;
}

export default function HomePage() {
  const { lang } = useLanguage();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    fetch("/api/team")
      .then((r) => r.json())
      .then((data) => setTeam(Array.isArray(data) ? data : []))
      .catch(() => setTeam([]));

    fetch("/api/partners")
      .then((r) => r.json())
      .then((data) => setPartners(Array.isArray(data) ? data : []))
      .catch(() => setPartners([]));
  }, []);

  return (
    <>
      <Hero />

      {/* ========== SERVICES ========== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Sparkles size={16} />
              {lang === "ar" ? "خدماتنا" : "Our Services"}
            </div>
            <h2 className="section-title">
              {lang === "ar"
                ? "حلول متكاملة تحت سقف واحد"
                : "All-in-One Solutions"}
            </h2>
            <p className="section-desc">
              {lang === "ar"
                ? "نقدم لك كل ما تحتاجه لبناء حضور رقمي قوي ومؤثر"
                : "Everything you need to build a strong digital presence"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-[var(--secondary)]/10 transition-all duration-300 border border-gray-50 flex flex-col h-full text-center group">
              <Image
                src="/imgs/service imgs/photography.png"
                alt="Creative Services"
                width={80}
                height={80}
                className="object-cover mx-auto mb-6 rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-xl font-bold text-[var(--primary)] mb-4">
                {lang === "ar" ? "الخدمات الإبداعية" : "Creative Services"}
              </h3>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                {lang === "ar"
                  ? "هوية بصرية، تصميم جرافيكي، إدارة سوشيال ميديا، تصوير وإنتاج فيديو."
                  : "Branding, graphic design, social media, video production."}
              </p>
              <Link
                href="/services/creative"
                className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[var(--primary)] text-[var(--primary)] font-semibold hover:bg-[var(--primary)] hover:text-white transition-colors duration-300"
              >
                {lang === "ar" ? "تفاصيل الخدمة" : "Service Details"}
                <ArrowLeft
                  size={18}
                  className={lang === "ar" ? "" : "rotate-180"}
                />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-[var(--secondary)]/10 transition-all duration-300 border border-gray-50 flex flex-col h-full text-center group">
              <Image
                src="/imgs/service imgs/web_design.png"
                alt="Tech Services"
                width={80}
                height={80}
                className="object-cover mx-auto mb-6 rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-xl font-bold text-[var(--primary)] mb-4">
                {lang === "ar" ? "الخدمات التقنية" : "Tech Services"}
              </h3>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                {lang === "ar"
                  ? "تطوير مواقع وتطبيقات، متاجر إلكترونية، استضافة وأمن معلومات."
                  : "Web & app development, e-commerce, hosting & security."}
              </p>
              <Link
                href="/services/tech"
                className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[var(--primary)] text-[var(--primary)] font-semibold hover:bg-[var(--primary)] hover:text-white transition-colors duration-300"
              >
                {lang === "ar" ? "تفاصيل الخدمة" : "Service Details"}
                <ArrowLeft
                  size={18}
                  className={lang === "ar" ? "" : "rotate-180"}
                />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-[var(--secondary)]/10 transition-all duration-300 border border-gray-50 flex flex-col h-full text-center group">
              <Image
                src="/imgs/service imgs/marketing_campaigns.png"
                alt="Integrated Solutions"
                width={80}
                height={80}
                className="object-cover mx-auto mb-6 rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-xl font-bold text-[var(--primary)] mb-4">
                {lang === "ar" ? "الحلول المتكاملة" : "Integrated Solutions"}
              </h3>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                {lang === "ar"
                  ? "خطط تسويقية، حملات رقمية وميدانية، استشارات استراتيجية."
                  : "Marketing strategies, campaigns, and consulting."}
              </p>
              <Link
                href="/services/integrated"
                className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[var(--primary)] text-[var(--primary)] font-semibold hover:bg-[var(--primary)] hover:text-white transition-colors duration-300"
              >
                {lang === "ar" ? "تفاصيل الخدمة" : "Service Details"}
                <ArrowLeft
                  size={18}
                  className={lang === "ar" ? "" : "rotate-180"}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section className="section bg-[#f8f9fc]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Tamam Media"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-col items-start text-start">
              <div className="section-badge mb-4">
                <Users size={16} />
                {lang === "ar" ? "من نحن" : "About Us"}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-6 leading-tight">
                {lang === "ar" ? "تعرف على تمام ميديا" : "About Tamam Media"}
              </h2>
              <p className="text-lg leading-loose text-gray-600 mb-8">
                {lang === "ar"
                  ? "تمام ميديا هي شركة يمنية متخصصة في تقديم الحلول الرقمية والتسويقية المتكاملة. نعمل على تمكين العلامات التجارية من المنافسة بقوة في السوق."
                  : "Tamam Media is a Yemeni company specialized in providing integrated digital and marketing solutions. We empower brands to compete strongly."}
              </p>
              <Link href="/about" className="btn btn-primary inline-flex items-center gap-2">
                {lang === "ar" ? "اقرأ قصتنا" : "Read Our Story"}{" "}
                <ArrowLeft
                  size={18}
                  className={lang === "ar" ? "" : "rotate-180"}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TEAM ========== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Users size={16} />
              {lang === "ar" ? "فريقنا" : "Our Team"}
            </div>
            <h2 className="section-title">
              {lang === "ar"
                ? "خبراء خلف كل مشروع"
                : "Experts Behind Every Project"}
            </h2>
          </div>
          {team.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              {lang === "ar" ? "لا يوجد أعضاء بعد." : "No team members yet."}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-[var(--secondary)]/10 transition-all duration-300 text-center flex flex-col h-full border border-gray-50"
                >
                  <div className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden border-4 border-[var(--secondary)]/20 p-1">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={member.imageUrl || "/imgs/2-3.png"}
                        alt={member.name}
                        fill
                        className="object-cover"
                        unoptimized={!!member.imageUrl?.startsWith("http")}
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--primary)] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[var(--secondary)] font-semibold text-sm">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========== PARTNERS ========== */}
      <section className="section bg-[#f8f9fc]">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Sparkles size={16} />
              {lang === "ar" ? "شركاؤنا" : "Our Partners"}
            </div>
            <h2 className="section-title">
              {lang === "ar" ? "نفخر بالعمل معهم" : "Proud to Work With"}
            </h2>
          </div>
          {partners.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              {lang === "ar" ? "لا يوجد شركاء بعد." : "No partners yet."}
            </p>
          ) : (
            <div className="flex flex-wrap justify-center items-center gap-6 max-w-5xl mx-auto">
              {partners.map((partner) => (
                <a
                  key={partner.id}
                  href={partner.website || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex items-center justify-center w-[160px] h-[100px]"
                >
                  <div className="relative w-full h-full grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300">
                    <Image
                      src={partner.imageUrl}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      unoptimized={partner.imageUrl?.startsWith("http")}
                    />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}