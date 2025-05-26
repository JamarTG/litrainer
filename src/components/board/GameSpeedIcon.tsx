import { GameType } from "../../types/form";
import { TimeControlIcons } from "../../constants/icons";
import { FC } from "react";

interface GameSpeedIconProps {
  speed: GameType;
  size: "text-xs" | "text-sm" | "text-base" | "text-lg" | "text-xl" | "text-2xl" | "text-3xl" | "text-4xl";
}

const GameSpeedIcon: FC<GameSpeedIconProps> = ({ speed , size }) => {
  return (
    <div className="my-auto">
      <span className={`icon ${size}`}>{TimeControlIcons[speed]}</span>
    </div>
  );
};

export default GameSpeedIcon;
