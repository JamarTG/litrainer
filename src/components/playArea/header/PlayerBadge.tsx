import RenderMaterial from "./RenderMaterial";
import { Materials } from "../../../types/eval";
import { FC } from "react";
import PlayerHeader from "./PlayerHeader";
import { Color } from "chess.js";

interface PlayerBadgeProps {
  color: Color;
  material: Materials;
  hasPuzzle: boolean;
}

const PlayerBadge: FC<PlayerBadgeProps> = ({ color, material, hasPuzzle }) => {
  if (!hasPuzzle) return null;

  return (
    <div
      className={`rounded-${color === "w" ? "b" : "t"}-md w-full  border border-gray-300 text-center p-1 text-sm
                   dark:bg-[#2c2c2c] dark:text-white dark:border-gray-600 flex justify-center items-center`}
    >
      <PlayerHeader color={color} />
      <RenderMaterial
        material={material}
        color={color}
      />
    </div>
  );
};

export default PlayerBadge;
