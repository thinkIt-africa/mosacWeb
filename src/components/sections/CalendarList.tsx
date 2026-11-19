import Link from "next/link";
import { StatusTag } from "@/components/ui/Primitives";
import { withBase } from "@/lib/paths";

export interface CalendarItem {
  id: string;
  /** Big date figure, e.g. "18–20" or "2024". */
  day: string;
  /** Small line under it, e.g. "Dec 2026". */
  monthYear: string;
  title: string;
  detail: string;
  place: string;
  status: { label: string; tone: "live" | "upcoming" | "neutral" };
  href: string;
  external?: boolean;
  /** Link to an .ics file so visitors can add the event to their own calendar. */
  ics?: string;
}

/**
 * Calendar rows inspired by the FIA race list: date block, event, place code, status, actions.
 * Compact and scannable, unlike the photo cards used for the archive.
 */
export function CalendarList({ items, tone = "light" }: { items: CalendarItem[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ol className={`divide-y border-y ${dark ? "divide-white/10 border-white/10" : "divide-black/10 border-black/10"}`}>
      {items.map((it) => (
        <li key={it.id} className="group relative grid grid-cols-[5.5rem_1fr] items-center gap-x-4 gap-y-2 py-5 md:grid-cols-[8rem_1fr_9rem_8rem_12rem] md:gap-x-6" data-reveal>
          <div className={`border-l-4 pl-3 ${it.status.tone === "upcoming" || it.status.tone === "live" ? "border-red" : dark ? "border-white/20" : "border-black/15"}`}>
            <p className="display tabular text-3xl leading-none md:text-4xl">{it.day}</p>
            <p className={`eyebrow mt-1 ${dark ? "text-steel-300" : "text-ink-soft"}`}>{it.monthYear}</p>
          </div>
          <div className="min-w-0">
            <p className="display text-2xl md:text-3xl">
              {it.external ? (
                <a href={it.href} rel="noopener" className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-red group-hover:underline-offset-4">
                  {it.title}
                  <span className="sr-only"> (on the thinkIT website)</span>
                </a>
              ) : (
                <Link href={it.href} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-red group-hover:underline-offset-4">
                  {it.title}
                </Link>
              )}
            </p>
            <p className={`mt-1 text-sm ${dark ? "text-steel-300" : "text-ink-soft"}`}>{it.detail}</p>
          </div>
          <p className={`col-start-2 text-sm font-semibold md:col-start-auto ${dark ? "text-white" : "text-midnight"}`}>
            <svg aria-hidden="true" width="12" height="14" viewBox="0 0 12 14" className="mr-1.5 inline-block align-[-1px] text-red">
              <path d="M6 0a5 5 0 0 0-5 5c0 3.6 5 9 5 9s5-5.4 5-9a5 5 0 0 0-5-5Zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" fill="currentColor" />
            </svg>
            {it.place}
          </p>
          <div className="col-start-2 md:col-start-auto">
            <StatusTag label={it.status.label} tone={it.status.tone} />
          </div>
          <div className="relative z-10 col-start-2 md:col-start-auto md:justify-self-end">
            {it.ics && (
              <a
                href={withBase(it.ics)}
                download
                className={`inline-flex min-h-11 items-center gap-2 border px-3 text-xs font-bold tracking-wide uppercase ${
                  dark ? "border-white/40 hover:bg-white hover:text-midnight" : "border-midnight/30 hover:bg-midnight hover:text-white"
                }`}
              >
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="2" y="3" width="12" height="11" />
                  <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" />
                </svg>
                Add to calendar
                <span className="sr-only">: {it.title}</span>
              </a>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
