"use client";

import { useEffect } from "react";

export default function ClientScripts() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/main.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}