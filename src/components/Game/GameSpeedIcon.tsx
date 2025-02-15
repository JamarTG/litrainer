import React from "react";
import { GameType } from "../../types/form";

interface GameSpeedIconProps {
  speed: GameType;
}

const GameSpeedIcon: React.FC<GameSpeedIconProps> = ({
  speed
}) => {
  return (
    <div>
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
     
    </div>
  );
};

export default GameSpeedIcon;
