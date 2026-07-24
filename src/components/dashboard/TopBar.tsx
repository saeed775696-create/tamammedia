"use client"

import { useContext } from "react"
import { usePathname } from "next/navigation"
import { DashboardContext } from "@/app/dashboard/DashboardProvider"
import { Menu, Bell, Search } from "lucide-react"
import { IconButton } from "@/components/ui/IconButton"
import { Input } from "@/components/ui/Input"
import { useSession } from "next-auth/react"

const routeNames: Record<string, string> = {
  "/dashboard": "نظرة عامة",
  "/dashboard/portfolio": "الأعمال",
  "/dashboard/services": "الخدمات",
  "/dashboard/team": "الفريق",
  "/dashboard/partners": "الشركاء",
  "/dashboard/contacts": "الرسائل",
}

export default function TopBar() {
  const { data: session } = useSession()
  const dashboardContext = useContext(DashboardContext)
  const toggleSidebar = dashboardContext?.toggleSidebar ?? (() => {})
  
  const pathname = usePathname()
  
  // Find matching route name
  let pageTitle = "لوحة التحكم"
  for (const [route, name] of Object.entries(routeNames)) {
    if (pathname === route || pathname?.startsWith(route + "/")) {
      pageTitle = name
      if (route === "/dashboard" && pathname !== "/dashboard") {
        pageTitle = "لوحة التحكم" // fallback if matching /dashboard/something_else
      }
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-surface-200/50 bg-white/70 px-4 sm:px-8 lg:px-10 backdrop-blur-2xl shadow-sm">
      <div className="flex items-center gap-4">
        <div className="lg:hidden flex">
          <IconButton
            variant="ghost"
            icon={<Menu className="h-5 w-5" />}
            aria-label="Toggle mobile sidebar"
            onClick={dashboardContext?.toggleMobileSidebar}
            className="text-brand-900"
          />
        </div>
        <div className="hidden lg:flex">
          <IconButton
            variant="ghost"
            icon={<Menu className="h-5 w-5" />}
            aria-label="Toggle desktop sidebar"
            onClick={toggleSidebar}
            className="text-brand-900"
          />
        </div>
        <h1 className="text-xl font-bold text-brand-900 hidden sm:block">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative hidden md:block w-64">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
          <Input
            placeholder="بحث..."
            className="ps-10 rounded-full bg-surface-50 h-10 border-transparent focus-visible:border-brand-500"
          />
        </div>

        <div className="relative">
          <IconButton
            variant="ghost"
            className="text-brand-900 rounded-full"
            icon={<Bell className="h-5 w-5" />}
            aria-label="Notifications"
          />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border border-white pointer-events-none" />
        </div>

        <div className="h-8 w-px bg-surface-200 mx-1 hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end text-end">
            <span className="text-sm font-bold text-brand-900 leading-none">
              {session?.user?.name || "Admin"}
            </span>
            <span className="text-xs text-surface-500 mt-1">
              {session?.user?.role || "Administrator"}
            </span>
          </div>
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-brand-200 bg-brand-50 flex items-center justify-center text-brand-700 font-bold">
             {session?.user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
        </div>
      </div>
    </header>
  )
}
