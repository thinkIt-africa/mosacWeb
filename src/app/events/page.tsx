import type { Metadata } from "next";
import { CalendarList } from "@/components/sections/CalendarList";
import { EventBrowser } from "@/components/sections/EventBrowser";
import { PageHero } from "@/components/sections/Heroes";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/Primitives";
import { eventItem, roundItems } from "@/lib/calendar";
import { getArchivedEvents, getUpcomingEvents, mediaFor } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "MOSAC Events — Rally Calendar, Results and Archive" },
  description: "Every event has a route, a start and a story to tell. Here you can find confirmed dates, entry details, useful documents, results and the memories that remain long after the final stage.",
};

/** Events hub — "Live calendar + archive" (03, section H; copy from 01, section 05). */
export default async function EventsPage() {
  const [upcoming, archive] = await Promise.all([getUpcomingEvents(), getArchivedEvents()]);
  return (
    <>
      <PageHero
        asset={mediaFor("heroKigeziArch")}
        eyebrow="Events"
        title="Be there when the lights change"
        lead="Every event has a route, a start and a story to tell. Here you can find confirmed dates, entry details, useful documents, results and the memories that remain long after the final stage."
        actions={
          <>
            <ButtonLink href="#archive">Browse Results</ButtonLink>
            <ButtonLink href="#archive" variant="outline-light">
              Discover Historic Events
            </ButtonLink>
          </>
        }
      />

      <section aria-labelledby="current" className="py-20 md:py-24">
        <div className="container-site">
          <SectionHeader id="current" title="Calendar" />
          <div className="bg-white px-4 md:px-6">
            <CalendarList items={[...roundItems().filter((r) => r.status.tone !== "neutral"), ...upcoming.filter((e) => e.discipline !== "esports").map(eventItem), ...roundItems().filter((r) => r.status.tone === "neutral").reverse()]} />
          </div>
          <p className="mt-8 max-w-2xl text-ink-soft">
            The next calendar is being finalised. Explore our archive. The official FMU calendar is the governing
            reference.
          </p>
        </div>
      </section>

      <section id="archive" aria-labelledby="archive-h" className="scroll-mt-28 bg-pit-200 py-20 md:py-24">
        <div className="container-site">
          <SectionHeader id="archive-h" eyebrow="Find it, follow it, relive it" title="Event archive" />
          {/* Doc 01 archive cards include both esports seasons, so the current championship is listed here too. */}
          <EventBrowser events={[...upcoming, ...archive]} rows={[...upcoming, ...archive].map(eventItem)} />
        </div>
      </section>
    </>
  );
}
