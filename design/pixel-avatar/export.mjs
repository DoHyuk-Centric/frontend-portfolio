// Exports the pixel avatar drafts (characters + scenes) as SVG and PNG,
// by running the exact drawing code from the published preview page.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import zlib from "node:zlib";

const [, , htmlPath, outDir] = process.argv;
const html = fs.readFileSync(htmlPath, "utf8");

// ==================== 준비: 미리보기 페이지에서 그리기 코드만 꺼내기 ====================

function extractDrawingCode(source) {
  const script = source.slice(source.indexOf("<script>") + "<script>".length, source.lastIndexOf("</script>"));
  const end = script.indexOf("// ==================== 그리기: 격자를 팔레트 색으로 칠하기");
  if (end < 0) throw new Error("drawing section marker not found");
  return script.slice(0, end);
}

function loadDrawingApi(code) {
  const context = vm.createContext({ Math, Array, Number, String, parseInt });
  vm.runInContext(
    `${code}\n;globalThis.api = { SCENES, PALETTES, STAGE_LOOKS, buildCharacter, drawScene, W, H };`,
    context,
  );
  return context.api;
}

// ==================== 변환: 격자를 SVG·PNG로 바꾸기 ====================

function toSvg(grid, colors, scale) {
  const rects = [];
  for (let y = 0; y < grid.h; y++) {
    let x = 0;
    while (x < grid.w) {
      const v = grid.px[y * grid.w + x];
      if (v === null) { x += 1; continue; }
      let run = 1;
      while (x + run < grid.w && grid.px[y * grid.w + x + run] === v) run += 1;
      rects.push(`<rect x="${x}" y="${y}" width="${run}" height="1" fill="${colors[v]}"/>`);
      x += run;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${grid.w} ${grid.h}" width="${grid.w * scale}" height="${grid.h * scale}" shape-rendering="crispEdges">\n${rects.join("\n")}\n</svg>\n`;
}

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

function toPng(grid, colors, scale) {
  const w = grid.w * scale, h = grid.h * scale;
  const rgb = colors.map((hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)));
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0;
    for (let x = 0; x < w; x++) {
      const v = grid.px[Math.floor(y / scale) * grid.w + Math.floor(x / scale)];
      const o = y * (w * 4 + 1) + 1 + x * 4;
      if (v === null) continue;
      raw[o] = rgb[v][0]; raw[o + 1] = rgb[v][1]; raw[o + 2] = rgb[v][2]; raw[o + 3] = 255;
    }
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(w, 0); header.writeUInt32BE(h, 4);
  header[8] = 8; header[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", zlib.deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// ==================== 내보내기: 캐릭터·장면·팔레트 파일 쓰기 ====================

function writeAsset(dir, name, grid, colors, pngScale) {
  fs.writeFileSync(path.join(dir, `${name}.svg`), toSvg(grid, colors, pngScale));
  fs.writeFileSync(path.join(dir, `${name}.png`), toPng(grid, colors, 1));
  fs.writeFileSync(path.join(dir, `${name}@${pngScale}x.png`), toPng(grid, colors, pngScale));
}

function exportAll(api) {
  const colors = api.PALETTES[0].colors;
  const charactersDir = path.join(outDir, "characters");
  const scenesDir = path.join(outDir, "scenes");
  fs.mkdirSync(charactersDir, { recursive: true });
  fs.mkdirSync(scenesDir, { recursive: true });

  api.SCENES.forEach((scene, index) => {
    const name = `${String(index + 1).padStart(2, "0")}-${scene.key}`;
    writeAsset(charactersDir, name, api.buildCharacter(api.STAGE_LOOKS[index], 0), colors, 8);
    writeAsset(scenesDir, name, api.drawScene(index, 0), colors, 4);
  });

  const palettes = Object.fromEntries(api.PALETTES.map((p) => [p.key, { name: p.name, colors: p.colors }]));
  fs.writeFileSync(path.join(outDir, "palettes.json"), JSON.stringify(palettes, null, 2) + "\n");
  return api.SCENES.length;
}

const api = loadDrawingApi(extractDrawingCode(html));
console.log(`exported ${exportAll(api)} characters and scenes to ${outDir}`);
