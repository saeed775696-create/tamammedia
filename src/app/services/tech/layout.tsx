export const metadata = {
  title: "الخدمات التقنية - تمام ميديا",
  description:
    "تطوير مواقع وتطبيقات، متاجر إلكترونية، استضافة وأمن معلومات في اليمن.",
  alternates: {
    canonical: "/services/tech",
  },
};

export default function TechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}