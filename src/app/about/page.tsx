import type { Metadata } from "next";
import { CtaBand, PendingNote } from "@/components/sections/Blocks";
import { PageHero } from "@/components/sections/Heroes";
import { Photo, PhotoCredit } from "@/components/sections/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeader } from "@/components/ui/Primitives";
import { mediaFor } from "@/lib/content";

const OPENING =
  "Founded in 1990, Motorsport Africa Club is one of Uganda’s longstanding motorsport clubs. Its story reaches across the country’s rally history and into a new chapter of competition, community participation and digital innovation.";

export const metadata: Metadata = {
  title: { absolute: "About MOSAC — History, Mission & Community" },
  description: OPENING,
};

// Doc 01, section 02 — "Five values"
const values = [
  ["Passion with purpose", "Celebrate the thrill while protecting people."],
  ["Safety without compromise", "Every decision begins with safety."],
  ["Fair play", "Respect rules, transparent results and equal opportunity."],
  ["Community", "Every crew, marshal, supporter and host matters."],
  ["Innovation", "Honour the past while opening new pathways."],
];

/** About — "The Club" (03, section E; copy from 01, section 02). */
export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About MOSAC" title="A legacy of movement" lead={OPENING} />

      <section className="py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <div className="relative aspect-[16/10] overflow-hidden bg-navy">
              <Photo asset={mediaFor("kigeziGroup")} sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
            <PhotoCredit asset={mediaFor("kigeziGroup")} className="mt-3 text-ink-soft!" />
          </div>
          <div className="space-y-10 lg:col-span-5" data-reveal>
            <div>
              <Eyebrow>Origins</Eyebrow>
              <p className="mt-3 text-xl leading-relaxed">
                The Federation of Motorsport Clubs of Uganda recognises MOSAC among its affiliated member clubs.
              </p>
            </div>
            <div>
              <Eyebrow>Purpose</Eyebrow>
              <p className="mt-3 text-xl leading-relaxed">
                To grow safe, credible and inclusive motorsport participation in Uganda through memorable competition,
                sound organisation, talent opportunities and lasting community connections.
              </p>
            </div>
            <div>
              <Eyebrow>Vision</Eyebrow>
              <p className="mt-3 text-xl leading-relaxed">
                A Uganda where more people can experience, contribute to and excel in motorsport, on physical stages and
                digital platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="values" className="bg-midnight py-20 text-white md:py-28">
        <div className="container-site">
          <SectionHeader id="values" title="Five values" tone="light" />
          <ol className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {values.map(([title, text], i) => (
              <li key={title} className="bg-midnight p-6" data-reveal>
                <p className="display tabular text-5xl text-red">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="display mt-4 text-2xl">{title}</h3>
                <p className="mt-2 text-steel-300">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="fmu" className="py-20 md:py-28">
        <div className="container-site">
          {/* Doc 03, section E: "What we are / What we are not" */}
          <SectionHeader id="fmu" title="What we are / What we are not" />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white p-8 ring-1 ring-black/10" data-reveal>
              <p className="eyebrow text-red-700">MOSAC</p>
              <p className="mt-3 text-lg leading-relaxed">MOSAC is a member club and event organiser subject to approval.</p>
            </div>
            <div className="bg-white p-8 ring-1 ring-black/10" data-reveal>
              <p className="eyebrow text-red-700">FMU</p>
              <p className="mt-3 text-lg leading-relaxed">FMU is the national motorsport federation.</p>
            </div>
          </div>
          <div className="mt-12 max-w-3xl space-y-4" data-reveal>
            <h3 className="display text-3xl">Leadership</h3>
            <PendingNote />
          </div>
        </div>
      </section>

      <CtaBand
        actions={
          <>
            <ButtonLink href="/history" variant="outline-light">
              See Our History
            </ButtonLink>
            <ButtonLink href="/membership" variant="outline-light">
              Become Part of MOSAC
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
