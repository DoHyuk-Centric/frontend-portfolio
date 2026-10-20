import {
  DARK,
  LIGHT,
  MID,
  SCREEN,
  get,
  makeGrid,
  outline,
  put,
  rect,
  type Grid,
  type Shade,
} from "./pixel-grid";

// ==================== 차림: 옷·머리·모자·소품 ====================

export type Look = {
  age: "teen" | "adult";
  /** Main clothing color; mapped to one of the four shades when drawn. */
  outfit: string;
  hat?: "grad" | "helmet" | "beret";
  prop?: "diploma" | "laptop";
  mood?: "tired";
  /** Blazer with a white shirt and tie. */
  blazer?: boolean;
  /** Combat uniform: camo pattern, matching trousers and tall boots. */
  uniform?: boolean;
  belt?: boolean;
  /** Officer dress uniform: shirt and tie, gold buttons and shoulder boards. */
  dress?: boolean;
  /** Graduation stole hanging down both sides. */
  stole?: boolean;
  hood?: boolean;
  tee?: boolean;
  hairStyle?: "ponytail" | "spiky";
  hairColor?: string;
};

/**
 * Arm poses: right-arm actions ("raise" … "umbrellaOpen"), both-arm actions
 * ("lift" … "typing"), and steps whose action the scene draws instead of the
 * arms ("lowered", "listen", "talk").
 */
export type Pose =
  | "raise"
  | "salute"
  | "pencilRest"
  | "writing"
  | "capHold"
  | "capToss"
  | "umbrellaUp"
  | "umbrellaOpen"
  | "lift"
  | "cheer"
  | "typeReady"
  | "typing"
  | "lowered"
  | "listen"
  | "talk";

// ==================== 몸: 22×26 스프라이트의 비율과 색 ====================

const SPRITE = { w: 22, h: 26, legW: 2, armW: 1, hairRows: 2 } as const;
/** Each sprite pixel is drawn as a 2×2 block inside the 160×144 scene. */
const SPRITE_SCALE = 2;

const BODY = {
  teen: { hw: 8, hh: 7, bw: 6, bh: 4, lh: 3 },
  adult: { hw: 8, hh: 7, bw: 6, bh: 5, lh: 3 },
};
type Body = (typeof BODY)["adult"];

const SKIN = "#f6cfa8";
const HAIR = "#2a2230";
const OUTLINE_COLOR = "#2b2235";
const PANTS = "#3b3f58";
const SHOE = "#1f1b2b";
const WHITE = "#f8fafc";
const CAMO_DARK = "#3a4626";
const CAMO_LIGHT = "#a3b46e";
const BERET = "#5b5b66";
const DIPLOMA = "#fef3c7";
const RIBBON = "#dc2626";
const GOLD = "#facc15";
const UMBRELLA = "#dc2626";

type Box = { x: number; y: number; w: number; h: number };
type HeadBox = Box & { handRight: { x: number; y: number }; body: Box };

function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const channels = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) =>
    Math.max(0, Math.min(255, Math.round(amount < 0 ? v * (1 + amount) : v + (255 - v) * amount))),
  );
  return "#" + channels.map((v) => v.toString(16).padStart(2, "0")).join("");
}

/** The same luminance cut-offs as the first draft, so the character keeps its look. */
function toShade(hex: string): Shade {
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  if (lum < 0.28) return DARK;
  if (lum < 0.55) return MID;
  return LIGHT;
}

// ==================== 그리기: 다리 → 몸 → 팔 → 머리 → 모자 → 소품 ====================

/** `frame` drives small loops such as typing hands and the pencil sliding along. */
export function buildCharacter(look: Look, frame: number, pose: Pose | null = null): Grid<Shade> {
  const g = makeGrid<string>(SPRITE.w, SPRITE.h);
  const head = drawBody(g, look, Math.floor(SPRITE.w / 2), SPRITE.h - 1, pose, frame);

  const hidesHat = pose === "capHold" || pose === "capToss";
  if (look.hat && !hidesHat) drawHat(g, look.hat, head);
  const handBusy = pose !== null && look.prop === "diploma";
  if (!handBusy && !isBothArmPose(pose)) drawProp(g, look, head, frame);

  const colored = outline(g, OUTLINE_COLOR);
  const shaded = makeGrid<Shade>(colored.w, colored.h);
  shaded.px = colored.px.map((c) => (c === null ? null : toShade(c)));
  return shaded;
}

