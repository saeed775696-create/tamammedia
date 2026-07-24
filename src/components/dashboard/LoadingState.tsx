"use client";

import { Loader2 } from "lucide-react";

type Props = {
  text?: string;
};

export default function LoadingState({
  text = "جارٍ التحميل...",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full min-h-[300px]">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[accent-500]/20 blur-xl rounded-full" />
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md relative z-10">
          <Loader2 size={32} className="text-[accent-500] animate-spin" />
        </div>
      </div>
      <p className="text-gray-600 font-bold text-sm tracking-wide">{text}</p>
    </div>
  );
}
