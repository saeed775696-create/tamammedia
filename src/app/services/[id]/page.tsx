import { PrismaServiceRepository } from "@/lib/repositories/service.repository";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // يُفضل استخدام Image من Next.js للأداء

const serviceRepository = new PrismaServiceRepository();

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await serviceRepository.findById(id);
  if (!service) notFound();

  return (
    <article className="pb-24 bg-surface-100 min-h-screen">
      {/* --- 1. الترويسة العلوية (Hero Banner) --- */}
      <header className="relative bg-brand-900 pt-40 pb-32 overflow-hidden border-b-[6px] border-accent-500">
        {/* زخرفة هندسية في الخلفية مستوحاة من شعاركم */}
        <div 
          className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-bl from-accent-500/10 to-transparent opacity-80 pointer-events-none"
          style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        ></div>

        <div className="container-site relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
            {service.titleAr}
          </h1>
          
          {/* مسار التصفح (Breadcrumbs) */}
          <div className="flex items-center justify-center gap-2 text-sm font-semibold">
            <Link href="/" className="text-gray-300 hover:text-accent-500 transition-colors duration-300">
              الرئيسية
            </Link>
            <span className="text-gray-500">/</span>
            <Link href="/services" className="text-gray-300 hover:text-accent-500 transition-colors duration-300">
              خدماتنا
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-accent-500">{service.titleAr}</span>
          </div>
        </div>
      </header>

      {/* --- 2. المحتوى الرئيسي (Main Content) --- */}
      {/* استخدام -mt-20 لرفع المحتوى فوق الترويسة قليلاً (تأثير بصري رائع) */}
      <div className="container-site relative -mt-20 z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* القسم الأيمن (تفاصيل الخدمة والصورة) */}
          <div className="lg:w-2/3 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden p-6 md:p-10">
            {service.imageUrl && (
              <div className="mb-8 rounded-lg overflow-hidden shadow-md relative group aspect-video">
                <Image
                  src={service.imageUrl}
                  alt={service.titleAr}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* تأثير لوني خفيف عند مرور الماوس */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <span className="text-white font-bold text-lg border-b-2 border-accent-500 pb-1">
                    تمام ميديا للتسويق الرقمي
                  </span>
                </div>
              </div>
            )}

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-brand-900 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-accent-500 rounded-sm block"></span>
                عن الخدمة
              </h2>
              {/* استخدام whitespace-pre-wrap يحافظ على المسافات والأسطر كما كُتبت في لوحة التحكم */}
              <p className="text-gray-600 leading-loose text-[16px] md:text-lg whitespace-pre-wrap">
                {service.descriptionAr}
              </p>
            </div>
          </div>

          {/* القسم الأيسر (الشريط الجانبي / Call to Action) */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 bg-brand-900 rounded-xl shadow-xl overflow-hidden text-center p-8 border-t-4 border-accent-500">
              {/* أيقونة أو شكل زخرفي */}
              <div className="w-16 h-16 bg-accent-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">
                هل تحتاج إلى مساعدة في {service.titleAr}؟
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-8">
                فريقنا الخبير في &quot;تمام ميديا&quot; جاهز لتحويل أفكارك إلى واقع وتحقيق أفضل النتائج لعلامتك التجارية.
              </p>
              
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 w-full bg-accent-500 text-white hover:bg-accent-700 transition-colors duration-300 font-bold py-4 px-8 rounded-md"
              >
                اطلب الخدمة الآن
                <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}