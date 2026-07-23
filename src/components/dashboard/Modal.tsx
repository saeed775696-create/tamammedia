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
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-3xl",
};

/**
 * Modal component احترافي مع:
 * - إغلاق بـ ESC key
 * - إغلاق عند النقر خارج الـ modal
 * - منع scroll في الـ background
 * - responsive على الموبايل (يأخذ كامل الشاشة من الأسفل)
 * - دعم RTL
 * - أحجام أكثر منطقية
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

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

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
        className={`relative bg-white w-full ${sizeClasses[size]} max-h-[95vh] sm:max-h-[90vh] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col my-0 sm:my-8`}
        style={{
          animation: "modalSlideIn 0.2s ease-out",
        }}
      >
        {title && (
          <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 flex-shrink-0">
            <h2
              id="modal-title"
              className="text-base sm:text-lg font-bold text-[#21214f]"
            >
              {title}
            </h2>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="إغلاق"
              className="text-gray-400 hover:text-red-500 hover:rotate-90 transition-all p-1.5 bg-white rounded-lg shadow-sm w-8 h-8 flex items-center justify-center"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="overflow-y-auto flex-1 p-5">{children}</div>

        {footer && (
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex flex-col-reverse sm:flex-row justify-end gap-2 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
