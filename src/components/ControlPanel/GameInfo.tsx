import GameLink from "./GameLink";
import TimeControl from "./TimeControl";
import RatedOrCasual from "./RatedOrCasual";
import TimeControlIcon from "./TimeControlIcon";
import { Puzzle } from "../../types/puzzle";

interface GameInfoProps {
  puzzle: Puzzle;
}

const GameInfo: React.FC<GameInfoProps> = ({
  puzzle
}) => {
  return (
    <div className="flex items-center space-x-4 mb-10">
      <div className="flex justify-center items-center gap-1 text-bold ">
        <TimeControlIcon timeControl={puzzle.timeControl} />
        <RatedOrCasual rated={puzzle.rated} />
        <TimeControl timeControl={puzzle.timeControl} clock={puzzle.clock}/>
      
      </div>
      <GameLink gameId={puzzle.gameId} moveNo={puzzle.moveNumber} />
    </div>
  );
};

export default GameInfo;
