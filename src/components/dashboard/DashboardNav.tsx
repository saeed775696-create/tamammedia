"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState, useContext } from "react"
import { DashboardContext } from "@/app/dashboard/DashboardProvider"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderOpen,
  Wrench,
  MessageSquare,
  Briefcase,
  Users,
  LogOut,
  X,
} from "lucide-react"

const links = [
  { href: "/dashboard", label: "نظرة عامة", icon: LayoutDashboard },
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
] as const

export default function DashboardNav() {
  const pathname = usePathname()
  const [contactsCount, setContactsCount] = useState(0)
  const [loggingOut, setLoggingOut] = useState(false)
  const dashboardContext = useContext(DashboardContext)
  const isSidebarCollapsed = dashboardContext?.isSidebarCollapsed ?? false
  const mobileOpen = dashboardContext?.isMobileSidebarOpen ?? false
  const closeMobileSidebar = dashboardContext?.closeMobileSidebar ?? (() => {})

  // Fetch unread contacts count periodically
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/contacts")
        if (res.ok) {
          const data = await res.json()
          const items = data?.data?.items || data?.items || []
          if (Array.isArray(items)) {
            const newCount = items.filter(
              (c: { status?: string }) => c.status === "new"
            ).length
            setContactsCount(newCount)
          }
        }
      } catch {
        // silent
      }
    }
    fetchCount()
    const interval = setInterval(fetchCount, 60_000)
    return () => clearInterval(interval)
  }, [pathname])

  useEffect(() => {
    closeMobileSidebar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const handleSignOut = async () => {
    if (loggingOut) return
    setLoggingOut(true)
    await signOut({ callbackUrl: "/" })
  }

  const renderSidebar = (collapsed: boolean) => (
    <div className="flex h-full flex-col bg-brand-950 text-white transition-all duration-300 relative overflow-hidden">
      {/* Subtle glowing orb in background */}
      <div className="absolute top-0 start-0 w-full h-64 bg-gradient-to-b from-brand-800/20 to-transparent pointer-events-none" />
      {/* Brand Section */}
      <div className={cn("flex items-center relative transition-all duration-300", collapsed ? "px-0 justify-center h-20" : "px-8 py-8")}>
        <Link href="/dashboard" className="flex items-center gap-4 group">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-300 font-black text-white shadow-accent transition-all group-hover:scale-105">
            T
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0 transition-opacity duration-300 delay-100">
              <h1 className="text-[17px] font-bold tracking-wide text-white">
                تمام ميديا
              </h1>
              <p className="mt-0.5 text-[12px] font-medium tracking-wider text-white/50 uppercase">
                Admin Panel
              </p>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-6 py-4 custom-scrollbar">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname?.startsWith(link.href + "/") && link.href !== "/dashboard"
          const badge = "badgeKey" in link && link.badgeKey === "contacts" && contactsCount > 0 ? contactsCount : null
          const Icon = link.icon

          return (
            <Link
              key={link.href}
              href={link.href}
              title={collapsed ? link.label : undefined}
              className={cn(
                "group relative flex items-center rounded-xl transition-all duration-300 overflow-hidden",
                collapsed ? "justify-center p-3" : "gap-4 px-5 py-3.5",
                isActive
                  ? "bg-gradient-to-r from-accent-500 to-accent-400 text-white shadow-lg shadow-accent-500/25"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              {isActive && (
                <div className="absolute start-0 top-1/2 h-1/2 w-1 -translate-y-1/2 rounded-e-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              )}

              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
                className={cn("shrink-0 transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")}
              />
              
              {!collapsed && (
                <span className={cn("flex-1 truncate text-[14px] transition-opacity duration-300", isActive ? "font-bold" : "font-medium")}>
                  {link.label}
                </span>
              )}

              {badge !== null && !collapsed && (
                <span className={cn("flex h-5.5 min-w-[22px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold transition-all duration-300",
                    isActive
                      ? "bg-white text-accent-500 shadow-inner"
                      : "border border-red-500/30 bg-red-500/20 text-red-400 group-hover:bg-red-500 group-hover:text-white"
                  )}
                >
                  {badge > 99 ? "99+" : badge}
                </span>
              )}
              {badge !== null && collapsed && (
                 <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-brand-900" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Info & Logout */}
      <div className={cn("p-4 mt-auto transition-all duration-300", collapsed ? "px-2" : "px-4")}>
        <div className={cn("relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm", collapsed ? "p-2" : "p-4")}>
          
          {!collapsed && (
             <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-accent-500/20 blur-2xl pointer-events-none" />
          )}

          <button
            onClick={handleSignOut}
            disabled={loggingOut}
            title={collapsed ? "تسجيل الخروج" : undefined}
            className={cn(
              "group relative z-10 flex w-full items-center transition-all duration-300 disabled:opacity-50",
              collapsed ? "justify-center p-2 rounded-xl text-red-400 hover:bg-red-500 hover:text-white" : "justify-between rounded-xl bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20"
            )}
          >
            <div className="flex items-center gap-2">
              <LogOut size={18} className="shrink-0 transition-transform group-hover:-translate-x-1" />
              {!collapsed && <span>تسجيل الخروج</span>}
            </div>
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden shrink-0 flex-col shadow-sidebar transition-all duration-300 lg:flex z-40 relative",
          isSidebarCollapsed ? "w-[88px]" : "w-[280px]"
        )}
      >
        {renderSidebar(isSidebarCollapsed)}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-brand-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => closeMobileSidebar()}
          />

          <aside className="relative h-full w-[280px] max-w-[85vw] bg-brand-950 shadow-2xl animate-slide-right flex flex-col">
            <button
              onClick={() => closeMobileSidebar()}
              aria-label="إغلاق القائمة"
              className="absolute start-4 top-4 z-10 rounded-xl border border-white/10 bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <X size={20} />
            </button>
            <div className="h-full w-full overflow-hidden">
               {renderSidebar(false)}
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
