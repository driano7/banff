import { type ComponentType } from "react"
import {
  FileText,
  Search,
  Sparkles,
} from "lucide-react"

import { HeadingTypewriter } from "@/components/core/heading-typewriter"
import { ScrollReveal } from "@/components/core/scroll-reveal"
import { MdxArticle } from "@/components/core/mdx-article"
import { ServicesPhoneShowcase } from "@/components/services-phone-showcase"
import { readLocalizedMdx, renderMdxToHtml } from "@/lib/mdx"
import { getSiteCopy, type Locale } from "@/content/client/site-content"

const serviceContextSurfaces = [
  "from-accent/20 via-background to-primary/10",
  "from-sky-400/20 via-background to-accent/15",
  "from-emerald-400/20 via-background to-accent/15",
] as const

const serviceContextChipSurfaces = [
  "bg-gradient-to-br from-accent/20 via-background to-primary/12 text-[color:var(--accent)] border-accent/20",
  "bg-gradient-to-br from-sky-400/20 via-background to-accent/10 text-sky-700 border-sky-400/20 dark:text-sky-200",
  "bg-gradient-to-br from-emerald-400/20 via-background to-accent/10 text-emerald-700 border-emerald-400/20 dark:text-emerald-200",
  "bg-gradient-to-br from-accent/20 via-background to-primary/12 text-[color:var(--accent)] border-accent/20",
] as const

type LlmSeoPhase = {
  title: string
  description: string
  bullets: readonly string[]
  icon: ComponentType<{ className?: string }>
}

type LlmSeoModuleCopy = {
  eyebrow: string
  title: string
  description: string
  phases: readonly LlmSeoPhase[]
  appliesText: string
}

const llmSeoModuleCopy: Record<Locale, LlmSeoModuleCopy> = {
  en: {
    eyebrow: "Web positioning (SEO) + AIs",
    title: "What we'll do with your website",
    description:
      "We only apply this to Growth and Scale websites, focused on Google searches and queries made to AI tools.",
    phases: [
      {
        title: "Organize your website",
        description: "We make the structure easier to follow so visitors understand your site quickly.",
        bullets: ["Clear pages", "Simple navigation", "Easy reading"],
        icon: Search,
      },
      {
        title: "Refine your content",
        description: "We adjust the words and messages so your site speaks more clearly to people and AI tools.",
        bullets: ["Better wording", "Focused pages", "Clear message"],
        icon: FileText,
      },
      {
        title: "Help you show up better",
        description: "We prepare your site so it has a stronger chance of appearing in Google and AI results.",
        bullets: ["Google visibility", "AI visibility", "Commercial focus"],
        icon: Sparkles,
      },
    ],
    appliesText: "Only for Growth and Scale websites, and only for Google searches and AI tools.",
  },
  fr: {
    eyebrow: "Positionnement web (SEO) + IA",
    title: "Ce que nous ferons pour votre site",
    description:
      "Nous appliquons cela seulement aux sites Growth et Scale, pour les recherches Google et les demandes faites aux outils d’IA.",
    phases: [
      {
        title: "Organiser votre site",
        description: "Nous rendons la structure plus simple pour que la visite soit plus claire.",
        bullets: ["Pages claires", "Navigation simple", "Lecture facile"],
        icon: Search,
      },
      {
        title: "Ajuster vos contenus",
        description: "Nous adaptons les mots et les messages pour qu’ils parlent mieux aux personnes et aux outils d’IA.",
        bullets: ["Meilleurs mots", "Pages ciblées", "Message clair"],
        icon: FileText,
      },
      {
        title: "Mieux vous faire trouver",
        description: "Nous préparons votre site pour qu’il ait plus de chances d’apparaître dans Google et dans les réponses d’IA.",
        bullets: ["Visibilité Google", "Visibilité IA", "Focus commercial"],
        icon: Sparkles,
      },
    ],
    appliesText: "Seulement pour les sites Growth et Scale, et uniquement pour Google et les outils d’IA.",
  },
  es: {
    eyebrow: "Posicionamiento web (SEO) + IAs",
    title: "Qué haremos con tu web",
    description:
      "Solo lo aplicamos a webs Growth y Scale, y lo enfocamos en búsquedas de Google y consultas hechas a herramientas de IA.",
    phases: [
      {
        title: "Ordenar tu web",
        description: "Dejamos la estructura más clara para que tu sitio se entienda rápido.",
        bullets: ["Páginas claras", "Navegación simple", "Lectura fácil"],
        icon: Search,
      },
      {
        title: "Ajustar tu contenido",
        description: "Cambiamos las palabras y mensajes para que comuniquen mejor a personas y a IA.",
        bullets: ["Mejores palabras", "Páginas clave", "Mensaje claro"],
        icon: FileText,
      },
      {
        title: "Hacerte más visible",
        description: "Preparamos tu web para tener más posibilidades de aparecer en Google y en respuestas de IA.",
        bullets: ["Búsquedas en Google", "Consultas en IA", "Enfoque comercial"],
        icon: Sparkles,
      },
    ],
    appliesText: "Solo para webs Growth y Scale, y solo para búsquedas en Google y herramientas de IA.",
  },
}

