import { ImageResponse } from "next/og";
import React from "react";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/svg+xml";

function TreeMark() {
  return React.createElement(
    "svg",
    {
      width: "100%",
      height: "100%",
      viewBox: "0 0 256 256",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    },
    React.createElement("defs", null,
      React.createElement("linearGradient", { id: "bg", x1: "36", y1: "26", x2: "220", y2: "230", gradientUnits: "userSpaceOnUse" },
        React.createElement("stop", { offset: "0%", stopColor: "#eef8ea" }),
        React.createElement("stop", { offset: "100%", stopColor: "#d8edd1" })
      )
    ),
    React.createElement("rect", { x: "8", y: "8", width: "240", height: "240", rx: "68", fill: "url(#bg)" }),
    React.createElement("path", {
      d: "M128 46c21 18 42 30 63 36 0 56-12 98-36 126-8 10-17 18-27 25-10-7-19-15-27-25-24-28-36-70-36-126 21-6 42-18 63-36Z",
      fill: "#2f7d32",
    }),
    React.createElement("path", {
      d: "M128 58c-15 13-29 22-43 27 1 44 10 77 28 98 5 6 9 11 15 16 6-5 10-10 15-16 18-21 27-54 28-98-14-5-28-14-43-27Z",
      fill: "#4c9f50",
      opacity: "0.92",
    }),
    React.createElement("path", {
      d: "M112 138h32v70h-32z",
      fill: "#8a5a2b",
      rx: "10",
    }),
    React.createElement("path", {
      d: "M109 74c10 11 20 20 31 27 12-7 22-16 32-27-10-4-21-10-32-18-11 8-21 14-31 18Z",
      fill: "#dff3d3",
      opacity: "0.9",
    }),
    React.createElement("circle", { cx: "192", cy: "64", r: "12", fill: "#7bcf6b", opacity: "0.85" })
  );
}

export default function Icon() {
  return new ImageResponse(TreeMark(), size);
}
