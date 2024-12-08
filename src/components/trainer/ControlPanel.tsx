import React, { useState } from "react";
import {
  faCircleCheck,
  faCircleXmark,
  faChessKnight,
  faBug,
  faEnvelope,
  faChessBishop,
  faChessRook,
  faChessQueen,
  faChessKing,
  faChessPawn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Models } from "../../typings";
import SkeletonControlPanel from "../ui/SkeletonControlPanel";
import { Chess, Square } from "chess.js";

interface ControlPanelProps {
  puzzles: Models.Move.Info[][];
  puzzleIndex: Models.Move.Index;
  currentPuzzle: Models.Move.Info | null;
  moveToNextPuzzle: () => void;
  moveToPreviousPuzzle: () => void;
  sessionStarted: boolean;
  className?: string;
  game: Chess;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  puzzles,
  puzzleIndex,
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
    classical : "&#xe00a;",
  };
  return (
    <div className={`w-full md:w-auto mt-4 md:mt-0 md:ml-4 ${className}`}>
      {isDataAvailable ? (
        <div className="flex flex-col space-y-6 p-6 bg-gray-800 rounded-lg shadow-lg w-full md:w-80 flex-grow">
          <div className="flex items-center mb-4 gap-2">
            <div className="space-x-2 w-1/3">
              <a
                href={`https://lichess.org/${currentPuzzle.game_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="noto flex justify-content items-center text-blue-500 text-sm flex"
              >
                <span className="icon text-2xl hover:text-blue-500 ml-1">
                  &#xe07a;
                </span>
                {currentPuzzle.rated}
              </a>
            </div>
            
            <button
              title="Report Bug"
              className="hidden md:inline whitespace-nowrap text-sm text-white ml-2"
            >
              <FontAwesomeIcon icon={faBug} className="text-2xl text-white" />
            </button>
            <span className="hidden md:inline whitespace-nowrap text-sm text-white ml-2 flex items-center">
              <button title="Contact Creator" className="hidden md:inline whitespace-nowrap text-sm text-white ml-2">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-2xl text-white mr-2"
                />
              </button>
            </span>
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

            <div className="flex flex-col w-full">
              <span className="noto player-color">
                {currentPuzzle.players.black.user}
              </span>
              <span className="noto player-color">
                {currentPuzzle.players.white.user}
              </span>
            </div>
          </div>

          {/* JumpFirst: "" // e035
JumpLast: "" // e034
JumpNext: "" // e036
JumpPrev: "" // e037 */}
          <div className="flex flex-row space-x-4">
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
          </div>
          <div className="flex flex-col space-y-4">
            <div className="text-white"> Progress </div>
            <div className="grid grid-cols-5 gap-2">
              {puzzles.map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center cursor-pointer hover:scale-105 hover:opacity-80 transition-transform duration-200"
                >
                  <FontAwesomeIcon
                    icon={
                      index <= puzzleIndex.x ? faCircleCheck : faCircleXmark
                    }
                    fill="white"
                    className={`${
                      index <= puzzleIndex.x ? "text-green-500" : "text-red-500"
                    } text-2xl`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => setShowHint(!showHint)}
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700 transition duration-200"
            >
              <span
                className={`transition-opacity duration-500 ${
                  showHint ? "opacity-0" : "opacity-100"
                }`}
              >
                Show Hint
              </span>
              <span
                className={`absolute transition-opacity duration-500 ${
                  showHint ? "opacity-100" : "opacity-0"
                }`}
              >
                {currentPuzzle && currentPuzzle.evaluation.best && (
                  <>
                    {game.get(
                      currentPuzzle.evaluation.best.slice(0, 2) as Square
                    ).type === "n" && <FontAwesomeIcon icon={faChessKnight} />}
                    {game.get(
                      currentPuzzle.evaluation.best.slice(0, 2) as Square
                    ).type === "b" && <FontAwesomeIcon icon={faChessBishop} />}
                    {game.get(
                      currentPuzzle.evaluation.best.slice(0, 2) as Square
                    ).type === "r" && <FontAwesomeIcon icon={faChessRook} />}
                    {game.get(
                      currentPuzzle.evaluation.best.slice(0, 2) as Square
                    ).type === "q" && <FontAwesomeIcon icon={faChessQueen} />}
                    {game.get(
                      currentPuzzle.evaluation.best.slice(0, 2) as Square
                    ).type === "k" && <FontAwesomeIcon icon={faChessKing} />}
                    {game.get(
                      currentPuzzle.evaluation.best.slice(0, 2) as Square
                    ).type === "p" && <FontAwesomeIcon icon={faChessPawn} />}
                  </>
                )}
              </span>
            </button>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
            >
              <span
                className={`transition-opacity duration-500 ${
                  showSolution ? "opacity-0" : "opacity-100"
                }`}
              >
                Show Solution
              </span>
              <span
                className={`absolute transition-opacity duration-500 ${
                  showSolution ? "opacity-100" : "opacity-0"
                }`}
              >
                {currentPuzzle.evaluation.best}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <SkeletonControlPanel />
      )}
    </div>
  );
};

export default ControlPanel;
