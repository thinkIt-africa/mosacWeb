import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo, PhotoCredit } from "@/components/sections/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, StatusTag } from "@/components/ui/Primitives";
import { getArticle, getArticles, mediaFor } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { site } from "@/content/site";

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const a = await getArticle((await params).slug);
  if (!a) return {};
  return {
    title: a.headline,
    description: a.standfirst,
    openGraph: { type: "article", images: [`${site.url}${mediaFor(a.hero).src}`] },
  };
}

/** Article template (03, section N; 01, section 11). */
export default async function ArticlePage({ params }: PageProps<"/news/[slug]">) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();
  const asset = mediaFor(article.hero);

  return (
    <article>
      <header className="bg-midnight pt-16 pb-10 text-white md:pt-24">
        <div className="container-site max-w-4xl!">
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow tone="light">{article.category}</Eyebrow>
            {!article.approved && <StatusTag label="Draft" tone="draft" />}
          </div>
          <h1 className="display mt-4 text-5xl md:text-7xl">{article.headline}</h1>
          <p className="mt-6 text-xl leading-relaxed text-white/85">{article.standfirst}</p>
          {article.approved && (
            <p className="mt-6 text-sm text-steel-300">
              {article.author && <>By {article.author} · </>}
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            </p>
          )}
        </div>
      </header>
      <div className="bg-midnight">
        <div className="container-site max-w-5xl!">
          <div className="relative aspect-[16/9] translate-y-10 overflow-hidden bg-navy">
            <Photo asset={asset} sizes="(min-width: 1024px) 64rem, 100vw" priority />
          </div>
        </div>
      </div>
      <div className="container-site max-w-3xl! pt-16 pb-20">
        <PhotoCredit asset={asset} className="text-ink-soft!" />
        <div className="prose-mosac mt-6 text-lg text-ink">
          {article.body.map((s, i) => (
            <div key={i}>
              {s.heading && <h2>{s.heading}</h2>}
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        {article.sources?.length ? (
          <div className="mt-10 border-t border-black/10 pt-6">
            <p className="eyebrow text-ink-soft">Sources</p>
            <ul className="mt-2 space-y-1">
              {article.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} rel="noopener" className="underline decoration-red underline-offset-4">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <p className="mt-10 text-sm text-ink-soft">
          {/* Doc 01 article template: "corrections notice" */}
          Corrections: <Link href="/contact" className="underline">contact the club</Link>.
        </p>
        <div className="mt-10">
          <ButtonLink href="/news" variant="outline-dark">
            All stories
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
