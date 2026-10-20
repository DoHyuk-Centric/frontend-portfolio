"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

import { lifeStages, type LifeStageKey } from "@/data/life-timeline";
import { dotGothic } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import type { Pose } from "./character";
import { paintGrid } from "./pixel-grid";
import { ACTIONS, ACTION_TRIGGER, drawScene } from "./scenes";
import { usePrefersReducedMotion, useScrollProgress } from "./use-scroll-progress";

/** Scroll distance given to each life stage, as a share of the screen content's height. */
const SCROLL_PER_SCENE = 1.4;
/** How often the small idle loops (blinking stars, flags, rain) advance. */
const IDLE_FRAME_MS = 420;
/** How long a scene's middle action step shows before its last step. */
const ACTION_STEP_MS = 180;
/** How long the "scroll to play" hint shows when the timeline opens. */
const SCROLL_HINT_MS = 2200;

/**
 * The life timeline, as the content of the Game Boy screen: a box that
 * scrolls inside itself with the scene pinned at its top while the scroll
 * walks through the scenes, so the page's own scrollbar never grows.
 * `header` sits above the scene.
 */
export function PixelJourney({ header }: { header?: ReactNode }) {
  const scrollerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentHeight = useElementHeight(contentRef);
  const progress = useScrollProgress(scrollerRef);
  const reduceMotion = usePrefersReducedMotion();
  const frame = useIdleFrame(!reduceMotion);
  const { index, sceneProgress } = locateScene(progress);
  const pose = useActionPose(lifeStages[index].key, sceneProgress >= ACTION_TRIGGER, reduceMotion);
  const hintTimedOut = useTimeout(SCROLL_HINT_MS);

  return (
    <section
      ref={scrollerRef}
      // Exactly as tall as its content, so no empty band shows above or below it.
      style={{ height: contentHeight || undefined }}
      className="relative w-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <StageList />
      <div ref={contentRef} className="sticky top-0 flex flex-col gap-3">
        {header}
        {/* The stage list above already reads the scenes out for screen readers. */}
        <div aria-hidden className="flex flex-col gap-3">
          <div className="relative">
            <SceneScreen
              activeIndex={index}
              frame={frame}
              sceneProgress={sceneProgress}
              pose={pose}
            />
            {/* Gone after a moment, or as soon as the reader starts scrolling. */}
            <ScrollHint visible={!hintTimedOut && progress === 0} />
          </div>
          <SceneDialog index={index} />
        </div>
      </div>
      {/* Scroll room after the pinned content: one share per scene, minus the first screen. */}
      <div aria-hidden style={{ height: contentHeight * (lifeStages.length * SCROLL_PER_SCENE - 1) }} />
    </section>
  );
}

// ==================== 진행: 스크롤 위치를 장면과 장면 안 진행도로 바꾸기 ====================

/** The element's current height in pixels, following resizes; 0 until measured. */
function useElementHeight(ref: RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setHeight(entry.borderBoxSize[0].blockSize));
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return height;
}

function locateScene(progress: number) {
  const position = progress * lifeStages.length;
  const index = Math.min(Math.floor(position), lifeStages.length - 1);
  return { index, sceneProgress: Math.min(position - index, 1) };
}

/** Counts 0–3 on a timer for the scenes' small idle loops; stays at 0 when disabled. */
/** Turns true once `ms` have passed since mount. */
function useTimeout(ms: number) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setDone(true), ms);
    return () => clearTimeout(id);
  }, [ms]);

  return done;
}

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

/** A mouse with a rolling wheel and a short line, telling the reader to scroll. */
function ScrollHint({ visible }: { visible: boolean }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="flex items-center gap-3 rounded-sm border-[3px] border-[#eaf7cc] bg-[#0b2613]/90 px-4 py-3 text-[#eaf7cc]">
        <span className="flex h-8 w-5 justify-center rounded-full border-2 border-[#eaf7cc] pt-1.5">
          <span className="h-2 w-1 rounded-full bg-[#eaf7cc] motion-safe:animate-bounce" />
        </span>
        <span className="flex flex-col">
          <span className={cn(dotGothic.className, "text-sm tracking-[0.12em]")}>SCROLL</span>
          <span className="text-xs">스크롤하면 장면이 넘어가요</span>
        </span>
      </div>
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
    paintGrid(canvas, drawScene(lifeStages[activeIndex].key, frame, pose));
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

// ==================== 글: 대화창과 스크린리더용 목록 ====================

/**
 * The caption under the screen. Every stage's text is laid in the same grid
 * cell and only the current one is shown, so the box always keeps the height
 * of the longest caption: a height that changed per stage would change the
 * timeline's scroll length and make the scenes jump while scrolling.
 */
function SceneDialog({ index }: { index: number }) {
  return (
    <div className="grid rounded-sm border-[3px] border-[#0b2613] bg-[#eaf7cc] px-3.5 py-2.5 text-[#0b2613]">
      {lifeStages.map((stage, i) => (
        <div
          key={stage.key}
          className={cn(
            "col-start-1 row-start-1 flex flex-col gap-0.5",
            i === index ? "animate-in duration-300 fade-in motion-reduce:animate-none" : "invisible",
          )}
        >
          <span className={cn(dotGothic.className, "text-xs tracking-[0.08em] opacity-80")}>
            STEP {String(i + 1).padStart(2, "0")}
            {stage.period && ` · ${stage.period}`}
          </span>
          <span className="text-base font-bold">{stage.title}</span>
          <span className="text-[13px] leading-normal whitespace-pre-line">{stage.description}</span>
        </div>
      ))}
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
