import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=true builds a plain static site into /out (used by the GitHub Pages workflow).
 * NEXT_PUBLIC_BASE_PATH is the sub-folder the site lives under, e.g. "/mosacWeb" on GitHub Pages.
 * Locally neither is set, so `npm run dev` behaves as before.
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(isStaticExport && { output: "export" as const }),
  basePath,
  // /about/ → about/index.html, so pages load and refresh correctly on static hosts.
  trailingSlash: isStaticExport,
  images: {
    // GitHub Pages has no image server, so photos are served as the pre-sized web copies in /public.
    unoptimized: isStaticExport,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 390, 640, 768, 1024, 1280, 1440, 1920],
  },
  poweredByHeader: false,
};

export default nextConfig;
