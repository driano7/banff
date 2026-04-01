"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowDownToLine, BookOpenText, BriefcaseBusiness, Coffee, Home, PanelsTopLeft, PocketKnife, UserRound } from "lucide-react"

import { localizedSectionHref } from "@/lib/navigation"
import { cn } from "@/lib/utils"
import type { Locale } from "@/lib/site-content"

type MobileDockProps = {
  locale: Locale
  homeLabel: string
  aboutLabel: string
  packagesLabel: string
  portfolioLabel: string
  blogLabel: string
  servicesLabel: string
}

type DockItem = {
  href: string
  label: string
  icon: typeof Home
}

export function MobileDock({
  locale,
  homeLabel,
  aboutLabel,
  packagesLabel,
  portfolioLabel,
  blogLabel,
  servicesLabel,
}: MobileDockProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const links = useMemo<DockItem[]>(
    () => [
      { href: "/", label: homeLabel, icon: Home },
      { href: localizedSectionHref(locale, "about"), label: aboutLabel, icon: UserRound },
      { href: localizedSectionHref(locale, "packages"), label: packagesLabel, icon: PocketKnife },
      { href: "/portfolio", label: portfolioLabel, icon: PanelsTopLeft },
      { href: localizedSectionHref(locale, "services"), label: servicesLabel, icon: BriefcaseBusiness },
      { href: "/blog", label: blogLabel, icon: BookOpenText },
    ],
    [aboutLabel, blogLabel, homeLabel, locale, packagesLabel, portfolioLabel, servicesLabel],
  )

  const scheduleCollapse = useCallback(() => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current)
    collapseTimer.current = setTimeout(() => {
      setIsCollapsed(true)
    }, 30_000)
  }, [])

  useEffect(() => {
    setIsCollapsed(false)
    scheduleCollapse()
    return () => {
      if (collapseTimer.current) clearTimeout(collapseTimer.current)
    }
  }, [pathname, scheduleCollapse])

  const handleDockInteraction = () => {
    setIsCollapsed(false)
    scheduleCollapse()
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] px-4 sm:hidden">
        <nav
          className={cn(
            "pointer-events-auto relative mx-auto flex w-full max-w-md items-center justify-between gap-1 rounded-[1.55rem] border border-black/10 bg-white/88 px-2 py-1 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-all duration-300 ease-in-out",
            isCollapsed ? "scale-0 opacity-0 translate-y-4 pointer-events-none" : "scale-100 opacity-100 translate-y-0",
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[1.55rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(255,242,226,0.92))]"
          />
          {links.map((item) => {
            const Icon = item.icon
            const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname?.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                onClick={handleDockInteraction}
                className="relative flex flex-1 flex-col items-center justify-center gap-1 py-1"
                aria-label={item.label}
              >
                <span
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-2xl border transition-colors",
                    active
                      ? "border-[color:var(--accent)]/35 bg-[color:var(--accent)]/12 text-[color:var(--accent)]"
                      : "border-black/10 bg-white/80 text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span
                  className={cn(
                    "max-w-[4.5rem] truncate text-[9px] font-medium leading-none",
                    active ? "text-[color:var(--accent)]" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}

          <button
            type="button"
            onClick={() => {
              setIsCollapsed(true)
              if (collapseTimer.current) clearTimeout(collapseTimer.current)
            }}
            aria-label="Collapse dock"
            className="relative flex flex-col items-center justify-center gap-1 px-2 py-1"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-black/10 bg-white/80 text-foreground">
              <ArrowDownToLine className="h-4 w-4" />
            </span>
            <span className="text-[9px] font-medium leading-none text-muted-foreground">Hide</span>
          </button>
        </nav>
      </div>

      <button
        type="button"
        aria-label="Show dock"
        onClick={handleDockInteraction}
        className={cn(
          "pointer-events-auto fixed right-4 bottom-6 z-[71] flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/90 text-foreground shadow-[0_20px_60px_rgba(15,23,42,0.22)] backdrop-blur-xl transition-all duration-300 ease-in-out sm:hidden",
          isCollapsed ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none",
        )}
      >
        <Coffee className="h-5 w-5" />
      </button>

      <div aria-hidden className="h-[calc(4.4rem+env(safe-area-inset-bottom))] sm:hidden" />
    </>
  )
}
