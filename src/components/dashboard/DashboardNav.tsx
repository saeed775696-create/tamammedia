"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, FolderOpen, Wrench, MessageSquare, Briefcase, Users, LogOut,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "الرئيسية", icon: LayoutDashboard },
  { href: "/dashboard/portfolio", label: "الأعمال", icon: FolderOpen },
  { href: "/dashboard/services", label: "الخدمات", icon: Wrench },
  { href: "/dashboard/team", label: "الفريق", icon: Users },
  { href: "/dashboard/partners", label: "الشركاء", icon: Briefcase },
  { href: "/dashboard/contacts", label: "الرسائل", icon: MessageSquare },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#21214f] text-white flex flex-col min-h-screen shadow-2xl">
      {/* الشعار */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#da8827] to-[#e5a04f] rounded-xl flex items-center justify-center font-extrabold text-white shadow-lg">
            T
          </div>
          <div>
            <h1 className="font-bold text-lg text-white">تمام ميديا</h1>
            <p className="text-xs text-white/60">لوحة التحكم</p>
          </div>
        </div>
      </div>

      {/* الروابط */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
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
              <span className="text-base">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* تسجيل الخروج */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-red-300 hover:bg-red-500/20 transition-colors"
        >
          <LogOut size={20} />
          <span className="text-base">تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}