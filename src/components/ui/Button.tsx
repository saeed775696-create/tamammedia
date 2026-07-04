import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-bold rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-brand-900 text-white hover:bg-brand-800",
      secondary: "bg-accent-500 text-white hover:bg-accent-600",
      outline: "border-2 border-brand-900 text-brand-900 hover:bg-brand-50",
      ghost: "text-brand-900 hover:bg-brand-50"
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg"
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
