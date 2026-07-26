"use client";

import { useEffect } from "react";

export default function TawkChat() {
  useEffect(() => {
    const interactionEvents: Array<keyof WindowEventMap> = [
      "pointerdown",
      "keydown",
      "scroll",
    ];
    let loaded = false;

    const removeInteractionListeners = () => {
      interactionEvents.forEach((event) => window.removeEventListener(event, loadChat));
    };

    const loadChat = () => {
      if (loaded || document.getElementById("tawk-chat-script")) return;
      loaded = true;
      removeInteractionListeners();

      const tawkWindow = window as typeof window & {
        Tawk_API?: Record<string, unknown>;
        Tawk_LoadStart?: Date;
      };
      tawkWindow.Tawk_API ??= {};
      tawkWindow.Tawk_LoadStart = new Date();

      const script = document.createElement("script");
      script.id = "tawk-chat-script";
      script.async = true;
      script.src = "https://embed.tawk.to/6a5e9fa84693711d483c2f32/1ju0pvbj9";
      script.charset = "UTF-8";
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    };

    interactionEvents.forEach((event) =>
      window.addEventListener(event, loadChat, { once: true, passive: true })
    );

    return removeInteractionListeners;
  }, []);

  return null;
}
