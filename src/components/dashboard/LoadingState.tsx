"use client";

import { Loader2 } from "lucide-react";

type Props = {
  text?: string;
};

export default function LoadingState({
  text = "جارٍ التحميل...",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 size={28} className="text-[#da8827] animate-spin mb-3" />
      <p className="text-gray-500 text-[13px]">{text}</p>
    </div>
  );
}
