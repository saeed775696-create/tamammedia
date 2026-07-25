import React from 'react';
import { cn } from '@/lib/utils';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'default' | 'muted' | 'lead' | 'large' | 'small' | 'caption' | 'label';
  as?: React.ElementType;
}

export function Text({ className, variant = 'default', as: Component = 'p', ...props }: TextProps) {
  const variants = {
    default: "text-body text-brand-900",
    muted: "text-body-sm text-surface-500",
    lead: "text-body-lg text-brand-700",
    large: "text-h6 text-brand-900",
    small: "text-body-sm font-medium text-brand-900",
    caption: "text-caption text-surface-400",
    label: "text-label text-brand-900",
  };

  return <Component className={cn(variants[variant], className)} {...props} />;
}