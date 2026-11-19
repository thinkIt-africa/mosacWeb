"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { mainNav, thinkit } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import type { NavItem } from "@/types/content";

function isActive(pathname: string, item: NavItem) {
  const hrefs = [item.href, ...(item.children?.map((c) => c.href) ?? [])];
  return hrefs.some((h) => (h === "/" ? pathname === "/" : pathname === h || pathname.startsWith(`${h}/`)));
}

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close menus on route change. Recommended React pattern: adjust state while rendering.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(null);
    setDrawerOpen(false);
  }

  // Escape and click-outside close the desktop dropdowns.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setDrawerOpen(false);
      }
    }
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Lock page scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <header className="sticky top-0 z-50 bg-midnight text-white">
      {/* Utility bar (03, section C) */}
      <div className="hidden border-b border-white/10 bg-midnight-900 md:block">
        <div className="container-site flex h-9 items-center justify-between text-xs text-steel-300">
          <p>
            <span className="font-semibold text-white">Est. 1990</span> · FMU member club
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <Link className="hover:text-white" href="/competitors">
                Competitor Centre
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/safety">
                Safety
              </Link>
            </li>
            <li>
              <a className="hover:text-white" href={thinkit.standings} rel="noopener">
                Esports standings <span aria-hidden="true">↗</span>
                <span className="sr-only">(on the thinkIT website)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav ref={navRef} aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <DesktopItem
                key={item.label}
                item={item}
                active={isActive(pathname, item)}
                open={openMenu === item.label}
                onOpen={() => setOpenMenu(item.label)}
                onClose={() => setOpenMenu((m) => (m === item.label ? null : m))}
                onToggle={() => setOpenMenu((m) => (m === item.label ? null : item.label))}
              />
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/membership"
            className="hidden min-h-11 items-center bg-red-600 px-5 text-sm font-bold tracking-wide uppercase hover:bg-red-700 sm:inline-flex"
          >
            Join MOSAC
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            onClick={() => setDrawerOpen((o) => !o)}
          >
            <span className="sr-only">{drawerOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-4 w-6">
              <span
                className={`absolute left-0 h-0.5 w-6 bg-white transition-transform duration-200 ${
                  drawerOpen ? "top-[7px] rotate-45" : "top-0"
                }`}
              />
              <span className={`absolute top-[7px] left-0 h-0.5 w-6 bg-white ${drawerOpen ? "opacity-0" : ""}`} />
              <span
                className={`absolute left-0 h-0.5 w-6 bg-white transition-transform duration-200 ${
                  drawerOpen ? "top-[7px] -rotate-45" : "top-[14px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <MobileDrawer open={drawerOpen} pathname={pathname} />
    </header>
  );
}

function DesktopItem({
  item,
  active,
  open,
  onOpen,
  onClose,
  onToggle,
}: {
  item: NavItem;
  active: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}) {
  const panelId = useId();
  const indicator = (
    <span
      aria-hidden="true"
      className={`absolute inset-x-3 -bottom-px h-[3px] bg-red transition-transform duration-200 ${
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
    />
  );
  const itemCls =
    "group relative inline-flex h-[72px] items-center gap-1.5 px-3 text-sm font-bold tracking-[0.12em] uppercase hover:text-gold";

  if (!item.children) {
    return (
      <li>
        <Link href={item.href} className={itemCls} aria-current={active ? "page" : undefined}>
          {item.label}
          {indicator}
        </Link>
      </li>
    );
  }

  return (
    <li className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button type="button" className={itemCls} aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
        {item.label}
        <svg aria-hidden="true" width="10" height="6" viewBox="0 0 10 6" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" />
        </svg>
        {indicator}
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full left-0 w-80 border-t-[3px] border-red bg-white text-midnight shadow-xl"
      >
        <ul className="py-2">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link href={child.href} className="block px-5 py-3 hover:bg-pit focus-visible:bg-pit">
                <span className="block text-sm font-bold tracking-wide uppercase">{child.label}</span>
                {child.description && <span className="mt-0.5 block text-sm text-ink-soft">{child.description}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function MobileDrawer({ open, pathname }: { open: boolean; pathname: string }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div
      id="mobile-drawer"
      hidden={!open}
      className="fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto bg-midnight lg:hidden"
    >
      <nav aria-label="Main" className="container-site pt-4 pb-12">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {mainNav.map((item) => {
            const active = isActive(pathname, item);
            if (!item.children) {
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`display flex min-h-14 items-center text-3xl ${active ? "text-gold" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }
            const isOpen = expanded === item.label;
            const id = `drawer-${item.label.toLowerCase()}`;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setExpanded(isOpen ? null : item.label)}
                  className={`display flex min-h-14 w-full items-center justify-between text-3xl ${active ? "text-gold" : ""}`}
                >
                  {item.label}
                  <span aria-hidden="true" className="text-2xl">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <ul id={id} hidden={!isOpen} className="pb-4">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} className="flex min-h-11 items-center pl-1 text-base text-steel-300 hover:text-white">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
        <Link
          href="/membership"
          className="mt-8 flex min-h-12 items-center justify-center bg-red-600 text-base font-bold tracking-wide uppercase"
        >
          Join MOSAC
        </Link>
      </nav>
    </div>
  );
}
