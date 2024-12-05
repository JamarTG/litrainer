import {
  faChessKing,
  faChessQueen,
  faChessRook,
  faCircleCheck,
  faCircleXmark,
  faExternalLinkAlt,
  faFlagCheckered,
  faSquareCaretLeft,
  faSquareCaretRight,
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
            <div className="flex items-center space-x-2 w-1/3">
              <FontAwesomeIcon
                icon={faChessKing}
                className="text-white text-2xl mb-2"
              />
              <p>
                {puzzleIndex.x + 1} / {puzzles.length}{" "}
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
              <FontAwesomeIcon
                icon={faChessKing}
                className="text-white text-4xl"
              />
              <div>
                <p className="text-md font-semibold">
                  {currentPuzzle?.players.white.user}
                </p>
                <p className="text-sm text-gray-400">
                  {currentPuzzle?.players.white.rating}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-lg">
              <FontAwesomeIcon
                icon={faChessQueen}
                className="text-black text-4xl"
              />
              <div>
                <p className="text-md font-semibold">
                  {currentPuzzle?.players.black.user}
                </p>
                <p className="text-sm text-gray-400">
                  {currentPuzzle?.players.black.rating}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            {sessionStarted ? (
              <div className="bg-gray-700 rounded-lg flex space-x-2 p-2">
                <button
                  className="hover:text-gray-400 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={moveToPreviousPuzzle}
                >
                  <FontAwesomeIcon
                    icon={faSquareCaretLeft}
                    className="text-4xl"
                  />
                </button>
                <button
                  className="hover:text-gray-400 text-white font-bold py-2 px-4 rounded-full"
                  onClick={moveToNextPuzzle}
                >
                  <FontAwesomeIcon
                    icon={faSquareCaretRight}
                    className="text-4xl"
                  />
                </button>
              </div>
            ) : (
              <div className="bg-gray-700 rounded-lg flex p-2">
                <button
                  className="hover:text-gray-400 text-white font-bold py-2 px-4 rounded-full"
                  onClick={moveToNextPuzzle}
                >
                  <FontAwesomeIcon
                    icon={faFlagCheckered}
                    className="text-4xl"
                  />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center mt-4">
            <FontAwesomeIcon
              icon={faChessRook}
              className="text-white text-2xl mb-2"
            />
            <br />
            <div className="grid grid-cols-5 gap-2">
              {puzzles.map((_, index) => (
                <div key={index} className="flex items-center">
                  <FontAwesomeIcon
                    icon={index % 2 === 0 ? faCircleCheck : faCircleXmark}
                    className={`mr-2 ${
                      index % 2 === 0 ? "text-green-500" : "text-red-500"
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
