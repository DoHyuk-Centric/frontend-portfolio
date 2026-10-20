import type { LifeStageKey } from "@/data/life-timeline";

import { buildCharacter, placeCharacter, type Look, type Pose } from "./character";
import {
  DARK,
  LIGHT,
  MID,
  PAPER,
  SCREEN,
  box,
  disc,
  get,
  makeGrid,
  outline,
  put,
  rect,
  stamp,
  text,
  type Grid,
  type Shade,
} from "./pixel-grid";

const { w: W, h: H, ground: GROUND } = SCREEN;
const CHARACTER_X = 44;
const LANDMARK_X = 108;

// ==================== 차림과 동작: 단계마다 옷과 [중간 동작, 마무리 동작] ====================

const LOOKS: Record<LifeStageKey, Look> = {
  high: { age: "teen", outfit: "#475569", blazer: true, prop: "diploma" },
  univ: { age: "adult", outfit: "#3b82f6", tee: true },
  grad: { age: "adult", outfit: "#475569", stole: true, hat: "grad", prop: "diploma" },
  army: { age: "adult", outfit: "#55663a", hat: "helmet", uniform: true, belt: true },
  discharge: { age: "adult", outfit: "#4d5d33", dress: true, hat: "beret" },
  business: { age: "adult", outfit: "#6b7280", blazer: true, mood: "tired" },
  bootcamp: { age: "adult", outfit: "#c2410c", hood: true },
  now: { age: "adult", outfit: "#14b8a6", hood: true, prop: "laptop" },
};

/**
 * Each scene's action, started when the reader passes `ACTION_TRIGGER` of the
 * scene: the middle step right away, then the last step on a short timer.
 */
export const ACTIONS: Record<LifeStageKey, readonly [Pose, Pose]> = {
  high: ["lift", "cheer"],
  univ: ["pencilRest", "writing"],
  grad: ["capHold", "capToss"],
  army: ["raise", "salute"],
  discharge: ["raise", "lowered"],
  business: ["umbrellaUp", "umbrellaOpen"],
  bootcamp: ["listen", "talk"],
  now: ["typeReady", "typing"],
};

/** Share of a scene's scroll at which its action starts, so a fast scroll never skips it. */
export const ACTION_TRIGGER = 0.5;

/** Poses held before a scene's action starts; the others stand still. */
const REST_POSES: Partial<Record<LifeStageKey, Pose>> = { discharge: "salute" };

// ==================== 장면: 하늘 → 땅 → 건물 → 연출 → 캐릭터 ====================

/**
 * Draws one life stage. `f` is the idle frame (0–3) and `pose` the action step
 * the player has reached, or null before the scene's action starts.
 */
export function drawScene(key: LifeStageKey, f: number, pose: Pose | null): Grid<Shade> {
  const look = LOOKS[key];
  const finished = pose === ACTIONS[key][1];
  const night = key === "now";
  const g = makeGrid<Shade>(W, H, night ? DARK : PAPER);

  drawSky(g, key, f);
  drawGround(g, night);

  switch (key) {
    case "high":
      standOnGround(g, school(), LANDMARK_X);
      drawFlowers(g, [66, 70, 74]);
      if (finished) drawPetals(g, f);
      break;
    case "univ":
      drawClassroom(g);
      drawSeatedStudent(g, f, look, pose);
      return g;
    case "grad":
      standOnGround(g, university(f), LANDMARK_X);
      drawCapsInSky(g, f);
      break;
    case "army":
      standOnGround(g, barracks(false, f), LANDMARK_X);
      break;
    case "discharge":
      standOnGround(g, barracks(true, f), LANDMARK_X);
      if (finished) drawConfetti(g, f);
      break;
    case "business":
      standOnGround(g, shop(), LANDMARK_X);
      drawRain(g, f, finished);
      rect(g, CHARACTER_X + 12, GROUND - 1, 10, 1, MID);
      break;
    case "bootcamp":
      drawTeamProject(g, f, look, pose);
      return g;
    case "now":
      standOnGround(g, desk(f), LANDMARK_X + 4);
      // Monitor glow behind me, so the dark outline stands out from the night sky.
      disc(g, CHARACTER_X, GROUND - 26, 22, MID);
      break;
  }

  drawActor(g, key, f, look, pose);
  return g;
}

