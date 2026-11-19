import Link from "next/link";
import type { ReactNode } from "react";
import type { MediaAsset } from "@/types/content";
import { Photo } from "./Photo";

/** Image-led feature card used for the homepage triptych and pathway grids. */
export function FeatureCard({
  href,
  label,
  title,
  text,
  asset,
}: {
  href: string;
  label: string;
  title: string;
  text?: string;
  asset: MediaAsset;
}) {
  return (
    <article className="group relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden bg-midnight p-6 text-white md:min-h-[520px] md:p-8" data-reveal>
      <Photo asset={asset} sizes="(min-width: 1024px) 33vw, 100vw" className="-z-20 transition-transform duration-700 group-hover:scale-105" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/5" />
      <p className="eyebrow text-gold">{label}</p>
      <h3 className="display mt-3 text-4xl md:text-5xl">
        <Link href={href} className="after:absolute after:inset-0">
          {title}
        </Link>
      </h3>
      {text && <p className="mt-3 max-w-sm text-white/85">{text}</p>}
      <span aria-hidden="true" className="mt-6 inline-flex h-11 w-11 items-center justify-center bg-red-600 text-xl transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </article>
  );
}

/** Full-width call-to-action band (06 red panel). */
export function CtaBand({ title, text, actions }: { title?: string; text?: string; actions: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-red-600 text-white">
      <div aria-hidden="true" className="absolute top-0 right-0 hidden h-full w-1/3 bg-[repeating-linear-gradient(115deg,transparent_0_28px,rgba(255,255,255,0.08)_28px_56px)] md:block" />
      <div className="container-site relative grid gap-8 py-16 md:grid-cols-12 md:items-end md:py-20">
        {title ? (
          <h2 className="display text-5xl md:col-span-7 md:text-7xl" data-reveal>
            {title}
          </h2>
        ) : null}
        <div className={title ? "md:col-span-5" : "md:col-span-12"} data-reveal>
          {text && <p className="text-lg leading-relaxed text-white/95">{text}</p>}
          <div className={`flex flex-wrap gap-3 ${text ? "mt-6" : ""}`}>{actions}</div>
        </div>
      </div>
    </section>
  );
}

/** "Pending confirmation" marker for content still waiting for club sign-off. */
export function PendingNote() {
  return (
    <p className="border-l-4 border-gold bg-gold/15 px-4 py-3 text-sm font-bold text-ink" role="note">
      Pending confirmation
    </p>
  );
}
