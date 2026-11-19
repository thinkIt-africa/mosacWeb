import Link from "next/link";
import { ArticleCard } from "@/components/sections/Cards";
import { CalendarList } from "@/components/sections/CalendarList";
import { CtaBand, FeatureCard } from "@/components/sections/Blocks";
import { ImageHero } from "@/components/sections/Heroes";
import { Photo, PhotoCredit } from "@/components/sections/Photo";
import { ResultsTiles } from "@/components/sections/ResultsTiles";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeader, StatusTag } from "@/components/ui/Primitives";
import { thinkit } from "@/content/site";
import { getCalendarItems } from "@/lib/calendar";
import { getArticles, getEsports, getMilestones, mediaFor } from "@/lib/content";
import { roundStatusLabel } from "@/lib/format";

/** dd.mm.yy, the compact date style FIA uses in its news lists. */
function shortDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y.slice(2)}`;
}

/**
 * Homepage — "The Start Line" (03, section D; copy from 01, section 01).
 * Section order borrows from FIA.com. Copy follows doc 01 word for word; see docs/COPY-AUDIT.md.
 */
export default async function HomePage() {
  const [articles, esports, milestones, calendar] = await Promise.all([
    getArticles(),
    getEsports(),
    getMilestones(),
    getCalendarItems(5),
  ]);
  const nextRound = esports.rounds.find((r) => r.status === "upcoming" || r.status === "live");
  const [lead] = articles;

  return (
    <>
      <ImageHero
        asset={mediaFor("heroKigeziArch")}
        eyebrow="Motorsport Africa Club · Est. 1990"
        title={
          <>
            Born for the stage.
            <br />
            <span className="text-red">Built for what’s next.</span>
          </>
        }
        actions={
          <>
            <ButtonLink href="/about">Explore MOSAC</ButtonLink>
            <ButtonLink href="/events" variant="outline-light">
              View Events
            </ButtonLink>
          </>
        }
      >
        <p>
          From Uganda’s rally roads to the digital start line, MOSAC brings together the people, precision and passion
          that make motorsport unforgettable. Experience the stories. Follow the action. Find your place in the sport.
        </p>
      </ImageHero>

      {/* Proof strip — wording exactly as doc 01: "Founded 1990 | FMU member club | Rally heritage | Evolving esports pathway" */}
      <section aria-label="MOSAC at a glance" className="bg-navy text-white">
        <ul className="container-site grid grid-cols-2 md:grid-cols-4">
          {["Founded 1990", "FMU member club", "Rally heritage", "Evolving esports pathway"].map((item, i) => (
            <li key={item} className={`flex items-center gap-3 py-6 md:py-8 ${i > 0 ? "md:border-l md:border-white/10 md:pl-8" : ""}`}>
              <span aria-hidden="true" className="h-8 w-1.5 shrink-0 bg-red" />
              <p className="display text-2xl text-gold md:text-3xl">{item}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Latest news — FIA pattern: lead story plus a dated headline list */}
      <section aria-labelledby="paddock" className="bg-white py-20 md:py-24">
        <div className="container-site">
          <SectionHeader id="paddock" title="From the paddock" link={{ href: "/news", label: "Read Latest" }} />
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">{lead && <ArticleCard article={lead} large />}</div>
            <div className="lg:col-span-5">
              <h3 className="eyebrow text-ink-soft">Latest</h3>
              <ul className="mt-3 divide-y divide-black/10 border-y border-black/10">
                {articles.map((a) => (
                  <li key={a.slug} className="group relative py-5" data-reveal>
                    <p className="tabular text-sm text-ink-soft">
                      {a.approved && (
                        <>
                          <time dateTime={a.publishedAt}>{shortDate(a.publishedAt)}</time>
                          <span className="mx-2" aria-hidden="true">
                            |
                          </span>
                        </>
                      )}
                      <span className="font-bold tracking-wide text-red-700 uppercase">{a.category}</span>
                      {!a.approved && <span className="ml-2 text-xs font-semibold text-steel">Draft</span>}
                    </p>
                    <p className="display mt-1 text-2xl">
                      <Link href={`/news/${a.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-red group-hover:underline-offset-4">
                        {a.headline}
                      </Link>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar — FIA race-list pattern, with the next event featured above it */}
      <section aria-labelledby="next-start" className="bg-midnight py-20 text-white md:py-24">
        <div className="container-site">
          <SectionHeader id="next-start" title="The next start line" tone="light" link={{ href: "/events", label: "View Events" }} />
          {nextRound && (
            <div className="mb-12 grid overflow-hidden bg-navy lg:grid-cols-12" data-reveal>
              <div className="relative min-h-64 lg:col-span-6">
                <Photo asset={mediaFor("esportsHero")} sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
              <div className="flex flex-col p-8 md:p-10 lg:col-span-6">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusTag label={roundStatusLabel[nextRound.status]} tone="upcoming" />
                  <span className="eyebrow text-gold">Esports · {esports.championship.season}</span>
                </div>
                <h3 className="display mt-4 text-4xl md:text-5xl">
                  {esports.championship.title}: {nextRound.name}
                </h3>
                <dl className="mt-6 grid grid-cols-2 gap-6 border-t border-white/15 pt-6">
                  <div>
                    <dt className="eyebrow text-steel-300">Dates</dt>
                    <dd className="display tabular mt-1 text-2xl">{nextRound.dates ?? "To be confirmed"}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-steel-300">Venue</dt>
                    <dd className="mt-1">{esports.championship.venue}</dd>
                  </div>
                </dl>
                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  <ButtonLink href="/esports">View Championship</ButtonLink>
                  <ButtonLink href={thinkit.standings} variant="outline-light" external={{ siteName: "thinkIT" }}>
                    Follow Standings
                  </ButtonLink>
                </div>
              </div>
            </div>
          )}
          <CalendarList items={calendar} tone="dark" />
          <p className="mt-6 text-steel-300">
            The next calendar is being finalised.{" "}
            <Link href="/events#archive" className="font-semibold text-white underline decoration-gold underline-offset-4">
              Explore our archive.
            </Link>
          </p>
        </div>
      </section>

      {/* Results & standings — FIA championship tiles */}
      <section aria-labelledby="results" className="py-20 md:py-24">
        <div className="container-site">
          <SectionHeader id="results" title="Results & standings" link={{ href: "/events#archive", label: "Browse Results" }} />
          <ResultsTiles
            tiles={[
              {
                label: `Esports · ${esports.championship.season}`,
                title: "thinkIT FMU Esports Championship",
                resultLabel: "Venue",
                result: "Fun Station Hub, Metroplex Naalya",
                href: thinkit.standings,
                linkLabel: "Follow Standings",
                external: true,
                asset: mediaFor("esportsPanel"),
              },
              {
                label: "Esports · 2025",
                title: "FMU Esports 2025",
                resultLabel: "First season winner",
                result: "Isaac ‘Jua Kali’ Katende",
                href: "/esports",
                linkLabel: "Esports",
                asset: mediaFor("esportsHandover"),
              },
              {
                label: "Rally · 2022",
                title: "Kigezi Boona 2022",
                resultLabel: "Winners",
                result: "Byron Rugomoka / Hakim Mwanda",
                href: "/events/kigezi-boona-2022",
                linkLabel: "Event story",
                asset: mediaFor("kigeziCelebration"),
              },
              {
                label: "Autocross · 2019",
                title: "Kapeeka Autocross 2019",
                resultLabel: "Winner",
                result: "Rajiv Ruparelia",
                href: "/events/kapeeka-autocross-2019",
                linkLabel: "Event story",
                asset: mediaFor("kapeeka-2019-mud-splash"),
              },
            ]}
          />
        </div>
      </section>

      {/* Disciplines triptych */}
      <section aria-labelledby="pathways" className="bg-midnight py-20 md:py-28">
        <div className="container-site">
          <h2 id="pathways" className="sr-only">
            Rally Heritage, Esports and Community
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              href="/history"
              label="Rally heritage"
              title="The dust never settles"
              text="Explore the rally years, stories and archive photography."
              asset={mediaFor("lukaya-2017-dust")}
            />
            <FeatureCard
              href="/esports"
              label="Esports"
              title="Different track. Same drive."
              text="Meet the next generation in competitive digital rallying."
              asset={mediaFor("esportsProgrammes")}
            />
            <FeatureCard
              href="/people"
              label="Community"
              title="More than the finish line."
              text="Celebrate volunteers, officials, partners and host communities."
              asset={mediaFor("kigeziGroup")}
            />
          </div>
        </div>
      </section>

      {/* The next chapter */}
      <section className="py-20 md:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <h2 className="display text-5xl md:text-7xl">The next chapter starts here</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Motorsport is more than a car at full throttle. It is a navigator’s call made at exactly the right moment.
              A marshal holding a stage secure. A service crew working against the clock. A community that comes
              together for a day it will remember.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              MOSAC celebrates those moments—and builds pathways for more people to experience them.
            </p>
          </div>
          <div className="relative lg:col-span-7" data-reveal>
            <div className="relative aspect-[4/3] overflow-hidden bg-navy">
              <Photo asset={mediaFor("kigeziCrew")} sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
            <PhotoCredit asset={mediaFor("kigeziCrew")} className="mt-3 text-right text-ink-soft!" />
          </div>
        </div>
      </section>

      {/* History teaser */}
      <section aria-labelledby="history-teaser" className="relative isolate overflow-hidden bg-midnight py-20 text-white md:py-28">
        <Photo asset={mediaFor("elgonStage")} sizes="100vw" className="-z-20 opacity-35" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-midnight/60 to-midnight" />
        <div className="container-site">
          <div className="max-w-2xl" data-reveal>
            <Eyebrow tone="light">1990 → today</Eyebrow>
            <h2 id="history-teaser" className="display mt-3 text-5xl md:text-7xl">
              Every generation leaves a track
            </h2>
          </div>
          <ol className="mt-12 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
            {milestones
              .filter((m) => ["1990", "2019", "2022", "2024", "2026"].includes(m.year))
              .map((m) => (
                <li key={m.year} className="bg-midnight/90 p-5" data-reveal>
                  <p className="display tabular text-4xl text-red">{m.year}</p>
                  <p className="mt-2 font-semibold">{m.title}</p>
                </li>
              ))}
          </ol>
          <div className="mt-10">
            <ButtonLink href="/history" variant="outline-light">
              See Our History
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Official documents & safety — FIA "Official Documents" promo pattern */}
      <section aria-label="Competitors and safety" className="bg-white">
        <div className="container-site grid gap-px bg-black/10 py-px md:grid-cols-2">
          {[
            {
              eyebrow: "Competitor Centre",
              title: "Prepare well. Compete fair.",
              text: "Great performance starts before the first timed kilometre.",
              href: "/competitors",
            },
            {
              eyebrow: "Safety",
              title: "The most important finish is a safe one",
              text: "The excitement of rallying depends on discipline.",
              href: "/safety",
            },
          ].map((b) => (
            <article key={b.href} className="group relative bg-white p-8 md:p-12" data-reveal>
              <p className="eyebrow text-red-700">{b.eyebrow}</p>
              <h2 className="display mt-3 text-4xl md:text-5xl">
                <Link href={b.href} className="after:absolute after:inset-0">
                  {b.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-md text-ink-soft">{b.text}</p>
              <span aria-hidden="true" className="mt-6 inline-flex h-11 w-11 items-center justify-center bg-midnight text-xl text-white transition-transform group-hover:translate-x-1">
                →
              </span>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title="Your place in motorsport starts here"
        text="You can drive, navigate, volunteer, support, document or help make an event happen."
        actions={
          <ButtonLink href="/membership" variant="outline-light">
            Discover how to get involved
          </ButtonLink>
        }
      />
    </>
  );
}
