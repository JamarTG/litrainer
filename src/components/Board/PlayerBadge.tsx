import PlayerInfo from "./PlayerInfo";
import RenderMaterial from "./RenderMaterial";
import { Materials } from "../../types/eval";

interface PlayerWithMaterialProps {
  color: "w" | "b";
  material: Materials;
}

const PlayerWithMaterial: React.FC<PlayerWithMaterialProps> = ({
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
