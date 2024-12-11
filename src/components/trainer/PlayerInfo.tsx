import React from "react";
import { Models } from "../../typings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

interface PlayerInfoProps {
  player: Models.Player.ChessPlayerInfo;
  color: "w" | "b";
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ player, color }) => {
  const { user, rating } = player;
  return (
    <div className="noto player-color flex items-center gap-1">
      <FontAwesomeIcon icon={faCircle} color={color === 'w' ? "#b0b0b0" : "#000000"}/>
      <p className="w-8">
      {user.patron && (
      <small className="icon text-orange-500 text-2xl ml-1 ">
      &#xe06c;
      </small>
      )}
      </p>
      <p className="text-orange-400">{user.title && <p>{user.title}</p>}</p>
      <p className="flex justify-center items-center gap-1">
      <a className="text-blue-500" href={`https:lichess.org/${user.name}`} target="_blank">{user.name}</a>
      
      {user.flair && (
      <img
      src={`https://lichess1.org/assets/______2/flair/img/${user.flair}.webp`}
      alt="flair"
      className="w-4 h-4 ml-1"
      />
      )}
      </p>
      <b className="text-bold">({rating})</b>
    </div>
  );
};

export default PlayerInfo;
