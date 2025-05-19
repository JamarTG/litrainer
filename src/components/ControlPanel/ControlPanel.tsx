import { Dispatch, SetStateAction, useContext } from "react";
import GameInfo from "../Game/GameInfo";
import { Classification } from "../../types/classification";
import PuzzleInfo from "../Puzzle/PuzzleInfo";
import { PuzzleContext } from "../../context/PuzzleContext";
import Navigation from "./Navigation";
import History from "../Puzzle/PuzzleHistory";
import EngineDepthControl from "./EngineDepthControl";

interface ControlPanelProps {
  history: Record<number, string | null>;
  puzzleIndex: number;
  unhighlightLegalMoves: () => void;
  setClassification: React.Dispatch<React.SetStateAction<Classification | null>>;
  setIsPuzzleSolved: Dispatch<SetStateAction<boolean | null>>;
  feedback: { best: string | null; played: string | null };
  classification: Classification | null;
}

const PuzzleControlPanel: React.FC<ControlPanelProps> = ({
  setClassification,
  unhighlightLegalMoves,
  setIsPuzzleSolved,
  feedback,
  classification,
  puzzleIndex,
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
      <EngineDepthControl />

      {isDataAvailable && (
        <div className="flex flex-col items-center gap-5 w-full m-5">
          <GameInfo />

          <PuzzleInfo
            puzzle={puzzle}
            feedback={feedback}
            classification={classification}
          />

          <History
            history={history}
            puzzleIndex={puzzleIndex}
          />

          <Navigation resetBoard={resetBoard} />
        </div>
      )}
    </div>
  );
};
export default PuzzleControlPanel;
