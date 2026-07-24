"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl"
}

const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  className,
  ...props
}: ModalProps) {
  const [isRendered, setIsRendered] = React.useState(isOpen)

  React.useEffect(() => {
    if (isOpen) setIsRendered(true)
  }, [isOpen])

  React.useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  const handleAnimationEnd = () => {
    if (!isOpen) setIsRendered(false)
  }

  if (!isRendered) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onTransitionEnd={handleAnimationEnd}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-brand-950/60 backdrop-blur-md transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        className={cn(
          "relative z-50 w-full max-h-[90vh] rounded-3xl bg-white/95 backdrop-blur-xl shadow-modal overflow-hidden flex flex-col border border-surface-200/50 transform transition-all duration-300",
          sizeClasses[size],
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0",
          className
        )}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        {/* Header */}
        <div className={cn(
          "flex flex-col space-y-2 text-center sm:text-start px-8 pt-8 pb-0",
          !title && !description && "hidden"
        )}>
          {title && (
            <h2 className="text-2xl font-extrabold tracking-tight text-brand-900 pe-8">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-[14px] text-surface-500 font-medium">{description}</p>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 end-6 rounded-full p-2 bg-surface-50/50 hover:bg-red-50 hover:text-red-500 text-surface-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 z-10"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-8 py-4 border-t border-surface-100 bg-surface-50/80 flex flex-col-reverse sm:flex-row justify-end gap-3 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
