"use client";

import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

/** How far `ref`'s scroll container has scrolled, from 0 (top) to 1 (bottom). */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;

      const scrollable = element.scrollHeight - element.clientHeight;
      if (scrollable <= 0) return;
      setProgress(Math.min(Math.max(element.scrollTop / scrollable, 0), 1));
    };

    const scheduleMeasure = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    const element = ref.current;
    scheduleMeasure();
    element?.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    return () => {
      cancelAnimationFrame(frame);
      element?.removeEventListener("scroll", scheduleMeasure);
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
