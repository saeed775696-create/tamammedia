"use client";

import { Loader2 } from "lucide-react";

type Props = {
  text?: string;
};

/**
 * Loading state مركزي
 */
export default function LoadingState({
  text = "جارٍ التحميل...",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 size={40} className="text-[#da8827] animate-spin mb-4" />
      <p className="text-gray-500 text-sm">{text}</p>
    </div>
  );
}
