import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const newHash = await bcrypt.hash("admin123", 10);
    await prisma.user.update({
      where: { email: "admin@tamammedia.com" },
      data: { password: newHash },
    });
    return NextResponse.json({ success: true, hash: newHash });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}