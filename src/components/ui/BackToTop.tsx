"use client";

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useHideLayout } from '@/hooks/useHideLayout';

interface BackToTopProps {
  threshold?: number;
  className?: string;
}

export default function BackToTop({ 
  threshold = 300,
  className = ''
}: BackToTopProps) {
  const [visible, setVisible] = useState(false);
  const { lang } = useLanguage();
  const hideLayout = useHideLayout();

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  /* Positioning: physical LEFT side, stacked directly above FloatingWhatsApp
     (WhatsApp: bottom-5/6 + h-14 → top edge ≈ 76/80px; +16px gap → 92/96px).
     The Tawk.to bubble owns bottom-right, so the left stack never overlaps.
     pointer-events-none while hidden so it can't block content clicks. */
  // Hidden on dashboard/login — matches Navbar/Footer visibility.
  if (hideLayout) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-[92px] sm:bottom-24 left-5 sm:left-6 z-[90] transition-all duration-500 ease-out
        ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}
        ${className}
      `}
      aria-label={lang === 'ar' ? 'العودة للأعلى' : 'Back to top'}
    >
      <div className="group relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-accent-500 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Button */}
        <div className="relative bg-white text-brand-900 w-14 h-14 rounded-xl shadow-2xl border border-slate-200 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-brand-600 group-hover:to-accent-500 group-hover:text-white transition-all duration-500">
          <ArrowUp size={24} className="transform group-hover:-translate-y-1 transition-transform duration-300" />
        </div>
        
        {/* Tooltip — centered above the button */}
        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-brand-900 text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
            {lang === 'ar' ? 'العودة للأعلى' : 'Back to top'}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-brand-900"></div>
        </div>
      </div>
    </button>
  );
}