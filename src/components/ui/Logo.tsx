import Link from "next/link";
import { withBase } from "@/lib/paths";

/**
 * Current MOSAC logo, converted from "mosac logo_260918_080337.pdf" to SVG.
 * White version for dark backgrounds, Midnight version for light ones.
 * Replace the files in /public/brand when the new logo route (D06) is approved.
 */
export function Logo({ tone = "light", compact = false }: { tone?: "light" | "dark"; compact?: boolean }) {
  const src = withBase(tone === "light" ? "/brand/mosac-logo-white.svg" : "/brand/mosac-logo.svg");
  return (
    <Link href="/" className={`inline-flex items-center gap-3 ${tone === "light" ? "text-white" : "text-midnight"}`}>
      {/* Plain img: SVGs need no optimisation, and this keeps the logo crisp at every size. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="MOSAC home" width={52} height={52} className="h-[52px] w-[52px]" />
      {!compact && (
        <span aria-hidden="true" className="hidden border-l border-current/30 pl-3 text-[0.65rem] leading-tight font-semibold tracking-[0.2em] uppercase sm:block">
          Motorsport
          <br />
          Africa Club
        </span>
      )}
    </Link>
  );
}
