import { FC } from "react";
import { Color } from "chess.js";
import { Material } from "@/typing/interfaces";
import PlayerMaterial from "./PlayerMaterial";
import PlayerMetaData from "./PlayerMetaData";

interface ChessboardHeaderProps {
  playerColor: Color;
  playerMaterial: Material;
  opponentMaterial: Material;
  hasPuzzle: boolean;
}

const ChessboardHeader: FC<ChessboardHeaderProps> = ({ playerColor, playerMaterial, opponentMaterial, hasPuzzle }) => {
  if (!hasPuzzle) return;

  return (
    <div className="text-md w-full text-center flex justify-center items-center gap-5 text-[var(--color-fg)]">
      <PlayerMetaData playerColor={playerColor} />
      <PlayerMaterial playerMaterial={playerMaterial} opponentMaterial={opponentMaterial} />
    </div>
  );
};

export default ChessboardHeader;
