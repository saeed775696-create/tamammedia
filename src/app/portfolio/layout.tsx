import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "أعمالنا في التسويق والتصميم وتطوير المواقع",
  description:
    "استعرض مشاريع تمام ميديا في تطوير المواقع والمتاجر الإلكترونية، تصميم الهويات البصرية، المحتوى والحملات الرقمية لعلامات تجارية يمنية وإقليمية.",
  path: "/portfolio",
});

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
