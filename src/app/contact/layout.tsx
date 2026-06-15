export const metadata = {
  title: "اتصل بنا - تمام ميديا",
  description:
    "تواصل مع وكالة تمام ميديا في تعز اليمن – بريد، هاتف، وموقع، وخريطة تفاعلية.",
  alternates: {
    canonical: "/contact",
    languages: { ar: "/contact", en: "/contact" },
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}