import React, { Dispatch, SetStateAction, useContext } from "react";
import GameInfo from "./GameInfo";
import { Classification } from "../../../types/move";
import GameResultMessage from "./GameResultMessage";
import GameStatus from "./GameStatus";
import IconButton from "../../../components/IconButton";
import PuzzleInfo from "./PuzzleInfo";
import { PuzzleContext } from "../../../context/Puzzle/PuzzleContext";

interface ControlPanelProps {
  nextPuzzle: () => void;
  prevPuzzle: () => void;
  unhighlightLegalMoves: () => void;
  setClassification: React.Dispatch<React.SetStateAction<"" | Classification>>;
  setSolved: Dispatch<SetStateAction<boolean | null>>;
}

const PuzzleControlPanel: React.FC<ControlPanelProps> = ({
  nextPuzzle,
  prevPuzzle,
  setClassification,
  unhighlightLegalMoves,
  setSolved,
}) => {
  const { puzzle } = useContext(PuzzleContext);
  const isDataAvailable = puzzle !== null;

  const resetBoard = (changePuzzle: () => void) => {
    setSolved(false);
    changePuzzle();
    unhighlightLegalMoves();
    setClassification("");
  };

  return (
    <div className="ml-4 flex gap-5  px-4 rounded-md">
      {isDataAvailable && (
        <div className="flex flex-col rounded-lg flex-grow">
          <GameInfo puzzle={puzzle} />
          <div className="flex flex-row">
            <PuzzleInfo puzzle={puzzle} />
            <div className="flex flex-row">
              <IconButton
                onClick={() => resetBoard(prevPuzzle)}
                icon="&#xe037;"
              />
              <IconButton
                onClick={() => resetBoard(nextPuzzle)}
                icon="&#xe036;"
              />
            </div>
          </div>
          <div className="mt-2  text-white rounded-md text-md flex gap-2">
            <GameStatus puzzle={puzzle} />
            <GameResultMessage />
          </div>
        </div>
      )}
    </div>
  );
};

export default PuzzleControlPanel;
