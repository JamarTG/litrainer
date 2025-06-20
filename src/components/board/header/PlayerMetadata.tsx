import { useSelector } from "react-redux";
import { FC, Fragment } from "react";
import { Color } from "chess.js";
import { RatingDifferenceTextColors } from "@/constants/player";
import { PlayerIcons } from "@/constants/icons";
import { LichessURL } from "@/constants/urls";
import { isDarkModeActive } from "@/redux/slices/theme";
import { getPuzzle } from "@/redux/slices/puzzle";
import { LichessPlayer, Puzzle } from "@/types/lichess";

interface PlayerMetaDataProps {
  playerColor: Color;
}

const renderIcon = (playerColor: Color, isDarkMode: boolean) => {
  const isWhite = playerColor === "w";
  const icon = (!isDarkMode && isWhite) || (isDarkMode && !isWhite) ? PlayerIcons.unfilled : PlayerIcons.filled;

  return <span className="icon" dangerouslySetInnerHTML={{ __html: icon }} />;
};

const renderPatronWing = (player: LichessPlayer) => {
  return (
    player?.user.patron && (
      <span className="icon text-orange-500" dangerouslySetInnerHTML={{ __html: PlayerIcons.patron }} />
    )
  );
};

const renderPlayerTitle = (player: LichessPlayer) => {
  return (
    <Fragment>
      {player?.user.title && (
        <p className="text-orange-400">
          {player?.user.title}
          {"  "}
        </p>
      )}
    </Fragment>
  );
};

const renderPlayerName = (player: LichessPlayer, playerColor: Color, puzzle: Puzzle) => {
  return (
    <a
      className="text-blue-500"
      href={`${LichessURL.Profile}${player?.user.name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {playerColor === "w" ? puzzle?.players.white.user.name : puzzle?.players.black.user.name}
    </a>
  );
};

const renderPlayerRating = (player: LichessPlayer, showDiff: boolean) => {
  return (
    <p className="text-gray-400 ml-1">
      ({player?.rating}
      {player?.provisional && "?"}){" "}
      {showDiff && (
        <span
          className={
            player?.ratingDiff > 0
              ? RatingDifferenceTextColors.positive
              : player?.ratingDiff < 0
                ? RatingDifferenceTextColors.negative
                : RatingDifferenceTextColors.neutral
          }
        >
          {player?.ratingDiff > 0 ? `+${player?.ratingDiff}` : player?.ratingDiff}
        </span>
      )}
    </p>
  );
};

const PlayerMetaData: FC<PlayerMetaDataProps> = ({ playerColor }) => {
  const isDarkMode = useSelector(isDarkModeActive);
  const puzzle = useSelector(getPuzzle);

  const player = playerColor === "w" ? puzzle?.players.white : puzzle?.players.black;

  return (
    <div className="noto player-color flex justify-center items-center gap-1 text-md">
      {renderIcon(playerColor, isDarkMode)}
      {renderPatronWing(player)}
      {renderPlayerTitle(player)}
      {renderPlayerName(player, playerColor, puzzle)}
      {renderPlayerRating(player, !!player?.ratingDiff)}
    </div>
  );
};

export default PlayerMetaData;