function drawBody(g: Grid<string>, look: Look, cx: number, ground: number, pose: Pose | null, frame: number): HeadBox {
  const p = BODY[look.age];
  const legTop = ground - p.lh + 1;
  const pants = look.uniform || look.dress ? shade(look.outfit, -0.12) : PANTS;
  const bootRows = look.uniform ? 2 : 1;

  [cx - SPRITE.legW, cx].forEach((x) => {
    rect(g, x, legTop, SPRITE.legW, ground - legTop + 1, pants);
    rect(g, x, ground - bootRows + 1, SPRITE.legW, bootRows, SHOE);
  });
  if (look.uniform) put(g, cx - SPRITE.legW, legTop, CAMO_DARK);

  const bodyX = cx - Math.floor(p.bw / 2);
  const bodyTop = legTop - p.bh;
  rect(g, bodyX, bodyTop, p.bw, p.bh, look.outfit);
  rect(g, bodyX + p.bw - 1, bodyTop + 1, 1, p.bh - 1, shade(look.outfit, -0.22));
  drawOutfitDetails(g, look, bodyX, bodyTop, p);

  const armLength = Math.max(2, p.bh - 1);
  const sleeve = shade(look.outfit, -0.1);
  const bothArms = isBothArmPose(pose);
  if (!bothArms) {
    rect(g, bodyX - SPRITE.armW, bodyTop + 1, SPRITE.armW, armLength, sleeve);
    put(g, bodyX - SPRITE.armW, bodyTop + armLength, SKIN);
  }
  const head = drawHead(g, look, cx, bodyTop, p);
  const body = { x: bodyX, y: bodyTop, w: p.bw, h: p.bh };
  if (bothArms && pose) drawBothArmPose(g, sleeve, body, pose, frame);
  else if (pose && !ARMS_DOWN_POSES.includes(pose)) drawRightArmPose(g, sleeve, bodyX + p.bw, bodyTop, head.y, pose, frame);
  else {
    rect(g, bodyX + p.bw, bodyTop + 1, SPRITE.armW, armLength, sleeve);
    put(g, bodyX + p.bw + SPRITE.armW - 1, bodyTop + armLength, SKIN);
  }
  return { ...head, handRight: { x: bodyX + p.bw + SPRITE.armW, y: bodyTop + armLength }, body };
}

function drawOutfitDetails(g: Grid<string>, look: Look, x: number, y: number, p: Body) {
  const mid = x + Math.floor(p.bw / 2);
  if (look.blazer) {
    put(g, mid - 1, y, WHITE);
    put(g, mid, y, WHITE);
    put(g, mid - 2, y, shade(look.outfit, -0.3));
    put(g, mid + 1, y, shade(look.outfit, -0.3));
    rect(g, mid - 1, y + 1, 1, p.bh - 2, "#7f1d1d");
    put(g, mid + 1, y + 2, "#cbd5e1");
  }
  if (look.uniform) {
    [[1, 1], [2, 1], [4, 3], [0, 3]].forEach(([dx, dy]) => put(g, x + dx, y + dy, CAMO_DARK));
    [[3, 0], [4, 1], [1, 2]].forEach(([dx, dy]) => put(g, x + dx, y + dy, CAMO_LIGHT));
  }
  if (look.belt) {
    rect(g, x, y + p.bh - 2, p.bw, 1, "#22241a");
    put(g, mid - 1, y + p.bh - 2, "#d9c27a");
  }
  if (look.hood) {
    rect(g, x, y, p.bw, 1, shade(look.outfit, -0.25));
    put(g, mid - 1, y + 1, WHITE);
    put(g, mid, y + 2, WHITE);
  }
  if (look.tee) rect(g, mid - 1, y, 2, 2, WHITE);
  if (look.dress) {
    put(g, mid - 1, y, WHITE);
    put(g, mid, y, WHITE);
    rect(g, mid - 1, y + 1, 1, 2, SHOE);
    put(g, mid, y + 2, GOLD);
    put(g, mid, y + 4, GOLD);
    put(g, x, y, GOLD);
    put(g, x + p.bw - 1, y, GOLD);
  }
  if (look.stole) {
    rect(g, x + 1, y, 1, p.bh, GOLD);
    rect(g, x + p.bw - 2, y, 1, p.bh, GOLD);
  }
}

