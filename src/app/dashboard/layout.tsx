import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { Toaster } from "react-hot-toast";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "admin") redirect("/login?error=forbidden");

  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      <DashboardNav />
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8 dashboard-content">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
      <Toaster position="top-center" />
    </div>
  );
}
