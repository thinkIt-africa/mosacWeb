import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Built once at build time so it works on static hosts such as GitHub Pages.
export const dynamic = "force-static";

/** Indexing stays off until launch: set NEXT_PUBLIC_ALLOW_INDEXING=true in production. */
export default function robots(): MetadataRoute.Robots {
  const allow = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  return {
    rules: allow ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: allow ? `${site.url}/sitemap.xml` : undefined,
  };
}
