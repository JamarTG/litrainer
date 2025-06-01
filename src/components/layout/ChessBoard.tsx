import PlayerBadge from "../board/header/PlayerBadge";
import { useSelector } from "react-redux";
import { FC, ReactNode } from "react";
import { Materials } from "../../types/eval";
import { RootState } from "../../redux/store";
import { Color } from "chess.js";

interface ChessBoardLayoutProps {
  material: Materials;
  children: ReactNode;
}

const ChessBoardLayout: FC<ChessBoardLayoutProps> = ({ material, children }) => {
  const { hasActivePuzzle, playerColor, opponentColor } = useSelector((state: RootState) => {
    return {
      hasActivePuzzle: Boolean(state.puzzle.puzzles[state.puzzle.currentIndex]),
      playerColor: state.puzzle.puzzles[state.puzzle.currentIndex].userMove.color,
      opponentColor: state.puzzle.puzzles[state.puzzle.currentIndex].opponentMove.color
    };
  });
  const renderPlayerBadge = (color: Color) => {
    return <PlayerBadge color={color} material={material} hasPuzzle={hasActivePuzzle} />;
  };

  return (
    <div className="flex flex-col justify-center items-center pt-2">
      {renderPlayerBadge(opponentColor)}
      {children}
      {renderPlayerBadge(playerColor)}
    </div>
  );
};

export default ChessBoardLayout;
