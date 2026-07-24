import React from 'react';
import { cn } from '@/lib/utils';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Heading({ className, level = 2, ...props }: HeadingProps) {
  const Tag = `h${level}` as React.ElementType;
  
  const levels = {
    1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
    2: "text-3xl font-bold tracking-tight",
    3: "text-2xl font-semibold tracking-tight",
    4: "text-xl font-semibold tracking-tight",
    5: "text-lg font-semibold tracking-tight",
    6: "text-base font-semibold tracking-tight",
  };

  return <Tag className={cn(levels[level], "text-brand-900", className)} {...props} />;
}
