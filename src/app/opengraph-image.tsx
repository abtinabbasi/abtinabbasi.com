import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0d",
          color: "#ececf0",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#e8734a" }}>
          {site.url.replace("https://", "")}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, letterSpacing: -2, lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 36, color: "#8e8e98", marginTop: 20 }}>
            {site.role}
          </div>
        </div>
      </div>
    ),
    size
  );
}
