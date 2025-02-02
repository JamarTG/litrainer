import { Dispatch, SetStateAction, useContext } from "react";
import GameInfo from "./GameInfo";
import { Classification } from "../../types/move";
import PuzzleInfo from "./PuzzleInfo";
import { PuzzleContext } from "../../context/PuzzleContext";
import Navigation from "./Navigation";
import History from "./PuzzleHistory";

interface ControlPanelProps {
  nextPuzzle: () => void;
  prevPuzzle: () => void;
  jumpToPuzzle: (num: number) => void;
  history: Record<number, string | null>;
  puzzleIndex: number;
  unhighlightLegalMoves: () => void;
  setClassification: React.Dispatch<
    React.SetStateAction<Classification | null>
  >;
  setIsPuzzleSolved: Dispatch<SetStateAction<boolean | null>>;
  feedback: { best: string | null; played: string | null };
  classification: Classification | null;
}

const PuzzleControlPanel: React.FC<ControlPanelProps> = ({
  nextPuzzle,
  prevPuzzle,
  setClassification,
  unhighlightLegalMoves,
  setIsPuzzleSolved,
  feedback,
  classification,
  puzzleIndex,
  jumpToPuzzle,
  history,
}) => {
  const { puzzle } = useContext(PuzzleContext);
  const isDataAvailable = puzzle !== null;

  const resetBoard = (changePuzzle: () => void) => {
    changePuzzle();
    setClassification(null);
    unhighlightLegalMoves();
    setIsPuzzleSolved(false);
  };

  return (
    <div className="w-96 ">
      {isDataAvailable && (
        <div className="flex flex-col items-center gap-5 w-full m-5">
          <GameInfo puzzle={puzzle} />

          <PuzzleInfo
            puzzle={puzzle}
            feedback={feedback}
            classification={classification}
          />

          <History
            history={history}
            puzzleIndex={puzzleIndex}
            jumpToPuzzle={jumpToPuzzle}
          />

          <Navigation
            resetBoard={resetBoard}
            nextPuzzle={nextPuzzle}
            prevPuzzle={prevPuzzle}
          />
        </div>
      )}
    </div>
  );
};
export default PuzzleControlPanel;
