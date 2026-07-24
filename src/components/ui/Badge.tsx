import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "danger" | "success"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-brand-800 text-white hover:bg-brand-900",
    secondary: "border-transparent bg-accent-500 text-white hover:bg-accent-600",
    outline: "text-brand-800 border-brand-200",
    danger: "border-transparent bg-red-100 text-red-800 hover:bg-red-200",
    success: "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
