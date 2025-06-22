import { Chess, Color } from "chess.js";
import { Materials } from "@/types/eval";

export const calculateMaterialDifference = (currentGame: Chess): Materials => {
  const countBoardMaterial = (currentGame: Chess) => {
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
    return material;
  };

  const getRelativeMaterialAdvantage = (materials: Materials) => {
    const w = {
      p: Math.max(materials.w.p - materials.b.p, 0),
      n: Math.max(materials.w.n - materials.b.n, 0),
      b: Math.max(materials.w.b - materials.b.b, 0),
      r: Math.max(materials.w.r - materials.b.r, 0),
      q: Math.max(materials.w.q - materials.b.q, 0)
    };

    const b = {
      p: Math.max(materials.b.p - materials.w.p, 0),
      n: Math.max(materials.b.n - materials.w.n, 0),
      b: Math.max(materials.b.b - materials.w.b, 0),
      r: Math.max(materials.b.r - materials.w.r, 0),
      q: Math.max(materials.b.q - materials.w.q, 0)
    };

    return { w, b };
  };

  const combinedMaterial = countBoardMaterial(currentGame);
  return getRelativeMaterialAdvantage(combinedMaterial);
};

export const getRelativeMaterial = (materials: Materials, color: Color) => {
  const getMaterialDifferenceOnPieceValue = (materials: Materials) => {
    return (
      materials.w.p -
      materials.b.p +
      materials.w.b * 3 -
      materials.b.b * 3 +
      materials.w.n * 3 -
      materials.b.n * 3 +
      materials.w.r * 5 -
      materials.b.r * 5 +
      materials.w.q * 9 -
      materials.b.q * 9
    );
  };
  const materialDifference = getMaterialDifferenceOnPieceValue(materials);

  const whiteHasMaterialAdvantage = color === "w" && materialDifference > 0;
  const blackHasMaterialAdvantage = color === "b" && materialDifference < 0;

  const materialScore = whiteHasMaterialAdvantage || blackHasMaterialAdvantage ? Math.abs(materialDifference) : 0;
  const isPositiveMaterialScore = materialScore > 0;
  const plusSign = isPositiveMaterialScore ? "+" : "";

  return {
    materialScore,
    plusSign
  };
};
