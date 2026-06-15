export const metadata = {
  title: "الخدمات الإبداعية - تمام ميديا",
  description:
    "هوية بصرية، تصميم جرافيكي، إدارة سوشيال ميديا، تصوير وإنتاج فيديو في اليمن.",
  alternates: {
    canonical: "/services/creative",
  },
};

export default function CreativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}