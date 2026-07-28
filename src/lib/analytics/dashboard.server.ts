import { AppError } from "@/lib/api";
import { loadGoogleAnalyticsConnection } from "@/lib/analytics/credentials.server";
import { getGoogleAnalyticsDashboardData } from "@/lib/analytics/google-analytics.server";
import type { AnalyticsPeriod } from "@/types/analytics";

export async function loadAnalyticsDashboard(period: AnalyticsPeriod) {
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
}
