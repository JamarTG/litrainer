import React from "react";
import GameLink from "./GameLink";
import TimeControl from "./TimeControl";
import RatedOrCasual from "./RatedOrCasual";
import TimeControlIcon from "./TimeControlIcon";

interface GameInfoProps {
  gameId: string;
  clock: {
    initial: number;
    increment: number;
  };
  rated: boolean;
  timeControl: string;
}

const GameInfo: React.FC<GameInfoProps> = ({
  gameId,
  clock,
  rated,
  timeControl,
}) => {
  return (
    <div className="flex items-center space-x-4 mb-10">
      <div className="flex justify-center items-center gap-1 text-bold ">
        <TimeControlIcon timeControl={timeControl} />
        <RatedOrCasual rated={rated} />
        <TimeControl timeControl={timeControl} clock={clock}/>
      </div>
      <GameLink gameId={gameId} />
    </div>
  );
};

export default GameInfo;
