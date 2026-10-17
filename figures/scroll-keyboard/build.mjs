// Wheel-typing keyboard for the home screen: a 60% board. Each step
// of the project wheel presses a random key and types it on the board's OLED.
// node figures/scroll-keyboard/build.mjs  → src/components/keyboardFigure.js
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../../src/lib/iso-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "../../src/components/keyboardFigure.js");

const WIDTH = 600;
const HEIGHT = 324;

// One key unit (19.05 mm) is 12 world units.
const U = 12;
const MM = U / 19.05;


const CASE = { x: -98, y: -64, w: 196, d: 108, r: 7 };
const PAD_H = 2;
const TRAY_TOP = 6;
const KB_TOP = 14;
const FLOOR = KB_TOP - 3;
const HOUSE_TOP = KB_TOP + 6.6 * MM - 3;
const TRAVEL = 4;
const ACTUATE = 2;
const CAP_Z = HOUSE_TOP + TRAVEL * MM;

const KEYS_X = -90;
const KEYS_Y = -24;
const WELL = { x: KEYS_X - 1.4, y: KEYS_Y - 1.4, w: 15 * U + 2.8, d: 5 * U + 2.8, r: 0.8 };

const ROWS = [
  [["`", 1], ["1", 1], ["2", 1], ["3", 1], ["4", 1], ["5", 1], ["6", 1], ["7", 1], ["8", 1], ["9", 1], ["0", 1], ["-", 1], ["=", 1], ["backspace", 2]],
  [["tab", 1.5], ["q", 1], ["w", 1], ["e", 1], ["r", 1], ["t", 1], ["y", 1], ["u", 1], ["i", 1], ["o", 1], ["p", 1], ["[", 1], ["]", 1], ["\\", 1.5]],
  [["caps", 1.75], ["a", 1], ["s", 1], ["d", 1], ["f", 1], ["g", 1], ["h", 1], ["j", 1], ["k", 1], ["l", 1], [";", 1], ["'", 1], ["enter", 2.25]],
  [["shift", 2.25], ["z", 1], ["x", 1], ["c", 1], ["v", 1], ["b", 1], ["n", 1], ["m", 1], [",", 1], [".", 1], ["/", 1], ["rshift", 2.75]],
  [["ctrl", 1.25], ["win", 1.25], ["alt", 1.25], ["space", 6.25], ["ralt", 1.25], ["fn", 1.25], ["menu", 1.25], ["rctrl", 1.25]],
];
// OEM-style sculpt: each row's cap height.
const ROW_H = [6.6, 6.1, 5.7, 5.9, 6.3];

const OLED = { x: -62, y: -60, w: 60, d: 16, r: 1.8 };
const KNOB = [80, -52];

