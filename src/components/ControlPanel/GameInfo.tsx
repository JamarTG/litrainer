import GameLink from "./GameLink";
import TimeControl from "./TimeControl";
import RatedOrCasual from "./RatedOrCasual";
import TimeControlIcon from "./TimeControlIcon";
import { Puzzle } from "../../types/puzzle";
import TurtleSvg from "../../speed/GameSpeedIcon";
import GameSpeedIcon from "../../speed/GameSpeedIcon";

interface GameInfoProps {
  puzzle: Puzzle;
}

const GameInfo: React.FC<GameInfoProps> = ({ puzzle }) => {
  return (
    <div className="grid grid-cols-2 gap-4 items-center rounded-lg shadow-md">
      <div className="flex">
        {/* <TimeControlIcon timeControl={puzzle.timeControl} /> */}
        <GameSpeedIcon speed={puzzle.timeControl}/>
        <RatedOrCasual rated={puzzle.rated} />
      </div>

      <TimeControl
        timeControl={puzzle.timeControl}
        clock={puzzle.clock}
        // className="col-span-2"
      />
      <GameLink
        gameId={puzzle.gameId}
        moveNo={puzzle.moveNumber}
        // className="col-span-2 text-indigo-600"
      />
    </div>
  );
};

export default GameInfo;
