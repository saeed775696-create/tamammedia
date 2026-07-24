import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl border border-surface-200/80 bg-surface-50/50 px-4 py-2 text-[14px] text-brand-900 shadow-sm transition-all duration-300 placeholder:text-surface-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50 focus-visible:border-accent-500 focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-50",
          error ? "border-red-500 focus-visible:ring-red-500/50 focus-visible:border-red-500" : "",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
