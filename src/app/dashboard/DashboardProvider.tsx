"use client"

import { createContext, ReactNode, useState, useEffect, useCallback } from "react"

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
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  useEffect(() => {
    // Check local storage for user preference on mount
    const storedTheme = localStorage.getItem("dashboardTheme")
    if (storedTheme === "dark") {
      setIsDarkMode(true)
    } else if (storedTheme === "light") {
      setIsDarkMode(false)
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true)
    }
  }, [])

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
  )
}
