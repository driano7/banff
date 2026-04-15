"use client"

import { DotBackground } from "@/components/core/dot-background"
import { useEffect, useState } from "react"
import type { ThemeMode } from "@/lib/theme"

type SiteParticleBackgroundProps = {
  theme: ThemeMode
}

// AGENCY_OWNED: theme-aware decorative background wrapper.
export function SiteParticleBackground({ theme }: SiteParticleBackgroundProps) {
  const [isDark, setIsDark] = useState(theme === "dark")

  useEffect(() => {
    const root = document.documentElement

    const syncTheme = () => {
      setIsDark(root.classList.contains("dark"))
    }

    syncTheme()

    const observer = new MutationObserver(syncTheme)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {isDark ? (
        <>
          <DotBackground
            className="opacity-100 mix-blend-normal"
            quantity={300}
            speed={0.168}
            radiusScale={1.15}
            alphaScale={2.2}
            accentRatio={0}
            baseColor="255, 255, 255"
            accentColor="255, 255, 255"
            opacity={1}
          />
          <DotBackground
            className="opacity-100 mix-blend-normal"
            quantity={110}
            speed={0.11}
            radiusScale={1}
            alphaScale={1.05}
            accentRatio={1}
            baseColor="224, 58, 30"
            accentColor="224, 58, 30"
            opacity={0.66}
          />
        </>
      ) : (
        <>
          <DotBackground
            className="opacity-100 mix-blend-normal"
            quantity={620}
            speed={0.24}
            radiusScale={1.48}
            alphaScale={1.59}
            accentRatio={0}
            baseColor="18, 18, 16"
            accentColor="18, 18, 16"
            opacity={0.62}
          />
          <DotBackground
            className="opacity-100 mix-blend-normal"
            quantity={220}
            speed={0.12}
            radiusScale={0.98}
            alphaScale={0.94}
            accentRatio={1}
            baseColor="224, 58, 30"
            accentColor="224, 58, 30"
            opacity={0.37}
          />
        </>
      )}
    </div>
  )
}