function drawHead(g: Grid<string>, look: Look, cx: number, bodyTop: number, p: Body): Box {
  const hx = cx - Math.floor(p.hw / 2);
  const hy = bodyTop - p.hh;
  rect(g, hx, hy, p.hw, p.hh, SKIN);
  [[hx, hy], [hx + p.hw - 1, hy], [hx, hy + p.hh - 1], [hx + p.hw - 1, hy + p.hh - 1]].forEach(([x, y]) => put(g, x, y, null));

  const hair = look.hairColor ?? HAIR;
  rect(g, hx + 1, hy, p.hw - 2, SPRITE.hairRows, hair);
  rect(g, hx, hy + 1, 1, SPRITE.hairRows + 1, hair);
  rect(g, hx + p.hw - 1, hy + 1, 1, SPRITE.hairRows + 1, hair);
  for (let i = 2; i < p.hw - 2; i += 3) put(g, hx + i, hy + SPRITE.hairRows, hair);
  if (look.hairStyle === "ponytail") {
    // A tied tail sticking out behind the right ear.
    rect(g, hx + p.hw, hy + 1, 2, 2, hair);
    rect(g, hx + p.hw + 1, hy + 3, 1, 2, hair);
  } else if (look.hairStyle === "spiky") {
    // Short hair standing up in spikes.
    for (let i = 1; i < p.hw - 1; i += 2) put(g, hx + i, hy - 1, hair);
  }

  const eyeY = hy + Math.round(p.hh * 0.58);
  const offset = Math.max(2, Math.floor(p.hw / 4));
  const tired = look.mood === "tired";
  [cx - offset, cx + offset - 1].forEach((ex) => {
    put(g, ex, eyeY, HAIR);
    if (tired) put(g, ex + (ex < cx ? -1 : 1), eyeY, HAIR);
  });
  if (tired) {
    // A drop of sweat beside the head.
    put(g, hx + p.hw, hy + 2, "#60a5fa");
    put(g, hx + p.hw, hy + 3, "#60a5fa");
  }
  return { x: hx, y: hy, w: p.hw, h: p.hh };
}

function drawHat(g: Grid<string>, kind: NonNullable<Look["hat"]>, head: Box) {
  const { x, y, w } = head;
  if (kind === "grad") {
    rect(g, x + 1, y - 1, w - 2, 2, "#111827");
    rect(g, x - 2, y - 2, w + 4, 1, "#1f2937");
    rect(g, x + w + 1, y - 1, 1, 3, GOLD);
  } else if (kind === "helmet") {
    rect(g, x, y - 2, w, 3, "#55663a");
    rect(g, x + 1, y - 3, w - 2, 1, "#55663a");
    rect(g, x - 1, y + 1, w + 2, 1, CAMO_DARK);
    put(g, x + 2, y - 2, CAMO_LIGHT);
    put(g, x + 3, y - 2, CAMO_LIGHT);
    put(g, x + 5, y - 1, CAMO_DARK);
    put(g, x + 1, y, CAMO_DARK);
    put(g, x - 1, y + 2, CAMO_DARK);
    put(g, x + w, y + 2, CAMO_DARK);
  } else {
    // Beret: lighter than the hair so it reads, slouched to one side, gold badge in front.
    rect(g, x + 1, y - 3, w - 1, 1, BERET);
    rect(g, x, y - 2, w + 2, 2, BERET);
    rect(g, x + w, y, 2, 1, BERET);
    rect(g, x, y, w, 1, SHOE);
    put(g, x + 2, y - 1, GOLD);
  }
}

