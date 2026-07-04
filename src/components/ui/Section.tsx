import React from 'react';
import { cn } from '@/lib/utils';

export function Section({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn("py-12 md:py-24 lg:py-32", className)}
      {...props}
    />
  );
}
