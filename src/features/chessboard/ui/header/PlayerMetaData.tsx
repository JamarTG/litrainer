import { useSelector } from "react-redux";
import { FC } from "react";
import { Color } from "chess.js";
import { getPuzzle } from "@/state/slices/puzzle";
import { ColorShortForm } from "@/typing/enums";
import PatronIcon from "./PatronIcon";
import PlayerTitle from "./PatronTitle";
import PlayerName from "./PlayerName";
import PlayerRating from "./PlayerRating";
import RatingDifference from "./RatingDifference";

interface PlayerMetaDataProps {
  playerColor: Color;
}

const PlayerMetaData: FC<PlayerMetaDataProps> = ({ playerColor }) => {
  const puzzle = useSelector(getPuzzle);

  const player = playerColor === ColorShortForm.WHITE ? puzzle?.players.white : puzzle?.players.black;

  if (!(player && player.user)) return;

  return (
    <div className="noto player-color flex justify-center items-center gap-1 text-md">
      <PatronIcon isPatron={player?.user?.patron ?? null} />
      <PlayerTitle title={player.user?.title} />
      <PlayerName name={player.user?.name} />
      <div className="flex gap-1 opacity-75">
        <PlayerRating isProvisional={player?.provisional} rating={player?.rating} />
        <RatingDifference ratingDiff={player?.ratingDiff} />
      </div>
    </div>
  );
};

export default PlayerMetaData;
