import Link from "next/link";
import { mediaFor } from "@/lib/content";
import { disciplineLabel, eventDateLabel, eventStatusLabel, formatDate, roundStatusLabel } from "@/lib/format";
import type { Article, EsportsRound, MosacEvent } from "@/types/content";
import { StatusTag } from "@/components/ui/Primitives";
import { Photo } from "./Photo";

/** Event card (03, section H): photo | date | discipline | title | district | status | link. */
export function EventCard({ event }: { event: MosacEvent }) {
  const asset = event.cover ? mediaFor(event.cover) : undefined;
  const live = event.status === "running" || event.status === "open";
  return (
    <article className="group relative flex flex-col bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg" data-reveal>
      <div className="relative aspect-[16/10] overflow-hidden bg-navy">
        {asset ? (
          <Photo
            asset={asset}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          // Designed fallback for events with no archive photos yet (not a placeholder image).
          <div className="absolute inset-0 flex flex-col justify-between bg-navy p-5 text-white">
            <div aria-hidden="true" className="flex h-16 gap-2 self-end">
              <span className="h-full w-3 bg-red" />
              <span className="h-full w-3 bg-red" />
              <span className="h-full w-1.5 bg-red" />
            </div>
            <div>
              <p aria-hidden="true" className="display tabular text-6xl text-white/90">
                {event.startDate.slice(0, 4)}
              </p>
              <p className="mt-1 text-sm text-steel-300">{event.district ?? "Uganda"} · Archive photos to come</p>
            </div>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <StatusTag label={eventStatusLabel[event.status]} tone={live ? "live" : event.status === "archived" ? "neutral" : "upcoming"} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow tabular text-red-700">
          {eventDateLabel(event)} · {disciplineLabel[event.discipline]}
        </p>
        <h3 className="display mt-2 text-3xl">
          <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0">
            {event.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-ink-soft">{event.district ?? "Uganda"}</p>
        <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-soft">{event.summary}</p>
        <p className="mt-auto pt-5 text-sm font-bold tracking-wide uppercase">
          {event.status === "archived" ? "Event story" : "Event guide"} <span aria-hidden="true">→</span>
        </p>
      </div>
    </article>
  );
}

export function ArticleCard({ article, large = false }: { article: Article; large?: boolean }) {
  const asset = mediaFor(article.hero);
  return (
    <article className="group relative flex flex-col" data-reveal>
      <div className={`relative overflow-hidden bg-navy ${large ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
        <Photo
          asset={asset}
          sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {!article.approved && (
          <div className="absolute top-3 left-3">
            <StatusTag label="Draft" tone="draft" />
          </div>
        )}
      </div>
      <p className="eyebrow mt-4 text-red-700">
        {article.category}
        {article.approved && (
          <>
            {" · "}
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          </>
        )}
      </p>
      <h3 className={`display mt-2 ${large ? "text-4xl md:text-5xl" : "text-3xl"}`}>
        <Link href={`/news/${article.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-red group-hover:decoration-2 group-hover:underline-offset-4">
          {article.headline}
        </Link>
      </h3>
      <p className="mt-2 leading-relaxed text-ink-soft">{article.standfirst}</p>
      {article.approved && article.author && <p className="mt-3 text-sm text-ink-soft">By {article.author}</p>}
    </article>
  );
}

export function RoundCard({ round, index }: { round: EsportsRound; index: number }) {
  const done = round.status === "completed" || round.status === "final";
  return (
    <li
      className={`relative flex flex-col justify-between p-5 md:p-6 ${done ? "bg-navy text-white" : "bg-white text-midnight ring-1 ring-black/10"}`}
      data-reveal
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`display text-6xl tabular ${done ? "text-white/20" : "text-red"}`} aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <StatusTag
          label={roundStatusLabel[round.status]}
          tone={round.status === "live" ? "live" : done ? "neutral" : "upcoming"}
        />
      </div>
      <div className="mt-8">
        <h3 className="display text-3xl">{round.name}</h3>
        {round.dates && <p className={`mt-1 font-semibold tabular ${done ? "text-white" : "text-midnight"}`}>{round.dates}</p>}
        {round.stages && <p className={`mt-1 text-sm ${done ? "text-steel-300" : "text-ink-soft"}`}>{round.stages}</p>}
      </div>
    </li>
  );
}
