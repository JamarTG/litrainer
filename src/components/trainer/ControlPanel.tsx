import {
  faBackward,
  faForward,
  faCircleCheck,
  faCircleXmark,
  faExternalLinkAlt,
  faFlagCheckered,
  faCircle,
  faChessBoard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Models } from "../../typings";
import SkeletonControlPanel from "../ui/SkeletonControlPanel";

interface ControlPanelProps {
  puzzles: Models.Move.Info[][];
  puzzleIndex: Models.Move.Index;
  currentPuzzle: Models.Move.Info | null;
  moveToNextPuzzle: () => void;
  moveToPreviousPuzzle: () => void;
  sessionStarted: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  puzzles,
  puzzleIndex,
  currentPuzzle,
  moveToNextPuzzle,
  moveToPreviousPuzzle,
  sessionStarted,
}) => {
  const isDataAvailable = currentPuzzle !== null;
  return (
    <div>
      {isDataAvailable ? (
        <div className="ml-4 flex flex-col space-y-6 p-6 bg-gray-800 rounded-lg shadow-lg w-80 flex-grow">
          <div className="flex items-center mb-4 gap-2">
            <div className="flex items-center justify-center space-x-2 w-1/3">
              <FontAwesomeIcon
                icon={faChessBoard}
                className="text-white text-xl "
              />
              <p>
                {sessionStarted ? puzzleIndex.x + 1 : 0} / {puzzles.length}{" "}
              </p>
            </div>
            <div className="flex items-center space-x-2 w-1/3">
              <a
                className="text-blue-300 flex items-center"
                target="_blank"
                href={`https://lichess.org/${currentPuzzle?.game_id}`}
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
                {currentPuzzle?.game_id}
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center mb-4 space-y-4">
            <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-lg">
              <div className="flex flex-col space-y-2">
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon
                icon={faCircle}
                className="text-white text-sm"
                />
                <p className="text-sm">
                {currentPuzzle?.players.white.user} (
                {currentPuzzle?.players.white.rating})
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon
                icon={faCircle}
                className="text-black text-sm"
                />
                <p className="text-sm">
                {currentPuzzle?.players.black.user} (
                {currentPuzzle?.players.black.rating})
                </p>
              </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            {sessionStarted ? (
              <div className="rounded-lg flex space-x-2 p-2">
                <button
                  className="hover:text-gray-400 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={moveToPreviousPuzzle}
                >
                  <FontAwesomeIcon icon={faBackward} className="text-4xl" />
                </button>
                <button
                  className="hover:text-gray-400 text-white font-bold py-2 px-4 rounded-full"
                  onClick={moveToNextPuzzle}
                >
                  <FontAwesomeIcon icon={faForward} className="text-4xl" />
                </button>
              </div>
            ) : (
              <div className="rounded-lg flex p-2">
                <button
                  className="hover:text-gray-400 text-white font-bold py-2 px-4 rounded-full"
                  onClick={moveToNextPuzzle}
                >
                  <FontAwesomeIcon
                    icon={faFlagCheckered}
                    className="text-6xl"
                  />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center mt-4">
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
        </div>
      ) : (
        <SkeletonControlPanel />
      )}
    </div>
  );
};

export default ControlPanel;
