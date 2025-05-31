import PlayerBadge from "../board/header/PlayerBadge";
import { useSelector } from "react-redux";
import { FC, ReactNode } from "react";
import { Materials } from "../../types/eval";
import { RootState } from "../../redux/store";

interface ChessBoardLayoutProps {
  material: Materials;
  children: ReactNode;
}

const ChessBoardLayout: FC<ChessBoardLayoutProps> = ({ material, children }) => {
  const activePuzzle = useSelector((state: RootState) => state.puzzle.puzzles[state.puzzle.currentIndex]);

  const playerColor = activePuzzle?.userMove.color;
  const opponentColor = activePuzzle?.opponentMove.color;
  const hasActivePuzzle = !!activePuzzle;

  return (
    <div className="flex flex-col justify-center items-center pt-2">
      <PlayerBadge color={opponentColor} material={material} hasPuzzle={hasActivePuzzle} />
      {children}
      <PlayerBadge color={playerColor} material={material} hasPuzzle={hasActivePuzzle} />
    </div>
  );
};

export default ChessBoardLayout;
