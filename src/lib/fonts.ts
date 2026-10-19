import { Dancing_Script, DotGothic16, Fraunces } from "next/font/google";

export const dancingScript = Dancing_Script({
  weight: "600",
  subsets: ["latin"],
});

export const fraunces = Fraunces({
  weight: "600",
  subsets: ["latin"],
});

/** Pixel font for the Game Boy screen's labels (Latin only). */
export const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
});
