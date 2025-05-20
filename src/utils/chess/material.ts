import { Chess } from "chess.js";
import { Materials } from "../../types/eval";

export const getMaterialDiff = (game: Chess): Materials => {
  const material: Materials = {
    w: { p: 0, n: 0, b: 0, r: 0, q: 0 },
    b: { p: 0, n: 0, b: 0, r: 0, q: 0 },
  };

  for (const row of game.board()) {
    for (const square of row) {
      if (square && square.type !== "k") {
        material[square.color][square.type]++;
      }
    }
  }

  const w = {
    p: Math.max(material.w.p - material.b.p, 0),
    n: Math.max(material.w.n - material.b.n, 0),
    b: Math.max(material.w.b - material.b.b, 0),
    r: Math.max(material.w.r - material.b.r, 0),
    q: Math.max(material.w.q - material.b.q, 0),
  };

  const b = {
    p: Math.max(material.b.p - material.w.p, 0),
    n: Math.max(material.b.n - material.w.n, 0),
    b: Math.max(material.b.b - material.w.b, 0),
    r: Math.max(material.b.r - material.w.r, 0),
    q: Math.max(material.b.q - material.w.q, 0),
  };

  return { w, b };
};

export const getMaterialCount = (material: Materials, color: "w" | "b"): number => {
  const matdiff =
    material.w.p -
    material.b.p +
    material.w.b * 3 -
    material.b.b * 3 +
    material.w.n * 3 -
    material.b.n * 3 +
    material.w.r * 5 -
    material.b.r * 5 +
    material.w.q * 9 -   // FIXED: subtract black queen count
    material.b.q * 9;

  return (color === "w" && matdiff >= 0) || (color === "b" && matdiff < 0) ? Math.abs(matdiff) : 0;
};
