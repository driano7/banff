import { ImageResponse } from "next/og"
import React from "react"

export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png"

function TreeMark() {
  return React.createElement(
    "svg",
    {
      width: "100%",
      height: "100%",
      viewBox: "0 0 100 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    },
    React.createElement("rect", { width: "100", height: "100", rx: "26", fill: "#eff8ea" }),
    React.createElement("path", { d: "M50 11L24 54h52L50 11Z", fill: "#2f7d32" }),
    React.createElement("path", { d: "M50 24L30 59h40L50 24Z", fill: "#4c9f50" }),
    React.createElement("path", { d: "M50 40L36 67h28L50 40Z", fill: "#6bbf69" }),
    React.createElement("path", { d: "M43 61h14v24H43z", fill: "#8a5a2b" }),
    React.createElement("rect", { x: "41", y: "58", width: "18", height: "5", rx: "2.5", fill: "#70461f" }),
    React.createElement("circle", { cx: "72", cy: "28", r: "5", fill: "#9fd98f", opacity: "0.85" })
  )
}

export default function Icon() {
  return new ImageResponse(TreeMark(), size);
}
