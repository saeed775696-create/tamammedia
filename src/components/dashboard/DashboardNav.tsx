"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FolderOpen,
  Wrench,
  MessageSquare,
  Briefcase,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "الرئيسية", icon: LayoutDashboard },
  { href: "/dashboard/portfolio", label: "الأعمال", icon: FolderOpen },
  { href: "/dashboard/services", label: "الخدمات", icon: Wrench },
  { href: "/dashboard/team", label: "الفريق", icon: Users },
  { href: "/dashboard/partners", label: "الشركاء", icon: Briefcase },
  { href: "/dashboard/contacts", label: "الرسائل", icon: MessageSquare, badgeKey: "contacts" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactsCount, setContactsCount] = useState(0);

  // Fetch unread contacts count periodically
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/contacts");
        if (res.ok) {
          const data = await res.json();
          const items = data?.data?.items || data?.items || [];
          if (Array.isArray(items)) {
            const newCount = items.filter(
              (c: { status?: string }) => c.status === "new"
            ).length;
            setContactsCount(newCount);
          }
        }
      } catch {
        // silent
      }
    };
    fetchCount();
    const interval = setInterval(fetchCount, 60_000); // كل دقيقة
    return () => clearInterval(interval);
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mobile menu on ESC
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const sidebarContent = (
    <>
      {/* الشعار */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#da8827] to-[#e5a04f] rounded-xl flex items-center justify-center font-extrabold text-white shadow-lg group-hover:scale-105 transition-transform">
              T
            </div>
            <div>
              <h1 className="font-bold text-lg text-white">تمام ميديا</h1>
              <p className="text-xs text-white/60">لوحة التحكم</p>
            </div>
          </Link>
        </div>
      </div>

      {/* الروابط */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isActive =
            pathname === link.href || pathname?.startsWith(link.href + "/");
          const badge =
            link.badgeKey === "contacts" && contactsCount > 0
              ? contactsCount
              : null;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-[#da8827] text-white font-bold shadow-lg shadow-[#da8827]/30"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <link.icon size={20} />
              <span className="text-base flex-1">{link.label}</span>
              {badge !== null && (
                <span
                  className={`min-w-[24px] h-6 px-2 rounded-full text-xs font-bold flex items-center justify-center ${
                    isActive
                      ? "bg-white text-[#da8827]"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {badge > 99 ? "99+" : badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* معلومات المستخدم + تسجيل الخروج */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#da8827] to-[#e5a04f] flex items-center justify-center font-bold text-white flex-shrink-0">
            {session?.user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {session?.user?.name || "Admin"}
            </p>
            <p className="text-xs text-white/60 truncate" dir="ltr">
              {session?.user?.email}
            </p>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-red-300 hover:bg-red-500/20 transition-colors"
        >
          <LogOut size={20} />
          <span className="text-base">تسجيل الخروج</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#21214f] text-white flex-col min-h-screen shadow-2xl flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-40 bg-[#21214f] text-white shadow-lg">
        <div className="flex items-center justify-between px-4 h-16">
          <Link
            href="/dashboard"
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#da8827] to-[#e5a04f] rounded-lg flex items-center justify-center font-extrabold text-white text-sm">
              T
            </div>
            <span className="font-bold">تمام ميديا</span>
          </Link>

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="فتح القائمة"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Sidebar */}
          <aside className="relative w-72 max-w-[85vw] bg-[#21214f] text-white flex flex-col shadow-2xl animate-in slide-in-from-right">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="إغلاق القائمة"
              className="absolute top-4 left-4 p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
            >
              <X size={24} />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
