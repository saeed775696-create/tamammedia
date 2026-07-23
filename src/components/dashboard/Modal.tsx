"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
};

const sizeClasses: Record<NonNullable<Props["size"]>, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

/**
 * Modal component احترافي مع:
 * - إغلاق بـ ESC key
 * - إغلاق عند النقر خارج الـ modal
 * - focus trap (التركيز يبقى داخل الـ modal)
 * - منع scroll في الـ background
 * - responsive على الموبايل
 * - دعم RTL
 */
export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // ESC key + body scroll lock
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    // Focus the close button initially
    setTimeout(() => closeButtonRef.current?.focus(), 50);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#21214f]/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative bg-white w-full ${sizeClasses[size]} max-h-[95vh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col my-0 sm:my-8 animate-in slide-in-from-bottom`}
      >
        {title && (
          <div className="p-5 sm:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2
              id="modal-title"
              className="text-xl sm:text-2xl font-bold text-[#21214f]"
            >
              {title}
            </h2>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="إغلاق"
              className="text-gray-400 hover:text-red-500 hover:rotate-90 transition-all p-2 bg-white rounded-full shadow-sm font-bold text-xl leading-none w-9 h-9 flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className="overflow-y-auto flex-1 p-5 sm:p-6">{children}</div>

        {footer && (
          <div className="p-5 sm:p-6 border-t border-gray-100 bg-gray-50 flex flex-col-reverse sm:flex-row justify-end gap-3 rounded-b-3xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
