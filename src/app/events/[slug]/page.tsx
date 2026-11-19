import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PendingNote } from "@/components/sections/Blocks";
import { Gallery } from "@/components/sections/Gallery";
import { PageHero } from "@/components/sections/Heroes";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader, StatusTag } from "@/components/ui/Primitives";
import { getEvent, getEvents, isUpcoming, mediaFor } from "@/lib/content";
import { disciplineLabel, eventDateLabel, eventStatusLabel } from "@/lib/format";

export async function generateStaticParams() {
  return (await getEvents()).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const event = await getEvent((await params).slug);
  if (!event) return {};
  return {
    title: event.status === "archived" ? `${event.title} — MOSAC Archive` : event.title,
    description: event.summary,
  };
}

/** Event detail — "The Event HQ" (03, section I; copy from 01, section 06). */
export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const event = await getEvent((await params).slug);
  if (!event) notFound();
  if (event.discipline === "esports" && isUpcoming(event)) {
    // The live championship has its own page.
    redirect("/esports");
  }

  const asset = event.cover ? mediaFor(event.cover) : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: event.title,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: event.venue ?? event.district, address: { "@type": "PostalAddress", addressRegion: event.district, addressCountry: "UG" } },
    organizer: { "@type": "SportsOrganization", name: "Motorsport Africa Club" },
  };

  return (
    <>
      {/* Structured data only when the exact dates are known, so search engines never get guessed dates. */}
      {event.verification !== "pending" && !event.dateLabel && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <PageHero
        asset={asset}
        eyebrow={event.status === "archived" ? "An archived event from the MOSAC rally years" : "Event"}
        title={
          event.strapline ? (
            <>
              {event.title}.
              <span className="mt-3 block text-[0.55em] text-white/85">{event.strapline}</span>
            </>
          ) : (
            event.title
          )
        }
        lead={event.strapline ? undefined : event.summary}
      />

      <section className="py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <dl className="divide-y divide-black/10 border-y border-black/10 bg-white px-6">
              {[
                ["Status", <StatusTag key="s" label={eventStatusLabel[event.status]} tone={event.status === "archived" ? "neutral" : "upcoming"} />],
                ["Date", eventDateLabel(event)],
                ["Discipline", disciplineLabel[event.discipline]],
                ["District", event.district ?? "To be confirmed"],
                ["MOSAC role", event.organiserRole ?? "To be confirmed"],
                ...(event.result ? [[event.result.label, event.result.value]] : []),
              ].map(([k, v]) => (
                <div key={k as string} className="flex items-center justify-between gap-4 py-4">
                  <dt className="eyebrow text-ink-soft">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <ButtonLink href="/events#archive" variant="outline-dark">
                All events
              </ButtonLink>
            </div>
          </aside>

          <article className="prose-mosac max-w-3xl lg:col-span-8">
            {event.body?.length ? (
              event.body.map((s) => (
                <div key={s.text.slice(0, 24)}>
                  {s.heading && <h2>{s.heading}</h2>}
                  <p className="text-lg text-ink-soft">{s.text}</p>
                </div>
              ))
            ) : (
              <p className="text-lg text-ink-soft">The full event story and results will be added from the club archive.</p>
            )}
            {event.verification === "pending" && (
              <div className="mt-8">
                <PendingNote />
              </div>
            )}
            {event.sources?.length ? (
              <div className="mt-10 border-t border-black/10 pt-6">
                <p className="eyebrow text-ink-soft">Sources</p>
                <ul className="mt-2 space-y-1">
                  {event.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} rel="noopener" className="underline decoration-red underline-offset-4">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>
        </div>
      </section>
      {event.gallery?.length ? (
        <section aria-labelledby="event-gallery" className="bg-white py-16 md:py-24">
          <div className="container-site">
            <SectionHeader id="event-gallery" eyebrow="Gallery" title={`${event.title} in pictures`} />
            <Gallery items={event.gallery.map((k) => mediaFor(k))} />
          </div>
        </section>
      ) : null}
    </>
  );
}
