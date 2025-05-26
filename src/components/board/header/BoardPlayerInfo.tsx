import PlayerBadge from "./PlayerBadge";
import { useSelector } from "react-redux";
import { FC, ReactNode } from "react";
import { Materials } from "../../../types/eval";
import { RootState } from "../../../redux/store";

interface BoardPlayerInfoProps {
  material: Materials;
  children: ReactNode;
}

const BoardPlayerInfo: FC<BoardPlayerInfoProps> = ({ material, children }) => {
  const puzzle = useSelector((state: RootState) => state.puzzle.puzzles[state.puzzle.currentIndex]);

  const userColor = puzzle?.userMove.color;
  const opponentColor = puzzle?.opponentMove.color;

  const hasPuzzle = !!puzzle;

  return (
    <div className="flex flex-col justify-center items-center pt-2">
      <PlayerBadge
        color={opponentColor}
        material={material}
        hasPuzzle={hasPuzzle}
      />
      
      {children}

      <PlayerBadge
        color={userColor}
        material={material}
        hasPuzzle={hasPuzzle}
      />
    </div>
  );
};

export default BoardPlayerInfo;
