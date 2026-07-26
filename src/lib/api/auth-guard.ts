import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type ActiveUser = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  mustChangePassword: boolean;
  sessionVersion: number;
};

export async function getActiveUser(): Promise<ActiveUser | null> {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return null;

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      mustChangePassword: true,
      sessionVersion: true,
    },
  });

  if (!user?.isActive) return null;
  if ((session.user.sessionVersion ?? 0) !== user.sessionVersion) return null;
  return user;
}

function unauthorized(message = "Authentication required") {
  return NextResponse.json(
    { success: false, error: { code: "UNAUTHORIZED", message } },
    { status: 401 }
  );
}

/**
 * يتأكد أن الطلب قادم من مستخدم مسجَّل دخوله بصلاحية admin.
 * يُرجع null إذا كان مسموحًا، أو NextResponse بخطأ 401/403 إذا ممنوع.
 *
 * الاستخدام:
 *   const guard = await requireAdmin();
 *   if (guard) return guard;
 */
export async function requireAdmin() {
  const user = await getActiveUser();
  if (!user) return unauthorized();
  if (user.mustChangePassword) {
    return NextResponse.json(
      { success: false, error: { code: "PASSWORD_CHANGE_REQUIRED", message: "Password change is required" } },
      { status: 403 }
    );
  }
  if (user.role !== "admin") {
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "Admin access required" } },
      { status: 403 }
    );
  }
  return null;
}

/** Allows active administrators and editors to manage editorial content. */
export async function requireEditor() {
  const user = await getActiveUser();
  if (!user) return unauthorized();
  if (user.mustChangePassword) {
    return NextResponse.json(
      { success: false, error: { code: "PASSWORD_CHANGE_REQUIRED", message: "Password change is required" } },
      { status: 403 }
    );
  }
  if (user.role !== "admin" && user.role !== "editor") {
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "Editor access required" } },
      { status: 403 }
    );
  }
  return null;
}
