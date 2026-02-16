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
    const opponentMaterial = color === ColorShortForm.WHITE ? materials.b : materials.w;

    return (
      <div
        className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 ${
          position === "top" ? "top-0 -translate-y-full" : "bottom-0 translate-y-full"
        }`}
      >
        <HeaderForPlayer
          playerColor={color}
          playerMaterial={playerMaterial}
          opponentMaterial={opponentMaterial}
          hasPuzzle={hasActivePuzzle}
        />
      </div>
    );
  };

  return (
    <div className="px-2 pb-0 pt-0 md:p-2 sm:w-full lg:w-fit w-full flex flex-col items-center">
      <div className="w-full lg:w-fit flex items-stretch justify-center md:gap-3">
        {/* <EvalBar orientation="vertical" className="hidden md:flex" /> */}

        <div className="relative">
          {opponentColor && renderHeaderForPlayer(opponentColor, "top")}
          {children}
          {playerColor && renderHeaderForPlayer(playerColor, "bottom")}
        </div>
      </div>

      {/* <EvalBar orientation="horizontal" className="mt-2 max-w-[520px]" /> */}
    </div>
  );
};


export default BoardHeaderLayout;
