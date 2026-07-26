import { PrismaPortfolioRepository } from "@/lib/repositories/portfolio.repository";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isSafeExternalUrl } from "@/lib/utils";

const portfolioRepository = new PrismaPortfolioRepository();

function parseGallery(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string");
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.filter((v): v is string => typeof v === "string");
    } catch {
      return [];
    }
  }
  return [];
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await portfolioRepository.findById(id);

  if (!project) notFound();

  const gallery = parseGallery(project.gallery);
  const technologies = parseGallery(project.technologies);
  const safeVideoUrl = isSafeExternalUrl(project.videoUrl) ? project.videoUrl : null;
  const safeProjectLink = isSafeExternalUrl(project.link) ? project.link : null;

  return (
    <div className="bg-surface-50 min-h-screen">
      <div className="container-site pt-32 pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full aspect-media mb-10 rounded-2xl overflow-hidden shadow-lg border border-surface-200/60">
            <Image
              src={project.imageUrl}
              alt={project.titleAr}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
          </div>

          <h1 className="text-h1 text-brand-900 mb-5">{project.titleAr}</h1>
          <p className="text-body-lg text-surface-600 leading-loose mb-10 max-w-prose">{project.descriptionAr}</p>

          {/* معلومات سريعة */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12">
            {project.clientName && (
              <div className="card-base p-4 md:p-5">
                <span className="text-label text-surface-500">العميل</span>
                <p className="font-semibold text-brand-900 mt-1">{project.clientName}</p>
              </div>
            )}
            {project.completionDate && (
              <div className="card-base p-4 md:p-5">
                <span className="text-label text-surface-500">تاريخ الإنجاز</span>
                <p className="font-semibold text-brand-900 mt-1">{project.completionDate}</p>
              </div>
            )}
            {project.category && (
              <div className="card-base p-4 md:p-5">
                <span className="text-label text-surface-500">التصنيف</span>
                <p className="font-semibold text-brand-900 mt-1">{project.category}</p>
              </div>
            )}
          </div>

          {/* معرض الصور */}
          {gallery.length > 0 && (
            <div className="mb-12">
              <h2 className="text-h3 text-brand-900 mb-6">معرض الصور</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                {gallery.map((url, i) => (
                  <div key={i} className="relative aspect-card rounded-xl overflow-hidden shadow-sm border border-surface-200/60">
                    <Image
                      src={url}
                      alt={`${project.titleAr} ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* التقنيات */}
          {technologies.length > 0 && (
            <div className="mb-12">
              <h2 className="text-h3 text-brand-900 mb-6">التقنيات المستخدمة</h2>
              <div className="flex flex-wrap gap-2.5">
                {technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-white border border-surface-200 px-4 py-1.5 rounded-full text-body-sm font-medium text-brand-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* فيديو */}
          {safeVideoUrl && (
            <div className="mb-12">
              <h2 className="text-h3 text-brand-900 mb-6">فيديو المشروع</h2>
              <div className="relative aspect-media rounded-2xl overflow-hidden shadow-md border border-surface-200/60">
                <iframe
                  src={safeVideoUrl}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="فيديو المشروع"
                />
              </div>
            </div>
          )}

          {/* أزرار الإجراء */}
          <div className="flex flex-wrap gap-4 pt-4">
            {safeProjectLink && (
              <a
                href={safeProjectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-md btn-primary inline-flex"
              >
                زيارة المشروع
              </a>
            )}
            <Link href="/contact" className="btn-md btn-outline inline-flex">
              طلب خدمة مماثلة
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
