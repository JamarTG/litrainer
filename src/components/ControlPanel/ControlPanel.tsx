import { Dispatch, SetStateAction, useContext } from "react";
import History from "../Puzzle/History";
import GameInfo from "./GameInfo";
import { Classification } from "../../types/move";
import IconButton from "../Universal/Buttons/IconButton";
import PuzzleInfo from "./PuzzleInfo";
import { PuzzleContext } from "../../context/PuzzleContext";

interface ControlPanelProps {
  nextPuzzle: () => void;
  prevPuzzle: () => void;
  unhighlightLegalMoves: () => void;
  setClassification: React.Dispatch<React.SetStateAction<"" | Classification>>;
  setIsPuzzleSolved: Dispatch<SetStateAction<boolean | null>>;
  feedback: { best: string; played: string };
  classification: Classification | "";
  history: Record<number, string>;
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
  history,
  puzzleIndex,
  jumpToPuzzle
}) => {
  const { puzzle } = useContext(PuzzleContext);
  const isDataAvailable = puzzle !== null;

  const resetBoard = (changePuzzle: () => void) => {
    changePuzzle();
    setClassification("");
    unhighlightLegalMoves();
    setIsPuzzleSolved(false);
  };

  return (
    <div className="p-4 w-96">
      {isDataAvailable && (
        <>
          <GameInfo puzzle={puzzle} />
          <div className="flex mt-4 h-16">
            <PuzzleInfo puzzle={puzzle} feedback={feedback} classification={classification} />
          </div>
          <div className="flex justify-between mt-4">
            <IconButton
              onClick={() => resetBoard(prevPuzzle)}
              direction="left"
            />
            <IconButton
              onClick={() => resetBoard(nextPuzzle)}
              direction="right"
            />
          </div>
          <History jumpToPuzzle={jumpToPuzzle} puzzleIndex={puzzleIndex} history={history} />
        </>
      )}
    </div>
  );
};

export default PuzzleControlPanel;
