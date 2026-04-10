import { DotBackground } from "@/components/core/dot-background"
import type { ThemeMode } from "@/lib/theme"

type SiteParticleBackgroundProps = {
  theme: ThemeMode
}

// AGENCY_OWNED: theme-aware decorative background wrapper.
export function SiteParticleBackground({ theme }: SiteParticleBackgroundProps) {
  const isDark = theme === "dark"

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <DotBackground
        className="opacity-100 mix-blend-soft-light"
        quantity={320}
        speed={0.168}
        accentRatio={0.24}
        baseColor={isDark ? "255, 187, 117" : "214, 122, 44"}
        accentColor={isDark ? "255, 226, 192" : "255, 154, 72"}
        opacity={isDark ? 0.7 : 0.9}
      />
    </div>
  )
}
