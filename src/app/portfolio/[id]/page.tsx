import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
  const project = await prisma.portfolioItem.findUnique({ where: { id } });

  if (!project) notFound();

  const gallery = parseGallery(project.gallery);
  const technologies = parseGallery(project.technologies);

  return (
    <div className="container py-16">
      {/* صورة رئيسية */}
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full h-80 mb-8 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={project.imageUrl}
            alt={project.titleAr}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
          />
        </div>

        <h1 className="text-3xl font-bold mb-4">{project.titleAr}</h1>
        <p className="text-gray-600 mb-6">{project.descriptionAr}</p>

        {/* معلومات سريعة */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {project.clientName && (
            <div className="bg-gray-50 p-3 rounded">
              <span className="text-xs text-gray-500">العميل</span>
              <p className="font-semibold">{project.clientName}</p>
            </div>
          )}
          {project.completionDate && (
            <div className="bg-gray-50 p-3 rounded">
              <span className="text-xs text-gray-500">تاريخ الإنجاز</span>
              <p className="font-semibold">{project.completionDate}</p>
            </div>
          )}
          {project.category && (
            <div className="bg-gray-50 p-3 rounded">
              <span className="text-xs text-gray-500">التصنيف</span>
              <p className="font-semibold">{project.category}</p>
            </div>
          )}
        </div>

        {/* معرض الصور */}
        {gallery.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">معرض الصور</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((url, i) => (
                <div key={i} className="relative h-40 rounded overflow-hidden">
                  <Image
                    src={url}
                    alt={`${project.titleAr} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* التقنيات */}
        {technologies.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">التقنيات المستخدمة</h2>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, i) => (
                <span
                  key={i}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* فيديو */}
        {project.videoUrl && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">فيديو المشروع</h2>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={project.videoUrl}
                className="absolute top-0 left-0 w-full h-full rounded"
                allowFullScreen
                title="فيديو المشروع"
              />
            </div>
          </div>
        )}

        {/* أزرار الإجراء */}
        <div className="flex gap-4 mt-8">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              زيارة المشروع
            </a>
          )}
          <Link href="/contact" className="btn btn-outline-dark">
            طلب خدمة مماثلة
          </Link>
        </div>
      </div>
    </div>
  );
}
