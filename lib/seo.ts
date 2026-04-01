const DEFAULT_SITE_URL = "http://localhost:3000"

export const SITE_NAME = "Banff Studio"
export const SITE_DESCRIPTION =
  "Bilingual web and mobile development with UX/UI, AI-assisted delivery, and Web3-aware execution for Mexico and Canada."
export const OG_IMAGE_PATH = "/opengraph-image"

export function getSiteUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!rawUrl) return DEFAULT_SITE_URL

  return rawUrl.endsWith("/") ? rawUrl.slice(0, -1) : rawUrl
}

export function getMetadataBaseUrl() {
  try {
    return new URL(getSiteUrl())
  } catch {
    return new URL(DEFAULT_SITE_URL)
  }
}

export const SOCIAL_LINKS = [
  "https://github.com/driano7",
  "https://t.me/driano7",
  "https://t.me/riaygarcia4",
] as const

