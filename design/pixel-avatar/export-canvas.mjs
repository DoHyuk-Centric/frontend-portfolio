// Renders the sprites and frame strips used by the design canvas, from the
// same drawing code as preview.html.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import zlib from "node:zlib";

const [, , htmlPath, outDir] = process.argv;

// ==================== 준비: 미리보기의 그리기 코드 불러오기 ====================

function loadDrawingApi(source) {
  const script = source.slice(source.indexOf("<script>") + 8, source.lastIndexOf("</script>"));
  const code = script.slice(0, script.indexOf("// ==================== 그리기: 격자를 팔레트 색으로 칠하기"));
  const context = vm.createContext({ Math, Array, Number, String, parseInt });
  vm.runInContext(
    `${code}\n;globalThis.api = { SCENES, PALETTES, STAGE_LOOKS, SOLDIER_V2, STUDENT_V2, LOOKS_V2, ACTIONS, buildCharacter, drawScene, makeGrid, stamp };`,
    context,
  );
  return context.api;
}

// ==================== 변환: 격자를 PNG로 ====================

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
function toPng(grid, colors) {
  const { w, h } = grid;
  const rgb = colors.map((hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)));
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const v = grid.px[y * w + x];
    if (v === null) continue;
    raw.set([...rgb[v], 255], y * (w * 4 + 1) + 1 + x * 4);
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(w, 0); header.writeUInt32BE(h, 4); header[8] = 8; header[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header), chunk("IDAT", zlib.deflateSync(raw)), chunk("IEND", Buffer.alloc(0)),
  ]);
}

/** Lays grids side by side into one horizontal strip. */
function strip(api, grids) {
  const out = api.makeGrid(grids[0].w * grids.length, grids[0].h);
  grids.forEach((g, i) => api.stamp(out, g, i * g.w, 0));
  return out;
}

// ==================== 내보내기: 캔버스에 올릴 그림들 ====================

const api = loadDrawingApi(fs.readFileSync(htmlPath, "utf8"));
const colors = api.PALETTES[0].colors;
const armyIndex = api.SCENES.findIndex((s) => s.key === "army");
const univIndex = api.SCENES.findIndex((s) => s.key === "univ");
const soldierV1 = api.STAGE_LOOKS[armyIndex];
const v2 = api.SOLDIER_V2;

/** Frames of the combined army scene, evenly spaced over its scroll. */
const SCENE_FRAMES = 24;

const files = {
  "base.png": api.buildCharacter(api.STAGE_LOOKS[univIndex], 0),
  "soldier-v1.png": api.buildCharacter(soldierV1, 0),
  "soldier-v2.png": api.buildCharacter(v2, 0),
  "walk-v1.png": strip(api, [0, 1, 2, 3].map((s) => api.buildCharacter(soldierV1, 0, s))),
  "walk-v2.png": strip(api, [0, 1, 2, 3].map((s) => api.buildCharacter(v2, 0, s))),
  "salute-v2.png": strip(api, [null, "raise", "salute"].map((p) => api.buildCharacter(v2, 0, 0, p))),
  "army-scene-v2.png": strip(api, Array.from({ length: SCENE_FRAMES }, (_, i) =>
    api.drawScene(armyIndex, i % 4, i / (SCENE_FRAMES - 1), { look: v2, salute: true }))),
};

const highIndex = api.SCENES.findIndex((s) => s.key === "high");
const student = api.STUDENT_V2;
files["student-v1.png"] = api.buildCharacter(api.STAGE_LOOKS[highIndex], 0);
files["student-v2.png"] = api.buildCharacter(student, 0);
files["cheer-v2.png"] = strip(api, [null, "lift", "cheer"].map((p) => api.buildCharacter(student, 0, 0, p)));
files["high-scene-v2.png"] = strip(api, Array.from({ length: SCENE_FRAMES }, (_, i) =>
  api.drawScene(highIndex, i % 4, i / (SCENE_FRAMES - 1), { look: student })));

/** The other stages: current look, refined look, the 3-frame action, and the combined scene. */
for (const key of ["univ", "grad", "discharge", "business", "bootcamp", "now"]) {
  const index = api.SCENES.findIndex((s) => s.key === key);
  const look = api.LOOKS_V2[key];
  const [middle, last] = api.ACTIONS[key];
  const finishedLook = key === "business" ? { ...look, mood: undefined } : look;
  files[`${key}-v1.png`] = api.buildCharacter(api.STAGE_LOOKS[index], 0);
  files[`${key}-v2.png`] = api.buildCharacter(look, 0);
  files[`${key}-action.png`] = strip(api, [
    api.buildCharacter(look, 0, 0, { discharge: "salute", univ: "pencilRest" }[key] ?? null),
    api.buildCharacter(look, 0, 0, middle),
    api.buildCharacter(finishedLook, 0, 0, last),
  ]);
  files[`${key}-scene.png`] = strip(api, Array.from({ length: SCENE_FRAMES }, (_, i) =>
    api.drawScene(index, i % 4, i / (SCENE_FRAMES - 1))));
}

fs.mkdirSync(outDir, { recursive: true });
for (const [name, grid] of Object.entries(files)) {
  fs.writeFileSync(path.join(outDir, name), toPng(grid, colors));
  console.log(name, `${grid.w}x${grid.h}`);
}
