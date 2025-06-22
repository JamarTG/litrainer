import HeaderForPlayer from "../board/header/_index";
import { useSelector } from "react-redux";
import { FC, ReactNode } from "react";
import { Color } from "chess.js";
import { getPuzzle } from "@/redux/slices/puzzle";
import { getMaterials } from "@/redux/slices/board";
import { isWhitePlayerShort } from "@/utils/color";

interface ChessBoardLayoutProps {
  children: ReactNode;
}

const ChessBoardLayout: FC<ChessBoardLayoutProps> = ({ children }) => {
  const currentPuzzle = useSelector(getPuzzle);
  const hasActivePuzzle = Boolean(currentPuzzle);
  const playerColor = currentPuzzle?.userMove.color;
  const opponentColor = currentPuzzle?.opponentMove.color;
  const materials = useSelector(getMaterials);

  const renderHeaderForPlayer = (color: Color) => {
    const playerMaterial = isWhitePlayerShort(color) ? materials.w : materials.b;
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

export default ChessBoardLayout;
