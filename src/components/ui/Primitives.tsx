import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return <p className={`eyebrow ${tone === "light" ? "text-gold" : "text-red-700"}`}>{children}</p>;
}

/** Section heading: eyebrow, display title and optional "see all" link. */
export function SectionHeader({
  eyebrow,
  title,
  link,
  tone = "dark",
  id,
}: {
  eyebrow?: string;
  title: string;
  link?: { href: string; label: string };
  tone?: "dark" | "light";
  id?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
      <div>
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <h2 id={id} className={`display mt-2 text-4xl md:text-6xl ${tone === "light" ? "text-white" : "text-midnight"}`}>
          {title}
        </h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className={`text-sm font-bold tracking-wide uppercase underline decoration-2 underline-offset-4 ${
            tone === "light" ? "text-white decoration-gold" : "text-midnight decoration-red"
          }`}
        >
          {link.label} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}

/** Small tag for event / round status. Colour is never the only signal: the word is always shown. */
export function StatusTag({ label, tone = "neutral" }: { label: string; tone?: "live" | "upcoming" | "neutral" | "draft" }) {
  const tones = {
    live: "bg-red-600 text-white",
    upcoming: "bg-gold text-midnight",
    neutral: "bg-pit-200 text-ink-soft",
    draft: "bg-steel text-white",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-[0.6875rem] font-bold tracking-[0.12em] uppercase ${tones[tone]}`}>
      {tone === "live" && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white motion-safe:animate-pulse" />}
      {label}
    </span>
  );
}

/** Three vertical race stripes (06, concept 01). Decorative. */
export function RaceStripes({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none flex gap-[6%] ${className}`}>
      <span className="h-full w-[26%] bg-red" />
      <span className="h-full w-[26%] bg-red" />
      <span className="h-full w-[12%] bg-red" />
    </div>
  );
}
