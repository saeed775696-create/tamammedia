"use client"

import { usePathname } from "next/navigation"

/**
 * Hook لتحديد ما إذا كان يجب إخفاء الـ Header/Footer
 * بناءً على المسار الحالي (مثل لوحة التحكم وصفحة الدخول)
 */
export function useHideLayout(): boolean {
  const pathname = usePathname()
  return pathname.startsWith("/dashboard") || pathname.startsWith("/login") || pathname.startsWith("/change-password") || pathname.startsWith("/forgot-password")
}
