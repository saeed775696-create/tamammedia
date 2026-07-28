import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "استراتيجيات التسويق والحملات الرقمية المتكاملة",
  description:
    "استراتيجيات تسويق وحملات رقمية وميدانية، استشارات وتحليل أداء لمساعدة الشركات على النمو في السوق اليمني وأسواق السعودية والإمارات والخليج.",
  path: "/services/integrated",
});

export default function IntegratedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
