import { ImageResponse } from "next/og"

import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo"

export const runtime = "edge"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 20% 20%, rgba(233, 171, 123, 0.34) 0%, rgba(10, 14, 24, 0.96) 42%, rgba(7, 10, 18, 1) 100%)",
          color: "white",
          padding: 64,
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 760 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.74)",
            }}
          >
            <div
              style={{
                width: 78,
                height: 78,
                borderRadius: 26,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(233,171,123,0.2))",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 18px 70px rgba(0,0,0,0.35)",
              }}
            >
              <span style={{ fontSize: 34 }}>🌲</span>
            </div>
            {SITE_NAME}
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 74,
              lineHeight: 0.96,
              letterSpacing: -2,
              fontWeight: 800,
            }}
          >
            Technology and professional development
          </h1>
          <p style={{ margin: 0, maxWidth: 680, fontSize: 28, lineHeight: 1.35, color: "rgba(255,255,255,0.8)" }}>
            {SITE_DESCRIPTION}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}

