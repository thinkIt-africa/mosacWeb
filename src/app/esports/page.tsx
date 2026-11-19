import type { Metadata } from "next";
import { RoundCard } from "@/components/sections/Cards";
import { CtaBand } from "@/components/sections/Blocks";
import { ImageHero } from "@/components/sections/Heroes";
import { Photo, PhotoCredit } from "@/components/sections/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeader } from "@/components/ui/Primitives";
import { thinkit } from "@/content/site";
import { getEsports, mediaFor } from "@/lib/content";

const LEAD =
  "The discipline is digital. The focus is familiar: precision, composure and the drive to improve. Rally simulation gives competitors a structured arena to test themselves and join Uganda’s motorsport community.";

export const metadata: Metadata = {
  title: { absolute: "MOSAC Esports — FMU Rally Simulation Championship" },
  description: LEAD,
};

/**
 * Esports — "New terrain" (03, section J; copy from 01, section 07, word for word).
 * Standings, results and registration live on the thinkIT platform; this page links there
 * rather than duplicating it. Round dates and stages come from the thinkIT platform.
 */
export default async function EsportsPage() {
  const { championship, roles, rounds, faq } = await getEsports();

  return (
    <>
      <ImageHero
        size="md"
        asset={mediaFor("esportsHero")}
        eyebrow={`${championship.title} · ${championship.season}`}
        title={
          <>
            New terrain.
            <br />
            <span className="text-red">Real competition.</span>
          </>
        }
        actions={
          <>
            <ButtonLink href={thinkit.home} external={{ siteName: "thinkIT" }}>
              View Championship
            </ButtonLink>
            <ButtonLink href={thinkit.standings} variant="outline-light" external={{ siteName: "thinkIT" }}>
              Follow Standings
            </ButtonLink>
          </>
        }
      >
        <p>{LEAD}</p>
      </ImageHero>

      {/* About */}
      <section aria-labelledby="about" className="py-20 md:py-28">
        <div className="container-site">
          <SectionHeader id="about" title="About" />
          <p className="max-w-3xl text-xl leading-relaxed" data-reveal>
            {championship.about}
          </p>
          <ul className="mt-12 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((r) => (
              <li key={r.org} className={`p-6 md:p-8 ${r.org === "MOSAC" ? "bg-midnight text-white" : "bg-white"}`} data-reveal>
                <p className="display text-4xl">{r.org}</p>
                <p className={`mt-3 font-semibold ${r.org === "MOSAC" ? "text-gold" : "text-red-700"}`}>{r.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Rounds (dates from the thinkIT platform) */}
      <section aria-labelledby="calendar" className="bg-pit-200 py-20 md:py-28">
        <div className="container-site">
          <SectionHeader id="calendar" title={`${championship.season} dates`} />
          <ol className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {rounds.map((r, i) => (
              <RoundCard key={r.id} round={r} index={i} />
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3" data-reveal>
            <ButtonLink href={thinkit.standings} external={{ siteName: "thinkIT" }}>
              Follow Standings
            </ButtonLink>
            <ButtonLink href={thinkit.results} variant="outline-dark" external={{ siteName: "thinkIT" }}>
              View Championship
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Format, legacy, why it matters */}
      <section className="py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-6" data-reveal>
            <div>
              <Eyebrow>Format</Eyebrow>
              <p className="mt-3 text-xl leading-relaxed">{championship.format}</p>
            </div>
            <div className="border-l-4 border-red bg-white p-6">
              <Eyebrow>2025 legacy</Eyebrow>
              <p className="mt-2 text-lg">{championship.legacy}</p>
            </div>
            <div>
              <Eyebrow>Why it matters</Eyebrow>
              <p className="mt-3 text-lg leading-relaxed text-ink-soft">{championship.whyItMatters}</p>
            </div>
            <div className="border-t border-black/10 pt-6">
              <Eyebrow>Venue</Eyebrow>
              <p className="display mt-1 text-2xl">{championship.venue}</p>
            </div>
          </div>
          <div className="lg:col-span-6" data-reveal>
            <div className="relative aspect-[4/3] overflow-hidden bg-navy">
              <Photo asset={mediaFor("esportsLaunchGroup")} sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
            <PhotoCredit asset={mediaFor("esportsLaunchGroup")} className="mt-3 text-ink-soft!" />
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="relative aspect-square overflow-hidden bg-navy">
                <Photo asset={mediaFor("esportsPanel")} sizes="(min-width: 1024px) 22vw, 50vw" />
              </div>
              <div className="relative aspect-square overflow-hidden bg-navy">
                <Photo asset={mediaFor("esportsRound2")} sizes="(min-width: 1024px) 22vw, 50vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="esports-faq" className="bg-white py-20 md:py-28">
        <div className="container-site max-w-4xl!">
          <SectionHeader id="esports-faq" title="FAQ" />
          {faq.map((item) => (
            <div key={item.q} className="border-y border-black/10 py-6">
              <h3 className="text-lg font-semibold">{item.q}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        actions={
          <>
            <ButtonLink href={thinkit.home} variant="outline-light" external={{ siteName: "thinkIT" }}>
              View Championship
            </ButtonLink>
            <ButtonLink href={thinkit.standings} variant="outline-light" external={{ siteName: "thinkIT" }}>
              Follow Standings
            </ButtonLink>
            <ButtonLink href={thinkit.register} variant="outline-light" external={{ siteName: "thinkIT" }}>
              Register Interest
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
