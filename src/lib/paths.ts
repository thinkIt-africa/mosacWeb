/**
 * Base path for hosting under a sub-folder, e.g. GitHub Pages project sites
 * (https://<user>.github.io/<repo>/). Empty when running locally or on a custom domain.
 *
 * next/link and the router add the base path automatically. Plain URLs to files in /public
 * (images, the logo, .ics downloads) must go through withBase().
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${BASE_PATH}${path}`;
}
