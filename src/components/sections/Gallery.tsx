"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { withBase } from "@/lib/paths";
import type { MediaAsset } from "@/types/content";

/**
 * Accessible gallery grid + lightbox (03, section O):
 * Escape closes, arrow keys move, focus returns to the image that opened it, no auto-cycling.
 */
export function Gallery({ items }: { items: MediaAsset[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const close = useCallback(() => {
    const last = index;
    dialogRef.current?.close();
    setIndex(null);
    if (last !== null) triggers.current[last]?.focus();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const d = dialogRef.current;
    if (d && !d.open) d.showModal();
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, items.length]);

  const current = index !== null ? items[index] : null;

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.id} className={i === 0 ? "col-span-2 row-span-2" : ""}>
            <button
              ref={(el) => {
                triggers.current[i] = el;
              }}
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block aspect-square w-full overflow-hidden bg-navy"
            >
              <Image src={withBase(item.src)} alt="" fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="sr-only">Open photo: {item.alt}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => index !== null && close()}
        aria-label="Photo viewer"
        className="m-0 h-full max-h-none w-full max-w-none bg-midnight/95 p-0 text-white backdrop:bg-black/80"
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4">
              <p className="tabular text-sm text-steel-300">
                {index! + 1} / {items.length}
              </p>
              <button type="button" onClick={close} className="min-h-11 px-4 font-bold uppercase" autoFocus>
                Close <span aria-hidden="true">✕</span>
              </button>
            </div>
            <figure className="relative flex-1">
              <Image src={withBase(current.src)} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </figure>
            <figcaption className="container-site flex items-center justify-between gap-4 py-4 text-sm">
              <span>
                {current.alt}
                <span className="block text-steel-300">
                  {current.event} · Photo: {current.credit}
                </span>
              </span>
              <span className="flex gap-2">
                <button type="button" className="min-h-11 min-w-11 border border-white/30" onClick={() => setIndex((index! - 1 + items.length) % items.length)}>
                  <span aria-hidden="true">←</span>
                  <span className="sr-only">Previous photo</span>
                </button>
                <button type="button" className="min-h-11 min-w-11 border border-white/30" onClick={() => setIndex((index! + 1) % items.length)}>
                  <span aria-hidden="true">→</span>
                  <span className="sr-only">Next photo</span>
                </button>
              </span>
            </figcaption>
          </div>
        )}
      </dialog>
    </>
  );
}
