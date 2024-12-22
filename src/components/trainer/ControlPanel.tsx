import React from "react";
import SkeletonControlPanel from "../skeletons/SkeletonControlPanel";
import { Chess } from "chess.js";
import PlayerInfo from "./PlayerInfo";
import GameInfo from "./GameInfo";
import { Puzzle } from "../../types/puzzle";

interface ControlPanelProps {
  currentPuzzle: Puzzle | null;
  moveToNextPuzzle: () => void;
  moveToPreviousPuzzle: () => void;
  sessionStarted: boolean;
  game: Chess;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  currentPuzzle,
  moveToNextPuzzle,
  moveToPreviousPuzzle,
}) => {

  
  const isDataAvailable = currentPuzzle !== null;


  return (
    <div className="ml-4 flex gap-5  px-4 rounded-md">
      {isDataAvailable ? (
        <div className="flex flex-col rounded-lg flex-grow">
          
          <GameInfo
            gameId={currentPuzzle.gameId}
            timeControl={currentPuzzle.timeControl}
            clock={currentPuzzle.clock}
            rated={currentPuzzle.rated}
          />

          <div className="flex">
            <div className="flex flex-col w-full">
              <PlayerInfo player={currentPuzzle.players.white} color={"w"} />
              <PlayerInfo player={currentPuzzle.players.black} color={"b"} />
            </div>

            <div className="flex flex-row">
              <button onClick={moveToPreviousPuzzle}>
                <span className="icon text-2xl hover:text-blue-500 ">
                  &#xe037;
                </span>
              </button>

              <button onClick={moveToNextPuzzle}>
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

export default ControlPanel;
