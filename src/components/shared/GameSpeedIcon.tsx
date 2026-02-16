
import Icon from "@mdi/react";
import {
  mdiRabbit,
  mdiFire,
  mdiBullet,
  mdiSend,
  mdiTurtle
} from "@mdi/js";
import { GameType } from "@/typing/types";
import { FC } from "react";

interface GameSpeedIconProps {
  speed: GameType;
  size?: number;
}


const TimeControlIcons: Record<GameType, string> = {
  rapid: mdiRabbit,
  blitz: mdiFire,
  bullet: mdiBullet,
  correspondence: mdiSend,
  classical: mdiTurtle
};

const GameSpeedIcon: FC<GameSpeedIconProps> = ({ speed, size = 22 }) => {
  const path = TimeControlIcons[speed];
  return (
    <Icon path={path} size={size / 24} style={{ display: "inline-flex", verticalAlign: "middle" }} />
  );
};

export default GameSpeedIcon;
