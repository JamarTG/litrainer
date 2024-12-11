import React, { useState } from "react";
import { faLightbulb, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Models } from "../../typings";
import SkeletonControlPanel from "../skeletons/SkeletonControlPanel";
import { Chess } from "chess.js";
import PlayerInfo from "./PlayerInfo";
import GameInfo from "./GameInfo";
import ToggleButton from "../ui/ToggleButton";

interface ControlPanelProps {
  currentPuzzle: Models.Move.Info | null;
  moveToNextPuzzle: () => void;
  moveToPreviousPuzzle: () => void;
  sessionStarted: boolean;
  game: Chess;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  currentPuzzle,
  moveToNextPuzzle,
  moveToPreviousPuzzle,
  game,
}) => {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

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
              {/* <div className="flex">
                <ToggleButton
                  isToggled={showHint}
                  onToggle={() => setShowHint(!showHint)}
                  OffIcon={
                    <FontAwesomeIcon
                      className="hover:text-yellow-300 text-3xl"
                      icon={faLightbulb}
                    />
                  }
                  bestMove={currentPuzzle.evaluation.best}
                  game={game}
                  type="Hint"
                />

                <ToggleButton
                  isToggled={showSolution}
                  onToggle={() => setShowSolution(!showSolution)}
                  OffIcon={
                    <FontAwesomeIcon
                      className="hover:text-green-600 text-3xl"
                      icon={faCheck}
                    />
                  }
                  bestMove={currentPuzzle.evaluation.best!}
                  game={game}
                  type="Solution"
                />
              </div> */}
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
