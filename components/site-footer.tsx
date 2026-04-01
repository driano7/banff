import Link from "next/link"
import { Github, Mail, Send, Smartphone, Phone } from "lucide-react"

import { getSiteCopy, type Locale } from "@/lib/site-content"

type SiteFooterProps = {
  locale: Locale
}

export function SiteFooter({ locale }: SiteFooterProps) {
  const copy = getSiteCopy(locale)
  const hasMultipleTelegrams = copy.contact.telegrams.length > 1
  const hasMultipleEmails = copy.contact.emails.length > 1

  return (
    <footer className="relative mt-8 border-t border-black/10 bg-white/75 backdrop-blur-xl dark:bg-black/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
          {copy.contact.telegrams.map((telegram, index) => (
            <Link
              key={telegram}
              href={telegram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-foreground transition-colors hover:border-[color:var(--accent)]/30 hover:text-[color:var(--accent)] dark:border-white/10 dark:bg-white/5"
            >
              <Send className="h-3.5 w-3.5" />
              Telegram{index === 0 && hasMultipleTelegrams ? " (main)" : ""}
            </Link>
          ))}
          <Link
            href="https://wa.me/16472230271"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-foreground transition-colors hover:border-[color:var(--accent)]/30 hover:text-[color:var(--accent)] dark:border-white/10 dark:bg-white/5"
          >
            <Smartphone className="h-3.5 w-3.5" />
            WhatsApp
          </Link>
          <a
            href={`tel:${copy.contact.phone.replace(/[^+\d]/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-foreground transition-colors hover:border-[color:var(--accent)]/30 hover:text-[color:var(--accent)] dark:border-white/10 dark:bg-white/5"
          >
            <Phone className="h-3.5 w-3.5" />
            Call
          </a>
          {copy.contact.emails.map((email, index) => (
            <a
              key={email}
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-foreground transition-colors hover:border-[color:var(--accent)]/30 hover:text-[color:var(--accent)] dark:border-white/10 dark:bg-white/5"
            >
              <Mail className="h-3.5 w-3.5" />
              Email{index === 0 && hasMultipleEmails ? " (main)" : ""}
            </a>
          ))}
          <Link
            href="https://github.com/driano7"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-foreground transition-colors hover:border-[color:var(--accent)]/30 hover:text-[color:var(--accent)] dark:border-white/10 dark:bg-white/5"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </Link>
        </div>

        <div className="flex flex-col gap-2 border-t border-black/5 pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-foreground">{copy.brand.name}</p>
          <p>© 2026 {copy.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
