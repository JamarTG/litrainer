import { useSelector } from "react-redux";
import { FC } from "react";
import { Color } from "chess.js";
import { isDarkModeActive } from "@/redux/slices/theme";
import { getPuzzle } from "@/redux/slices/puzzle";
import { ColorShortForm } from "@/typing/enums";
import PlayerColorIcon from "./components/PlayerIcon";
import PatronIcon from "./components/PatronIcon";
import PlayerTitle from "./components/PatronTitle";
import PlayerName from "./components/PlayerName";
import PlayerRating from "./components/PlayerRating";
import RatingDifference from "./components/RatingDifference";

interface PlayerMetaDataProps {
  playerColor: Color;
}

const PlayerMetaData: FC<PlayerMetaDataProps> = ({ playerColor }) => {
  const isDarkMode = useSelector(isDarkModeActive);
  const puzzle = useSelector(getPuzzle);
  const player = playerColor === ColorShortForm.WHITE ? puzzle?.players.white : puzzle?.players.black;

  if (!(player && player.user)) return null;

  <div className="noto player-color flex justify-center items-center gap-1 text-md">
    <PlayerColorIcon playerColor={playerColor} isDarkMode={isDarkMode} />
    <PatronIcon>
      <PlayerTitle title={player.user?.title} />
      <PlayerName name={player.user?.name} />
    </PatronIcon>
    <div className="text-gray-400 flex gap-1">
      <PlayerRating player={player} />
      <RatingDifference ratingDiff={player.ratingDiff} />
    </div>
  </div>;
};

export default PlayerMetaData;