/** Today's me without the laptop, cropped to the sprite with a one-pixel margin, for the save file card. */
export function drawPlayerPortrait(): Grid<Shade> {
  const sprite = buildCharacter({ ...LOOKS.now, prop: undefined }, 0);
  const xs: number[] = [];
  const ys: number[] = [];
  for (let y = 0; y < sprite.h; y++) {
    for (let x = 0; x < sprite.w; x++) {
      if (get(sprite, x, y) === null) continue;
      xs.push(x);
      ys.push(y);
    }
  }
  const left = Math.min(...xs) - 1;
  const top = Math.min(...ys) - 1;
  const portrait = makeGrid<Shade>(Math.max(...xs) - left + 2, Math.max(...ys) - top + 2);
  stamp(portrait, sprite, -left, -top);
  return portrait;
}

/** Draws "me" for a scene, with the small loops that follow a finished action. */
function drawActor(g: Grid<Shade>, key: LifeStageKey, f: number, look: Look, pose: Pose | null) {
  const finished = pose === ACTIONS[key][1];
  const shownPose = pose ?? REST_POSES[key] ?? null;
  // The tired look clears once the umbrella is open.
  const shownLook = key === "business" && finished ? { ...look, mood: undefined } : look;
  const hop = key === "high" && finished && f % 2 === 1 ? 3 : 0;
  placeCharacter(g, buildCharacter(shownLook, f, shownPose), CHARACTER_X, hop);
}

// ==================== 풍경 조각: 하늘·땅·구름·꽃 ====================

function drawSky(g: Grid<Shade>, key: LifeStageKey, f: number) {
  if (key === "now") {
    disc(g, 132, 22, 7, PAPER);
    disc(g, 135, 20, 6, DARK);
    [[20, 14], [48, 30], [74, 12], [98, 36], [150, 46], [30, 52], [112, 8]].forEach(([x, y], i) => {
      put(g, x, y, PAPER);
      if ((f + i) % 3 === 0) [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dx, dy]) => put(g, x + dx, y + dy, LIGHT));
    });
  } else if (key === "business") {
    rect(g, 0, 0, W, 44, LIGHT);
    drawCloud(g, 6, 8);
    drawCloud(g, 96, 14);
  } else if (key !== "univ" && key !== "bootcamp") {
    // Indoor scenes (lecture room, team project room) have no sky.
    drawCloud(g, 10 + (f % 2), 16);
    drawCloud(g, 112 - (f % 2), 30);
  }
}

function drawGround(g: Grid<Shade>, night: boolean) {
  rect(g, 0, GROUND, W, 1, DARK);
  rect(g, 0, GROUND + 1, W, H - GROUND - 1, night ? MID : LIGHT);
  for (let x = 2; x < W; x += 7) {
    put(g, x, GROUND + 4 + (x % 3), MID);
    put(g, x + 3, GROUND + 12 + (x % 4), MID);
  }
  if (night) for (let x = 4; x < W; x += 9) put(g, x, GROUND + 6, DARK);
}

function drawCloud(g: Grid<Shade>, x: number, y: number) {
  const c = makeGrid<Shade>(26, 10);
  rect(c, 3, 4, 20, 5, PAPER);
  rect(c, 7, 1, 8, 4, PAPER);
  rect(c, 13, 2, 8, 3, PAPER);
  stamp(g, outline(c, MID), x, y);
}

function drawFlowers(g: Grid<Shade>, xs: number[]) {
  xs.forEach((x) => {
    put(g, x, GROUND - 3, LIGHT);
    put(g, x - 1, GROUND - 2, LIGHT);
    put(g, x + 1, GROUND - 2, LIGHT);
    put(g, x, GROUND - 2, DARK);
    put(g, x, GROUND - 1, MID);
  });
}

