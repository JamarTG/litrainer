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

interface ControlPanelProps {
  moveToNextPuzzle: () => void;
  moveToPreviousPuzzle: () => void;
  unhighlightLegalMoves: () => void;
  setMoveClassification: React.Dispatch<
    React.SetStateAction<"" | Classification>
  >;
  setIsPuzzleSolved: React.Dispatch<React.SetStateAction<boolean>>;
  sessionStarted: boolean;
  puzzle: Puzzle | null;
  game: Chess;
  source: "LichessApi" | "Stockfish" | "Local" | null;
}

const PuzzleControlPanel: React.FC<ControlPanelProps> = ({
  puzzle,
  moveToNextPuzzle,
  moveToPreviousPuzzle,
  setMoveClassification,
  unhighlightLegalMoves,
  setIsPuzzleSolved,
  source,
}) => {
  const isDataAvailable = puzzle !== null;

  const resetBoardForNewPuzzle = (moveToNextorPrevPuzzle: () => void) => {
    setIsPuzzleSolved(false);
    moveToNextorPrevPuzzle();
    unhighlightLegalMoves();
    setMoveClassification("");
  };

  return (
    <div className="ml-4 flex gap-5  px-4 rounded-md">
      {isDataAvailable && (
        <div className="flex flex-col rounded-lg flex-grow">
          <GameInfo
            gameId={puzzle.gameId}
            timeControl={puzzle.timeControl}
            clock={puzzle.clock}
            rated={puzzle.rated}
          />

          <AnalysisSource source={source} />

          <div className="flex flex-row">
            <PuzzleInfo
              evaluation={puzzle.evaluation}
              userMove={puzzle.userMove}
            />
            <div className="flex flex-row">
              <IconButton
                onClick={() => resetBoardForNewPuzzle(moveToPreviousPuzzle)}
                icon="&#xe037;"
              />
              <IconButton
                onClick={() => resetBoardForNewPuzzle(moveToNextPuzzle)}
                icon="&#xe036;"
              />
            </div>
          </div>

          <div className="mt-2  text-white rounded-md text-md flex gap-2">
            <GameStatus status={puzzle.status} winner={puzzle.winner ?? null} />
            <GameResultMessage
              status={puzzle.status}
              winner={puzzle.winner}
              players={puzzle.players}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PuzzleControlPanel;
