import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

/**
 * يتأكد أن الطلب قادم من مستخدم مسجَّل دخوله بصلاحية admin.
 * يُرجع null إذا كان مسموحًا، أو NextResponse بخطأ 401/403 إذا ممنوع.
 *
 * الاستخدام:
 *   const guard = await requireAdmin();
 *   if (guard) return guard;
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Authentication required" } },
      { status: 401 }
    );
  }
  if (session.user.role !== "admin") {
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "Admin access required" } },
      { status: 403 }
    );
  }
  return null;
}
