import type { ReactNode } from "react";

import { dotGothic } from "@/lib/fonts";
import { cn } from "@/lib/utils";

/**
 * A handheld's top half around `children` (the screen's content): a white
 * plastic case with a fine line texture, and a dark bezel with the title
 * pressed into it and a lit power light. Modeled on SemanticEntity's
 * PIXEL:SYNTH pen, without its control panels.
 */
export function HandheldConsole({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-115 rounded-[15px_15px_50px_15px] bg-[linear-gradient(145deg,#f0f0f0_0%,#d8d8d8_100%)] px-4 pt-6 pb-8 shadow-[inset_-8px_-8px_15px_rgb(0_0_0/0.15),inset_8px_8px_15px_rgb(255_255_255/0.7),0_20px_40px_rgb(0_0_0/0.25)] sm:px-6">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[repeating-linear-gradient(0deg,transparent_0_2px,rgb(0_0_0/0.02)_2px_4px)]"
      />
      <div className="relative flex flex-col gap-3 rounded-[12px_12px_35px_12px] bg-[linear-gradient(145deg,#3a3a3a_0%,#555_100%)] px-4 pt-4 pb-7 shadow-[inset_0_4px_15px_rgb(0_0_0/0.6),0_2px_5px_rgb(0_0_0/0.3)] sm:px-6">
        <BezelHeader title={title} />
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </div>
  );
}

/** The title pressed into the bezel and the power light, lit because the game is running. */
function BezelHeader({ title }: { title: string }) {
  return (
    <div aria-hidden className={cn(dotGothic.className, "flex items-center justify-between px-1")}>
      <span className="text-sm tracking-[0.2em] text-[#888] [text-shadow:1px_1px_0_rgb(0_0_0/0.3)]">{title}</span>
      <span className="flex items-center gap-2">
        <span className="text-[9px] tracking-widest text-[#777] uppercase">Power</span>
        <span className="size-2.5 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ff4444,#cc0000)] shadow-[0_0_8px_#ff0000,0_0_12px_rgb(255_0_0/0.5),inset_1px_1px_2px_rgb(255_255_255/0.3)]" />
      </span>
    </div>
  );
}
