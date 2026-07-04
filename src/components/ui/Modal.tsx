import React from 'react';
import { cn } from '@/lib/utils';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children, className, ...props }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900/50 backdrop-blur-sm">
      <div 
        className={cn("bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto", className)}
        {...props}
      >
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl font-bold text-brand-900">{title}</h2>}
          <button 
            onClick={onClose}
            className="text-brand-400 hover:text-brand-900 transition-colors"
          >
            ✕
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
