import { useContext } from "react";
import { Materials } from "../../types/eval";
import PlayerWithMaterial from "./PlayerWithMaterial";
import { PuzzleContext } from "../../context/PuzzleContext";
import { ThemeContext } from "../../context/ThemeContext";

interface BoardWithPlayersProps {
  material: Materials;
  children: React.ReactNode;
}

const BoardWithPlayers: React.FC<BoardWithPlayersProps> = ({
  material,
  children,
}) => {
  const { puzzle } = useContext(PuzzleContext);
  const userColor= puzzle?.userMove.color == "w" ? "white" : "black";
  const opponentColor= puzzle?.opponentMove.color == "w" ? "white" : "black";
 
  return (
    <div className="flex flex-col">
      <PlayerWithMaterial puzzle={puzzle} color={opponentColor} material={material} />
      {children}
      <PlayerWithMaterial puzzle={puzzle} color={userColor} material={material} />
    </div>
  );
};

export default BoardWithPlayers;
