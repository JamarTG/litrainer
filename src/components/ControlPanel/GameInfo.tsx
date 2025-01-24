import GameLink from "./GameLink";
import TimeControl from "./TimeControl";
import RatedOrCasual from "./RatedOrCasual";
import { Puzzle } from "../../types/puzzle";
import GameSpeedIcon from "./GameSpeedIcon";

interface GameInfoProps {
  puzzle: Puzzle;
}

const GameInfo: React.FC<GameInfoProps> = ({ puzzle }) => {
  return (
    <div className="text-md flex justify-between items-center">
      <div className="flex gap-5 items-center">
      <div className="mr-4">
        <GameSpeedIcon speed={puzzle.timeControl} />
      </div>
      <RatedOrCasual rated={puzzle.rated} />
      <TimeControl timeControl={puzzle.timeControl} clock={puzzle.clock} />
      </div>
      <GameLink gameId={puzzle.gameId} moveNo={puzzle.moveNumber} />
    </div>
  );
};

export default GameInfo;