function drawProp(g: Grid<string>, look: Look, head: HeadBox, frame: number) {
  const hand = head.handRight;
  if (look.prop === "diploma") {
    rect(g, hand.x, hand.y - 1, 3, 2, DIPLOMA);
    put(g, hand.x + 1, hand.y - 1, RIBBON);
  } else if (look.prop === "laptop") {
    drawLaptop(g, head.body, frame, false);
  }
}

/** The laptop held in front of the body; while typing, code fills the screen line by line. */
function drawLaptop(g: Grid<string>, b: Box, frame: number, typing: boolean) {
  rect(g, b.x - 1, b.y + 1, b.w + 2, Math.max(3, b.h - 2), "#334155");
  rect(g, b.x, b.y + 2, b.w, Math.max(1, b.h - 4), "#0f172a");
  if (typing) {
    for (let i = 0; i <= (frame % 4) + 1; i++) put(g, b.x + i, b.y + 2, "#5eead4");
    return;
  }
  put(g, b.x + 1, b.y + 2, "#5eead4");
  put(g, b.x + 3, b.y + 2 + (frame % 2), "#5eead4");
}

// ==================== 동작: 오른팔 하나로 하는 동작 ====================

/** Steps that keep both arms at the sides; the scene, not the arm, shows the action. */
const ARMS_DOWN_POSES: Pose[] = ["lowered", "listen", "talk"];

function drawRightArmPose(g: Grid<string>, sleeve: string, shoulderX: number, bodyTop: number, headY: number, pose: Pose, frame: number) {
  const R = shoulderX;
  const bt = bodyTop;
  const hy = headY;
  const column = (from: number, to: number) => {
    for (let y = from; y <= to; y++) put(g, R + 1, y, sleeve);
  };
  put(g, R, bt + 1, sleeve);
  switch (pose) {
    case "raise":
      put(g, R + 1, bt, sleeve);
      put(g, R + 1, bt - 1, sleeve);
      put(g, R + 1, bt - 2, SKIN);
      break;
    case "salute":
      column(hy + 3, bt);
      put(g, R, hy + 2, SKIN);
      put(g, R + 1, hy + 2, SKIN);
      break;
    case "pencilRest":
    case "writing": {
      // Hand on the notebook; while writing it slides left and right as the lines fill.
      const dx = pose === "writing" ? frame % 2 : 0;
      put(g, R, bt + 2, sleeve);
      put(g, R - 1 - dx, bt + 3, SKIN);
      drawPencil(g, R - dx, bt);
      break;
    }
    case "capHold":
      column(hy - 1, bt);
      put(g, R + 1, hy - 2, SKIN);
      drawHeldCap(g, R, hy - 4);
      break;
    case "capToss":
      column(hy - 1, bt);
      put(g, R + 1, hy - 2, SKIN);
      put(g, R + 2, hy - 3, SKIN);
      drawHeldCap(g, R + 1, hy - 10);
      break;
    case "umbrellaUp":
      column(bt - 4, bt);
      put(g, R + 1, bt - 5, SKIN);
      rect(g, R + 1, bt - 13, 2, 8, UMBRELLA);
      put(g, R + 1, bt - 14, SHOE);
      break;
    case "umbrellaOpen":
      put(g, R + 1, bt, sleeve);
      put(g, R + 1, bt - 1, SKIN);
      for (let y = hy - 4; y <= bt - 2; y++) put(g, R + 1, y, SHOE);
      drawCanopy(g, R, hy - 8);
      break;
  }
}

/** A short yellow pencil standing up from (x, y + 2), with a pink eraser on top. */
function drawPencil(g: Grid<string>, x: number, y: number) {
  put(g, x, y, "#f9a8d4");
  put(g, x, y + 1, GOLD);
  put(g, x, y + 2, GOLD);
}

