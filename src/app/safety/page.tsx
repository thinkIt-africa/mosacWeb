import type { Metadata } from "next";
import { PageHero } from "@/components/sections/Heroes";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Motorsport Safety at MOSAC — Competitors and Spectators" },
  description:
    "The excitement of rallying depends on discipline. Safety begins in the route plan, the equipment check, the briefing and every decision made by officials and participants.",
};

const groups = [
  {
    id: "spectators",
    title: "Spectators",
    rules: [
      "Use authorised viewing points only.",
      "Obey marshals and security teams.",
      "Never stand on the outside of corners or in a car’s escape path.",
      "Do not enter restricted areas or cross active competition roads.",
      "Supervise children.",
      "Never rely on a casual social-media map for stage access.",
    ],
  },
  {
    id: "competitors",
    title: "Competitors",
    rules: [
      "Follow current event and FMU rules.",
      "Use approved protective equipment.",
      "Attend briefings and pass scrutineering.",
      "Report hazards through the proper channels.",
    ],
  },
  {
    id: "officials",
    title: "Marshals & officials",
    rules: [
      "Act within your assigned role and approved training.",
      "Follow communication, incident escalation, medical and stage-control procedures.",
    ],
  },
];

/** Safety — "People first" (03, section M; copy from 01, section 10). */
export default function SafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Safety"
        title="The most important finish is a safe one"
        lead="The excitement of rallying depends on discipline. Safety begins in the route plan, the equipment check, the briefing and every decision made by officials and participants."
      />
      <section className="py-20 md:py-28">
        <div className="container-site">
          <nav aria-label="Safety guidance" className="mb-10 flex flex-wrap gap-2">
            {groups.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="min-h-11 bg-white px-5 py-3 text-sm font-bold tracking-wide uppercase ring-1 ring-black/10 hover:bg-midnight hover:text-white">
                {g.title}
              </a>
            ))}
          </nav>
          <div className="grid gap-6 lg:grid-cols-3">
            {groups.map((g) => (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="scroll-mt-28 bg-white p-6 ring-1 ring-black/10 md:p-8">
                <h2 id={`${g.id}-h`} className="display text-4xl">
                  {g.title}
                </h2>
                <ul className="mt-6 space-y-3">
                  {g.rules.map((r) => (
                    <li key={r} className="flex gap-3">
                      <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 shrink-0 bg-red" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <div className="mt-12 max-w-3xl border-l-4 border-midnight bg-white p-6">
            <p className="font-semibold">
              This page summarises good practice. It does not replace event-specific official regulations or emergency
              instructions.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <ButtonLink href="#spectators" variant="outline-dark">
                Read Spectator Guide
              </ButtonLink>
              <ButtonLink href={site.fmuUrl} variant="outline-dark" external={{ siteName: "FMU" }}>
                Open Official Rules
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
