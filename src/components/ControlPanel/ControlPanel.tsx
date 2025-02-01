import { Dispatch, SetStateAction, useContext } from "react";
import GameInfo from "./GameInfo";
import { Classification } from "../../types/move";
import PuzzleInfo from "./PuzzleInfo";
import { PuzzleContext } from "../../context/PuzzleContext";


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
    <div className="flex flex-col justify-between px-2 rounded-md">
      {isDataAvailable && (
        <>
          <GameInfo puzzle={puzzle} />

          <PuzzleInfo
            puzzle={puzzle}
            feedback={feedback}
            classification={classification}
          />

          {/* <PuzzleHistory
            history={history}
            puzzleIndex={puzzleIndex}
            jumpToPuzzle={jumpToPuzzle}
          /> */}

          <div className="flex justify-between items-center gap-4">
            <button
              onClick={() => resetBoard(prevPuzzle)}
              className="flex items-center justify-center p-2 rounded-lg transition-colors duration-200"
            >
              <span className="icon text-2xl">&#xe037;</span>
            </button>
            <button className="flex items-center justify-center p-2 rounded-lg transition-colors duration-200">
              <span className="icon text-2xl">&#xe078;</span>
            </button>
            <button
              onClick={() => resetBoard(nextPuzzle)}
              className="flex items-center justify-center p-2 rounded-lg transition-colors duration-200"
            >
              <span className="icon text-2xl">&#xe036;</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PuzzleControlPanel;
