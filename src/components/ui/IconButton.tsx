import * as React from "react"
import { Button, ButtonProps } from "./Button"
import { cn } from "@/lib/utils"

export interface IconButtonProps extends Omit<ButtonProps, "leftIcon" | "rightIcon" | "children"> {
  icon: React.ReactNode
  "aria-label": string
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = "icon", icon, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size={size}
        className={cn("p-0 shrink-0", className)}
        {...props}
      >
        {icon}
      </Button>
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton }
