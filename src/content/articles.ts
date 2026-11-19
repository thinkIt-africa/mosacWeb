import type { Article } from "@/types/content";

/**
 * Launch stories proposed in "01 — MOSAC Website_ Complete Page Copy & Editorial Content", section 11.
 * Both are DRAFTS using only doc 01 wording. They show "Draft" (and no byline or date) until the
 * editorial lead adds the author, sets the publish date and sets `approved: true`.
 */
export const articles: Article[] = [
  {
    slug: "from-dirt-stages-to-digital-rally",
    headline: "From Dirt Stages to Digital Rally",
    standfirst: "MOSAC’s esports technical role.",
    category: "Esports",
    author: "",
    publishedAt: "2026-11-17",
    hero: "esportsLaunchGroup",
    approved: false,
    // Body is doc 01, section 07, word for word, until the editorial lead writes the story.
    body: [
      {
        text: "The discipline is digital. The focus is familiar: precision, composure and the drive to improve. Rally simulation gives competitors a structured arena to test themselves and join Uganda’s motorsport community.",
      },
      {
        heading: "About",
        text: "FMU sanctioned the competition. MOSAC serves as technical organiser in the 2026 public launch materials. thinkIT is the lead naming and digital partner, while the 2026 season venue is Fun Station Hub at Metroplex Naalya, Kampala.",
      },
      {
        heading: "Why it matters",
        text: "Digital competition removes some cost and access barriers associated with conventional rallying, while retaining the spirit of competition. It is an opportunity to build skills and community, not a promised professional driver pipeline.",
      },
    ],
    sources: [
      {
        label: "NBS Sport",
        url: "https://nbssport.co.ug/article/thinkit-named-lead-sponsor-for-fmu-esports-championship",
      },
    ],
  },
  {
    slug: "kigezi-boona-2022-a-championship-finale",
    headline: "Kigezi Boona 2022: A Championship Finale",
    standfirst: "A championship chapter in southwestern Uganda.",
    category: "Archive",
    author: "",
    publishedAt: "2026-11-17",
    hero: "heroKigeziArch",
    approved: false,
    // Body is doc 01, section 06, word for word.
    body: [
      {
        text: "In December 2022, crews took on the rally roads of the Rukungiri area for a MOSAC-organised event that contributed to the national title contest. Byron Rugomoka and co-driver Hakim Mwanda took the win, making it a fitting final chapter to a demanding season.",
      },
      {
        heading: "The result",
        text: "Press reporting places Jonas Kansiime/Ivan Tushabe second and Mark Lubega/Daniel Mbabazi third.",
      },
    ],
    sources: [
      {
        label: "Uganda Radio Network",
        url: "https://www.ugandaradionetwork.net/story/rugomoka-wins-kigezi-boona-motor-rally-",
      },
    ],
  },
];
