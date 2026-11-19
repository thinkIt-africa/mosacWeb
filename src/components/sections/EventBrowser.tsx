"use client";

import { useState } from "react";
import { disciplineLabel } from "@/lib/format";
import type { Discipline, MosacEvent } from "@/types/content";
import { CalendarList, type CalendarItem } from "./CalendarList";
import { EventCard } from "./Cards";

const FILTERS: ("all" | Discipline)[] = ["all", "rally", "autocross", "esports"];

/**
 * Event archive with discipline tabs (06, concept 04), a year filter and a list/cards toggle
 * (03, section H). The list view uses the FIA-style calendar rows.
 */
export function EventBrowser({ events, rows }: { events: MosacEvent[]; rows: CalendarItem[] }) {
  const [filter, setFilter] = useState<"all" | Discipline>("all");
  const [year, setYear] = useState("all");
  const [view, setView] = useState<"cards" | "list">("cards");

  const years = Array.from(new Set(events.map((e) => e.startDate.slice(0, 4)))).sort().reverse();
  const shown = events.filter(
    (e) => (filter === "all" || e.discipline === filter) && (year === "all" || e.startDate.startsWith(year)),
  );
  const shownRows = shown.map((e) => rows.find((r) => r.id === e.slug)).filter((r): r is CalendarItem => !!r);

  const tab = (active: boolean) =>
    `min-h-11 px-5 text-sm font-bold tracking-wide uppercase transition-colors ${
      active ? "bg-red-600 text-white" : "bg-white text-midnight ring-1 ring-black/10 hover:bg-pit-200"
    }`;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter by discipline" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} className={tab(filter === f)}>
              {f === "all" ? "All events" : disciplineLabel[f]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm font-semibold">
            Year
            <select value={year} onChange={(e) => setYear(e.target.value)} className="min-h-11 border-2 border-black/15 bg-white px-3">
              <option value="all">All years</option>
              {years.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </label>
          <div role="group" aria-label="View" className="flex">
            {(["cards", "list"] as const).map((v) => (
              <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)} className={tab(view === v)}>
                {v === "cards" ? "Cards" : "List"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} events shown
      </p>
      {shown.length === 0 ? (
        <p className="text-ink-soft">No results yet. Try another event or year.</p>
      ) : view === "cards" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </div>
      ) : (
        <div className="bg-white px-4 md:px-6">
          <CalendarList items={shownRows} />
        </div>
      )}
    </div>
  );
}
