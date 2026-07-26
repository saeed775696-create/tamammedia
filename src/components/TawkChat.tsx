"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function TawkChat({ nonce }: { nonce?: string }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const loadChat = () => setShouldLoad(true);
    const interactionEvents: Array<keyof WindowEventMap> = [
      "pointerdown",
      "keydown",
      "scroll",
    ];

    interactionEvents.forEach((event) =>
      window.addEventListener(event, loadChat, { once: true, passive: true })
    );

    // Chat is helpful, but it must not compete with the initial page render.
    // It loads as soon as the browser is idle, on first interaction, or after
    // a conservative fallback delay for visitors who never interact.
    const idleId = window.requestIdleCallback?.(loadChat, { timeout: 6_000 });
    const fallbackId = window.setTimeout(loadChat, 8_000);

    return () => {
      interactionEvents.forEach((event) => window.removeEventListener(event, loadChat));
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      window.clearTimeout(fallbackId);
    };
  }, []);

  if (!shouldLoad) return null;

  return (
    <Script
      id="tawk-chat"
      strategy="afterInteractive"
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
          (function(){
            var s1 = document.createElement("script"),
                s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/6a5e9fa84693711d483c2f32/1ju0pvbj9';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `,
      }}
    />
  );
}
