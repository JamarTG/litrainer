import React from "react";
import { Chess } from "chess.js";
import PlayerInfo from "./PlayerInfo";
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
  sessionStarted: boolean;
  game: Chess;
}

const PuzzleControlPanel: React.FC<ControlPanelProps> = ({
  puzzle,
  moveToNextPuzzle,
  moveToPreviousPuzzle,
  setMoveClassification,
}) => {
  const isDataAvailable = puzzle !== null;

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
            <div className="flex flex-col w-full">
              
            </div>

            <div className="flex flex-row">
              <button
                onClick={() => {
                  moveToPreviousPuzzle();
                  setMoveClassification("");
                }}
              >
                <span className="icon text-2xl hover:text-blue-500 ">
                  &#xe037;
                </span>
              </button>

              <button
                onClick={() => {
                  moveToNextPuzzle();
                  setMoveClassification("");
                }}
              >
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
