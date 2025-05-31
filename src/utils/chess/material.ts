import { Chess, Color } from "chess.js";
import { Materials } from "../../types/eval";

export const calculateMaterialDifference = (currentGame: Chess): Materials => {
  const material: Materials = {
    w: { p: 0, n: 0, b: 0, r: 0, q: 0 },
    b: { p: 0, n: 0, b: 0, r: 0, q: 0 }
  };

  for (const rank of currentGame.board()) {
    for (const square of rank) {
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
    q: Math.max(material.w.q - material.b.q, 0)
  };

  const b = {
    p: Math.max(material.b.p - material.w.p, 0),
    n: Math.max(material.b.n - material.w.n, 0),
    b: Math.max(material.b.b - material.w.b, 0),
    r: Math.max(material.b.r - material.w.r, 0),
    q: Math.max(material.b.q - material.w.q, 0)
  };

  return { w, b };
};

export const determineColorLeadingInMaterial = (material: Materials, color: Color): number => {
  const materialDifference =
    material.w.p -
    material.b.p +
    material.w.b * 3 -
    material.b.b * 3 +
    material.w.n * 3 -
    material.b.n * 3 +
    material.w.r * 5 -
    material.b.r * 5 +
    material.w.q * 9 -
    material.b.q * 9;

  return (color === "w" && materialDifference >= 0) || (color === "b" && materialDifference < 0)
    ? Math.abs(materialDifference)
    : 0;
};
