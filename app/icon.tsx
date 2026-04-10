import { ImageResponse } from "next/og"

export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png"

function TreeMark() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-label="Tree favicon">
      <rect width="100" height="100" rx="26" fill="#eff8ea" />
      <path d="M50 11L24 54h52L50 11Z" fill="#2f7d32" />
      <path d="M50 24L30 59h40L50 24Z" fill="#4c9f50" />
      <path d="M50 40L36 67h28L50 40Z" fill="#6bbf69" />
      <path d="M43 61h14v24H43z" fill="#8a5a2b" />
      <rect x="41" y="58" width="18" height="5" rx="2.5" fill="#70461f" />
      <circle cx="72" cy="28" r="5" fill="#9fd98f" opacity="0.85" />
    </svg>
  )
}

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
          background: "radial-gradient(circle at 35% 30%, #f6fff1 0%, #d7ecd0 55%, #b7d8af 100%)",
          padding: 3,
        }}
      >
        <TreeMark />
      </div>
    ),
    {
      ...size,
    },
  )
}
