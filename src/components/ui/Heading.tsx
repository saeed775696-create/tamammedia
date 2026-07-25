import React from 'react';
import { cn } from '@/lib/utils';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Heading({ className, level = 2, ...props }: HeadingProps) {
  const Tag = `h${level}` as React.ElementType;
  
  const levels = {
    1: "text-h1",
    2: "text-h2",
    3: "text-h3",
    4: "text-h4",
    5: "text-h5",
    6: "text-h6",
  };

  return <Tag className={cn(levels[level], "text-brand-900", className)} {...props} />;
}