/** Places a sprite so its bottom row stands on the ground line. */
function standOnGround(target: Grid<Shade>, src: Grid<Shade>, centerX: number) {
  stamp(target, src, centerX - Math.floor(src.w / 2), GROUND - src.h);
}

// ==================== 건물: 장면마다 하나씩 ====================

function building(draw: (b: Grid<Shade>) => void, w: number, h: number) {
  const b = makeGrid<Shade>(w, h);
  draw(b);
  return outline(b, DARK);
}

const school = () =>
  building((b) => {
    rect(b, 0, 18, 70, 42, LIGHT);
    rect(b, 0, 16, 70, 3, DARK);
    rect(b, 27, 0, 16, 18, LIGHT);
    disc(b, 35, 8, 5, PAPER);
    put(b, 35, 6, DARK);
    put(b, 35, 7, DARK);
    put(b, 36, 8, DARK);
    put(b, 37, 8, DARK);
    [5, 18, 44, 57].forEach((x) => {
      box(b, x, 24, 9, 8, PAPER);
      box(b, x, 38, 9, 8, PAPER);
    });
    box(b, 28, 40, 14, 20, MID);
    // Graduation banner by the door.
    rect(b, 4, 49, 20, 8, DARK);
    rect(b, 6, 51, 16, 4, PAPER);
    rect(b, 8, 52, 12, 2, MID);
  }, 70, 60);

const university = (f: number) =>
  building((b) => {
    for (let y = 0; y < 14; y++) rect(b, 36 - y * 2.5, y + 6, y * 5, 1, MID);
    rect(b, 2, 20, 68, 4, LIGHT);
    [6, 18, 30, 42, 54].forEach((x) => rect(b, x + 3, 24, 6, 30, PAPER));
    rect(b, 0, 54, 72, 3, LIGHT);
    rect(b, 0, 57, 72, 3, MID);
    rect(b, 36, 0, 1, 7, DARK);
    rect(b, 37, f % 2, 7, 4, DARK);
  }, 72, 60);

const barracks = (banner: boolean, f: number) =>
  building((b) => {
    rect(b, 0, 22, 74, 34, LIGHT);
    rect(b, 0, 18, 74, 5, DARK);
    [6, 22, 46, 60].forEach((x) => box(b, x, 30, 9, 8, PAPER));
    box(b, 31, 34, 12, 22, MID);
    rect(b, 70, 0, 1, 18, DARK);
    rect(b, 62, 1 + (f % 2), 8, 5, MID);
    if (banner) {
      rect(b, 16, 6, 42, 10, DARK);
      rect(b, 18, 8, 38, 6, PAPER);
      rect(b, 22, 10, 30, 2, MID);
    }
  }, 74, 56);

const shop = () =>
  building((b) => {
    rect(b, 0, 16, 64, 40, PAPER);
    for (let x = 0; x < 64; x += 8) {
      rect(b, x, 8, 4, 9, DARK);
      rect(b, x + 4, 8, 4, 9, LIGHT);
    }
    box(b, 6, 24, 26, 18, LIGHT);
    rect(b, 7, 32, 24, 1, MID);
    box(b, 40, 26, 16, 30, MID);
    put(b, 52, 41, PAPER);
    box(b, 9, 45, 19, 9, PAPER);
    text(b, 11, 47, "OPEN", DARK);
  }, 64, 56);

const desk = (f: number) =>
  building((b) => {
    rect(b, 0, 30, 64, 4, MID);
    rect(b, 3, 34, 3, 20, MID);
    rect(b, 58, 34, 3, 20, MID);
    box(b, 18, 2, 30, 22, DARK);
    rect(b, 20, 4, 26, 18, DARK);
    rect(b, 23, 7, 8, 1, LIGHT);
    rect(b, 23, 10, 14, 1, LIGHT);
    rect(b, 25, 13, 10, 1, LIGHT);
    rect(b, 23, 16, 6 + (f % 3) * 3, 1, LIGHT);
    rect(b, 31, 24, 4, 6, MID);
    rect(b, 26, 29, 14, 1, MID);
    rect(b, 50, 20, 8, 10, LIGHT);
    rect(b, 53, 12, 2, 8, MID);
    put(b, 52, 13, PAPER);
    put(b, 56, 15, PAPER);
  }, 64, 54);

