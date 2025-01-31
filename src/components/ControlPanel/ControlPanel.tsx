import { Dispatch, SetStateAction, useContext } from "react";
// import History from "../Puzzle/History";
import GameInfo from "./GameInfo";
import { Classification } from "../../types/move";
import PuzzleInfo from "./PuzzleInfo";
import { PuzzleContext } from "../../context/PuzzleContext";

interface ControlPanelProps {
  nextPuzzle: () => void;
  prevPuzzle: () => void;
  unhighlightLegalMoves: () => void;
  setClassification: React.Dispatch<React.SetStateAction<Classification | null>>;
  setIsPuzzleSolved: Dispatch<SetStateAction<boolean | null>>;
  feedback: { best: string | null; played: string | null };
  classification: Classification | null;
  history: Record<number, string | null>;
  puzzleIndex: number;
  jumpToPuzzle: (index: number) => void;
}

const PuzzleControlPanel: React.FC<ControlPanelProps> = ({
  nextPuzzle,
  prevPuzzle,
  setClassification,
  unhighlightLegalMoves,
  setIsPuzzleSolved,
  feedback,
  classification,
  // history,
  // puzzleIndex,
  // jumpToPuzzle,
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
    <div className="p-4 w-96">
      {isDataAvailable && (
        <>
          <GameInfo puzzle={puzzle} />
          <div className="flex mt-4 h-16">
            <PuzzleInfo
              puzzle={puzzle}
              feedback={feedback}
              classification={classification}
            />
          </div>
          <div className="flex justify-center gap-16">
            <button onClick={() => resetBoard(prevPuzzle)}>
              <span className="icon text-2xl">&#xe037;</span>
            </button>
            <button>
              <span className="icon text-2xl">&#xe078;</span>
            </button>
            <button onClick={() => resetBoard(nextPuzzle)}>
              <span className="icon text-2xl">&#xe036;</span>
            </button>
          </div>
          {/* <History
            jumpToPuzzle={jumpToPuzzle}
            puzzleIndex={puzzleIndex}
            history={history}
          /> */}
        </>
      )}
    </div>
  );
};

export default PuzzleControlPanel;
