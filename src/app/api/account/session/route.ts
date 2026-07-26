import { NextResponse } from "next/server";
import { getActiveUser } from "@/lib/api";

export async function GET() {
  const user = await getActiveUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Account is unavailable" } },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      id: user.id,
      role: user.role,
      mustChangePassword: user.mustChangePassword,
    },
  });
}
