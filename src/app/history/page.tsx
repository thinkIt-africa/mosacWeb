import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/Blocks";
import { PageHero } from "@/components/sections/Heroes";
import { ButtonLink } from "@/components/ui/Button";
import { getMilestones, mediaFor } from "@/lib/content";
import type { Verification } from "@/types/content";

export const metadata: Metadata = {
  title: { absolute: "MOSAC History — Uganda Motorsport Since 1990" },
  description:
    "A club’s history lives in more than trophies. It is written in early-morning service parks, the roads that welcomed a championship, the crews who returned after setbacks and the spectators whose curiosity became commitment.",
};

const verificationLabel: Record<Verification, string> = {
  "verified-public": "Verified publicly",
  "club-approved": "Club approved",
  pending: "Pending verification",
};

/** History — "Every generation leaves a track" (03, section F; copy from 01, section 03). */
export default async function HistoryPage() {
  const milestones = await getMilestones();
  return (
    <>
      <PageHero
        asset={mediaFor("elgonStage")}
        eyebrow="The history"
        title="Every generation leaves a track"
        lead="A club’s history lives in more than trophies. It is written in early-morning service parks, the roads that welcomed a championship, the crews who returned after setbacks and the spectators whose curiosity became commitment."
      />

      <section aria-label="Timeline" className="py-20 md:py-28">
        <div className="container-site">
          {/* Doc 03, section F: never present a selected chronology as exhaustive. */}
          <p className="max-w-2xl text-ink-soft">A selected chronology.</p>
          <ol className="relative mt-12 border-l-2 border-midnight/15 md:ml-40">
            {milestones.map((m) => (
              <li key={m.year} className="relative pb-14 pl-8 last:pb-0 md:pl-12" data-reveal>
                <span aria-hidden="true" className="absolute top-2 -left-[9px] h-4 w-4 bg-red" />
                <p className="display tabular text-5xl text-red-700 md:absolute md:top-0 md:-left-40 md:w-32 md:text-right md:text-6xl">
                  {m.year}
                </p>
                <h2 className="display mt-2 text-3xl md:mt-0 md:text-4xl">{m.title}</h2>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">{m.text}</p>
                <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                  <span className={`font-semibold ${m.verification === "pending" ? "text-ink-soft" : "text-midnight"}`}>
                    {verificationLabel[m.verification]}
                  </span>
                  {m.source && (
                    <a href={m.source.url} rel="noopener" className="underline decoration-red underline-offset-4">
                      Source: {m.source.label}
                    </a>
                  )}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        actions={
          <>
            <ButtonLink href="/gallery" variant="outline-light">
              Explore the Archive
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline-light">
              Contribute a Memory
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
