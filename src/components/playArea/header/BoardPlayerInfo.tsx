import { Materials } from "../../../types/eval";
import PlayerBadge from "../header/PlayerBadge";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { FC, ReactNode } from "react";
import GameInfo from "./GameInfo";
// import { DEFAULT_OPPONENT_COLOR, DEFAULT_USER_COLOR } from "../../constants/board";

interface BoardPlayerInfoProps {
  material: Materials;
  children: ReactNode;
}

const BoardPlayerInfo: FC<BoardPlayerInfoProps> = ({ material, children }) => {
  const { puzzles, currentIndex } = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex];

  const userColor = puzzle?.userMove.color;
  const opponentColor = puzzle?.opponentMove.color;

  const hasPuzzle = !!puzzle;

  return (
    <div className="flex flex-col justify-center items-center">
      <GameInfo/>
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
