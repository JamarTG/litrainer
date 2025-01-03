import React from "react";
import { LichessPlayer } from "../../../types/player";
import PlayerIcon from "./PlayerIcon";
import WinnerIcon from "./WinnerIcon";
import PatronIcon from "./PatronIcon";
import PlayerTitle from "./PlayerTitle";
import PlayerName from "./PlayerName";
import PlayerRating from "./PlayerRating";

interface PlayerInfoProps {
  player: LichessPlayer;
  color: "white" | "black";
  isWinner: boolean;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ player, color, isWinner }) => {
  const { user, rating } = player;
  return (
    <div className="noto player-color flex justify-center items-center flex rounded-md ">
      {isWinner ? <WinnerIcon /> : <PlayerIcon color={color} />}
      <PatronIcon isPatron={user.patron ?? null} />
      <PlayerTitle title={user.title ?? null} />
      <PlayerName name={user.name} />
      <PlayerRating rating={rating} />
    </div>
  );
};

export default PlayerInfo;
