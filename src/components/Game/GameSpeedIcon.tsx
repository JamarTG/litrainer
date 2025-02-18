import React from "react";
import { GameType } from "../../types/form";
import { timeControlIcons } from "../../constants/tc";

interface GameSpeedIconProps {
  speed: GameType;
}

const GameSpeedIcon: React.FC<GameSpeedIconProps> = ({ speed }) => {
  return (
    <div className="my-auto">
      <span className="icon text-4xl">{timeControlIcons[speed]}</span>
    </div>
  );
};

export default GameSpeedIcon;
