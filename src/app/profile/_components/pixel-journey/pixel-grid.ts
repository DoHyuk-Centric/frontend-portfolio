/** 0 = darkest … 3 = lightest. Every scene is drawn with these four shades only. */
export type Shade = 0 | 1 | 2 | 3;

export const DARK: Shade = 0;
export const MID: Shade = 1;
export const LIGHT: Shade = 2;
export const PAPER: Shade = 3;

/** The Game Boy screen every scene is drawn on; `ground` is the y of the ground line. */
export const SCREEN = { w: 160, h: 144, ground: 118 } as const;

/** A pixel canvas; an empty pixel is `null` and shows what lies beneath. */
export type Grid<T> = { w: number; h: number; px: (T | null)[] };

export function makeGrid<T>(w: number, h: number, fill: T | null = null): Grid<T> {
  return { w, h, px: new Array<T | null>(w * h).fill(fill) };
}

export function put<T>(g: Grid<T>, x: number, y: number, v: T | null) {
  const px = Math.round(x);
  const py = Math.round(y);
  if (px >= 0 && py >= 0 && px < g.w && py < g.h) g.px[py * g.w + px] = v;
}

export function get<T>(g: Grid<T>, x: number, y: number): T | null {
  return x < 0 || y < 0 || x >= g.w || y >= g.h ? null : g.px[y * g.w + x];
}

export function rect<T>(g: Grid<T>, x: number, y: number, w: number, h: number, v: T | null) {
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) put(g, x + i, y + j, v);
}

/** A filled rectangle with a one-pixel border. */
export function box(g: Grid<Shade>, x: number, y: number, w: number, h: number, fill: Shade, line: Shade = DARK) {
  rect(g, x, y, w, h, line);
  rect(g, x + 1, y + 1, w - 2, h - 2, fill);
}

export function disc<T>(g: Grid<T>, cx: number, cy: number, r: number, v: T) {
  for (let y = -r; y <= r; y++) {
    for (let x = -r; x <= r; x++) {
      if (x * x + y * y <= r * r + r * 0.6) put(g, cx + x, cy + y, v);
    }
  }
}

/** Returns a copy with every empty pixel that touches a filled one set to `v`. */
export function outline<T>(g: Grid<T>, v: T): Grid<T> {
  const out = makeGrid<T>(g.w, g.h);
  out.px = g.px.slice();
  const sides = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (let y = 0; y < g.h; y++) {
    for (let x = 0; x < g.w; x++) {
      if (get(g, x, y) !== null) continue;
      if (sides.some(([dx, dy]) => get(g, x + dx, y + dy) !== null)) put(out, x, y, v);
    }
  }
  return out;
}

export function stamp<T>(target: Grid<T>, src: Grid<T>, ox: number, oy: number) {
  for (let y = 0; y < src.h; y++) {
    for (let x = 0; x < src.w; x++) {
      const v = get(src, x, y);
      if (v !== null) put(target, ox + x, oy + y, v);
    }
  }
}

/** Pixel letters; uppercase is 3×5, lowercase sits on rows 2–4 and "p" hangs one row lower. */
const GLYPHS: Record<string, string[]> = {
  O: ["111", "101", "101", "101", "111"],
  P: ["111", "101", "111", "100", "100"],
  E: ["111", "100", "110", "100", "111"],
  N: ["101", "111", "111", "111", "101"],
  B: ["110", "101", "110", "101", "110"],
  C: ["111", "100", "100", "100", "111"],
  o: ["000", "000", "111", "101", "111"],
  t: ["000", "010", "111", "010", "011"],
  a: ["000", "000", "011", "101", "011"],
  m: ["00000", "00000", "11110", "10101", "10101"],
  p: ["000", "000", "111", "101", "111", "100"],
};

/** Writes a short sign in the pixel font, each dot `scale` pixels wide. */
export function text(g: Grid<Shade>, x: number, y: number, str: string, v: Shade, scale = 1) {
  let left = 0;
  for (const ch of str) {
    const glyph = GLYPHS[ch];
    glyph.forEach((row, j) =>
      [...row].forEach((bit, k) => {
        if (bit === "1") rect(g, x + (left + k) * scale, y + j * scale, scale, scale, v);
      }),
    );
    left += glyph[0].length + 1;
  }
}

/** The "vivid green" Game Boy palette, darkest to lightest. */
export const PALETTE = ["#0b2613", "#2f6a3b", "#8dc455", "#eaf7cc"] as const;

/** Paints a grid onto a canvas of the same size; empty pixels show the lightest shade. */
export function paintGrid(canvas: HTMLCanvasElement, grid: Grid<Shade>) {
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
