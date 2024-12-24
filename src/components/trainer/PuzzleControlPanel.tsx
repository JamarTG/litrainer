import React from "react";
import SkeletonControlPanel from "../skeletons/SkeletonControlPanel";
import { Chess } from "chess.js";
import PlayerInfo from "./PlayerInfo";
import GameInfo from "./GameInfo";
import { Puzzle } from "../../types/puzzle";
import { Classification } from "../../types/move";

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
      {isDataAvailable ? (
        <div className="flex flex-col rounded-lg flex-grow">
          <GameInfo
            gameId={puzzle.gameId}
            timeControl={puzzle.timeControl}
            clock={puzzle.clock}
            rated={puzzle.rated}
          />

          <div className="flex">
            <div className="flex flex-col w-full">
              <PlayerInfo player={puzzle.players.white} color={"w"} />
              <PlayerInfo player={puzzle.players.black} color={"b"} />
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
        </div>
      ) : (
        <SkeletonControlPanel />
      )}
    </div>
  );
};

export default PuzzleControlPanel;
