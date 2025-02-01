import GameLink from "./GameLink";
import GameSpeedIcon from "./GameSpeedIcon";
import { Puzzle } from "../../types/puzzle";
import { convertTimeToString } from "../../utils/time";
import { GAME_PHASE_ICON } from "../../constants/phase";

interface GameInfoProps {
  puzzle: Puzzle;
}

const GameInfo: React.FC<GameInfoProps> = ({ puzzle }) => {
  return (
    <div className="w-96 rounded-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <GameSpeedIcon speed={puzzle.timeControl} />
          <div className="flex flex-col">
            <p className="capitalize font-medium">{puzzle.timeControl}</p>
            <p className="text-sm text-gray-500">
              {puzzle.rated ? "Rated" : "Casual"} •{" "}
              {puzzle.clock
                ? `${convertTimeToString(
                    puzzle.clock.initial
                  )}+${convertTimeToString(puzzle.clock.increment)}`
                : "Unlimited"}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-start gap-2 mb-2">
          <GameLink gameId={puzzle.gameId} moveNo={puzzle.moveNumber} />
        </div>
      </div>

      <div className="flex justify-center items-center text-gray-500">
        <p>Checkmate • White won by Resignation</p>
      </div>

      <hr className="border-gray-400 m-2" />

      <p
        className="text-blue-500 p-1 truncate cursor-pointer"
        title={`${puzzle.opening.eco} ${puzzle.opening.name}`}
      >
        {puzzle.opening.eco} {puzzle.opening.name}
      </p>
    </div>
  );
};

export default GameInfo;
