import { Dispatch, SetStateAction, useContext } from "react";
import GameInfo from "./GameInfo";
import { Classification } from "../../types/move";
import IconButton from "../UI/Buttons/IconButton";
import PuzzleInfo from "./PuzzleInfo";
import { PuzzleContext } from "../../context/PuzzleContext";

interface ControlPanelProps {
  nextPuzzle: () => void;
  prevPuzzle: () => void;
  unhighlightLegalMoves: () => void;
  setClassification: React.Dispatch<React.SetStateAction<"" | Classification>>;
  setIsPuzzleSolved: Dispatch<SetStateAction<boolean | null>>;
}

const PuzzleControlPanel: React.FC<ControlPanelProps> = ({
  nextPuzzle,
  prevPuzzle,
  setClassification,
  unhighlightLegalMoves,
  setIsPuzzleSolved,
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
          <div className="flex mt-4">
            <PuzzleInfo puzzle={puzzle} />
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
          </div>
        </>
      )}
    </div>
  );
  
};

export default PuzzleControlPanel;
