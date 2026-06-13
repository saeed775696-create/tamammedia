import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.portfolioItem.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  // تأكد من أن gallery و technologies تأتي كمصفوفات وتحوّل إلى JSON string
  const item = await prisma.portfolioItem.create({
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
  return NextResponse.json(item);
}
