import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessKnight,
  faChessPawn,
  faChessBishop,
  faChessRook,
  faChessKing,
  faChessQueen,
} from "@fortawesome/free-solid-svg-icons";

interface RenderMaterialProps {
  material: {
    w: {
      p: number;
      n: number;
      b: number;
      r: number;
      q: number;
    };
    b: {
      p: number;
      n: number;
      b: number;
      r: number;
      q: number;
    };
  };
  color: "w" | "b";
}

const RenderMaterial: React.FC<RenderMaterialProps> = ({ material, color }) => {
  const pieceIcons = {
    p: faChessPawn,
    n: faChessKnight,
    b: faChessBishop,
    r: faChessRook,
    q: faChessQueen,
    k: faChessKing,
  };

  const getMaterialDiff = (color: "w" | "b") => {
    const matdiff =
      material.w.p -
      material.b.p +
      material.w.b * 3 -
      material.b.b * 3 +
      material.w.n * 3 -
      material.b.n * 3 +
      material.w.r * 5 -
      material.b.r * 5 +
      material.w.q * 9 +
      material.b.q * 9;

    return (color === "w" && matdiff >= 0) || (color === "b" && matdiff < 0)
      ? Math.abs(matdiff)
      : 0;
  };

  useEffect(() => {
    setMaterialCount(getMaterialDiff(color));
  }, [color, material]);

  const [materialCount, setMaterialCount] = useState<number>(0);

  return (
    <div className="flex justify-center items-center gap-2">
      {Object.entries(color === "b" ? material.b : material.w).map(
        ([piece, count]) =>
          count > 0 ? (
            <div key={piece} className="flex gap-1">
              {[...Array(count)].map((_, i) => (
                <span key={i} className="text-lg font-semibold">
                  <FontAwesomeIcon
                    icon={pieceIcons[piece as keyof typeof pieceIcons]}
                    size="sm"
                    color={color === "w" ? "white" : "black"}
                  />
                </span>
              ))}
            </div>
          ) : null
      )}
     
      {materialCount > 0 ? "+" : ""}
      {materialCount || ""}
    </div>
  );
};

export default RenderMaterial;
