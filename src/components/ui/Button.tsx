import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg" | "icon"
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50"

    const variants = {
      primary:
        "bg-gradient-to-b from-brand-700 to-brand-900 text-white hover:from-brand-800 hover:to-brand-950 shadow-sm shadow-brand-900/20 hover:shadow-md hover:shadow-brand-900/30 hover:-translate-y-0.5 active:translate-y-0 border border-brand-600/50",
      secondary:
        "bg-gradient-to-b from-accent-400 to-accent-600 text-white hover:from-accent-500 hover:to-accent-700 shadow-sm shadow-accent-500/30 hover:shadow-md hover:shadow-accent-500/40 hover:-translate-y-0.5 active:translate-y-0 border border-accent-300/50",
      outline:
        "border border-surface-200 bg-white text-brand-800 hover:bg-surface-50 hover:border-brand-300 hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0",
      ghost: "text-brand-700 hover:bg-surface-100 hover:text-brand-900 active:scale-95",
      danger: "bg-gradient-to-b from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-sm shadow-red-500/20 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 border border-red-400/50",
    }

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-9 px-4 text-sm",
      lg: "h-10 px-5 text-base",
      icon: "h-9 w-9",
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ms-1 me-1.5 h-3.5 w-3.5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {!isLoading && leftIcon && <span className="ms-0.5">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="me-0.5">{rightIcon}</span>}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }