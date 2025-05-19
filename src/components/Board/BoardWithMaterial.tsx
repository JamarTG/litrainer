import { Materials } from "../../types/eval";
import PlayerWithMaterial from "./PlayerWithMaterial";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface BoardWithPlayersProps {
  material: Materials;
  children: React.ReactNode;
}

const BoardWithPlayers: React.FC<BoardWithPlayersProps> = ({
  material,
  children,
}) => {

  const {puzzles, currentIndex} = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex]
  
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
