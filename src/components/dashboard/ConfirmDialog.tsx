"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, Info, CheckCircle, AlertCircle } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

type Props = {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info" | "success";
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
};

const variantStyles = {
  danger: {
    iconWrapper: "text-red-500 bg-red-100 shadow-[0_0_15px_rgba(239,68,68,0.3)]",
    button: "bg-red-600 hover:bg-red-700 shadow-red-500/20 focus:ring-red-500",
    icon: AlertCircle,
  },
  warning: {
    iconWrapper: "text-amber-500 bg-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    button: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20 focus:ring-amber-500",
    icon: AlertTriangle,
  },
  info: {
    iconWrapper: "text-blue-500 bg-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    button: "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20 focus:ring-blue-500",
    icon: Info,
  },
  success: {
    iconWrapper: "text-emerald-500 bg-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    button: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20 focus:ring-emerald-500",
    icon: CheckCircle,
  },
};

export default function ConfirmDialog({
  open,
  title = "تأكيد الإجراء",
  message,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  variant = "danger",
  onConfirm,
  onCancel,
}: Props) {
  const [loading, setLoading] = useState(false);
  const styles = variantStyles[variant];
  const IconComponent = styles.icon;

  const handleConfirm = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await onConfirm();
      onCancel();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={loading ? () => {} : onCancel}
      size="sm"
      footer={
        <>
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 w-full sm:w-auto"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`px-6 py-2.5 ${styles.button} text-white font-bold rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full sm:w-auto`}
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? "جارٍ التنفيذ..." : confirmText}
          </button>
        </>
      }
    >
      <div className="flex flex-col items-center text-center sm:flex-row sm:text-right sm:items-start gap-5 pt-4 pb-2">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${styles.iconWrapper}`}
        >
          <IconComponent size={28} strokeWidth={2.5} />
        </div>
        <div className="flex-1 mt-1">
          <h3 className="text-xl font-bold text-[#11112b] mb-2">{title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed font-medium">{message}</p>
        </div>
      </div>
    </Modal>
  );
}
