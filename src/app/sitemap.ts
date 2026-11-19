import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getArticles, getEvents } from "@/lib/content";

// Built once at build time so it works on static hosts such as GitHub Pages.
export const dynamic = "force-static";

const staticRoutes = [
  "", "/about", "/history", "/motorsport", "/events", "/esports", "/competitors", "/safety",
  "/news", "/gallery", "/people", "/membership", "/partners", "/contact", "/faq",
  "/privacy", "/terms", "/accessibility",
];

// Static hosts serve pages as folders, so URLs end with "/" there.
const slash = process.env.STATIC_EXPORT === "true" ? "/" : "";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [events, articles] = await Promise.all([getEvents(), getArticles()]);
  return [
    ...staticRoutes.map((r) => ({ url: `${site.url}${r}${slash}` })),
    ...events.filter((e) => e.discipline !== "esports").map((e) => ({ url: `${site.url}/events/${e.slug}${slash}` })),
    ...articles.filter((a) => a.approved).map((a) => ({ url: `${site.url}/news/${a.slug}${slash}`, lastModified: a.publishedAt })),
  ];
}
