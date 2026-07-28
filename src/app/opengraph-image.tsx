import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/lib/site-settings.server";

export const alt =
  "Tamam Media — Digital marketing and web development across Yemen and the GCC";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const settings = await getSiteSettings();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #10132f 0%, #21214f 52%, #303078 100%)",
          color: "white",
          fontFamily: "Arial, sans-serif",
          padding: "74px 84px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 440,
            height: 440,
            borderRadius: 999,
            background: "rgba(218, 136, 39, 0.18)",
            right: -100,
            top: -150,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 360,
            height: 360,
            borderRadius: 999,
            border: "2px solid rgba(255,255,255,0.08)",
            left: -120,
            bottom: -170,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
            }}
          >
            <div
              style={{
                width: 88,
                height: 88,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 24,
                background: "#da8827",
                fontSize: 35,
                fontWeight: 900,
                letterSpacing: -2,
              }}
            >
              TM
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontSize: 45, fontWeight: 900 }}>
                {settings.branding.nameEn}
              </span>
              <span
                style={{
                  color: "#f3b45f",
                  fontSize: 19,
                  fontWeight: 700,
                  letterSpacing: 3.5,
                  textTransform: "uppercase",
                }}
              >
                Digital Growth Studio
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 850,
              gap: 20,
            }}
          >
            <span
              style={{
                fontSize: 64,
                lineHeight: 1.08,
                fontWeight: 900,
                letterSpacing: -2.5,
              }}
            >
              Marketing, Branding &amp; Technology
            </span>
            <span
              style={{
                fontSize: 27,
                color: "#d9dcef",
                lineHeight: 1.35,
              }}
            >
              Helping ambitious brands grow across Yemen, the GCC and the
              Middle East.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 13,
              fontSize: 20,
              fontWeight: 700,
              color: "#f5c780",
            }}
          >
            <span>YEMEN</span>
            <span style={{ color: "rgba(255,255,255,0.35)" }}>•</span>
            <span>GCC</span>
            <span style={{ color: "rgba(255,255,255,0.35)" }}>•</span>
            <span>MIDDLE EAST</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
