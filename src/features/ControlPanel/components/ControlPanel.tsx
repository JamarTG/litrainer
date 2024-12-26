import React from "react";
import { Chess } from "chess.js";
import GameInfo from "./GameInfo";
import { Puzzle } from "../../../types/puzzle";
import { Classification } from "../../../types/move";
import GameResultMessage from "./GameResultMessage";
import GameStatus from "./GameStatus";

interface ControlPanelProps {
  puzzle: Puzzle | null;
  moveToNextPuzzle: () => void;
  moveToPreviousPuzzle: () => void;
  setMoveClassification: React.Dispatch<
    React.SetStateAction<"" | Classification>
  >;
  unhighlightSquares: () => void;
  sessionStarted: boolean;
  game: Chess;
}

const PuzzleControlPanel: React.FC<ControlPanelProps> = ({
  puzzle,
  moveToNextPuzzle,
  moveToPreviousPuzzle,
  setMoveClassification,
  unhighlightSquares,
}) => {
  const isDataAvailable = puzzle !== null;

  const resetBoardForNewPuzzle = (moveToNextorPrevPuzzle: () => void) => {
    moveToNextorPrevPuzzle();
    unhighlightSquares();
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

          <div className="flex flex-row">
            <div className="flex gap-2 w-full">
              <img
                src={`/images/marker/${puzzle.evaluation.judgment?.name}.svg`}
                alt={puzzle.evaluation.judgment?.name}
                width={40}
              />
              <p className="text-lg flex flex-col">
                <p>{puzzle.userMove.san} was played here.</p>

                <small>Find a better move</small>
              </p>
            </div>

            <div className="flex flex-row">
              <button onClick={() => resetBoardForNewPuzzle(moveToPreviousPuzzle)}>
                <span className="icon text-2xl hover:text-blue-500 ">
                  &#xe037;
                </span>
              </button>

              <button onClick={() => resetBoardForNewPuzzle(moveToNextPuzzle)}>
                <span className="icon text-2xl hover:text-blue-500">
                  &#xe036;
                </span>
              </button>
            </div>
          </div>

          <div className="mt-2  text-white rounded-md text-md flex  gap-2">
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
