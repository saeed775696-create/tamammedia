import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-2xl border border-surface-200/80 bg-surface-50/50 px-4 py-3 text-[14px] text-brand-900 shadow-sm transition-all duration-300 placeholder:text-surface-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50 focus-visible:border-accent-500 focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-50 resize-y",
          error ? "border-red-500 focus-visible:ring-red-500/50 focus-visible:border-red-500" : "",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
