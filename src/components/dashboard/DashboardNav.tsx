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
  ChevronLeft,
  FileText,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "الرئيسية", icon: LayoutDashboard },
  { href: "/dashboard/content", label: "تحرير المحتوى", icon: FileText },
  { href: "/dashboard/portfolio", label: "الأعمال", icon: FolderOpen },
  { href: "/dashboard/services", label: "الخدمات", icon: Wrench },
  { href: "/dashboard/team", label: "الفريق", icon: Users },
  { href: "/dashboard/partners", label: "الشركاء", icon: Briefcase },
  {
    href: "/dashboard/contacts",
    label: "الرسائل",
    icon: MessageSquare,
    badgeKey: "contacts",
  },
] as const;

export default function DashboardNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactsCount, setContactsCount] = useState(0);
  const [loggingOut, setLoggingOut] = useState(false);

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
    const interval = setInterval(fetchCount, 60_000);
    return () => clearInterval(interval);
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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

  const handleSignOut = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    await signOut({ callbackUrl: "/" });
  };

  const sidebarContent = (
    <>
      {/* الشعار — حجم أصغر وأنظف */}
      <div className="px-5 py-5 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-gradient-to-br from-[#da8827] to-[#e5a04f] rounded-lg flex items-center justify-center font-extrabold text-white text-base shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
            T
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-[15px] text-white leading-tight">
              تمام ميديا
            </h1>
            <p className="text-[11px] text-white/50 mt-0.5">لوحة التحكم</p>
          </div>
        </Link>
      </div>

      {/* الروابط */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isActive =
            pathname === link.href || pathname?.startsWith(link.href + "/");
          const badge =
            "badgeKey" in link &&
            link.badgeKey === "contacts" &&
            contactsCount > 0
              ? contactsCount
              : null;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-sm ${
                isActive
                  ? "bg-[#da8827] text-white font-semibold shadow-sm shadow-[#da8827]/30"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon
                size={18}
                strokeWidth={isActive ? 2.5 : 2}
                className="flex-shrink-0"
              />
              <span className="flex-1 truncate">{link.label}</span>
              {badge !== null && (
                <span
                  className={`min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-bold flex items-center justify-center ${
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
      <div className="px-3 py-3 border-t border-white/5 space-y-2">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#da8827] to-[#e5a04f] flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
            {session?.user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-white truncate">
              {session?.user?.name || "Admin"}
            </p>
            <p
              className="text-[11px] text-white/50 truncate"
              dir="ltr"
            >
              {session?.user?.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          disabled={loggingOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-red-300 hover:bg-red-500/15 hover:text-red-200 transition-colors text-sm disabled:opacity-50"
        >
          <LogOut size={18} className="flex-shrink-0" />
          <span className="flex-1 text-right">تسجيل الخروج</span>
          <ChevronLeft size={14} className="opacity-50" />
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar — عرض أنسب 240px */}
      <aside className="hidden lg:flex w-60 bg-[#21214f] text-white flex-col min-h-screen shadow-xl flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-40 bg-[#21214f] text-white shadow-lg">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-[#da8827] to-[#e5a04f] rounded-md flex items-center justify-center font-extrabold text-white text-xs">
              T
            </div>
            <span className="font-bold text-sm">تمام ميديا</span>
          </Link>

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="فتح القائمة"
            className="p-2 -mr-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          <aside
            className="relative w-64 max-w-[80vw] bg-[#21214f] text-white flex flex-col shadow-2xl"
            style={{ animation: "mobileNavSlideIn 0.2s ease-out" }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="إغلاق القائمة"
              className="absolute top-3 left-3 p-1.5 hover:bg-white/10 rounded-lg transition-colors z-10"
            >
              <X size={20} />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
