import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  try {
    return twMerge(clsx(inputs));
  } catch {
    // Fallback: simple join if twMerge fails (e.g., some edge/bundler scenarios)
    return clsx(inputs);
  }
}

export function isSafeExternalUrl(value: string | null | undefined) {
  if (!value) return false;

  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}
