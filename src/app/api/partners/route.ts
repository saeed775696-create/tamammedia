import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(partners);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch partners" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.name || !data.imageUrl) {
      return NextResponse.json(
        { error: "الاسم والصورة مطلوبان" },
        { status: 400 },
      );
    }
    const partner = await prisma.partner.create({
      data: {
        name: data.name,
        imageUrl: data.imageUrl,
        website: data.website || "",
        order: data.order || 0,
      },
    });
    return NextResponse.json(partner);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create partner" },
      { status: 500 },
    );
  }
}
