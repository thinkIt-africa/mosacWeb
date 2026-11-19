import { championship, rounds } from "@/content/esports";

/** Serves .ics files so visitors can add dated events to their own calendar (FIA "Add to calendar"). */
const dated = rounds.filter((r) => r.startDate);

// Built once at build time, so it works on static hosts such as GitHub Pages.
export const dynamic = "force-static";

export function generateStaticParams() {
  return dated.map((r) => ({ file: `esports-${r.id}.ics` }));
}

const compact = (iso: string) => iso.replaceAll("-", "");
function nextDay(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

export async function GET(_req: Request, ctx: RouteContext<"/calendar/[file]">) {
  const { file } = await ctx.params;
  const round = dated.find((r) => `esports-${r.id}.ics` === file);
  if (!round?.startDate) return new Response("Not found", { status: 404 });

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MOSAC//Motorsport Africa Club//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${file}@mosac`,
    `DTSTAMP:${compact(round.startDate)}T000000Z`,
    `DTSTART;VALUE=DATE:${compact(round.startDate)}`,
    `DTEND;VALUE=DATE:${compact(nextDay(round.endDate ?? round.startDate))}`,
    `SUMMARY:${championship.title} — ${round.name}`,
    `LOCATION:${championship.venue}`,
    "DESCRIPTION:FMU-sanctioned WRC rally simulation championship. MOSAC is technical organiser.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${file}"`,
    },
  });
}
