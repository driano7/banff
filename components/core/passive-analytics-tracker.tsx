"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

import {
  randomId,
  resolveAnalyticsPageType,
  resolveCanonicalPath,
  resolveDeviceCategory,
  resolveLocaleFromPathname,
  resolveReferrerCategory,
  resolveReferrerHost,
  resolveUtmParams,
  isLikelyBot,
} from "@/lib/analytics/utils"
import type { AnalyticsEventType } from "@/lib/analytics/types"

type TrackerSnapshot = {
  pagePath: string
  canonicalPath: string
  pageTitle: string
  pageType: ReturnType<typeof resolveAnalyticsPageType>
  locale: string
  visitorId: string
  sessionId: string
  startedAt: number
  maxScrollDepth: number
  referrerUrl: string | null
  userAgent: string | null
  screenWidth: number | null
  screenHeight: number | null
  viewportWidth: number | null
  viewportHeight: number | null
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  eventType: AnalyticsEventType
}

type AnalyticsPayload = Omit<TrackerSnapshot, "startedAt" | "maxScrollDepth"> & {
  timeOnPage: number
  scrollDepth: number
}

function getSessionId() {
  if (typeof window === "undefined") return randomId()
  const key = "binff_session_id"
  const existing = window.sessionStorage.getItem(key)
  if (existing) return existing
  const next = randomId()
  window.sessionStorage.setItem(key, next)
  return next
}

function getVisitorId() {
  if (typeof window === "undefined") return randomId()
  const key = "binff_visitor_id"
  const existing = window.localStorage.getItem(key)
  if (existing) return existing
  const next = randomId()
  window.localStorage.setItem(key, next)
  return next
}

function getScrollDepth() {
  if (typeof document === "undefined") return 0
  const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
  const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1

  if (scrollHeight <= viewportHeight) return 100
  const depth = ((scrollTop + viewportHeight) / scrollHeight) * 100
  return Math.max(0, Math.min(100, Math.round(depth)))
}

function sendPayload(payload: AnalyticsPayload) {
  const body = JSON.stringify(payload)
  const blob = new Blob([body], { type: "application/json" })

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics/track", blob)
    return
  }

  void fetch("/api/analytics/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
  })
}

export function PassiveAnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const snapshotRef = useRef<TrackerSnapshot | null>(null)

  useEffect(() => {
    if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
      return
    }

    const flush = () => {
      const current = snapshotRef.current
      if (!current) return

      const timeOnPage = Math.max(0, Math.round((performance.now() - current.startedAt) / 1000))
      if (!current.pagePath) return

      sendPayload({
        pagePath: current.pagePath,
        canonicalPath: current.canonicalPath,
        pageTitle: current.pageTitle,
        pageType: current.pageType,
        locale: current.locale,
        visitorId: current.visitorId,
        sessionId: current.sessionId,
        timeOnPage,
        scrollDepth: current.maxScrollDepth,
        referrerUrl: current.referrerUrl,
        userAgent: current.userAgent,
        screenWidth: current.screenWidth,
        screenHeight: current.screenHeight,
        viewportWidth: current.viewportWidth,
        viewportHeight: current.viewportHeight,
        utmSource: current.utmSource,
        utmMedium: current.utmMedium,
        utmCampaign: current.utmCampaign,
        eventType: current.eventType,
      })
      snapshotRef.current = null
    }

    const canonicalPath = resolveCanonicalPath(pathname)
    const routeLocale = resolveLocaleFromPathname(pathname)
    const currentUrl = new URL(window.location.href)
    const utm = resolveUtmParams(currentUrl)
    const pageType = resolveAnalyticsPageType(pathname)
    const userAgent = navigator.userAgent || null

    snapshotRef.current = {
      pagePath: `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
      canonicalPath,
      pageTitle: document.title,
      pageType,
      locale: routeLocale || document.documentElement.lang || "es",
      visitorId: getVisitorId(),
      sessionId: getSessionId(),
      startedAt: performance.now(),
      maxScrollDepth: getScrollDepth(),
      referrerUrl: document.referrer || null,
      userAgent,
      screenWidth: window.screen?.width ?? null,
      screenHeight: window.screen?.height ?? null,
      viewportWidth: window.innerWidth ?? null,
      viewportHeight: window.innerHeight ?? null,
      utmSource: utm.utmSource,
      utmMedium: utm.utmMedium,
      utmCampaign: utm.utmCampaign,
      eventType: "page_view",
    }

    const onScroll = () => {
      const current = snapshotRef.current
      if (!current) return
      current.maxScrollDepth = Math.max(current.maxScrollDepth, getScrollDepth())
    }

    const onPageHide = () => flush()
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flush()
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("pagehide", onPageHide)
    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("pagehide", onPageHide)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      flush()
    }
  }, [pathname, searchParams])

  return null
}
