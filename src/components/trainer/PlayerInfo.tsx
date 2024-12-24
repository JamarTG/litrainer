import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { LichessPlayer } from "../../types/player";

interface PlayerInfoProps {
  player: LichessPlayer;
  color: "w" | "b";
  isWinner: boolean;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ player, color, isWinner }) => {
  const { user, rating } = player;
  return (
    <div className="noto player-color flex items-center md:flex-row rounded-md ">
      <div className="flex items-center justify-center">
        {isWinner ? (
          <img src="/svgs/ui/winner.svg" alt="Winner" width={20} />
        ) : (
          <FontAwesomeIcon
            icon={faCircle}
            color={color === "w" ? "#ffffff" : "#000000"}
            size="lg"
            
          />
        )}
      </div>

      <div className="">
        {user.patron && (
          <small className="icon text-orange-500 text-xl md:text-2xl ml-1">
            &#xe06c;
          </small>
        )}
      </div>

      <p>
        {user.title && (
          <p className="text-orange-400 text-sm ml-1 md:text-base">
            {user.title}
          </p>
        )}
      </p>

      <a
        className="text-blue-500 text-sm md:text-base ml-1"
        href={`https://lichess.org/@/${user.name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {user.name}
      </a>
      <p className="text-gray-400 text-sm md:text-base ml-1">{rating}</p>
    </div>
  );
};

export default PlayerInfo;
