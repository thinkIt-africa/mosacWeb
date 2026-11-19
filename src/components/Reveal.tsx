"use client";

import { useEffect } from "react";

/**
 * Adds a subtle fade/slide to elements marked with data-reveal as they enter the viewport
 * (03, section C: 160–260ms, skipped for reduced motion — see globals.css).
 *
 * It also watches the page for elements added later (filters, list/cards toggles, route changes),
 * so content that appears after the first load is never left invisible.
 */
export function RevealObserver() {
  useEffect(() => {
    const show = (el: Element) => el.classList.add("is-visible");

    if (!("IntersectionObserver" in window)) {
      document.documentElement.classList.remove("js");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );

    const watch = (root: ParentNode) => {
      root.querySelectorAll?.("[data-reveal]:not(.is-visible)").forEach((el) => {
        // Already on screen (e.g. after a filter change): show straight away.
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) show(el);
        else io.observe(el);
      });
    };

    watch(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-reveal]:not(.is-visible)")) watch(node.parentElement ?? document);
          else watch(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
