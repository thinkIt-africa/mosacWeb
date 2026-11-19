import type { NavItem } from "@/types/content";

export const site = {
  name: "MOSAC",
  legalName: "Motorsport Africa Club", // D01 — awaiting confirmation of registered name
  founded: 1990,
  tagline: "Rooted in heritage. Built for the next grid.",
  description:
    "Explore the story of Motorsport Africa Club, established in 1990. Discover rally events, esports, membership, safety and Ugandan motorsport culture.",
  // D10 — domain not decided yet. Used for canonical URLs and the sitemap.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  fmuUrl: "https://motorsportuganda.com/",
} as const;

/** thinkIT FMU Esports Championship platform. MOSAC links here rather than rebuilding it. */
const THINKIT_BASE = "https://thinkit.africa/EsportsChampionship";

function withUtm(hash = "") {
  const params = new URLSearchParams({
    utm_source: "mosac",
    utm_medium: "referral",
    utm_campaign: "esports_2026",
  });
  return `${THINKIT_BASE}?${params.toString()}${hash}`;
}

export const thinkit = {
  home: withUtm(),
  standings: withUtm("#leaders"),
  results: withUtm("#results"),
  register: withUtm(),
} as const;

/** Main menu from "06 — MOSAC Visual Identity & Website Storyboard _ Graphic Review". */
export const mainNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About MOSAC", href: "/about" },
      { label: "History", href: "/history" },
      { label: "Motorsport", href: "/motorsport" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "Events", href: "/events" },
      { label: "Esports", href: "/esports" },
      { label: "Competitor Centre", href: "/competitors" },
      { label: "Safety", href: "/safety" },
    ],
  },
  {
    label: "News",
    href: "/news",
    children: [
      { label: "News", href: "/news" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  { label: "People", href: "/people" },
  {
    label: "Join",
    href: "/membership",
    children: [
      { label: "Membership", href: "/membership" },
      { label: "Partners", href: "/partners" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerNav = [
  {
    heading: "Club",
    links: [
      { label: "About MOSAC", href: "/about" },
      { label: "History", href: "/history" },
      { label: "People", href: "/people" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Motorsport",
    links: [
      { label: "Events", href: "/events" },
      { label: "Esports", href: "/esports" },
      { label: "Competitor Centre", href: "/competitors" },
      { label: "Safety", href: "/safety" },
    ],
  },
  {
    heading: "Get involved",
    links: [
      { label: "Membership", href: "/membership" },
      { label: "Partners", href: "/partners" },
      { label: "News", href: "/news" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    heading: "Information",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Privacy", href: "/privacy" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
