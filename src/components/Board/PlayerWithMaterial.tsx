import PlayerInfo from "../ControlPanel/PlayerInfo";
import RenderMaterial from "../ControlPanel/RenderMaterial";
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
        <div className="flex items-center gap-2">
          <PlayerInfo
            player={
              color === "white" ? puzzle.players.white : puzzle.players.black
            }
            color={color}
            isWinner={puzzle.winner == color}
          />
          <RenderMaterial material={material} color={color} />
        </div>
      )}
    </>
  );
};

export default PlayerWithMaterial;
