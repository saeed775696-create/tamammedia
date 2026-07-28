"use client";

import Image from "next/image";
import { useState } from "react";

type DashboardImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  fallbackSrc?: string;
};

export default function DashboardImage({
  src,
  alt,
  sizes,
  className,
  fallbackSrc = "/imgs/2-3.png",
}: DashboardImageProps) {
  const normalizedSrc = src || fallbackSrc;
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const currentSrc = failedSrc === normalizedSrc ? fallbackSrc : normalizedSrc;

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      sizes={sizes}
      quality={65}
      className={className}
      onError={() => {
        if (currentSrc !== fallbackSrc) setFailedSrc(normalizedSrc);
      }}
    />
  );
}
