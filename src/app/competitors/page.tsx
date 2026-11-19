import type { Metadata } from "next";
import { PendingNote } from "@/components/sections/Blocks";
import { PageHero } from "@/components/sections/Heroes";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: { absolute: "Competitor Resources — Regulations, Entries and Results" },
  description:
    "Great performance starts before the first timed kilometre. Find the practical information needed to prepare carefully, meet entry requirements and follow the official competition process.",
};

// Doc 01, section 09 — Sections, word for word.
const sections = [
  "Event supplementary regulations",
  "FMU national rules and licensing",
  "Eligibility",
  "Approved insurance",
  "Scrutineering",
  "Technical and safety equipment",
  "Entry deadlines",
  "Briefing bulletins",
  "Start lists",
  "Timekeeping and results",
  "Protest and appeals processes",
];

/** Competitor Centre — "Ready to start" (03, section L; copy from 01, section 09). */
export default function CompetitorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Competitor Centre"
        title="Prepare well. Compete fair."
        lead="Great performance starts before the first timed kilometre. Find the practical information needed to prepare carefully, meet entry requirements and follow the official competition process."
        actions={
          <>
            <ButtonLink href="#documents">Browse Documents</ButtonLink>
            <ButtonLink href="/events#archive" variant="outline-light">
              View Official Results
            </ButtonLink>
          </>
        }
      />
      <section className="py-20 md:py-28">
        <div className="container-site">
          <PendingNote />
          <ul id="documents" className="scroll-mt-32 mt-10 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s) => (
              <li key={s} className="flex items-center justify-between bg-white p-6">
                <span className="font-semibold">{s}</span>
                <span className="text-xs font-bold tracking-wide text-ink-soft uppercase">No documents yet</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
