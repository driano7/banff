"use client"

import Image from "next/image"
import { useTheme } from "next-themes"

export function ThemeLogo() {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  return (
    <span className="relative flex h-10 w-[150px] items-center justify-start overflow-hidden">
      <span key={resolvedTheme ?? "system"} className="inline-flex theme-icon-in">
        <Image
          src={isDarkMode ? "/CripTEC-logo-VER-WHITE.png" : "/CripTEC-logo-VER-COLOR.png"}
          alt="Studio logo"
          width={150}
          height={42}
          className="h-9 w-auto"
          priority
        />
      </span>
    </span>
  )
}

