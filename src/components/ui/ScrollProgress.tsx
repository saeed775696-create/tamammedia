"use client";

import { useEffect, useState } from 'react';

interface ScrollProgressProps {
  className?: string;
  color?: 'brand' | 'accent' | 'gradient';
  height?: number;
}

export default function ScrollProgress({
  className = '',
  color = 'gradient',
  height = 3
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const colorClasses = {
    brand: 'bg-brand-600',
    accent: 'bg-accent-600',
    gradient: 'bg-gradient-to-r from-accent-500 via-brand-600 to-accent-400'
  };

  return (
    <div 
      className={`fixed top-0 left-0 w-full z-[9999] ${className}`}
      style={{ height: `${height}px` }}
    >
      <div 
        className={`h-full transition-all duration-300 ease-out ${colorClasses[color]}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}