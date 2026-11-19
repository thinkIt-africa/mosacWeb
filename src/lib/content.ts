/**
 * Content access layer. Every page reads content through these functions.
 * Today they return local data from src/content; when the CMS is connected,
 * only this file changes (the functions are already async for that reason).
 */
import { articles } from "@/content/articles";
import { championship, esportsFaq, roles, rounds } from "@/content/esports";
import { events } from "@/content/events";
import { milestones } from "@/content/history";
import { getMedia } from "@/content/media";
import type { EventStatus, MediaAsset, MosacEvent } from "@/types/content";

const UPCOMING: EventStatus[] = ["scheduled", "open", "running", "postponed"];

export async function getEvents() {
  return [...events].sort((a, b) => b.startDate.localeCompare(a.startDate));
}

export async function getUpcomingEvents() {
  return (await getEvents()).filter((e) => UPCOMING.includes(e.status));
}

export async function getArchivedEvents() {
  return (await getEvents()).filter((e) => !UPCOMING.includes(e.status));
}

export async function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

export async function getArticles() {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export async function getMilestones() {
  return milestones;
}

export async function getEsports() {
  return { championship, roles, rounds, faq: esportsFaq };
}

/** Resolve a media key (or fall back) to an asset. */
export function mediaFor(key: string | undefined, fallback = "heroKigeziArch"): MediaAsset {
  return getMedia(key ?? fallback) ?? getMedia(fallback)!;
}

export function isUpcoming(e: MosacEvent) {
  return UPCOMING.includes(e.status);
}
