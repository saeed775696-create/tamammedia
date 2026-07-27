import { NextRequest } from "next/server";
import { ApiResponseHandler, AppError, requireAdmin } from "@/lib/api";
import { analyticsPeriodSchema } from "@/lib/validations";
import { loadGoogleAnalyticsConnection } from "@/lib/analytics/credentials.server";
import { getGoogleAnalyticsDashboardData } from "@/lib/analytics/google-analytics.server";

export async function GET(request: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(request, async () => {
    const period = analyticsPeriodSchema.parse(
      request.nextUrl.searchParams.get("period") || "30d"
    );
    const connection = await loadGoogleAnalyticsConnection();

    if (!connection) {
      throw new AppError({
        message:
          "اربط Google Analytics من إعدادات الموقع لعرض إحصاءات الزوار.",
        statusCode: 409,
        code: "GOOGLE_ANALYTICS_NOT_CONNECTED",
      });
    }

    return getGoogleAnalyticsDashboardData({
      ...connection,
      period,
    });
  });
}
