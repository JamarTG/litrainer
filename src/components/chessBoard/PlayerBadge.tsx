import RenderMaterial from "./RenderMaterial";
import { Materials } from "../../types/eval";
import { FC } from "react";
import PlayerHeader from "./PlayerHeader";
import { Color } from "chess.js";

interface PlayerBadgeProps {
  color: Color;
  material: Materials;
}

const PlayerBadge: FC<PlayerBadgeProps> = ({
  color,
  material,
}) => {
  return (
    <div className="h-8 flex gap-2 justify-center items-center">
      <PlayerHeader color={color} />
      <RenderMaterial material={material} color={color} />
    </div>
  );
};

export default PlayerBadge;
