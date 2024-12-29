import React from "react";
import { Materials } from "../../../types/eval";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessKnight,
  faChessPawn,
  faChessBishop,
  faChessRook,
  faChessKing,
  faChessQueen,
} from "@fortawesome/free-solid-svg-icons";
import { PIECEVALUE } from "../../../constants";

interface RenderMaterialProps {
  material: Materials;
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

    
    if (color === "w" && matdiff >= 0) {
      return matdiff;
    } else if (color === "w" && matdiff < 0) {
      return 0;
    }

    if (color === "b" && matdiff >= 0) {
      return 0;
    } else if (color === "b" && matdiff < 0) {
      return Math.abs(matdiff);
    }
    //   If you are white and its negative or 0 return 0 return the value
    // If you are black and its positive or 0 return 0 else return the absolute value
  };

  return (
    <div className="flex gap-2">
      {Object.entries(color === "b" ? material.b : material.w).map(
        ([piece, count]) =>
          count > 0 ? (
            <div key={piece} className="flex gap-1">
              {[...Array(count)].map((_, i) => (
                <span key={i} className="text-lg font-semibold">
                  {/* {pieceLetters[piece as keyof typeof pieceLetters]} */}
                  <FontAwesomeIcon
                    icon={pieceIcons[piece as keyof typeof pieceIcons]}
                    size="sm"
                  />
                </span>
              ))}
            </div>
          ) : null
      )}
        
      +{getMaterialDiff(color)}
    </div>
  );
};

export default RenderMaterial;
