import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <div className="container py-20">
      <div className="max-w-4xl mx-auto">
        {service.imageUrl && (
          <img
            src={service.imageUrl}
            alt={service.titleAr}
            className="w-full h-64 object-cover rounded mb-8"
          />
        )}
        <h1 className="text-3xl font-bold mb-4">{service.titleAr}</h1>
        <p className="text-gray-600 mb-6">{service.descriptionAr}</p>
        <Link href="/contact" className="btn btn-primary">
          طلب الخدمة
        </Link>
      </div>
    </div>
  );
}