import { useRef, useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { formatTimeControl } from "../../../lib/lichess/time";
import { SiLichess } from "react-icons/si";
import { IoBookOutline } from "react-icons/io5";
import SubmitButtonWithModal from "../../trainerForm/SubmitButtonWithModal";

const GameInfo = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const puzzle = useSelector((state: RootState) => state.puzzle.puzzles[state.puzzle.currentIndex]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  if (!puzzle) {
    return <SubmitButtonWithModal>"Click here to get puzzles"</SubmitButtonWithModal>;
  }

  return (
    <div
      className="mb-2 flex items-center relative h-full"
      ref={dropdownRef}
    >
      <button
        type="button"
        className="flex items-center focus:outline-none"
        onClick={() => setShowDropdown((v) => !v)}
        aria-haspopup="true"
        aria-expanded={showDropdown}
      >
        <FaInfoCircle
          className="text-blue-500"
          title="Game Info"
        />
        <span className="ml-1 text-xs">Game Info</span>
      </button>

      {showDropdown && (
        <div className="absolute left-0 top-full mt-2 z-10 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-700 rounded shadow-lg p-3 min-w-[180px] text-left">
          {/* <div className="font-bold mb-1">Game Info</div> */}
          <div className="text-xs text-gray-700 dark:text-gray-200 space-y-2">
            <div>
              <div className="flex justify-start items-center gap-2">
                <a
                  href={`https://lichess.org/${puzzle.gameId}#${puzzle.moveNumber}`}
                  className="flex justify-center items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View game on Lichess"
                >
                  <SiLichess size={20} />
                </a>
                <a
                  href={`https://lichess.org/opening/${puzzle.opening.eco}`}
                  className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Explore ${puzzle.opening.name}`}
                >
                  <IoBookOutline size={20}/>
                </a>
              </div>

              <a
                href={`https://lichess.org/${puzzle.gameId}#${puzzle.moveNumber}`}
                className="flex justfiy-center items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition flex items-center"
                target="_blank"
                rel="noopener noreferrer"
                title="Explore Opening"
              >
                <span className="text-base"></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  width="1em"
                  height="1em"
                ></svg>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded text-white text-[11px] ${puzzle.rated ? "bg-green-600" : "bg-gray-500"}`}
                title={puzzle.rated ? "Rated game" : "Unrated game"}
              >
                {puzzle.rated ? "Rated" : "Unrated"}
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[11px]">
                {formatTimeControl(puzzle.clock.initial, puzzle.clock.increment)}
              </span>
              {puzzle.timeControl && (
                <span className="px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-[11px]">
                  {puzzle.timeControl}
                </span>
              )}
            </div>
            
          </div>
          <button
            className="mt-2 text-xs text-blue-500 hover:text-blue-400"
            onClick={() => setShowDropdown(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default GameInfo;
