import type { ReactNode } from "react";
import type { MediaAsset } from "@/types/content";
import { Eyebrow } from "@/components/ui/Primitives";
import { Photo, PhotoCredit } from "./Photo";

/** Full-bleed, image-led hero (03, section C: dark gradient over the text only). */
export function ImageHero({
  asset,
  eyebrow,
  title,
  children,
  actions,
  size = "lg",
}: {
  asset: MediaAsset;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  size?: "lg" | "md";
}) {
  return (
    <section className="relative isolate overflow-hidden bg-midnight text-white">
      <div className={`relative ${size === "lg" ? "min-h-[min(88svh,860px)]" : "min-h-[min(70svh,640px)]"}`}>
        {/* On wide screens the photo sits to the right so the text never covers its subject. */}
        <div className="absolute inset-0 -z-20 lg:left-[34%]">
          {/* Portrait screens crop a landscape photo, so request roughly twice the viewport width. */}
          <Photo asset={asset} sizes="(min-width: 1024px) 66vw, 220vw" priority />
          <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-midnight to-transparent lg:block" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/20 lg:hidden" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 hidden h-1/4 bg-gradient-to-t from-midnight/70 to-transparent lg:block" />

        <div className={`container-site flex flex-col justify-end ${size === "lg" ? "min-h-[min(88svh,860px)]" : "min-h-[min(70svh,640px)]"} pt-24 pb-14 md:pb-20`}>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
            <h1 className="display mt-4 text-[3.25rem] sm:text-7xl lg:text-[5.75rem]">{title}</h1>
            {children && <div className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">{children}</div>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          <PhotoCredit asset={asset} className="mt-10 self-end text-right" />
        </div>
      </div>
    </section>
  );
}

/** Compact masthead for inner pages, in the 06 navy-panel style. */
export function PageHero({
  eyebrow,
  title,
  lead,
  asset,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  asset?: MediaAsset;
  actions?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-midnight text-white">
      {asset && (
        <>
          <Photo asset={asset} sizes="100vw" priority className="-z-20 opacity-60" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-midnight via-midnight/85 to-midnight/30" />
        </>
      )}
      <div aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-2 bg-red md:w-3" />
      <div className="container-site py-16 md:py-24">
        <div className="max-w-3xl" data-reveal>
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h1 className="display mt-4 text-5xl sm:text-6xl lg:text-8xl">{title}</h1>
          {lead && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">{lead}</div>}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </div>
    </section>
  );
}
