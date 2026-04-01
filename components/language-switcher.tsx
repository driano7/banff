"use client"

import { Globe } from "lucide-react"
import { usePathname } from "next/navigation"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { resolveLocalePath } from "@/lib/navigation"
import { locales, type Locale } from "@/lib/site-content"

const LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
}

type LanguageSwitcherProps = {
  locale: Locale
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname()

  const setLocale = (nextLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`
    window.location.assign(resolveLocalePath(pathname, nextLocale))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 rounded-full border-black/10 bg-white/80 px-3 text-xs font-semibold text-foreground shadow-sm hover:bg-white dark:border-white/10 dark:bg-black/50 dark:text-white dark:hover:bg-black/60"
        >
          <Globe className="h-4 w-4" />
          <span>{LABELS[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-40 rounded-2xl border-black/10 bg-white/95 p-2 shadow-2xl dark:border-white/10 dark:bg-black/60 dark:text-white"
      >
        {locales.map((item) => (
          <DropdownMenuItem
            key={item}
            className="cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-foreground outline-none focus:bg-[color:var(--accent)]/10 focus:text-foreground dark:text-white/90 dark:focus:bg-white/10 dark:focus:text-white"
            onClick={() => setLocale(item)}
          >
            {LABELS[item]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
