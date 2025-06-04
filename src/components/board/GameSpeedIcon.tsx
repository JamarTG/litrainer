import { GameType } from "@/types/form";
import { TimeControlIcons } from "@/constants/icons";
import { FC } from "react";

interface GameSpeedIconProps {
  speed: GameType;
  size: number;
}

const GameSpeedIcon: FC<GameSpeedIconProps> = ({ speed, size }) => {
  return <span style={{ fontSize: size }}>{TimeControlIcons[speed]}</span>;
};

export default GameSpeedIcon;