const P = k.fitProjection(
  [...k.boxCorners(CASE, 0, CAP_Z + ROW_H[0]), [KNOB[0], KNOB[1], KB_TOP + 9]],
  WIDTH,
  HEIGHT,
  { pad: 6, azimuth: 64, elevation: 36 },
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const poly = (points, z) => k.pathOf(points.map(([x, y]) => at([x, y, z])), true);

function keyboardCase() {
  const out = [`<path class="iso-halo" d="${k.haloOf(CASE, 0, 7, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(CASE, 9))) out.push(S(k.cylinder(x, y, 3.4, 0, PAD_H, P, 18), { tone: "lo" }));
  out.push(S(k.slabOf(k.insetPlan(CASE, 1.6), PAD_H, TRAY_TOP - PAD_H, P, 8), { tone: "lo" }));
  out.push(S(k.slabOf(CASE, TRAY_TOP, KB_TOP - TRAY_TOP, P, 8, 1), { tone: "mid", inner: L(k.sideSeam(CASE, TRAY_TOP + 3, P, 8), { tone: "faint" }) }));
  const screws = [[CASE.x + 5, CASE.y + 5], [CASE.x + CASE.w - 5, CASE.y + 5], [CASE.x + 5, CASE.y + CASE.d - 4], [CASE.x + CASE.w - 5, CASE.y + CASE.d - 4]];
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 1.6, KB_TOP, P, 14)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, KB_TOP])), { size: 0.45 }));
  out.push(oled(), leds(), nameplate(), knob());
  return out.join("");
}

function oled() {
  const out = [S(k.slabOf(OLED, KB_TOP, 0.8, P, 4), { tone: "lo", crease: "none" })];
  const glass = k.insetPlan(OLED, 1.6);
  const z = KB_TOP + 0.8;
  out.push(`<path class="ks-glass" d="${poly(k.roundedPlan(glass, 4), z)}"/>`);
  out.push(L(k.planOutline(glass, z, P, 4), { tone: "lo" }));
  const text = (x, y, size, part, value, cls = "ks-oled") => `<text class="${cls}" data-part="${part}" transform="${k.topMatrix([x, y], z, P)}" font-size="${size}">${value}</text>`;
  // A project counter, and the last few characters typed with a cursor (13 cells fit the glass).
  out.push(text(glass.x + 3, glass.y + 3.8, 2.6, "count", "01 / 01", "ks-oled ks-oled-dim"));
  out.push(text(glass.x + 3, glass.y + glass.d - 2, 5.6, "text", "_"));
  return out.join("");
}

function leds() {
  const spots = [4, 11, 18].map((x) => [x, -52]);
  return L(spots.map(([x, y]) => k.ring(x, y, 1.5, KB_TOP, P, 14)).join(""), { tone: "lo" }) + `<g data-part="led">${D(spots.map(([x, y]) => at([x, y, KB_TOP])), { size: 0.55, tone: "mid" })}</g>`;
}

function nameplate() {
  const plan = { x: 30, y: -59, w: 30, d: 13, r: 1.2 };
  const out = [S(k.slabOf(plan, KB_TOP, 0.6, P, 3), { tone: "lo", crease: "none" })];
  out.push(L([18, 12, 22].map((w, i) => k.lineOnTop([plan.x + 3.5, plan.y + 3.6 + i * 2.9], [plan.x + 3.5 + w, plan.y + 3.6 + i * 2.9], KB_TOP + 0.6, P)).join(""), { tone: "lo", free: true }));
  return out.join("");
}

function knob() {
  const [x, y] = KNOB;
  const out = [];
  out.push(S(k.cylinder(x, y, 8.2, KB_TOP, 1.2, P, 40), { tone: "lo" }));
  const z0 = KB_TOP + 1.2;
  const top = z0 + 7.6;
  out.push(S(k.cylinder(x, y, 6.8, z0, top - z0, P, 48, 0.6), { tone: "mid" }));
  out.push(L(k.knurl(x, y, 6.8, z0 + 1.2, top - 1.4, 40, P), { tone: "lo" }));
  out.push(L(k.sideArc(x, y, 6.8, z0 + 1.2, P, 32) + k.sideArc(x, y, 6.8, top - 1.4, P, 32), { tone: "faint" }));
  out.push(L(k.ring(x, y, 5, top, P, 40), { tone: "lo" }));
  out.push(L(k.lineOnTop([x, y - 1.6], [x, y - 4.6], top, P), { tone: "hi" }));
  out.push(D([at([x, y, top])], { size: 0.45 }));
  return out.join("");
}

// The recessed switch plate, seen through the opening in the case top.
function well() {
  const opening = k.roundedPlan(WELL, 3);
  const clip = `<clipPath id="ks-well"><path d="${poly(opening, KB_TOP)}"/></clipPath>`;
  const x0 = WELL.x, x1 = WELL.x + WELL.w, y0 = WELL.y, y1 = WELL.y + WELL.d;
  const back = k.pathOf([at([x0, y0, KB_TOP]), at([x1, y0, KB_TOP]), at([x1, y0, FLOOR]), at([x0, y0, FLOOR])], true);
  const left = k.pathOf([at([x0, y0, KB_TOP]), at([x0, y1, KB_TOP]), at([x0, y1, FLOOR]), at([x0, y0, FLOOR])], true);
  const inside = [
    `<path class="ks-floor" d="${poly(opening, FLOOR)}"/>`,
    `<path class="iso-shade" data-shade="2" d="${back}"/>`,
    `<path class="iso-shade" data-shade="1" d="${left}"/>`,
    L(k.segment([x0, y0, FLOOR], [x1, y0, FLOOR], P) + k.segment([x0, y0, FLOOR], [x0, y1, FLOOR], P), { tone: "faint" }),
  ];
  // The lower halves of the housings, below the case top.
  for (const key of keys) for (const plan of key.housings) inside.push(S(k.slabOf(plan, FLOOR, KB_TOP - FLOOR, P, 2), { tone: "lo", crease: "none" }));
  return `${clip}<g clip-path="url(#ks-well)">${inside.join("")}</g>${L(k.planOutline(WELL, KB_TOP, P, 3), { tone: "lo" })}`;
}

// Key layout: every cap with its switch housing (and stabiliser housings on long keys).
const keys = [];
ROWS.forEach((row, r) => {
  let x = KEYS_X;
  for (const [code, width] of row) {
    const y = KEYS_Y + r * U;
    const cx = x + (width * U) / 2;
    const cy = y + U / 2;
    const house = { x: cx - 4.9, y: cy - 4.9, w: 9.8, d: 9.8, r: 0.9 };
    const housings = [house];
    if (width >= 2) {
      const reach = width >= 6 ? 50 * MM : 11.9 * MM;
      for (const sx of [cx - reach, cx + reach]) housings.push({ x: sx - 2.2, y: cy - 3.2, w: 4.4, d: 6.4, r: 0.6 });
    }
    keys.push({
      code,
      row: r,
      cap: { x: x + 0.75, y: y + 0.75, w: width * U - 1.5, d: U - 1.5, r: 1.6 },
      stem: { x: cx - 1.8, y: cy - 1.8, w: 3.6, d: 3.6, r: 0.5 },
      housings,
      h: ROW_H[r],
    });
    x += width * U;
  }
});

function stemSvg(plan, height) {
  return height > 0.05 ? S(k.slabOf(plan, HOUSE_TOP, height, P, 2), { tone: "mid", crease: "none" }) : "";
}

function keycaps() {
  const out = [];
  for (const key of keys) {
    for (const plan of key.housings) out.push(S(k.slabOf(plan, KB_TOP, HOUSE_TOP - KB_TOP, P, 2), { tone: "lo" }));
    const i = keys.indexOf(key);
    out.push(`<g data-stem="${i}">${stemSvg(key.stem, CAP_Z - HOUSE_TOP)}</g>`);
    const top = CAP_Z + key.h;
    const parts = [S(k.slabOf(key.cap, CAP_Z, key.h, P, 3, 0.4), { tone: "mid", crease: "faint" })];
    parts.push(L(k.planOutline(k.insetPlan(key.cap, 1.9), top, P, 3), { tone: "faint" }));
    if (key.code === "f" || key.code === "j") {
      const cx = key.cap.x + key.cap.w / 2;
      parts.push(S(k.slabOf({ x: cx - 1.8, y: key.cap.y + key.cap.d - 3.4, w: 3.6, d: 0.9, r: 0.45 }, top, 0.35, P, 2), { tone: "mid", crease: "none" }));
    }
    out.push(`<g class="ks-key" data-key="${i}">${parts.join("")}</g>`);
  }
  return out.join("");
}

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "A 60% mechanical keyboard. Each turn of the project wheel presses a random key, and its small screen shows the text typed so far and which project is showing.",
  body: [keyboardCase(), well(), keycaps()],
});

// What each key types (null for modifiers), and its stem's plan for the per-frame rebuild.
const CHARS = keys.map((key) => (key.code.length === 1 ? key.code : key.code === "space" ? " " : null));
const BACKSPACE = keys.findIndex((key) => key.code === "backspace");
const CODES = keys.map((key) => key.code);
const model = { P, MM, TRAVEL, ACTUATE, HOUSE_TOP, CAP_Z, CHARS, CODES, BACKSPACE, STEMS: keys.map((key) => key.stem) };

writeFileSync(
  OUT,
  `// Generated by figures/scroll-keyboard/build.mjs. Do not edit by hand.\n` +
    `export const KEYBOARD = ${JSON.stringify(model)}\n` +
    `export const KEYBOARD_SVG = ${JSON.stringify(svg)}\n`,
);
console.log("wrote", OUT, (svg.length / 1024).toFixed(0) + " KB");
