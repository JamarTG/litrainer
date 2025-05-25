import { GameType } from "../../types/form";
import { timeControlIcons } from "../../constants/game";
import { FC } from "react";

interface GameSpeedIconProps {
  speed: GameType;
  size: "text-xs" | "text-sm" | "text-base" | "text-lg" | "text-xl" | "text-2xl";
}

const GameSpeedIcon: FC<GameSpeedIconProps> = ({ speed , size }) => {
  return (
    <div className="my-auto">
      <span className={`icon ${size}`}>{timeControlIcons[speed]}</span>
    </div>
  );
};

export default GameSpeedIcon;
