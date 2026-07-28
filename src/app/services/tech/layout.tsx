import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "تطوير المواقع والتطبيقات والمتاجر الإلكترونية",
  description:
    "تصميم وتطوير مواقع سريعة، تطبيقات ومتاجر إلكترونية آمنة للشركات في اليمن ودول الخليج، مع الاستضافة والدعم الفني وتحسين تجربة المستخدم.",
  path: "/services/tech",
});

export default function TechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
