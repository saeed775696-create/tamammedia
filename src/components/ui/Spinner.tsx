import * as React from "react"
import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "brand" | "accent" | "white" | "current"
}

export function Spinner({ className, size = "md", variant = "brand", ...props }: SpinnerProps) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
    xl: "h-16 w-16 border-4",
  }

  const variants = {
    brand: "border-brand-200 border-t-brand-800",
    accent: "border-accent-200 border-t-accent-500",
    white: "border-white/30 border-t-white",
    current: "border-current/30 border-t-current",
  }

  return (
    <div
      role="status"
      className={cn(
        "animate-spin rounded-full",
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}
