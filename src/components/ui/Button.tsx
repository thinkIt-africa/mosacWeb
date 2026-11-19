import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline-light" | "outline-dark" | "text";

const styles: Record<Variant, string> = {
  primary: "bg-red-600 text-white hover:bg-red-700 border-2 border-red-600 hover:border-red-700",
  "outline-light": "border-2 border-white/80 text-white hover:bg-white hover:text-midnight",
  "outline-dark": "border-2 border-midnight text-midnight hover:bg-midnight hover:text-white",
  text: "text-current underline decoration-2 underline-offset-4 decoration-red hover:decoration-gold px-0!",
};

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Marks links that leave the MOSAC site, e.g. the thinkIT championship platform. */
  external?: { siteName: string };
  className?: string;
}

export function ButtonLink({ href, children, variant = "primary", external, className = "" }: Props) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 text-[0.9375rem] font-bold uppercase tracking-wide transition-colors duration-200";
  const cls = `${base} ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={cls} rel="noopener">
        {children}
        <span aria-hidden="true">↗</span>
        <span className="sr-only">(on the {external.siteName} website)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {variant !== "text" && <span aria-hidden="true">→</span>}
    </Link>
  );
}
