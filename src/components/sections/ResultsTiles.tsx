import Link from "next/link";
import type { MediaAsset } from "@/types/content";
import { Photo } from "./Photo";

export interface ResultTile {
  label: string;
  title: string;
  /** e.g. "Champion" / "Winners" */
  resultLabel: string;
  result: string;
  href: string;
  linkLabel: string;
  external?: boolean;
  asset: MediaAsset;
}

/**
 * Results & standings tiles, inspired by the FIA championship tiles
 * (greyscale at rest, colour on hover/focus, each with a "Standings"/results link).
 */
export function ResultsTiles({ tiles }: { tiles: ResultTile[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {tiles.map((t) => {
        const linkCls = "after:absolute after:inset-0";
        return (
          <li key={t.title} className="group relative isolate flex min-h-80 flex-col justify-end overflow-hidden bg-midnight p-6 text-white" data-reveal>
            <Photo
              asset={t.asset}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="-z-20 grayscale transition-[filter,transform] duration-500 group-focus-within:scale-105 group-focus-within:grayscale-0 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/80 to-midnight/20" />
            <p className="eyebrow text-gold">{t.label}</p>
            <h3 className="display mt-2 text-3xl">{t.title}</h3>
            <dl className="mt-4 border-t border-white/20 pt-3">
              <dt className="text-xs tracking-wider text-steel-300 uppercase">{t.resultLabel}</dt>
              <dd className="mt-0.5 font-semibold">{t.result}</dd>
            </dl>
            <p className="mt-5 text-sm font-bold tracking-wide uppercase">
              {t.external ? (
                <a href={t.href} rel="noopener" className={linkCls}>
                  {t.linkLabel} <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (on the thinkIT website)</span>
                </a>
              ) : (
                <Link href={t.href} className={linkCls}>
                  {t.linkLabel} <span aria-hidden="true">→</span>
                </Link>
              )}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
