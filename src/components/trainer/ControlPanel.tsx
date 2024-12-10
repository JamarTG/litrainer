import React, { useState } from "react";
import {
  faLightbulb,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Models } from "../../typings";
import SkeletonControlPanel from "../skeletons/SkeletonControlPanel";
import { Chess} from "chess.js";
import PlayerInfo from "./PlayerInfo";
import GameInfo from "./GameInfo";
import ToggleButton from "../ui/ToggleButton";


interface ControlPanelProps {
  currentPuzzle: Models.Move.Info | null;
  moveToNextPuzzle: () => void;
  moveToPreviousPuzzle: () => void;
  sessionStarted: boolean;
  className?: string;
  game: Chess;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  currentPuzzle,
  moveToNextPuzzle,
  moveToPreviousPuzzle,
  game,
  className = "",
}) => {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const isDataAvailable = currentPuzzle !== null;
  const perfIcons: { [key: string]: string } = {
    bullet: "&#xe032;",
    blitz: "&#xe02f;",
    rapid: "&#xe002;",
    correspondence: "&#xe019;",
    classical: "&#xe00a;",
  };

  return (
    <div
      style={{ width: "30rem" }}
      className={`w-full md:w-auto mt-4 md:mt-0 md:ml-4 ${className}`}
    >
      {isDataAvailable ? (
        <div className="flex flex-col space-y-6 p-6 bg-gray-800 rounded-lg shadow-lg w-full flex-grow">
          <div className="flex items-center mb-4">
            <GameInfo
              clock={currentPuzzle.clock}
              rated={currentPuzzle.rated}
              gameId={currentPuzzle.game_id}
            />
            {/* <button
              title="Report Bug"
              className="hidden md:inline whitespace-nowrap text-sm text-white ml-2"
            >
              <FontAwesomeIcon icon={faBug} className="text-2xl text-white" />
            </button> */}
            {/* <span className="hidden md:inline whitespace-nowrap text-sm text-white ml-2 flex items-center">
              <button
                title="Contact Creator"
                className="hidden md:inline whitespace-nowrap text-sm text-white ml-2"
              >
              
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-2xl text-white mr-2"
                />
              </button>
            </span> */}
          </div>
          <div className="flex gap-5 justify-between items-center">
            <div>
              {currentPuzzle && (
                <span
                  className="icon text-5xl hover:text-blue-500"
                  dangerouslySetInnerHTML={{
                    __html: perfIcons[currentPuzzle.perf],
                  }}
                ></span>
              )}
            </div>

            <div className="flex flex-col w-full bg-gray-700 p-2 rounded-md">
              <PlayerInfo player={currentPuzzle.players.white} />
              <PlayerInfo player={currentPuzzle.players.black} />
            </div>
          </div>
          <div className="flex flex-row justify-center space-x-4">
            <button onClick={moveToPreviousPuzzle}>
              <span className="icon text-2xl hover:text-blue-500 ml-1">
                &#xe037;
              </span>
            </button>

            <button onClick={moveToNextPuzzle}>
              <span className="icon text-2xl hover:text-blue-500 ml-1">
                &#xe036;
              </span>
            </button>
            <div className="flex">
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
