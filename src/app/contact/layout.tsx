import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "تواصل مع وكالة تسويق رقمي في اليمن والخليج",
  description:
    "تواصل مع فريق تمام ميديا في تعز لمناقشة التسويق الرقمي أو تطوير المواقع أو الهوية البصرية لمشروعك في اليمن والسعودية والإمارات ودول الخليج.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
