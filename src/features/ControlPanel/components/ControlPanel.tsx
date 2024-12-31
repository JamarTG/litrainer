import React, { Dispatch, SetStateAction } from "react";
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
  sessionStarted: boolean;
  playAllMovesInVariation: () => void;
  puzzle: Puzzle | null;
  game: Chess;
  solved: boolean | null;
  setSolved : Dispatch<SetStateAction<boolean | null>>;
  source: Source;
  hasPlayedVariation: boolean,
  setHasPlayedVariation: Dispatch<SetStateAction<boolean>>;
}

const PuzzleControlPanel: React.FC<ControlPanelProps> = ({
  puzzle,
  nextPuzzle,
  prevPuzzle,
  setClassification,
  unhighlightLegalMoves,
  playAllMovesInVariation,
  setSolved,
  solved,
  source,
  hasPlayedVariation,
  setHasPlayedVariation,
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
            <GameResultMessage />
          </div>
         
          {solved && !hasPlayedVariation && (
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => {
                  playAllMovesInVariation()
                  setHasPlayedVariation(true)
                }}
                className="bg-gray-500 hover:bg-gray-700 active:bg-gray-900 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out transform "
              >
                Play Variation
              </button>
              
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PuzzleControlPanel;
