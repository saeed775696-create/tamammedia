import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "الهوية البصرية والتصميم وإدارة المحتوى",
  description:
    "تصميم الهوية البصرية والجرافيك، إدارة محتوى السوشيال ميديا، التصوير والموشن جرافيك للعلامات التجارية في اليمن والسعودية والإمارات والخليج.",
  path: "/services/creative",
});

export default function CreativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
