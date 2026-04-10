export type AnalyticsEventType = "page_view" | "cta_click"

export type AnalyticsPageType =
  | "home"
  | "about"
  | "services"
  | "packages"
  | "portfolio"
  | "blog_index"
  | "blog_post"
  | "case_study"
  | "other"

export type AnalyticsDeviceCategory = "mobile" | "tablet" | "desktop" | "unknown"

export type AnalyticsReferrerCategory = "direct" | "internal" | "search" | "social" | "external"

export type AnalyticsTrackInput = {
  pagePath: string
  canonicalPath: string
  pageTitle: string
  pageType: AnalyticsPageType
  locale: string
  visitorId: string
  sessionId: string
  timeOnPage: number
  scrollDepth: number
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

export type AnalyticsEvent = AnalyticsTrackInput & {
  id: string
  createdAt: string
  referrerHost: string | null
  referrerCategory: AnalyticsReferrerCategory
  deviceCategory: AnalyticsDeviceCategory
}

export type AnalyticsDailyPoint = {
  date: string
  label: string
  views: number
  sessions: number
  visitors: number
  avgTimeOnPage: number
  avgScrollDepth: number
}

export type AnalyticsPageRow = {
  path: string
  title: string
  pageType: AnalyticsPageType
  locale: string
  views: number
  sessions: number
  visitors: number
  avgTimeOnPage: number
  avgScrollDepth: number
  bounceRate: number
}

export type AnalyticsSimpleRow = {
  label: string
  value: number
  percentage: number
}

export type AnalyticsTotals = {
  views: number
  sessions: number
  visitors: number
  ctaClicks: number
  avgTimeOnPage: number
  avgScrollDepth: number
  engagementRate: number
  bounceRate: number
}

export type MonthlyAnalyticsReport = {
  monthKey: string
  monthLabel: string
  generatedAt: string
  totals: AnalyticsTotals
  dailySeries: AnalyticsDailyPoint[]
  topPages: AnalyticsPageRow[]
  topReferrers: AnalyticsSimpleRow[]
  localeBreakdown: AnalyticsSimpleRow[]
  deviceBreakdown: AnalyticsSimpleRow[]
  pageTypeBreakdown: AnalyticsSimpleRow[]
  charts: {
    lineChartSvg: string
    barChartSvg: string
  }
}
