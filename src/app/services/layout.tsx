export const metadata = {
  title: "خدماتنا - تمام ميديا",
  description:
    "خدمات إبداعية، تقنية، ومتكاملة تشمل التصميم، التطوير، والتسويق الرقمي في اليمن.",
  alternates: {
    canonical: "/services",
    languages: { ar: "/services", en: "/services" },
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}