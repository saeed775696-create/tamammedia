import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "خدمات التسويق الرقمي وتطوير المواقع",
  description:
    "خدمات متكاملة تشمل التسويق الرقمي، إدارة الحملات، الهوية البصرية، تصميم المحتوى، وتطوير المواقع والتطبيقات للشركات في اليمن ودول الخليج.",
  path: "/services",
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
