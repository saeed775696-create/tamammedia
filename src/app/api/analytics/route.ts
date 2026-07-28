import { NextRequest } from "next/server";
import { ApiResponseHandler, requireAdmin } from "@/lib/api";
import { loadAnalyticsDashboard } from "@/lib/analytics/dashboard.server";
import { analyticsPeriodSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(request, async () => {
    const period = analyticsPeriodSchema.parse(
      request.nextUrl.searchParams.get("period") || "30d"
    );
    return loadAnalyticsDashboard(period);
  });
}
