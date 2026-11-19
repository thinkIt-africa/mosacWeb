import type { EsportsRound } from "@/types/content";

/**
 * thinkIT FMU Esports Championship 2026.
 * Roles from "01 — MOSAC Website_ Complete Page Copy & Editorial Content", section 07; rounds from the thinkIT platform.
 * Round status is set by an editor; it is never calculated from the date.
 */
export const championship = {
  title: "thinkIT FMU Esports Championship",
  season: "2026",
  // Doc 01, section 07 — FORMAT, ABOUT, 2025 LEGACY, WHY IT MATTERS (word for word).
  format:
    "Four published rounds of WRC rally simulation. Standings are accumulated across a season that ends with a finale.",
  about:
    "FMU sanctioned the competition. MOSAC serves as technical organiser in the 2026 public launch materials. thinkIT is the lead naming and digital partner, while the 2026 season venue is Fun Station Hub at Metroplex Naalya, Kampala.",
  venue: "Fun Station Hub, Metroplex Naalya, Kampala",
  legacy: "FIA coverage identifies Isaac ‘Jua Kali’ Katende as the first season winner after four rounds.",
  whyItMatters:
    "Digital competition removes some cost and access barriers associated with conventional rallying, while retaining the spirit of competition. It is an opportunity to build skills and community, not a promised professional driver pipeline.",
};

// Role labels taken from the ABOUT paragraph above.
export const roles = [
  { org: "FMU", role: "Sanctioned the competition" },
  { org: "MOSAC", role: "Technical organiser" },
  { org: "thinkIT", role: "Lead naming and digital partner" },
  { org: "Fun Station Hub", role: "2026 season venue" },
];

/**
 * Rounds as published on the thinkIT championship platform (checked 17 Nov 2026).
 * thinkIT shows no dates for Rounds 1 and 2; Round 3 was listed as 6–8 Nov.
 */
export const rounds: EsportsRound[] = [
  { id: "r1", name: "Round 1", stages: "Estonia + Kenya", status: "completed" },
  { id: "r2", name: "Round 2", stages: "Central Europe + Indonesia", status: "completed" },
  { id: "r3", name: "Round 3", dates: "6–8 Nov 2026", startDate: "2026-11-06", endDate: "2026-11-08", stages: "Sweden + Portugal", status: "completed" },
  { id: "finale", name: "Grand Finale", dates: "18–20 Dec 2026", startDate: "2026-12-18", endDate: "2026-12-20", stages: "Kampala", status: "upcoming" },
];

// Doc 01, section 16 (FAQ) — the only esports question in the documents.
export const esportsFaq = [
  {
    q: "Can I join esports?",
    a: "Check the relevant FMU-sanctioned championship rules, eligibility, registration and event information.",
  },
];
