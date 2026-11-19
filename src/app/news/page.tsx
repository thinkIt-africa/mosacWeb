import type { Metadata } from "next";
import { NewsBrowser } from "@/components/sections/NewsBrowser";
import { PageHero } from "@/components/sections/Heroes";
import { ButtonLink } from "@/components/ui/Button";
import { getArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "MOSAC News, Rally Stories and Club Updates" },
  description:
    "Results tell us who finished first. Stories reveal what it took to get there. From the service park to the sim-rally screen, follow the people, communities and ideas moving our sport forward.",
};

/** News — "The Paddock" (03, section N; copy from 01, section 11). */
export default async function NewsPage() {
  const articles = await getArticles();
  return (
    <>
      <PageHero
        eyebrow="News & media"
        actions={
          <>
            <ButtonLink href="#latest">Read Latest</ButtonLink>
            <ButtonLink href="/contact" variant="outline-light">
              Share a Story Lead
            </ButtonLink>
          </>
        }
        title="The stories behind the speed"
        lead="Results tell us who finished first. Stories reveal what it took to get there. From the service park to the sim-rally screen, follow the people, communities and ideas moving our sport forward."
      />
      <section id="latest" className="scroll-mt-28 py-20 md:py-24">
        <div className="container-site">
          <NewsBrowser articles={articles} />
        </div>
      </section>
    </>
  );
}
