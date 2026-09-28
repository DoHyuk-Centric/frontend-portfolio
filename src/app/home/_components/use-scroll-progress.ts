"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks how far the page has scrolled as a 0–1 fraction of the scrollable
 * height, in a ref rather than state. A 3D scene's render loop (useFrame)
 * reads this every frame; going through React state would re-render the
 * whole tree on every scroll pixel instead.
 */
export function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current =
        max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}
