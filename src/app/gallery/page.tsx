import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/sections/Blocks";
import { Gallery } from "@/components/sections/Gallery";
import { PageHero } from "@/components/sections/Heroes";
import { ButtonLink } from "@/components/ui/Button";
import { getEvents, mediaFor } from "@/lib/content";
import { disciplineLabel, eventDateLabel } from "@/lib/format";

export const metadata: Metadata = {
  title: { absolute: "MOSAC Gallery — Uganda Rally Photography and Esports" },
  description: "Dust, focus, anticipation and relief: motorsport’s strongest stories often happen in a fraction of a second. Explore selected galleries from the club’s archives, with context and respect for the people who made each moment.",
};

/** Gallery — "The Archive" (03, section O; copy from 01, section 12). One curated collection per event. */
export default async function GalleryPage() {
  const collections = (await getEvents()).filter((e) => e.gallery?.length);
  return (
    <>
      <PageHero
        asset={mediaFor("kigezi-2022-rainbow")}
        eyebrow="Gallery & archives"
        title="Moments that move us"
        lead="Dust, focus, anticipation and relief: motorsport’s strongest stories often happen in a fraction of a second. Explore selected galleries from the club’s archives, with context and respect for the people who made each moment."
        actions={
          <>
            <ButtonLink href="#collections">Explore the Collections</ButtonLink>
            <ButtonLink href="/contact" variant="outline-light">
              Contribute Archive Material
            </ButtonLink>
          </>
        }
      />

      <nav id="collections" aria-label="Collections" className="sticky top-[72px] z-30 border-b border-black/10 bg-pit/95 backdrop-blur md:top-[108px]">
        <ul className="container-site flex gap-1 overflow-x-auto py-3">
          {collections.map((e) => (
            <li key={e.slug} className="shrink-0">
              <a href={`#${e.slug}`} className="inline-flex min-h-11 items-center px-4 text-sm font-bold tracking-wide whitespace-nowrap uppercase hover:bg-midnight hover:text-white">
                {e.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {collections.map((e, i) => (
        <section key={e.slug} id={e.slug} aria-labelledby={`${e.slug}-h`} className={`scroll-mt-44 py-16 md:py-20 ${i % 2 ? "bg-white" : ""}`}>
          <div className="container-site">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-red-700">
                  {eventDateLabel(e)} · {disciplineLabel[e.discipline]} · {e.gallery!.length} photos
                </p>
                <h2 id={`${e.slug}-h`} className="display mt-2 text-4xl md:text-5xl">
                  {e.title}
                </h2>
              </div>
              <Link
                href={e.discipline === "esports" ? "/esports" : `/events/${e.slug}`}
                className="text-sm font-bold tracking-wide uppercase underline decoration-red decoration-2 underline-offset-4"
              >
                {e.discipline === "esports" ? "Esports" : e.title} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <Gallery items={e.gallery!.map((k) => mediaFor(k))} />
          </div>
        </section>
      ))}

      <CtaBand
        actions={
          <ButtonLink href="/contact" variant="outline-light">
            Contribute Archive Material
          </ButtonLink>
        }
      />
    </>
  );
}
