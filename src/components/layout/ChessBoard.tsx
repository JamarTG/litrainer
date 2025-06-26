import HeaderForPlayer from "../board/header";
import { useSelector } from "react-redux";
import { FC, ReactNode } from "react";
import { Color } from "chess.js";
import { getPuzzle } from "@/redux/slices/puzzle";
import { getMaterials } from "@/redux/slices/board";
import { ColorShortForm } from "@/typing/enums";

interface ChessBoardHeaderWrapperProps {
  children: ReactNode;
}

const ChessBoardHeaderWrapper: FC<ChessBoardHeaderWrapperProps> = ({ children }) => {
  const currentPuzzle = useSelector(getPuzzle);
  const hasActivePuzzle = Boolean(currentPuzzle);
  const playerColor = currentPuzzle?.userMove.color;
  const opponentColor = currentPuzzle?.opponentMove.color;
  const materials = useSelector(getMaterials);

  const renderHeaderForPlayer = (color: Color) => {
    const playerMaterial = color === ColorShortForm.WHITE ? materials.w : materials.b;
    return <HeaderForPlayer playerColor={color} playerMaterial={playerMaterial} hasPuzzle={hasActivePuzzle} />;
  };

  return (
    <div className="flex flex-col justify-center items-center pt-2">
      {renderHeaderForPlayer(opponentColor)}
      {children}
      {renderHeaderForPlayer(playerColor)}
    </div>
  );
};

export default ChessBoardHeaderWrapper;
