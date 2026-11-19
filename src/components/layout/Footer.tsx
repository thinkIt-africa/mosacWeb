import Link from "next/link";
import { footerNav, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-midnight text-white">
      <div aria-hidden="true" className="h-1.5 bg-red" />
      <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm text-steel-300">
            {/* Doc 02 positioning line */}
            Uganda’s motorsport heritage, future in motion.
          </p>
          <p className="mt-6 max-w-sm text-sm text-steel-300">
            The{" "}
            <a href={site.fmuUrl} className="text-white underline decoration-gold underline-offset-4" rel="noopener">
              Federation of Motorsport Clubs of Uganda
            </a>{" "}
            recognises MOSAC among its affiliated member clubs.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-8">
          {footerNav.map((col) => (
            <div key={col.heading}>
              <h2 className="eyebrow text-gold">{col.heading}</h2>
              <ul className="mt-4 space-y-1">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-9 items-center text-sm text-steel-300 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-steel-300 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>Photography: MOSAC archive; photographer credits pending confirmation.</p>
        </div>
      </div>
    </footer>
  );
}
