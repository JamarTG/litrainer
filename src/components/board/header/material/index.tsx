import { FC } from "react";
import { Color } from "chess.js";
import { Material } from "@/typing/interfaces";
import { pieceLongFormWithoutKing } from "@/constants/piece";
import { PieceShortFormWithoutKing } from "@/typing/interfaces";
import { ICON_SIZES } from "@/constants/icons";
import usePlayerMaterial from "../../../../hooks/board/usePlayerMaterial";
import { Bishop, Knight, Pawn, Queen, Rook } from "./pieces";

interface MaterialProps {
  playerMaterial: Material;
  playerColor: Color;
}

const renderPieceNTimes = ([piece, count]: [PieceShortFormWithoutKing, number]) => {
  const PIECE_COMPONENTS = {
    bishop: Bishop,
    knight: Knight,
    pawn: Pawn,
    queen: Queen,
    rook: Rook
  };

  // Must have at least 1 piece to render
  if (count < 1) return null;

  const PieceComponent = PIECE_COMPONENTS[pieceLongFormWithoutKing[piece] as keyof typeof PIECE_COMPONENTS];
  if (!PieceComponent) return null;

  return (
    <div key={piece} className="flex">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ width: ICON_SIZES.SMALL, height: ICON_SIZES.SMALL }}>
          <PieceComponent />
        </div>
      ))}
    </div>
  );
};

const renderMaterialScore = (score: number | null) => {
  if (!score) return;

  const operator = score > 0 && "+";
  return (
    <div className="flex items-center justify-center text-xs">
      <span className="text-gray-600 dark:text-gray-300">{operator}</span>
      <span className="text-gray-800 dark:text-gray-200">{score}</span>
    </div>
  );
};

const PlayerMaterial: FC<MaterialProps> = ({ playerMaterial, playerColor }) => {
  const materialScore = usePlayerMaterial(playerColor);
  const pieceCounts = Object.entries(playerMaterial) as [keyof Material, Material[keyof Material]][];

  return (
    <div className="flex justify-center items-center ">
      {pieceCounts.map(renderPieceNTimes)}
      {renderMaterialScore(materialScore)}
    </div>
  );
};

export default PlayerMaterial;
