"use client";

import { useState, useEffect } from "react";
import { Check, Loader2, AlertCircle, RefreshCw } from "lucide-react";

type Status = "idle" | "saving" | "saved" | "error";

type Props = {
  status: Status;
  onSave?: () => void;
  onReset?: () => void;
  hasChanges?: boolean;
};

/**
 * شريط حفظ عائم في أسفل الشاشة
 * يظهر عند وجود تغييرات
 */
export default function SaveBar({ status, onSave, onReset, hasChanges }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hasChanges) {
      setVisible(true);
    } else if (status === "saved") {
      const t = setTimeout(() => setVisible(false), 1500);
      return () => clearTimeout(t);
    }
  }, [hasChanges, status]);

  if (!visible && status !== "saving") return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 lg:right-auto lg:left-60 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white border-t border-gray-200 shadow-lg px-4 sm:px-6 py-3 flex items-center justify-between gap-4 max-w-3xl">
        <div className="flex items-center gap-2.5">
          {status === "saving" && (
            <>
              <Loader2 size={16} className="animate-spin text-[#da8827]" />
              <span className="text-[13px] text-gray-600">جارٍ الحفظ...</span>
            </>
          )}
          {status === "saved" && (
            <>
              <Check size={16} className="text-green-600" />
              <span className="text-[13px] text-green-700 font-medium">
                تم الحفظ
              </span>
            </>
          )}
          {status === "error" && (
            <>
              <AlertCircle size={16} className="text-red-600" />
              <span className="text-[13px] text-red-700">فشل الحفظ</span>
            </>
          )}
          {status === "idle" && hasChanges && (
            <>
              <span className="w-2 h-2 rounded-full bg-[#da8827]" />
              <span className="text-[13px] text-gray-700">
                لديك تغييرات غير محفوظة
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onReset && (
            <button
              onClick={onReset}
              disabled={status === "saving"}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[13px] font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={13} />
              تراجع
            </button>
          )}
          {onSave && (
            <button
              onClick={onSave}
              disabled={status === "saving" || !hasChanges}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#da8827] text-white text-[13px] font-medium rounded-lg hover:bg-[#b8701e] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "saving" ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Check size={13} strokeWidth={2.5} />
              )}
              حفظ التغييرات
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
