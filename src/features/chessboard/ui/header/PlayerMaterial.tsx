import { FC } from "react";
import { Material } from "@/typing/interfaces";
import MaterialScore from "./MaterialScore";
import PieceDifference from "./PieceDifference";
import { PieceCount } from "@/typing/types";
import { PIECE_VALUE } from "@/constants/piece";


interface MaterialProps {
  playerMaterial: Material;
  opponentMaterial: Material;
}

const MATERIAL_KEYS: Array<keyof Material> = ["p", "n", "b", "r", "q"];


const PlayerMaterial: FC<MaterialProps> = ({ playerMaterial, opponentMaterial }) => {
  const playerPieceCounts: PieceCount[] = [];
  const opponentPieceCounts: PieceCount[] = [];
  let materialScore = 0;

  MATERIAL_KEYS.forEach((piece) => {
    const playerCount = playerMaterial[piece];
    const opponentCount = opponentMaterial[piece];
    if (playerCount > opponentCount) {
      playerPieceCounts.push([piece, playerCount - opponentCount]);
      materialScore += (playerCount - opponentCount) * PIECE_VALUE[piece];
    } else if (opponentCount > playerCount) {
      opponentPieceCounts.push([piece, opponentCount - playerCount]);
      materialScore -= (opponentCount - playerCount) * PIECE_VALUE[piece];
    }
  });

  if (materialScore === 0) return null;


  if (materialScore > 0) {
    return (
      <div className="flex justify-center items-center gap-1">
        <PieceDifference pieceCounts={playerPieceCounts} />
        <MaterialScore score={materialScore} />
      </div>
    );
  } else if (materialScore < 0) {
    return (
      <div className="flex justify-center items-center gap-1">
        <PieceDifference pieceCounts={opponentPieceCounts} />
      </div>
    );
  } else {
    return null;
  }
};

export default PlayerMaterial;