type ServicesPageContentProps = {
  locale: Locale
}

// MIXED: localized service copy comes from the client/site, while the surface system and motion are reusable agency UI.
export function ServicesPageContent({ locale }: ServicesPageContentProps) {
  // CLIENTE_OWNED: service descriptions and cards come from the site's editorial model.
  const copy = getSiteCopy(locale)
  const doc = readLocalizedMdx("services", locale) ?? readLocalizedMdx("services", "en")
  const mobileContextCards = copy.services.cards.slice(0, 4)
  const desktopContextCards = copy.services.cards.slice(0, 4)
  const llmSeoCopy = llmSeoModuleCopy[locale]

  if (!doc) return null

  return (
    <main id="services-scope" className="mx-auto w-full max-w-6xl px-4 pb-8 pt-28 sm:px-6 lg:pt-32">
      <HeadingTypewriter scopeSelector="#services-scope" staggerMs={180} />

      <ScrollReveal direction="up">
        <MdxArticle title={doc.title} excerpt={doc.excerpt} html={renderMdxToHtml(doc.content, { centerParagraphs: true })} />
      </ScrollReveal>

      <div className="mt-14 md:mt-16">
        {/* AGENCY_OWNED: reusable service showcase for mobile-first presentation. */}
        <ServicesPhoneShowcase locale={locale} cards={copy.services.cards} />
      </div>

      <ScrollReveal direction="up" className="mt-10">
        <section className="rounded-[2rem] border border-border/60 bg-card/80 p-5 text-card-foreground shadow-[0_18px_55px_-28px_rgba(2,6,23,0.35)] dark:bg-card/70 md:p-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--accent)]">
              {llmSeoCopy.eyebrow}
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-card-foreground md:text-3xl">
              {llmSeoCopy.title}
            </h2>
            <p className="text-sm leading-7 text-muted-foreground md:text-base">{llmSeoCopy.description}</p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {llmSeoCopy.phases.map((phase, index) => {
              const Icon = phase.icon
              const direction = index % 2 === 0 ? "up" : "down"
              const delay = 0.12 + index * 0.12

              return (
                <ScrollReveal key={phase.title} direction={direction as "up" | "down"} delay={delay}>
                  <article className="rounded-[1.6rem] border border-border/60 bg-background/75 p-5 text-left shadow-[0_16px_42px_-30px_rgba(2,6,23,0.28)]">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-card/80 text-[color:var(--accent)]">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <div className="space-y-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="text-lg font-semibold tracking-tight text-foreground">{phase.title}</h3>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{phase.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-foreground">
                      {phase.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
            {llmSeoCopy.appliesText}
          </p>
        </section>
      </ScrollReveal>

      {/* MIXED: the copy is client-owned, while layout, surfaces, and card choreography are reusable. */}
      <section className="mt-10 grid gap-5 rounded-[2rem] border border-border/60 bg-card/80 p-5 text-card-foreground dark:bg-card/70 md:grid-cols-[1.05fr_0.95fr] md:p-6">
        <ScrollReveal direction="up" className="space-y-4 md:flex md:h-full md:flex-col md:justify-center">
          {/* CLIENTE_OWNED: localized service positioning and marketing copy. */}
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--accent)]">
            {locale === "es" ? "Más contexto" : locale === "fr" ? "Plus de contexte" : "More context"}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-card-foreground md:text-3xl">
            {locale === "es"
              ? "No son solo cards: son sistemas que modernizan tu producto."
              : locale === "fr"
                ? "Ce ne sont pas seulement des cartes: ce sont des systèmes qui modernisent votre produit."
                : "These are not just cards: they are systems that modernize your product."}
          </h2>
          <p className="text-sm leading-7 text-muted-foreground md:text-base">
            {locale === "es"
              ? "Podemos rediseñar una app existente, rehacer un sitio web viejo y crear experiencias a medida que sigan los gestos y patrones que la gente ya conoce de sus apps diarias. Sumamos automatización con AI, pagos o experiencias cripto solo cuando realmente aportan valor y con tecnología actual."
              : locale === "fr"
                ? "Nous pouvons refondre une app existante, moderniser un vieux site web et créer des expériences sur mesure qui suivent les gestes et les habitudes déjà connues dans les applications du quotidien. Nous ajoutons l’automatisation IA, les paiements ou les expériences crypto uniquement quand cela apporte une vraie valeur, avec une technologie actuelle."
                : "We can redesign an existing app, rebuild an old website, and create custom experiences that follow the gestures and patterns people already know from their everyday apps. We add AI automation, payments, or crypto experiences only when they truly add value, using current technology."}
          </p>
          <div className="flex flex-wrap gap-2">
            {(locale === "es"
              ? ["A medida", "UX familiar", "Tecnología actual", "AI solo cuando aporta"]
              : locale === "fr"
                ? ["Sur mesure", "UX familière", "Technologie actuelle", "IA seulement si utile"]
                : ["Bespoke builds", "Familiar UX", "Current technology", "AI only when useful"]
            ).map((item, index) => (
              <span
                key={item}
                className={`rounded-full border px-3 py-1 text-xs font-medium shadow-[0_10px_25px_-18px_rgba(2,6,23,0.25)] ${serviceContextChipSurfaces[index % serviceContextChipSurfaces.length]}`}
              >
                {item}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.16} className="space-y-3">
          {/* AGENCY_OWNED: mobile card rhythm and animation pattern. */}
          <div className="grid gap-3 md:hidden">
            {mobileContextCards.map((card, index) => {
              const cardIndex = index + 1
              const isEven = cardIndex % 2 === 0
              const direction = isEven ? "up" : "down"
              const delay = 0.18 + index * 0.14
              return (
                <ScrollReveal key={card.title} direction={direction} delay={delay}>
                  <article
                    className="rounded-[2rem] border border-border/70 bg-card/75 p-3 shadow-[0_10px_35px_-24px_rgba(2,6,23,0.55)] transition"
                  >
                    <div className={`relative h-full overflow-hidden rounded-[1.4rem] border border-border/70 bg-gradient-to-br p-4 text-center ${serviceContextSurfaces[cardIndex % serviceContextSurfaces.length]}`}>
                      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-accent/20 blur-xl" />
                      <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-primary/20 blur-xl" />
                      <div className="relative space-y-2">
                        <span className="inline-flex rounded-full border border-border/70 bg-background/75 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                          {String(cardIndex).padStart(2, "0")}
                        </span>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{card.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{card.summary}</p>
                        <ul className="mx-auto max-w-xs space-y-2 pt-1 text-center text-xs leading-relaxed text-foreground">
                          {card.deliverables.map((deliverable) => (
                            <li key={deliverable} className="flex items-center justify-center gap-2 text-center">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>

          {/* AGENCY_OWNED: desktop grid variant of the same reusable presentation system. */}
          <div className="hidden md:grid gap-3 md:grid-cols-2">
            {desktopContextCards.map((card, index) => {
              const cardIndex = index + 1
              const isEven = cardIndex % 2 === 0
              const direction = isEven ? "up" : "down"
              const delay = 0.18 + index * 0.14
              return (
                <ScrollReveal key={card.title} direction={direction} delay={delay}>
                  <article
                    className={`rounded-[2rem] border border-border/70 bg-card/75 p-3 shadow-[0_10px_35px_-24px_rgba(2,6,23,0.55)] transition ${
                      index % 2 === 1 ? "md:translate-y-2" : ""
                    }`}
                  >
                    <div
                      className={`relative h-full overflow-hidden rounded-[1.4rem] border border-border/70 bg-gradient-to-br p-4 text-center ${serviceContextSurfaces[index % serviceContextSurfaces.length]}`}
                    >
                      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-accent/20 blur-xl" />
                      <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-primary/20 blur-xl" />
                      <div className="relative space-y-2">
                        <span className="inline-flex rounded-full border border-border/70 bg-background/75 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{card.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{card.summary}</p>
                        <ul className="mx-auto max-w-xs space-y-2 pt-1 text-center text-xs leading-relaxed text-foreground">
                          {card.deliverables.map((deliverable) => (
                            <li key={deliverable} className="flex items-center justify-center gap-2 text-center">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        </ScrollReveal>
        </section>
    </main>
  )
}
