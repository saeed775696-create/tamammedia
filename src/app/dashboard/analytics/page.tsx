import PageHeader from "@/components/dashboard/PageHeader";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";

export default function AnalyticsPage() {
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
      <AnalyticsDashboard />
    </div>
  );
}
