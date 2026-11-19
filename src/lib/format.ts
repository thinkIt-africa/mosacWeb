import type { Discipline, EventStatus, MosacEvent, RoundStatus } from "@/types/content";

const TZ = "Africa/Kampala";

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat("en-UG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: TZ,
    ...opts,
  }).format(new Date(`${iso}T12:00:00+03:00`));
}

/** "22–24 Nov 2024", or the editor-supplied label when only a month/year is known. */
export function eventDateLabel(e: MosacEvent) {
  if (e.dateLabel) return e.dateLabel;
  if (!e.endDate || e.endDate === e.startDate) return formatDate(e.startDate);
  const start = new Date(`${e.startDate}T12:00:00+03:00`);
  const end = new Date(`${e.endDate}T12:00:00+03:00`);
  if (start.getUTCMonth() === end.getUTCMonth() && start.getUTCFullYear() === end.getUTCFullYear()) {
    return `${formatDate(e.startDate, { month: undefined, year: undefined })}–${formatDate(e.endDate)}`;
  }
  return `${formatDate(e.startDate, { year: undefined })} – ${formatDate(e.endDate)}`;
}

export const disciplineLabel: Record<Discipline, string> = {
  rally: "Rally",
  autocross: "Autocross",
  sprint: "Sprint",
  esports: "Esports",
};

/** Labels from doc 01, "Site-wide voice": UPCOMING, IN PROGRESS, PROVISIONAL, FINAL, COMPLETED… */
export const eventStatusLabel: Record<EventStatus, string> = {
  scheduled: "Upcoming",
  open: "Entries open",
  running: "In progress",
  provisional: "Provisional",
  final: "Final",
  completed: "Completed",
  postponed: "Postponed",
  cancelled: "Cancelled",
  archived: "Archive",
};

export const roundStatusLabel: Record<RoundStatus, string> = {
  upcoming: "Upcoming",
  live: "Live",
  provisional: "Provisional",
  final: "Final",
  completed: "Completed",
  postponed: "Postponed",
  cancelled: "Cancelled",
};
