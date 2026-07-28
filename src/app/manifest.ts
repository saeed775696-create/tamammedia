import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "تمام ميديا | Tamam Media",
    short_name: "تمام ميديا",
    description:
      "وكالة تسويق رقمي وتطوير مواقع وهوية بصرية تخدم اليمن ودول الخليج.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#21214f",
    lang: "ar",
    dir: "rtl",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
