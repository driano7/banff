import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"

import { HeadingTypewriter } from "@/components/core/heading-typewriter"
import { BlogArticle } from "@/components/core/blog-article"
import { JsonLd } from "@/components/seo/JsonLd"
import { Seo } from "@/components/seo/Seo"
import { ScrollReveal } from "@/components/core/scroll-reveal"
import { Button } from "@/components/ui/button"
import { getLocaleFromCookies } from "@/lib/locale"
import { getBlogPostBySlug, getAllBlogPosts, renderMdxToHtml } from "@/lib/blog"
import {
  buildArticleEntity,
  buildBreadcrumbList,
  buildFaqPageEntity,
  buildPageMetadata,
  seoConfig,
} from "@/lib/seo"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return buildPageMetadata(seoConfig, {
      title: `${seoConfig.brand.brandName} Studio`,
      description: seoConfig.brand.brandDescription,
      canonicalPath: `/blog/${slug}`,
    })
  }

  return buildPageMetadata(seoConfig, {
    title: post.title,
    description: post.excerpt,
    canonicalPath: `/blog/${post.slug}`,
    openGraph: {
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
    },
  })
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const locale = await getLocaleFromCookies()
  const post = getBlogPostBySlug(slug, locale)

  if (!post) notFound()

  const html = renderMdxToHtml(post.content)
  const ctaClassName = "rounded-full bg-[color:var(--foreground)] px-5 text-sm font-semibold text-white hover:bg-[color:var(--foreground)]/90 dark:text-black"
  const semanticKeywords = post.secondaryKeywords ?? []
  const semanticEntities = post.entities ?? []
  const relations = post.semanticRelations ?? []
  const faqItems = post.faq ?? []
  const internalLinks = post.internalLinks ?? []
  const hasSeoLlmPanel =
    Boolean(post.primaryKeyword || post.searchIntent || post.llmSummary || post.snippetTakeaway) ||
    semanticKeywords.length > 0 ||
    semanticEntities.length > 0 ||
    relations.length > 0 ||
    faqItems.length > 0 ||
    internalLinks.length > 0
  const structuredData = [
    buildArticleEntity(seoConfig, {
      kind: "BlogPosting",
      slug: post.slug,
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      articleSection: post.category,
      inLanguage: post.locale ?? locale,
    }),
    buildBreadcrumbList(
      [
        { name: "Inicio", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ],
      seoConfig,
    ),
  ]

  return (
    <main id="blog-post-scope" className="mx-auto w-full max-w-4xl px-4 pb-8 pt-28 sm:px-6 lg:pt-32">
      <Seo entities={structuredData} />
      {faqItems.length > 0 ? <JsonLd data={buildFaqPageEntity({ questions: faqItems })} /> : null}
      <HeadingTypewriter scopeSelector="#blog-post-scope" />

      <section className="space-y-8">
        <ScrollReveal direction="up">
          <BlogArticle title={post.title} excerpt={post.excerpt} html={html} />
        </ScrollReveal>

        {hasSeoLlmPanel ? (
          <ScrollReveal direction="up" className="mt-2">
            <section className="rounded-[2rem] border border-border/60 bg-card/80 p-5 text-card-foreground shadow-[0_18px_55px_-28px_rgba(2,6,23,0.35)] dark:bg-card/70 md:p-6">
              <div className="max-w-3xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--accent)]">
                  SEO + LLM
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-card-foreground md:text-3xl">
                  {post.primaryKeyword ?? post.title}
                </h2>
                <p className="text-sm leading-7 text-muted-foreground md:text-base">
                  {post.searchIntent ?? post.llmSummary ?? post.excerpt}
                </p>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-4">
                  {post.llmSummary ? (
                    <article className="rounded-[1.6rem] border border-border/60 bg-background/75 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Summary</p>
                      <p className="mt-3 text-sm leading-7 text-foreground">{post.llmSummary}</p>
                    </article>
                  ) : null}

                  {semanticKeywords.length > 0 ? (
                    <article className="rounded-[1.6rem] border border-border/60 bg-background/75 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Semantic keywords</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {semanticKeywords.map((keyword) => (
                          <span key={keyword} className="rounded-full border border-border/60 bg-card/80 px-3 py-1 text-xs font-medium text-foreground">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </article>
                  ) : null}

                  {semanticEntities.length > 0 ? (
                    <article className="rounded-[1.6rem] border border-border/60 bg-background/75 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Entities</p>
                      <ul className="mt-4 space-y-2 text-sm text-foreground">
                        {semanticEntities.map((entity) => (
                          <li key={entity} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                            <span>{entity}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ) : null}

                  {relations.length > 0 ? (
                    <article className="rounded-[1.6rem] border border-border/60 bg-background/75 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Semantic relations</p>
                      <ul className="mt-4 space-y-2 text-sm text-foreground">
                        {relations.map((relation) => (
                          <li key={relation} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                            <span>{relation}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ) : null}
                </div>

                <div className="space-y-4">
                  {post.snippetTakeaway ? (
                    <article className="rounded-[1.6rem] border border-border/60 bg-background/75 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Snippet-ready takeaway</p>
                      <blockquote className="mt-3 rounded-2xl border border-border/60 bg-card/80 p-4 text-sm leading-7 text-foreground">
                        {post.snippetTakeaway}
                      </blockquote>
                    </article>
                  ) : null}

                  {faqItems.length > 0 ? (
                    <article className="rounded-[1.6rem] border border-border/60 bg-background/75 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">FAQ</p>
                      <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">Visible questions</h3>
                      <ul className="mt-4 space-y-4">
                        {faqItems.map((faq) => (
                          <li key={faq.question} className="rounded-2xl border border-border/60 bg-card/80 p-4">
                            <p className="text-sm font-semibold text-foreground">{faq.question}</p>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ) : null}

                  {internalLinks.length > 0 ? (
                    <article className="rounded-[1.6rem] border border-border/60 bg-background/75 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Internal links</p>
                      <ul className="mt-4 space-y-3 text-sm text-foreground">
                        {internalLinks.map((linkItem) => (
                          <li key={`${linkItem.label}-${linkItem.href}`} className="rounded-2xl border border-border/60 bg-card/80 p-4">
                            <Link href={linkItem.href} className="font-semibold text-[color:var(--accent)] hover:underline">
                              {linkItem.label}
                            </Link>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">{linkItem.purpose}</p>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ) : null}
                </div>
              </div>
            </section>
          </ScrollReveal>
        ) : null}

        <div className="space-y-5 text-center">
          <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--accent)]">
            <span>{post.category}</span>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className={ctaClassName}>
              <Link href="/blog">
                Back to blog
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
