import type { Metadata } from "next";
import { CtaBand, FeatureCard, PendingNote } from "@/components/sections/Blocks";
import { PageHero } from "@/components/sections/Heroes";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/Primitives";
import { mediaFor } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "MOSAC Community — Beyond the Motorsport Stage" },
  description: "A rally passes through a place, but the strongest relationships remain. MOSAC’s story includes hosts, small businesses, volunteers, emergency services, schools and young competitors whose participation makes the sport possible.",
};

/**
 * People — the "People" menu item from doc 06, using the Community Impact copy from doc 01, section 13.
 * Card titles are doc 01's "community storytelling angles"; "Meet the community" is from doc 06, slide 6.
 * Personal profiles are published only with written approval (doc 03, section C).
 */
export default function PeoplePage() {
  return (
    <>
      <PageHero
        asset={mediaFor("kigeziCelebration")}
        eyebrow="Community impact"
        title="A bigger impact than the finish line"
        lead="A rally passes through a place, but the strongest relationships remain. MOSAC’s story includes hosts, small businesses, volunteers, emergency services, schools and young competitors whose participation makes the sport possible."
      />

      <section aria-labelledby="who" className="py-20 md:py-28">
        <div className="container-site">
          <SectionHeader id="who" eyebrow="Drivers · Marshals · Fans" title="Meet the community" />
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard href="/events/kigezi-boona-2022" label="Community" title="Verified host-community stories" asset={mediaFor("kigeziGroup")} />
            <FeatureCard href="/esports" label="Esports" title="Accessible pathways through esports" asset={mediaFor("esportsPanel")} />
            <FeatureCard href="/membership" label="Volunteer" title="Volunteer and marshal profiles" asset={mediaFor("kigeziCrew")} />
          </div>
          <div className="mt-10 max-w-3xl">
            <PendingNote />
          </div>
        </div>
      </section>

      <CtaBand
        actions={
          <ButtonLink href="/contact" variant="outline-light">
            Propose a Community Collaboration
          </ButtonLink>
        }
      />
    </>
  );
}
