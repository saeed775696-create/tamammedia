import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getActiveUser } from "@/lib/api";
import DashboardNav from "@/components/dashboard/DashboardNav";
import TopBar from "@/components/dashboard/TopBar";
import { DashboardProvider } from "@/app/dashboard/DashboardProvider";
import { Toaster } from "react-hot-toast";

// Dashboard data and the authenticated session are always request-specific.
export const dynamic = "force-dynamic";

// This is defense in depth alongside the HTTP header in next.config.ts. The
// dashboard must remain out of search results even if a crawler reaches it.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getActiveUser();

  if (!user) redirect("/login?error=access-revoked");
  if (user.mustChangePassword) redirect("/change-password");

  return (
    <DashboardProvider>
      <div className="flex h-screen bg-brand-950 text-brand-900 font-sans selection:bg-accent-500/20 selection:text-accent-500 overflow-hidden">
        <DashboardNav role={user.role} />
        <div className="flex-1 flex flex-col min-w-0 lg:p-4 transition-all duration-300 h-screen">
          <div className="flex-1 flex flex-col bg-surface-50 lg:rounded-[2.5rem] overflow-y-auto overflow-x-hidden relative shadow-2xl border border-white/10 ring-1 ring-black/5">
            <TopBar />
            <main className="flex-1 p-4 sm:p-8 lg:p-10 transition-all duration-300">
              <div className="max-w-7xl mx-auto w-full h-full flex flex-col">{children}</div>
            </main>
          </div>
        </div>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
              borderRadius: "12px",
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            },
          }}
        />
      </div>
    </DashboardProvider>
  );
}
