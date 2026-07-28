import PageHeader from "@/components/dashboard/PageHeader";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";
import { AppError } from "@/lib/api";
import { loadAnalyticsDashboard } from "@/lib/analytics/dashboard.server";

export default async function AnalyticsPage() {
  let initialData = null;
  let initialError: { code?: string; message: string } | null = null;

  try {
    initialData = await loadAnalyticsDashboard("30d");
  } catch (error) {
    initialError =
      error instanceof AppError
        ? { code: error.code, message: error.message }
        : { message: "تعذر تحميل إحصاءات Google Analytics حاليًا." };
  }

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="إحصاءات الزوار"
        subtitle="تابع الزيارات والمشاهدات والجلسات ومصادر الوصول من Google Analytics."
        breadcrumbs={[
          { label: "لوحة التحكم", href: "/dashboard" },
          { label: "إحصاءات الزوار" },
        ]}
      />
      <AnalyticsDashboard
        initialData={initialData}
        initialError={initialError}
      />
    </div>
  );
}
