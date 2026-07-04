import React from 'react';
import { cn } from '@/lib/utils';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'default' | 'muted' | 'lead' | 'large' | 'small';
}

export function Text({ className, variant = 'default', ...props }: TextProps) {
  const variants = {
    default: "text-base text-brand-900",
    muted: "text-sm text-brand-400",
    lead: "text-xl text-brand-400",
    large: "text-lg font-semibold text-brand-900",
    small: "text-sm font-medium leading-none text-brand-900",
  };

  return <p className={cn(variants[variant], className)} {...props} />;
}
