import React from "react";
import { GameType } from "../../types/form";

interface GameSpeedIconProps {
  speed: GameType;
  fill?: string;
}

const GameSpeedIcon: React.FC<GameSpeedIconProps> = ({
  speed,
  fill = "#4d4d4d",
}) => {
  return (
    <div className="flex justify-center items-center gap-2">
      {speed === "bullet" && (
        <div className="my-auto ">
          <span className="icon text-4xl">&#xe032;</span>
        </div>
      )}

      {speed === "blitz" && (
        <div className="my-auto ">
          <span className="icon text-4xl">&#xe008;</span>
        </div>
      )}

      {speed === "classical" && (
        <div className="my-auto ">
          <span className="icon text-4xl">&#xe00a;</span>
        </div>
      )}

      {speed === "rapid" && (
        <div className="my-auto ">
         <span className="icon text-4xl">&#xe002;</span>
        </div>
      )}

      {speed === "correspondence" && (
        <div className="my-auto ">
          <span className="icon text-4xl">&#xe019;</span>
        </div>
      )}
      <p className="capitalize">{speed}</p>
    </div>
  );
};

export default GameSpeedIcon;
