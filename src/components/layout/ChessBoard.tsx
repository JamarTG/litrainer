import PlayerBadge from "../board/header/_index";
import { useSelector } from "react-redux";
import { FC, ReactNode } from "react";
import { Materials } from "@/types/eval";
import { Color } from "chess.js";
import { getPuzzle } from "@/redux/slices/puzzle";

interface ChessBoardLayoutProps {
  material: Materials;
  children: ReactNode;
}

const ChessBoardLayout: FC<ChessBoardLayoutProps> = ({ material, children }) => {
  const currentPuzzle = useSelector(getPuzzle);
  const hasActivePuzzle = Boolean(currentPuzzle);
  const playerColor = currentPuzzle?.userMove.color;
  const opponentColor = currentPuzzle?.opponentMove.color;

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
