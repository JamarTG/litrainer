import { useContext } from "react";
import { Materials } from "../../types/eval";
import PlayerWithMaterial from "./PlayerWithMaterial";
import { PuzzleContext } from "../../context/PuzzleContext";

interface BoardWithPlayersProps {
  material: Materials;
  children: React.ReactNode;
}

const BoardWithPlayers: React.FC<BoardWithPlayersProps> = ({
  material,
  children,
}) => {
  const { puzzle } = useContext(PuzzleContext);
  const userColor= puzzle?.userMove.color || "w";
  const opponentColor= puzzle?.opponentMove.color || "b";
 
  return (
    <div className="flex flex-col justify-center items-center">
      <PlayerWithMaterial color={opponentColor} material={material} />
      {children}
      <PlayerWithMaterial color={userColor} material={material} />
    </div>
  );
};

export default BoardWithPlayers;
