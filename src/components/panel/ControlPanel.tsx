import GameInfo from "../game/GameInfo";
import PuzzleInfo from "./PuzzleInfo";
import Navigation from "./Navigation";
import EngineDepthControl from "./EngineDepthControl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setClassification, setIsPuzzleSolved } from "../../redux/slices/feedbackSlices";
import { FC } from "react";

interface ControlPanelProps {
  unhighlightLegalMoves: () => void;
}

const PuzzleControlPanel: FC<ControlPanelProps> = ({ unhighlightLegalMoves }) => {
  const { puzzles, currentIndex } = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex];
  const isDataAvailable = puzzle !== null;
  const dispatch = useDispatch();

  const resetBoard = (changePuzzle: () => void) => {
    changePuzzle();
    dispatch(setClassification(null));
    dispatch(setIsPuzzleSolved(false));
    unhighlightLegalMoves();
  };

  return (
    <div className="w-96 ">
      <EngineDepthControl />

      {isDataAvailable && (
        <div className="flex flex-col items-center gap-5 w-full m-5">
          <GameInfo />
          <PuzzleInfo />
          <Navigation resetBoard={resetBoard} />
        </div>
      )}
    </div>
  );
};
export default PuzzleControlPanel;
