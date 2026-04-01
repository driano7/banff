import { HeadingTypewriter } from "@/components/heading-typewriter"
import { ScrollReveal } from "@/components/scroll-reveal"
import { getSiteCopy, type Locale } from "@/lib/site-content"

const packageSurfaces = [
  "from-accent/20 via-background to-primary/10",
  "from-sky-400/20 via-background to-accent/15",
  "from-emerald-400/20 via-background to-accent/15",
] as const

const packageChipSurfaces = [
  "bg-gradient-to-br from-accent/20 via-background to-primary/12 text-[color:var(--accent)] border-accent/20",
  "bg-gradient-to-br from-sky-400/20 via-background to-accent/10 text-sky-700 border-sky-400/20 dark:text-sky-200",
  "bg-gradient-to-br from-emerald-400/20 via-background to-accent/10 text-emerald-700 border-emerald-400/20 dark:text-emerald-200",
] as const

type PackagesPageContentProps = {
  locale: Locale
}

export function PackagesPageContent({ locale }: PackagesPageContentProps) {
  const copy = getSiteCopy(locale)

  return (
    <main id="packages-scope" className="mx-auto w-full max-w-6xl px-4 pb-8 pt-32 sm:px-6 lg:pt-36">
      <HeadingTypewriter scopeSelector="#packages-scope" />

      <ScrollReveal direction="up" once className="mt-2">
        <section className="grid gap-4 rounded-[2rem] border border-border/60 bg-card/80 p-5 text-card-foreground dark:bg-card/70 md:grid-cols-[1.05fr_0.95fr] md:p-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--accent)]">
              {copy.packages.eyebrow}
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-card-foreground md:text-3xl">
              {locale === "es"
                ? "Paquetes flexibles que se ajustan al proyecto, no al revés."
                : locale === "fr"
                  ? "Des forfaits flexibles qui s’adaptent au projet, pas l’inverse."
                  : "Flexible packages that adapt to the project, not the other way around."}
            </h2>
            <p className="text-sm leading-7 text-muted-foreground md:text-base">{copy.packages.description}</p>
          <div className="flex flex-wrap gap-2">
              {(locale === "es"
                ? ["Landing rápida", "Sitio de conversión", "Plataforma web + mobile"]
                : locale === "fr"
                  ? ["Landing rapide", "Site de conversion", "Plateforme web + mobile"]
                  : ["Launch site", "Conversion site", "Web + mobile platform"]
              ).map((item, index) => (
                <span
                  key={item}
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${packageChipSurfaces[index % packageChipSurfaces.length]}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            {(locale === "es"
              ? [
                  "Definimos el alcance",
                  "Ajustamos la estructura",
                  "Escalamos si el proyecto lo pide",
                ]
              : locale === "fr"
                ? [
                    "Nous définissons le périmètre",
                    "Nous ajustons la structure",
                    "Nous faisons évoluer le projet si besoin",
                  ]
                : [
                    "We define the scope",
                    "We adjust the structure",
                    "We scale when the project needs it",
                  ]
            ).map((item, index) => (
              <div key={item} className="rounded-2xl border border-border/60 bg-background/75 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">0{index + 1}</p>
                <p className="mt-1 text-sm font-semibold text-card-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {copy.packages.cards.map((card, index) => (
          <ScrollReveal key={card.title} direction={index % 2 === 0 ? "up" : "down"} delay={0.08 + index * 0.08}>
            <article
              className={`rounded-[2rem] border border-border/70 bg-card/75 p-3 shadow-[0_10px_35px_-24px_rgba(2,6,23,0.55)] transition ${
                index === 1 ? "md:translate-y-4" : ""
              }`}
            >
              <div className={`relative h-full overflow-hidden rounded-[1.4rem] border border-border/70 bg-gradient-to-br p-5 ${packageSurfaces[index % packageSurfaces.length]}`}>
                <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-accent/20 blur-xl" />
                <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-primary/20 blur-xl" />
                <div className="relative space-y-3">
                  <span className="inline-flex rounded-full border border-border/70 bg-background/75 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                    {card.badge}
                  </span>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.summary}</p>
                  <ul className="space-y-2 pt-2 text-sm leading-relaxed text-foreground">
                    {card.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="pt-2 text-xs leading-relaxed text-muted-foreground">{card.note}</p>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </section>
    </main>
  )
}
