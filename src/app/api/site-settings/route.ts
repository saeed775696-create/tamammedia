import { NextRequest } from "next/server";
import { ApiResponseHandler, requireAdmin } from "@/lib/api";
import { saveSiteSettings, getSiteSettings } from "@/lib/site-settings.server";
import { siteSettingsSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(request, getSiteSettings);
}

export async function PUT(request: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(request, async () => {
    const settings = siteSettingsSchema.parse(await request.json());
    const saved = await saveSiteSettings(settings);

    return saved;
  }, { successMessage: "تم حفظ إعدادات الموقع" });
}
