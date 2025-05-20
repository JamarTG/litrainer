import PlayerInfo from "./PlayerHeader";
import RenderMaterial from "./RenderMaterial";
import { Materials } from "../../types/eval";
import { FC } from "react";

interface PlayerWithMaterialProps {
  color: "w" | "b";
  material: Materials;
}

const PlayerWithMaterial: FC<PlayerWithMaterialProps> = ({
  color,
  material,
}) => {
  return (
    <div className="h-8 flex gap-2 justify-center items-center">
      <PlayerInfo color={color} />
      <RenderMaterial material={material} color={color} />
    </div>
  );
};

export default PlayerWithMaterial;
