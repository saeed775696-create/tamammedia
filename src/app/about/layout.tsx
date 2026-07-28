import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "عن تمام ميديا: وكالة تسويق رقمي يمنية",
  description:
    "تعرف على تمام ميديا، وكالة يمنية تجمع التسويق الرقمي والهوية البصرية وتطوير المواقع لخدمة العلامات التجارية في اليمن ودول الخليج.",
  path: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
