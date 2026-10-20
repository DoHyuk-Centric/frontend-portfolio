"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { paintGrid } from "./pixel-grid";
import { drawPlayerPortrait } from "./scenes";

const PORTRAIT = drawPlayerPortrait();

/** Today's me as a pixel sprite, drawn with the same code as the life timeline. */
export function PlayerSprite({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) paintGrid(canvasRef.current, PORTRAIT);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={PORTRAIT.w}
      height={PORTRAIT.h}
      aria-hidden
      style={{ imageRendering: "pixelated", aspectRatio: `${PORTRAIT.w} / ${PORTRAIT.h}` }}
      className={cn("h-auto", className)}
    />
  );
}