function drawHeldCap(g: Grid<string>, x: number, y: number) {
  rect(g, x - 2, y, 7, 1, "#1f2937");
  rect(g, x, y + 1, 3, 1, "#111827");
  put(g, x + 4, y + 1, GOLD);
  put(g, x + 4, y + 2, GOLD);
}

function drawCanopy(g: Grid<string>, cx: number, y: number) {
  rect(g, cx - 3, y, 7, 1, UMBRELLA);
  rect(g, cx - 5, y + 1, 11, 1, UMBRELLA);
  rect(g, cx - 6, y + 2, 13, 1, UMBRELLA);
  for (let x = cx - 6; x <= cx + 6; x += 2) put(g, x, y + 3, UMBRELLA);
  put(g, cx - 2, y + 1, "#fca5a5");
  put(g, cx - 1, y + 1, "#fca5a5");
}

// ==================== 동작: 두 팔로 하는 동작 ====================

function isBothArmPose(pose: Pose | null) {
  return pose === "lift" || pose === "cheer" || pose === "typeReady" || pose === "typing";
}

/**
 * "typeReady" / "typing": hands on the laptop keys, taking turns while typing.
 * "lift": both arms out to the sides, the diploma in the right hand.
 * "cheer": arms up in a V, the rolled diploma held high.
 */
function drawBothArmPose(g: Grid<string>, sleeve: string, body: Box, pose: Pose, frame: number) {
  const left = body.x - 1;
  const right = body.x + body.w;
  const bodyTop = body.y;
  if (pose === "typeReady" || pose === "typing") {
    const typing = pose === "typing";
    drawLaptop(g, body, frame, typing);
    [left, right].forEach((x) => {
      put(g, x, bodyTop + 1, sleeve);
      put(g, x, bodyTop + 2, sleeve);
    });
    const leftUp = typing && frame % 2 === 1 ? 1 : 0;
    const rightUp = typing && frame % 2 === 0 ? 1 : 0;
    put(g, left + 1, bodyTop + 3 - leftUp, SKIN);
    put(g, right - 1, bodyTop + 3 - rightUp, SKIN);
    return;
  }
  if (pose === "lift") {
    ([[left, -1], [right, 1]] as const).forEach(([x, side]) => {
      put(g, x, bodyTop + 1, sleeve);
      put(g, x + side, bodyTop + 1, sleeve);
      put(g, x + side * 2, bodyTop + 1, SKIN);
    });
    rect(g, right + 2, bodyTop - 1, 3, 2, DIPLOMA);
    put(g, right + 3, bodyTop - 1, RIBBON);
    return;
  }
  ([[left, -1], [right, 1]] as const).forEach(([x, side]) => {
    put(g, x, bodyTop + 1, sleeve);
    put(g, x + side, bodyTop, sleeve);
    put(g, x + side * 2, bodyTop - 1, sleeve);
    put(g, x + side * 2, bodyTop - 2, sleeve);
    put(g, x + side * 3, bodyTop - 3, SKIN);
  });
  rect(g, right + 3, bodyTop - 9, 2, 6, DIPLOMA);
  rect(g, right + 3, bodyTop - 7, 2, 1, RIBBON);
}

// ==================== 배치: 장면 위에 2배 크기로 세우기 ====================

/** Stamps a sprite at 2× so its feet rest on the ground line, or `hop` pixels above it. */
export function placeCharacter(target: Grid<Shade>, sprite: Grid<Shade>, centerX: number, hop = 0) {
  const s = SPRITE_SCALE;
  const ox = centerX - Math.floor((sprite.w * s) / 2);
  const oy = SCREEN.ground - sprite.h * s - hop;
  for (let y = 0; y < sprite.h; y++) {
    for (let x = 0; x < sprite.w; x++) {
      const v = get(sprite, x, y);
      if (v !== null) rect(target, ox + x * s, oy + y * s, s, s, v);
    }
  }
}
