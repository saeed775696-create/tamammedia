// Authentication pages keep a per-request CSP nonce.
export const dynamic = "force-dynamic";

export default function ChangePasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
