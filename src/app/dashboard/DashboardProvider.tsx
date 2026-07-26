"use client"

import { createContext, ReactNode, useState, useEffect, useCallback } from "react"
import { SessionProvider } from "next-auth/react"

function getInitialDarkMode() {
  if (typeof window === "undefined") return false

  const storedTheme = localStorage.getItem("dashboardTheme")
  if (storedTheme === "dark") return true
  if (storedTheme === "light") return false
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false
}

interface DashboardContextProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
  isSidebarCollapsed: boolean
  toggleSidebar: () => void
  isMobileSidebarOpen: boolean
  toggleMobileSidebar: () => void
  closeMobileSidebar: () => void
}

export const DashboardContext = createContext<DashboardContextProps | undefined>(undefined)

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("dashboardTheme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("dashboardTheme", "light")
    }
  }, [isDarkMode])

  const toggleDarkMode = useCallback(() => setIsDarkMode((prev) => !prev), [])
  const toggleSidebar = useCallback(() => setIsSidebarCollapsed((prev) => !prev), [])
  const toggleMobileSidebar = useCallback(() => setIsMobileSidebarOpen((prev) => !prev), [])
  const closeMobileSidebar = useCallback(() => setIsMobileSidebarOpen(false), [])

  return (
    <SessionProvider>
      <DashboardContext.Provider
        value={{
          isDarkMode,
          toggleDarkMode,
          isSidebarCollapsed,
          toggleSidebar,
          isMobileSidebarOpen,
          toggleMobileSidebar,
          closeMobileSidebar
        }}
      >
        {children}
      </DashboardContext.Provider>
    </SessionProvider>
  )
}
