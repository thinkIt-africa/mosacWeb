import type { Metadata } from "next";
import { PageHero } from "@/components/sections/Heroes";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Can I be involved without owning a rally car? Yes, the proposed pathways include volunteering, supporting and expressing competitive interest.",
};

const faq = [
  ["Can I be involved without owning a rally car?", "Yes, the proposed pathways include volunteering, supporting and expressing competitive interest; exact membership categories require MOSAC approval."],
  ["Who sanctions motorsport in Uganda?", "FMU is the national federation; MOSAC participates as a member club and may organise approved events."],
  ["Where can I see the calendar?", "In Events, with the official FMU calendar as the governing reference."],
  ["Can I join esports?", "Check the relevant FMU-sanctioned championship rules, eligibility, registration and event information."],
  ["Where can I find official regulations?", "Use current official FMU and event documents, not archived rules."],
  ["How do I watch safely?", "Follow the organisers’ approved spectator guidance and marshals’ directions only."],
];

/** FAQ (03, section S; copy from 01, section 16). */
export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently asked questions" />
      <section className="py-16 md:py-24">
        <div className="container-site max-w-4xl!">
          <div className="divide-y divide-black/10 border-y border-black/10">
            {faq.map(([q, a]) => (
              <details key={q} className="group py-2">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                  {q}
                  <span aria-hidden="true" className="text-2xl text-red-700 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-4 leading-relaxed text-ink-soft">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
