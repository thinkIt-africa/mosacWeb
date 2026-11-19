"use client";

import { useState } from "react";
import type { Article } from "@/types/content";
import { ArticleCard } from "./Cards";

/** Category filter with counts, as on FIA's news page. Categories from doc 01, section 11. */
export function NewsBrowser({ articles }: { articles: Article[] }) {
  const [cat, setCat] = useState<string>("All");
  const counts = articles.reduce<Record<string, number>>((acc, a) => ({ ...acc, [a.category]: (acc[a.category] ?? 0) + 1 }), {});
  const cats = ["All", ...Object.keys(counts).sort()];
  const shown = cat === "All" ? articles : articles.filter((a) => a.category === cat);
  const [lead, ...rest] = shown;

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="mb-10 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={`min-h-11 px-4 text-sm font-bold tracking-wide uppercase ${
              cat === c ? "bg-midnight text-white" : "bg-white text-midnight ring-1 ring-black/10 hover:bg-pit-200"
            }`}
          >
            {c} <span className="ml-1 font-semibold opacity-70">({c === "All" ? articles.length : counts[c]})</span>
          </button>
        ))}
      </div>
      <div className="space-y-16">
        {lead && <ArticleCard article={lead} large />}
        {rest.length > 0 && (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
