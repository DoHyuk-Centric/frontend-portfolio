"use client";

import { useEffect, useRef, useState } from "react";

import { lifeStages, type LifeStageKey } from "@/data/life-timeline";
import { dotGothic } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import type { Pose } from "./character";
import { PAPER, type Grid, type Shade } from "./pixel-grid";
import { ACTIONS, ACTION_TRIGGER, drawScene } from "./scenes";
import { usePrefersReducedMotion, useScrollProgress } from "./use-scroll-progress";

/** Scroll distance given to each life stage, in viewport heights. */
const SCROLL_PER_SCENE_VH = 140;
/** How often the small idle loops (blinking stars, flags, rain) advance. */
const IDLE_FRAME_MS = 420;
/** The "vivid green" Game Boy palette, darkest to lightest. */
const PALETTE = ["#0b2613", "#2f6a3b", "#8dc455", "#eaf7cc"];
/** How long a scene's middle action step shows before its last step. */
const ACTION_STEP_MS = 180;

export function PixelJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);
  const reduceMotion = usePrefersReducedMotion();
  const frame = useIdleFrame(!reduceMotion);
  const { index, sceneProgress } = locateScene(progress);
  const pose = useActionPose(lifeStages[index].key, sceneProgress >= ACTION_TRIGGER, reduceMotion);

  return (
    <section
      ref={sectionRef}
      style={{ height: `${lifeStages.length * SCROLL_PER_SCENE_VH}vh` }}
      className="relative w-full"
    >
      <StageList />
      <div
        aria-hidden
        className="sticky top-0 flex h-svh items-center justify-center pt-4 pb-20 lg:pb-4"
      >
        <HandheldConsole>
          <SceneScreen
            activeIndex={index}
            frame={frame}
            sceneProgress={sceneProgress}
            pose={pose}
          />
          <SceneDialog index={index} />
        </HandheldConsole>
      </div>
    </section>
  );
}

// ==================== 진행: 스크롤 위치를 장면과 장면 안 진행도로 바꾸기 ====================

function locateScene(progress: number) {
  const position = progress * lifeStages.length;
  const index = Math.min(Math.floor(position), lifeStages.length - 1);
  return { index, sceneProgress: Math.min(position - index, 1) };
}

/** Counts 0–3 on a timer for the scenes' small idle loops; stays at 0 when disabled. */
function useIdleFrame(enabled: boolean) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => setFrame((current) => (current + 1) % 4), IDLE_FRAME_MS);
    return () => clearInterval(id);
  }, [enabled]);

  return frame;
}

/**
 * Plays the scene's action on a timer once `triggered` turns on (middle step,
 * then last step), so a fast scroll past the trigger still shows the whole
 * motion. Turning it off, or moving to another scene, returns to the rest pose.
 */
function useActionPose(key: LifeStageKey, triggered: boolean, reduceMotion: boolean) {
  const [action, setAction] = useState<{ key: LifeStageKey; pose: Pose | null } | null>(null);

  useEffect(() => {
    const [middle, last] = ACTIONS[key];
    const steps: [number, Pose | null][] = !triggered
      ? [[0, null]]
      : reduceMotion
        ? [[0, last]]
        : [[0, middle], [ACTION_STEP_MS, last]];
    const timers = steps.map(([ms, pose]) => setTimeout(() => setAction({ key, pose }), ms));
    return () => timers.forEach(clearTimeout);
  }, [key, triggered, reduceMotion]);

  // A step left over from the previous scene never shows in the new one.
  return action?.key === key ? action.pose : null;
}

// ==================== 화면: 장면마다 캔버스 하나, 바뀔 때 페이드 ====================

function HandheldConsole({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ width: "min(100%, 480px, calc((100svh - 260px) * 1.11 + 32px))" }}
      className="flex flex-col gap-3 rounded-[14px_14px_40px_14px] bg-[#b9b7c6] p-4 pb-3"
    >
      {children}
      <span className={cn(dotGothic.className, "text-xs tracking-widest text-[#4b4760]")}>
        DOHYUK · LIFE
      </span>
    </div>
  );
}

function SceneScreen({
  activeIndex,
  frame,
  sceneProgress,
  pose,
}: {
  activeIndex: number;
  frame: number;
  sceneProgress: number;
  pose: Pose | null;
}) {
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRefs.current[activeIndex];
    if (!canvas) return;
    paint(canvas, drawScene(lifeStages[activeIndex].key, frame, pose));
  }, [activeIndex, frame, pose]);

  return (
    <div className="relative aspect-160/144 w-full overflow-hidden rounded-sm bg-[#eaf7cc]">
      {lifeStages.map((stage, index) => (
        <canvas
          key={stage.key}
          ref={(node) => {
            canvasRefs.current[index] = node;
          }}
          width={160}
          height={144}
          style={{ opacity: index === activeIndex ? 1 : 0, imageRendering: "pixelated" }}
          className="absolute inset-0 size-full transition-opacity duration-700 motion-reduce:transition-none"
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-0.75 bg-black/15">
        <div className="h-full bg-[#0b2613]" style={{ width: `${sceneProgress * 100}%` }} />
      </div>
    </div>
  );
}

function paint(canvas: HTMLCanvasElement, grid: Grid<Shade>) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const image = ctx.createImageData(grid.w, grid.h);
  const rgb = PALETTE.map((hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)));
  grid.px.forEach((shade, i) => {
    const [r, g, b] = rgb[shade ?? PAPER];
    image.data.set([r, g, b, 255], i * 4);
  });
  ctx.putImageData(image, 0, 0);
}

// ==================== 글: 대화창과 스크린리더용 목록 ====================

function SceneDialog({ index }: { index: number }) {
  const stage = lifeStages[index];

  return (
    <div
      key={stage.key}
      className="flex min-h-24 animate-in flex-col gap-0.5 rounded-sm border-[3px] border-[#0b2613] bg-[#eaf7cc] px-3.5 py-2.5 text-[#0b2613] duration-300 fade-in motion-reduce:animate-none"
    >
      <span className={cn(dotGothic.className, "text-xs tracking-[0.08em] opacity-80")}>
        STEP {String(index + 1).padStart(2, "0")}
        {stage.period && ` · ${stage.period}`}
      </span>
      <span className="text-base font-bold">{stage.title}</span>
      <span className="text-[13px] leading-normal">{stage.description}</span>
    </div>
  );
}

function StageList() {
  return (
    <ol className="sr-only">
      {lifeStages.map((stage) => (
        <li key={stage.key}>
          {stage.period && `${stage.period} `}
          {stage.title}: {stage.description}
        </li>
      ))}
    </ol>
  );
}
