import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          borderRadius: 92,
          background:
            "linear-gradient(145deg, #10132f 0%, #21214f 58%, #353587 100%)",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: 999,
            background: "rgba(218, 136, 39, 0.2)",
            right: -130,
            top: -140,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 300,
            height: 300,
            borderRadius: 78,
            background: "#da8827",
            boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
            fontSize: 132,
            fontWeight: 900,
            letterSpacing: -12,
            paddingRight: 12,
          }}
        >
          TM
        </div>
      </div>
    ),
    size
  );
}
