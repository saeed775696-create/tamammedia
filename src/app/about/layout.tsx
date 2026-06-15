export const metadata = {
  title: "من نحن - تمام ميديا",
  description:
    "تعرف على وكالة تمام ميديا، قصتنا، رؤيتنا، فريقنا، وخدماتنا الرقمية في اليمن.",
  alternates: {
    canonical: "/about",
    languages: { ar: "/about", en: "/about" },
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}