"use client";

import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import Modal from "./Modal";

type Props = {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
};

const variantStyles = {
  danger: {
    icon: "text-red-500 bg-red-50",
    button: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
  },
  warning: {
    icon: "text-yellow-500 bg-yellow-50",
    button: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
  },
  info: {
    icon: "text-blue-500 bg-blue-50",
    button: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
  },
};

/**
 * Confirm dialog احترافي بدلاً من window.confirm()
 * يدعم:
 * - 3 أنواع (danger, warning, info)
 * - loading state أثناء التأكيد
 * - منع النقر المزدوج
 * - إغلاق بـ ESC
 */
export default function ConfirmDialog({
  open,
  title = "تأكيد",
  message,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  variant = "danger",
  onConfirm,
  onCancel,
}: Props) {
  const [loading, setLoading] = useState(false);
  const styles = variantStyles[variant];

  const handleConfirm = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await onConfirm();
      onCancel(); // إغلاق بعد النجاح
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={loading ? () => {} : onCancel}
      size="sm"
      footer={
        <>
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 w-full sm:w-auto"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`px-6 py-2.5 ${styles.button} text-white font-medium rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full sm:w-auto`}
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? "جارٍ التنفيذ..." : confirmText}
          </button>
        </>
      }
    >
      <div className="flex flex-col items-center text-center sm:flex-row sm:text-right sm:items-start gap-4 pt-2">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${styles.icon}`}
        >
          <AlertTriangle size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[#21214f] mb-1">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{message}</p>
        </div>
      </div>
    </Modal>
  );
}
