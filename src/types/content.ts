/**
 * Content model — a subset of the entities in
 * "03 — MOSAC UX Storyboard, Sitemap & Functional Specification", section T.
 * The local data in src/content follows these shapes so a headless CMS can
 * replace it later without touching the components.
 */

/** How sure we are of a fact (03, section F: "Verified publicly / Club approved / Pending verification"). */
export type Verification = "verified-public" | "club-approved" | "pending";

export type Discipline = "rally" | "autocross" | "sprint" | "esports";

/** Event statuses from 03, section H. Always set by an editor, never computed. */
export type EventStatus =
  | "scheduled"
  | "open"
  | "running"
  | "provisional"
  | "final"
  | "completed"
  | "postponed"
  | "cancelled"
  | "archived";

export interface MediaAsset {
  id: string;
  /** Path under /public. */
  src: string;
  width: number;
  height: number;
  alt: string;
  event?: string;
  /** Original file name in the MOSAC Drive archive ("04 — MOSAC Photo, Source & Rights Register"). */
  sourceFile?: string;
  credit: string;
  /** CSS object-position for the focal point, e.g. "50% 70%". */
  focal?: string;
}

export interface SourceLink {
  label: string;
  url: string;
}

export interface MosacEvent {
  slug: string;
  title: string;
  discipline: Discipline;
  /** ISO dates in Africa/Kampala (EAT). */
  startDate: string;
  endDate?: string;
  /** Display-only date text when only the year or month is known. */
  dateLabel?: string;
  district?: string;
  venue?: string;
  status: EventStatus;
  organiserRole?: string;
  summary: string;
  /** Second line of the event hero, e.g. doc 01's "A championship chapter in southwestern Uganda." */
  strapline?: string;
  body?: { heading: string; text: string }[];
  cover?: string;
  /** Media keys for the event's curated photo set. */
  gallery?: string[];
  /** Headline result for archive events, e.g. the winning crew. */
  result?: { label: string; value: string };
  sources?: SourceLink[];
  verification: Verification;
}

export interface Article {
  slug: string;
  headline: string;
  standfirst: string;
  category: "Rally" | "Events" | "Esports" | "Club" | "People" | "Safety" | "Community" | "Archive";
  author: string;
  publishedAt: string;
  body: { heading?: string; text: string }[];
  hero: string;
  sources?: SourceLink[];
  /** Draft articles show a visible "Draft" label until an editor approves them. */
  approved: boolean;
}

export interface Milestone {
  year: string;
  title: string;
  text: string;
  verification: Verification;
  source?: SourceLink;
}

export type RoundStatus = "upcoming" | "live" | "provisional" | "final" | "completed" | "postponed" | "cancelled";

export interface EsportsRound {
  id: string;
  name: string;
  /** Leave empty when the official platform does not publish a date. */
  dates?: string;
  /** Rally stages run in the simulator, e.g. "Estonia + Kenya". */
  stages?: string;
  /** ISO dates (EAT) when known, used for "Add to calendar". */
  startDate?: string;
  endDate?: string;
  status: RoundStatus;
  note?: string;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: { label: string; href: string; description?: string; external?: boolean }[];
}
