import { dancingScript, fraunces } from "@/lib/fonts";

import styles from "./home.module.css";
import { homeColors } from "./theme";

export function HeroSection() {
  return (
    <section
      id="hero"
      className={`flex min-h-screen w-full snap-start flex-col items-center justify-center px-6 text-center ${styles.section1}`}
    >
      <span
        className={`${dancingScript.className} text-2xl sm:text-3xl`}
        style={{ color: homeColors.inkFaint }}
      >
        Hello, I&apos;m
      </span>
      <h1
        className={`${fraunces.className} mt-4 text-6xl font-semibold tracking-tight sm:text-8xl`}
        style={{ color: homeColors.ink }}
      >
        도혁
      </h1>
      <p className="mt-4 text-lg sm:text-xl" style={{ color: homeColors.inkMuted }}>
        Frontend Developer
      </p>
    </section>
  );
}