// ==================== 연출: 동작이 끝난 뒤 하늘과 주변 ====================

function drawPetals(g: Grid<Shade>, f: number) {
  for (let i = 0; i < 14; i++) {
    const x = (i * 23 + f * 3) % W;
    const y = 6 + ((i * 37 + f * 7) % 100);
    put(g, x, y, i % 3 === 0 ? MID : LIGHT);
    put(g, x + 1, y, LIGHT);
  }
}

/** Mortarboards drifting in the sky above the university. */
function drawCapsInSky(g: Grid<Shade>, f: number) {
  [[24, 22], [62, 12], [84, 28]].forEach(([x, y], i) => {
    const dy = ((f + i) % 2) * 3;
    rect(g, x - 3, y + dy, 7, 1, DARK);
    rect(g, x - 1, y + 1 + dy, 3, 2, DARK);
    put(g, x + 3, y + 1 + dy, MID);
  });
}

function drawConfetti(g: Grid<Shade>, f: number) {
  for (let i = 0; i < 14; i++) put(g, 12 + i * 10 + (i % 3), 14 + ((f * 5 + i * 13) % 70), i % 2 ? MID : LIGHT);
}

/** Rain over the whole sky; with the umbrella open, none falls under its canopy. */
function drawRain(g: Grid<Shade>, f: number, sheltered: boolean) {
  for (let i = 0; i < 26; i++) {
    const x = 4 + i * 6;
    const y = 46 + ((f * 4 + i * 9) % 66);
    if (sheltered && x >= CHARACTER_X - 7 && x <= CHARACTER_X + 19 && y >= 70) continue;
    put(g, x, y, MID);
    put(g, x, y + 1, MID);
  }
}

// ==================== 대학 진학: 강의실 책상에 앉아 연필로 필기 ====================

const DESK_TOP = GROUND - 9;

/** A chalkboard with scribbles and a window, so the scene reads as a lecture room. */
function drawClassroom(g: Grid<Shade>) {
  box(g, 84, 40, 64, 36, MID, DARK);
  [[90, 48, 22], [90, 54, 30], [90, 60, 16], [120, 48, 20], [120, 58, 14]].forEach(([x, y, w]) => rect(g, x, y, w, 1, PAPER));
  rect(g, 84, 76, 64, 2, DARK);
  rect(g, 132, 75, 6, 1, PAPER);
  box(g, 8, 26, 28, 30, LIGHT, DARK);
  rect(g, 21, 26, 2, 30, DARK);
  rect(g, 8, 40, 28, 2, DARK);
}

/** Me sitting behind a desk with a notebook: the desk front hides my legs, lines appear while I write. */
function drawSeatedStudent(g: Grid<Shade>, f: number, look: Look, pose: Pose | null) {
  const cx = CHARACTER_X;
  // Chair back peeking out behind my shoulder.
  rect(g, cx - 13, DESK_TOP - 12, 3, 12, DARK);
  rect(g, cx - 12, DESK_TOP - 11, 1, 10, MID);
  placeCharacter(g, buildCharacter(look, f, pose ?? "pencilRest"), cx);
  // Desk top and its solid front panel.
  box(g, cx - 18, DESK_TOP, 38, GROUND - DESK_TOP + 1, MID, DARK);
  rect(g, cx - 18, DESK_TOP + 2, 38, 1, DARK);
  // Notebook lying on the desk.
  box(g, cx - 6, DESK_TOP - 3, 16, 3, PAPER, DARK);
  if (pose === "writing") for (let i = 0; i <= f % 4; i++) put(g, cx - 4 + i * 2, DESK_TOP - 2, MID);
}

