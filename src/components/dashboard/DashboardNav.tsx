"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderOpen,
  Wrench,
  MessageSquare,
  Briefcase,
  Users,
  LogOut,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "الرئيسية", icon: LayoutDashboard },
  { href: "/dashboard/portfolio", label: "الأعمال", icon: FolderOpen },
  { href: "/dashboard/services", label: "الخدمات", icon: Wrench },
  { href: "/dashboard/contacts", label: "الرسائل", icon: MessageSquare },
  { href: "/dashboard/partners", label: "الشركاء", icon: Briefcase },
  { href: "/dashboard/team", label: "الفريق", icon: Users },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside
      style={{ backgroundColor: "#21214f" }}
      className="w-64 text-white flex flex-col shadow-xl"
    >
      {/* الشعار */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#da8827] to-[#e5a04f] rounded-xl flex items-center justify-center font-extrabold text-lg">
            T
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight">تمام ميديا</h1>
            <p className="text-xs text-white/50">لوحة التحكم</p>
          </div>
        </div>
      </div>

      {/* الروابط */}
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-[#da8827] text-white shadow-lg shadow-[#da8827]/30"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <link.icon size={18} />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* تسجيل الخروج */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={18} />
          <span className="font-medium">تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}