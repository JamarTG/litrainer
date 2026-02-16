import HeaderForPlayer from "@/features/chessboard/ui/header";
import { useSelector } from "react-redux";
import { FC, ReactNode } from "react";
import { Color } from "chess.js";
import { getPuzzle } from "@/state/slices/puzzle";
import { getMaterials } from "@/state/slices/board";
import { ColorShortForm } from "@/typing/enums";

interface BoardHeaderLayoutProps {
  children: ReactNode;
}

const BoardHeaderLayout: FC<BoardHeaderLayoutProps> = ({ children }) => {
  const currentPuzzle = useSelector(getPuzzle);
  const hasActivePuzzle = Boolean(currentPuzzle);
  const playerColor = currentPuzzle?.userMove.color;
  const opponentColor = currentPuzzle?.opponentMove.color;
  const materials = useSelector(getMaterials);

  const renderHeaderForPlayer = (color: Color, position: "top" | "bottom") => {
    const playerMaterial = color === ColorShortForm.WHITE ? materials.w : materials.b;

    return (
      <div
        className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 ${
          position === "top" ? "-top-8" : "bottom-[-2rem]"
        }`}
      >
        <HeaderForPlayer playerColor={color} playerMaterial={playerMaterial} hasPuzzle={hasActivePuzzle} />
      </div>
    );
  };

  return (
    <div className="p-2 relative sm:w-full lg:w-fit w-full flex gap-20 items-center justify-center">
      {opponentColor && renderHeaderForPlayer(opponentColor, "top")}
      {children}
      {playerColor && renderHeaderForPlayer(playerColor, "bottom")}
    </div>
  );
};


export default BoardHeaderLayout;
