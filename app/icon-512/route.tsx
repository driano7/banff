import { ImageResponse } from "next/og"

export const dynamic = "force-dynamic"

function TreeMark() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-label="Tree icon 512">
      <path d="M50 12c7 0 12 6 12 13 0 3-1 6-3 8 7 1 12 7 12 14 0 8-6 15-14 15H33c-8 0-14-7-14-15 0-7 5-13 12-14-2-2-3-5-3-8 0-7 5-13 12-13z" fill="#2f855a" />
      <path d="M44 57h12v28H44z" fill="#8b5a2b" />
      <path d="M50 53c-6 0-10-4-10-10s4-10 10-10 10 4 10 10-4 10-10 10zm0-6c3 0 5-2 5-4s-2-4-5-4-5 2-5 4 2 4 5 4z" fill="#d6f5d0" opacity="0.95" />
      <path d="M34 41c0-7 5-12 11-13 1 1 3 1 5 1 2 0 4 0 5-1 6 1 11 6 11 13 0 3-1 6-3 8H37c-2-2-3-5-3-8z" fill="#4caf73" opacity="0.9" />
    </svg>
  )
}

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 35% 30%, #b7f7d1 0%, #4f8f5f 55%, #10231a 100%)",
          padding: 52,
          borderRadius: 102,
        }}
      >
        <TreeMark />
      </div>
    ),
    {
      width: 512,
      height: 512,
    },
  )
}
