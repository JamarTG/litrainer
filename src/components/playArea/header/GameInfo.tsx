import { useRef, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { formatTimeControl } from "../../../utils/chess/time";
import { SiLichess } from "react-icons/si";
import { IoBookOutline } from "react-icons/io5";
import SubmitButtonWithModal from "../../trainerForm/SubmitButtonWithModal";
import useClickOutside from "../../../hooks/useClickOutside";
import { getGameStatusDescription } from "../../../utils/chess/status";
import GameSpeedIcon from "../../game/GameSpeedIcon";

const GameInfo = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const puzzle = useSelector((state: RootState) => state.puzzle.puzzles[state.puzzle.currentIndex]);

  useClickOutside(dropdownRef, setShowDropdown, showDropdown);

  if (!puzzle) {
    return <SubmitButtonWithModal />;
  }

  return (
    <div
      className="h-full flex justify-center items-center"
      ref={dropdownRef}
    >
      <button
        type="button"
        className="inline-flex gap-1 items-center focus:outline-none"
        onClick={() => setShowDropdown((v) => !v)}
        aria-haspopup="true"
        aria-expanded={showDropdown}
        title="Get Additional Game Info"
      >
        <FaInfoCircle className="text-2xl" />
      </button>

      {showDropdown && (
        <div className="absolute left-1/2 top-full mt-1 z-10 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-700 rounded shadow-lg p-3 min-w-[280px] text-left transform -translate-x-1/2">
          <div className="flex flex-col gap-2">
            <div className="text-xs text-gray-700 dark:text-gray-200 space-y-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs">
                    <img src={`/gamePhases/${puzzle.phase}.svg`} className="w-6 h-6 rounded-full" alt={puzzle.phase} title={`Position taken from ${puzzle.phase}`} />
                  </span>
                  <GameSpeedIcon
                    size="text-2xl"
                    speed={"bullet"}
                  />
                  <span>{puzzle.rated ? "Rated" : "Casual"}</span>
                  <span>{formatTimeControl(puzzle.clock.initial, puzzle.clock.increment)}</span>
                </div>

                <p className="text-md mb-5 text-gray-400">
                  {getGameStatusDescription(puzzle.status, puzzle.winner === "white" ? puzzle.players.white : puzzle.players.black)}
                </p>
              </div>

              <div className="flex-col flex justify-center items-start gap-2">
                <a
                  href={`https://lichess.org/${puzzle.gameId}#${puzzle.moveNumber}`}
                  className="inline-flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition mr-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View game on Lichess"
                >
                  <SiLichess size={20} />
                  <span>View Game on Lichess.org</span>
                </a>
                {puzzle.positionOpening ? (
                  <a
                    href={`https://lichess.org/opening/${puzzle.positionOpening.eco}`}
                    className="inline-flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Explore ${puzzle.positionOpening.name}`}
                  >
                    <IoBookOutline size={20} />
                    <span>Practice This Opening</span>
                  </a>
                ) : null}
              </div>
            </div>
            <button
              className="mt-2 text-xs text-blue-500 hover:text-blue-400"
              onClick={() => setShowDropdown(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameInfo;
