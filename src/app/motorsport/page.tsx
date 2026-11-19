import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/Blocks";
import { PageHero } from "@/components/sections/Heroes";
import { Photo } from "@/components/sections/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/Primitives";
import { mediaFor } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Rally, Autocross, Sprints & Esports at MOSAC" },
  description:
    "Every stage is a dialogue between road, driver and navigator. Explore MOSAC’s documented rally history, sanctioned events and safety guidance.",
};

// Doc 01, section 04. Headings are the discipline names exactly as written there.
const pathways = [
  {
    id: "rally",
    title: "Rally",
    text: "Every stage is a dialogue between road, driver and navigator. Success depends on preparation, teamwork, patience and technical precision. Explore MOSAC’s documented rally history, sanctioned events and safety guidance.",
    asset: "elgonStage",
    cta: { href: "/events", label: "Explore Events" },
  },
  {
    id: "autocross",
    title: "Autocross and sprint",
    text: "Shorter courses reward control and consistency. The Kapeeka 2019 archive demonstrates MOSAC’s organising history.",
    asset: "kapeeka-2019-mud-splash",
    cta: { href: "/events/kapeeka-autocross-2019", label: "Kapeeka Autocross 2019" },
  },
  {
    id: "esports",
    title: "Esports",
    text: "The digital cockpit demands many familiar qualities: focus, timing, judgement and the will to improve. Learn how a structured WRC rally simulation championship brings new participants into the Ugandan motorsport community.",
    asset: "esportsHero",
    cta: { href: "/esports", label: "Esports" },
  },
];

const steps = [
  "Choose a pathway",
  "Check eligibility",
  "Consult current FMU competition rules and licence requirements",
  "Complete event-specific entry",
  "Attend briefings",
  "Respect officials and safety instructions",
];

/** Motorsport — "Pick your pathway" (03, section G; copy from 01, section 04). */
export default function MotorsportPage() {
  return (
    <>
      <PageHero
        eyebrow="Motorsport pathways"
        title="One club. Many ways to feel the drive."
        actions={
          <nav aria-label="Pathways" className="flex flex-wrap gap-2">
            {pathways.map((p) => (
              <a key={p.id} href={`#${p.id}`} className="border border-white/40 px-4 py-2 text-sm font-bold tracking-wide uppercase hover:bg-white hover:text-midnight">
                {p.title}
              </a>
            ))}
          </nav>
        }
      />

      {pathways.map((p, i) => (
        <section key={p.id} id={p.id} aria-labelledby={`${p.id}-h`} className={`scroll-mt-28 py-16 md:py-24 ${i % 2 ? "bg-white" : ""}`}>
          <div className="container-site grid items-center gap-10 lg:grid-cols-12">
            <div className={`relative aspect-[4/3] overflow-hidden bg-navy lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`} data-reveal>
              <Photo asset={mediaFor(p.asset)} sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
            <div className="lg:col-span-5" data-reveal>
              <h2 id={`${p.id}-h`} className="display text-5xl md:text-6xl">
                {p.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{p.text}</p>
              <div className="mt-8">
                <ButtonLink href={p.cta.href} variant="outline-dark">
                  {p.cta.label}
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="how-to-begin" className="bg-midnight py-20 text-white md:py-28">
        <div className="container-site">
          <SectionHeader id="how-to-begin" title="How to begin" tone="light" />
          <ol className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s} className="bg-midnight p-6" data-reveal>
                <p className="display tabular text-5xl text-red">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-lg">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        actions={
          <>
            <ButtonLink href="/events" variant="outline-light">
              Explore Events
            </ButtonLink>
            <ButtonLink href="/competitors" variant="outline-light">
              Competitor Centre
            </ButtonLink>
            <ButtonLink href="/esports" variant="outline-light">
              Esports
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
