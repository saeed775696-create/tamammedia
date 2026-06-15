export const metadata = {
  title: "أعمالنا - تمام ميديا",
  description:
    "استعرض أحدث مشاريعنا في تصميم المواقع والمتاجر والهويات البصرية والفيديو. أعمال احترافية من وكالة تمام ميديا في اليمن.",
  alternates: {
    canonical: "/portfolio",
    languages: { ar: "/portfolio", en: "/portfolio" },
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}