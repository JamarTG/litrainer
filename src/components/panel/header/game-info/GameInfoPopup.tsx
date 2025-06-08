import { Dispatch, SetStateAction } from "react";
import GameSpeedIcon from "../../../shared/GameSpeedIcon";
import { ICON_SIZES } from "@/constants/ui";
import { useSelector } from "react-redux";

import { getPuzzle } from "@/redux/slices/puzzle";

interface GameInfoPopupProps {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}

const GameInfoPopup: React.FC<GameInfoPopupProps> = ({ showPopup, setShowPopup }) => {
  const puzzle = useSelector(getPuzzle);

  const { phase, timeControl, rated, status, winner, players, gameId, moveNumber, positionOpening } = puzzle;

  const ratedLabel = rated ? "Rated" : "Casual";
  const phaseLabel = phase;
  const timeLabel = timeControl;

  if (!showPopup) return null;

  return (
    <div className="absolute left-1/2 top-full mt-2 z-20 transform -translate-x-1/2 min-w-[300px] max-w-sm w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-lg p-4">
      <div className="flex flex-col gap-4 text-sm text-gray-800 dark:text-gray-200">
        <div className="flex flex-col w-2/3 items-start gap-2">
          <div className="flex items-center gap-2">
            <img
              src={`/phases/${phase}.svg`}
              alt={`${phase} icon`}
              title={`Position taken from ${phase}`}
              className="w-6 h-6 rounded-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 p-0.5"
            />
            <span className="text-xs tracking-wide">
              {phaseLabel[0].toLocaleUpperCase() + phaseLabel.slice(1) + " Position"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg">
              <GameSpeedIcon speed={puzzle.timeControl} size={ICON_SIZES.MEDIUM} />
            </span>
            <span>{ratedLabel}</span>
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{timeLabel}</span>
          </div>
        </div>

        <div className="text-xs">
          <p className="font-medium text-zinc-700 dark:text-zinc-300">
            {status === "draw"
              ? "Game ended in a draw"
              : winner
                ? `Winner: ${winner === "white" ? players.white.user.name : players.black.user.name}`
                : "Game ongoing"}
          </p>
          <p className="text-zinc-500 dark:text-zinc-400">
            White: {players.white.user.name} — Black: {players.black.user.name}
          </p>
        </div>

        <hr className="border-t dark:border-zinc-700" />

        <div className="flex flex-col gap-2">
          <a
            href={`https://lichess.org/${gameId}#${moveNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline text-xs"
          >
            View Full Game ↗
          </a>

          {positionOpening && (
            <p className="text-xs">
              <span className="font-semibold">Opening:</span> {positionOpening.name}{" "}
            </p>
          )}
        </div>

        <button
          onClick={() => setShowPopup(false)}
          className="self-end mt-2 text-xs font-medium text-blue-600 hover:text-blue-500 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GameInfoPopup;