// ==================== 부트캠프: 함께 코딩하다가, 중간부터 번갈아 대화 ====================

/** Teammates on either side of me at the same table. */
const TEAMMATES: { x: number; look: Look }[] = [
  { x: 26, look: { age: "adult", outfit: "#60a5fa", tee: true, hairStyle: "ponytail", hairColor: "#9a6334" } },
  { x: 96, look: { age: "adult", outfit: "#15803d", hood: true, hairStyle: "spiky", hairColor: "#a0703c" } },
];
const ME_AT_TABLE_X = 61;
const TABLE_TOP = GROUND - 9;
const TALK_BUBBLE_Y = 67;
/** Who speaks in turn once the talk starts: left teammate, right teammate, then me. */
const SPEAKING_ORDER = [1, 2, 0];

/**
 * Everyone codes behind their laptops; from the middle we talk it over, the
 * speech bubble passing around the table while the speaker bobs.
 */
function drawTeamProject(g: Grid<Shade>, f: number, look: Look, pose: Pose | null) {
  const people = [{ x: ME_AT_TABLE_X, look }, ...TEAMMATES];
  const speaker = pose === "listen" ? SPEAKING_ORDER[0] : pose === "talk" ? SPEAKING_ORDER[f % 3] : -1;
  drawBootCampSign(g);
  people.forEach((person, i) => placeCharacter(g, buildCharacter(person.look, f), person.x, i === speaker ? 2 : 0));
  drawTeamTable(g, f, pose === null);
  people.forEach((person, i) => drawHandsOnLaptop(g, person.x, f + i, pose === null, i === speaker));
  if (speaker >= 0) drawTalkBubble(g, people[speaker].x, TALK_BUBBLE_Y);
}

/** A sign on the wall behind us that just says BootCamp. */
function drawBootCampSign(g: Grid<Shade>) {
  box(g, 40, 18, 82, 26, DARK, DARK);
  rect(g, 42, 20, 78, 1, MID);
  rect(g, 42, 41, 78, 1, MID);
  text(g, 48, 26, "BootCamp", PAPER, 2);
}

/** One long table with an open laptop in front of each of us; while coding, the logos blink in turn. */
function drawTeamTable(g: Grid<Shade>, f: number, coding: boolean) {
  box(g, 10, TABLE_TOP, 104, GROUND - TABLE_TOP + 1, MID, DARK);
  rect(g, 10, TABLE_TOP + 2, 104, 1, DARK);
  [ME_AT_TABLE_X, TEAMMATES[0].x, TEAMMATES[1].x].forEach((x, i) => {
    box(g, x - 7, TABLE_TOP - 9, 14, 9, MID, DARK);
    const lit = !coding || (f + i) % 3 !== 0;
    put(g, x, TABLE_TOP - 5, lit ? PAPER : LIGHT);
  });
}

/**
 * Hands on either side of the laptop: while coding they take turns tapping the
 * keys, while talking the speaker lifts them to gesture and the others rest.
 */
function drawHandsOnLaptop(g: Grid<Shade>, x: number, f: number, coding: boolean, speaking: boolean) {
  const y = TABLE_TOP - 4;
  const leftUp = coding ? (f % 2) * 2 : speaking ? 5 : 0;
  const rightUp = coding ? ((f + 1) % 2) * 2 : speaking ? 2 + (f % 2) * 4 : 0;
  box(g, x - 10, y - leftUp, 4, 4, LIGHT, DARK);
  box(g, x + 7, y - rightUp, 4, 4, LIGHT, DARK);
}

/** A speech bubble with three dots and a tail pointing down at the speaker. */
function drawTalkBubble(g: Grid<Shade>, cx: number, y: number) {
  box(g, cx - 7, y, 15, 7, PAPER, DARK);
  put(g, cx - 1, y + 7, DARK);
  put(g, cx - 1, y + 8, DARK);
  [-3, 0, 3].forEach((dx) => put(g, cx + dx, y + 3, DARK));
}
