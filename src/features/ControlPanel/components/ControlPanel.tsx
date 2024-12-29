import React from "react";
import { Chess } from "chess.js";
import GameInfo from "./GameInfo";
import { Puzzle } from "../../../types/puzzle";
import { Classification } from "../../../types/move";
import GameResultMessage from "./GameResultMessage";
import GameStatus from "./GameStatus";
import IconButton from "../../../components/IconButton";
import PuzzleInfo from "./PuzzleInfo";
import AnalysisSource from "./AnalysisSource";
import { Source } from "../../../types/eval";

interface ControlPanelProps {
  nextPuzzle: () => void;
  prevPuzzle: () => void;
  unhighlightLegalMoves: () => void;
  setClassification: React.Dispatch<React.SetStateAction<"" | Classification>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
  sessionStarted: boolean;
  playAllMovesInVariation : () => void;
  puzzle: Puzzle | null;
  game: Chess;
  source: Source;
}

const PuzzleControlPanel: React.FC<ControlPanelProps> = ({
  puzzle,
  nextPuzzle,
  prevPuzzle,
  setClassification,
  unhighlightLegalMoves,
  playAllMovesInVariation,
  setSolved,
  source,
}) => {
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
          <AnalysisSource source={source} />

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
            <GameResultMessage puzzle={puzzle} />
          </div>

            <div className="flex gap-3 mt-5">
                <button onClick={playAllMovesInVariation} className="bg-green-500 hover:bg-green-700 active:bg-green-900 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95">
                Play Variation
                </button>
                <button className="bg-green-500 hover:bg-green-700 active:bg-green-900 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95">
                Best Move
                </button>
            
            </div>
        </div>

      )}
    </div>
  );
};

export default PuzzleControlPanel;
