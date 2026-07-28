// Authentication pages keep a per-request CSP nonce. They intentionally stay
// dynamic even though their visible shell contains no server data.
export const dynamic = "force-dynamic";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
