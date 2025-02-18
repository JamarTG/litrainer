import GameSpeedIcon from "./GameSpeedIcon";
import { convertTimeToString } from "../../utils/time";
import { GameType } from "../../types/form";

interface GameSpeedProps {
  timeControl: GameType;
  rated: boolean;
  clock?: { initial: number; increment: number };
}

const GameSpeed: React.FC<GameSpeedProps> = ({ timeControl, rated, clock }) => {
  return (
    <div className="flex items-center gap-3">
      <GameSpeedIcon speed={timeControl} />
      <div className="flex flex-col">
        <p className="capitalize font-medium">{timeControl}</p>
        <p className="text-sm text-gray-500">
          {rated ? "Rated" : "Casual"} •{" "}
          {clock
            ? `${convertTimeToString(clock.initial)}+${convertTimeToString(clock.increment)}`
            : "Unlimited"}
        </p>
      </div>
    </div>
  );
};

export default GameSpeed;
