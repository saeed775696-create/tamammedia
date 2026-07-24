import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-12 w-full rounded-2xl border border-surface-200/80 bg-surface-50/50 px-4 py-2 text-[14px] text-brand-900 shadow-sm transition-all duration-300 placeholder:text-surface-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50 focus-visible:border-accent-500 focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238a90aa%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-no-repeat [background-position:left_1rem_center] dir-rtl:[background-position:left_1rem_center] dir-ltr:[background-position:right_1rem_center]",
          error ? "border-red-500 focus-visible:ring-red-500/50 focus-visible:border-red-500" : "",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    )
  }
)
Select.displayName = "Select"

export { Select }
