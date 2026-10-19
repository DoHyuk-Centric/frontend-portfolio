"use client";

import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

/**
 * How far the page has scrolled through `ref`'s element, from 0 (its top
 * reaches the viewport top) to 1 (its bottom reaches the viewport bottom).
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      setProgress(Math.min(Math.max(-rect.top / scrollable, 0), 1));
    };

    const scheduleMeasure = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    scheduleMeasure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [ref]);

  return progress;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}
