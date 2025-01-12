import PlayerInfo from "./PlayerInfo";
import RenderMaterial from "./RenderMaterial";
import { Materials } from "../../types/eval";
import { Puzzle } from "../../types/puzzle";

interface PlayerWithMaterialProps {
  puzzle: Puzzle | null;
  color: "white" | "black";
  material: Materials;
}

const PlayerWithMaterial: React.FC<PlayerWithMaterialProps> = ({
  color,
  material,
  puzzle,
}) => {
  return (
    <>
      {puzzle && (
        <div className="h-8 flex gap-2 ">
          <PlayerInfo
            player={
              color === "white" ? puzzle.players.white : puzzle.players.black
            }
            color={color}
        
          />
          <RenderMaterial material={material} color={color} />
        </div>
      )}
    </>
  );
};

export default PlayerWithMaterial;
