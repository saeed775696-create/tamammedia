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

  // التحقق من الوجود AND الدور
  if (!session) redirect("/login");
  if (session.user.role !== "admin") redirect("/login?error=forbidden");

  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      <DashboardNav />
      <main className="flex-1 overflow-y-auto p-6 md:p-8 dashboard-content">
        {children}
      </main>
      <Toaster position="top-center" />
    </div>
  );
}
