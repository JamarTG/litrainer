import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Models } from "../../typings";

interface PlayerInfoProps {
  player: Models.Player.ChessPlayerInfo;
  color: "w" | "b";
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ player, color }) => {
  const { user, rating } = player;
  return (
    <div className="noto player-color flex items-center md:flex-row rounded-md">
      <FontAwesomeIcon
        icon={faCircle}
        color={color === "w" ? "#ffffff" : "#000000"}
        className="mr-2"
      />
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
            {user.flair && (
              <img
                src={`https://lichess1.org/assets/______2/flair/img/${user.flair}.webp`}
                alt="flair"
                className="w-4 h-4 ml-1"
              />
            )}
            <p className="text-gray-400 text-sm md:text-base ml-1">{rating}</p>
       
        </div>

        

  );
};

export default PlayerInfo;