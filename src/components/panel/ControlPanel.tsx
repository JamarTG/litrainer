import GameInfo from "../game/GameInfo";
import PuzzleInfo from "./PuzzleInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FC } from "react";

interface ControlPanelProps {
  unhighlightLegalMoves: () => void;
}

const PuzzleControlPanel: FC<ControlPanelProps> = () => {
  const { puzzles, currentIndex } = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex];
  const isDataAvailable = puzzle !== null;

  return (
    <div className="flex flex-col w-full">
      {isDataAvailable && (
        <div className="flex flex-col gap-1 justify-between items-center">
          <div className="flex flex-col gap-2">
            <GameInfo />
            <PuzzleInfo />
          </div>
        </div>
      )}
    </div>
  );
};
export default PuzzleControlPanel;
