import { FC } from "react";
import { Color } from "chess.js";
import { Material } from "@/typing/interfaces";
import usePlayerMaterial from "../../../../hooks/board/usePlayerMaterial";
import MaterialScore from "./MaterialScore";
import PieceDifference from "./PieceDifference";
import { PieceCount } from "@/typing/types";

interface MaterialProps {
  playerMaterial: Material;
  playerColor: Color;
}

const PlayerMaterial: FC<MaterialProps> = ({ playerMaterial, playerColor }) => {
  const materialScore = usePlayerMaterial(playerColor);
  const pieceCounts = Object.entries(playerMaterial) as PieceCount[];

  return (
    <div className="flex justify-center items-center ">
      <PieceDifference pieceCounts={pieceCounts} />
      <MaterialScore score={materialScore} />
    </div>
  );
};

export default PlayerMaterial;
