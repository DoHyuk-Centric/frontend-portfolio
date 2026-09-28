"use client";

import styles from "./home.module.css";

const SECTIONS = [
  { id: "hero", label: "Home", seg: styles.seg1 },
  { id: "about", label: "About", seg: styles.seg2 },
  { id: "skills", label: "Skills", seg: styles.seg3 },
  { id: "contact", label: "Contact", seg: styles.seg4 },
];

// Longer and easable than the browser's own scroll-behavior:smooth, whose
// duration/curve can't be tuned — this is deliberately unhurried.
const SCROLL_DURATION_MS = 1400;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const startY = window.scrollY;
  const endY = target.getBoundingClientRect().top + window.scrollY;
  const startTime = performance.now();

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / SCROLL_DURATION_MS, 1);
    window.scrollTo(0, startY + (endY - startY) * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/**
 * Top bar with one segment per section. Each segment brightens on its own
 * while its section is in view — driven by CSS view-timeline (see
 * `.section1`..`.section4` / `.seg1`..`.seg4` in home.module.css), not
 * JS/IntersectionObserver state. Clicking a segment jumps there.
 */
export function SectionProgressBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-20 flex gap-1.5 px-6">
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={(event) => {
            event.preventDefault();
            scrollToId(section.id);
          }}
          aria-label={`${section.label} 섹션으로 이동`}
          className="flex flex-1 items-start py-5"
        >
          <span
            className={`block h-0.75 w-full rounded-full bg-[#FAF9F5] ${section.seg}`}
          />
        </a>
      ))}
    </div>
  );
}
