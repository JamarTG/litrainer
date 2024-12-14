import React from "react";
import SkeletonControlPanel from "../skeletons/SkeletonControlPanel";
import { Chess } from "chess.js";
import PlayerInfo from "./PlayerInfo";
import GameInfo from "./GameInfo";
import { Game } from "../../types/game";

interface ControlPanelProps {
  currentPuzzle: Game.Info | null;
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
        <div className="flex flex-col rounded-lg shadow-lg flex-grow">
          
          <GameInfo
            clock={currentPuzzle.clock}
            rated={currentPuzzle.rated}
            gameId={currentPuzzle.game_id}
            perf={currentPuzzle.perf}
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
