import { FC } from "react";
import { Color } from "chess.js";
import { Material } from "@/types/eval";
import PlayerMaterial from "./PlayerMaterial";
import PlayerMetaData from "./PlayerMetadata";
import { exists } from "@/utils/helpers";

interface HeaderForPlayerProps {
  playerColor: Color;
  playerMaterial: Material;
  hasPuzzle: boolean;
}

const HeaderForPlayer: FC<HeaderForPlayerProps> = ({ playerColor, playerMaterial, hasPuzzle }) => {
  if (!exists(hasPuzzle)) return;

  return (
    <div className={`w-full text-center p-1 text-sm dark:text-white flex justify-center items-center gap-5`}>
      <PlayerMetaData playerColor={playerColor} />
      <PlayerMaterial playerMaterial={playerMaterial} playerColor={playerColor} />
    </div>
  );
};

export default HeaderForPlayer;
