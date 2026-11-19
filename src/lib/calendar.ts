import { championship, rounds } from "@/content/esports";
import { thinkit } from "@/content/site";
import type { CalendarItem } from "@/components/sections/CalendarList";
import { eventStatusLabel, roundStatusLabel } from "@/lib/format";
import type { MosacEvent } from "@/types/content";
import { getEvents, isUpcoming } from "./content";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function dateBlock(start?: string, end?: string, label?: string) {
  if (start && !label) {
    const [y, m, d] = start.split("-");
    const endDay = end && end !== start ? `–${Number(end.slice(8))}` : "";
    return { day: `${Number(d)}${endDay}`, monthYear: `${MONTHS[Number(m) - 1]} ${y}` };
  }
  const year = (start ?? "").slice(0, 4);
  const month = MONTHS.find((mo) => label?.startsWith(mo) || label?.includes(` ${mo}`) || label?.toLowerCase().startsWith(mo.toLowerCase()));
  return month ? { day: month, monthYear: year } : { day: year, monthYear: "Archive" };
}

export function eventItem(e: MosacEvent): CalendarItem {
  const upcoming = isUpcoming(e);
  return {
    id: e.slug,
    ...dateBlock(e.startDate, e.endDate, e.dateLabel),
    title: e.title,
    detail: e.result ? `${e.result.label}: ${e.result.value}` : e.organiserRole ? `MOSAC: ${e.organiserRole}` : e.summary,
    place: e.district ?? "Uganda",
    status: { label: eventStatusLabel[e.status], tone: e.status === "running" ? "live" : upcoming ? "upcoming" : "neutral" },
    href: e.discipline === "esports" ? "/esports" : `/events/${e.slug}`,
  };
}

/** Esports rounds as calendar rows. Dated rounds get an "Add to calendar" file. */
export function roundItems(): CalendarItem[] {
  return rounds.map((r) => {
    const block = r.startDate ? dateBlock(r.startDate, r.endDate) : { day: championship.season, monthYear: "Esports" };
    return {
      id: `esports-${r.id}`,
      ...block,
      title: `Esports ${r.name}`,
      detail: [championship.title, r.stages].filter(Boolean).join(" · "),
      place: "Kampala",
      status: { label: roundStatusLabel[r.status], tone: r.status === "live" ? "live" : r.status === "upcoming" ? "upcoming" : "neutral" },
      href: r.status === "upcoming" ? "/esports" : thinkit.results,
      external: r.status !== "upcoming",
      ics: r.startDate && r.status === "upcoming" ? `/calendar/esports-${r.id}.ics` : undefined,
    };
  });
}

/** Upcoming items first (soonest first), then the most recent past items. */
export async function getCalendarItems(limit?: number): Promise<CalendarItem[]> {
  const events = (await getEvents()).filter((e) => e.discipline !== "esports");
  const rs = roundItems();
  const upcoming = rs.filter((r) => r.status.tone !== "neutral");
  const pastRounds = rs.filter((r) => r.status.tone === "neutral").reverse();
  const items = [...upcoming, ...pastRounds.slice(0, 1), ...events.map(eventItem)];
  return limit ? items.slice(0, limit) : items;
}
