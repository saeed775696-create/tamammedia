import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const data = await req.json();
  const updated = await prisma.portfolioItem.update({
    where: { id },
    data: {
      ...data,
      gallery: Array.isArray(data.gallery)
        ? JSON.stringify(data.gallery)
        : data.gallery,
      technologies: Array.isArray(data.technologies)
        ? JSON.stringify(data.technologies)
        : data.technologies,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.portfolioItem.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
