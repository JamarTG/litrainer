import { useSelector } from "react-redux";
import { FC } from "react";
import { Color } from "chess.js";
import { RatingDifferenceTextColors } from "@/constants/player";
import { PlayerIcons } from "@/constants/icons";
import { LichessURL } from "@/constants/urls";
import { isDarkModeActive } from "@/redux/slices/theme";
import { getPlayerByShortColor, getPuzzle } from "@/redux/slices/puzzle";

interface PlayerMetaDataProps {
  color: Color;
}

const PlayerMetaData: FC<PlayerMetaDataProps> = ({ color }) => {
  const isDarkMode = useSelector(isDarkModeActive);
  const puzzle = useSelector(getPuzzle);
  const player = useSelector(getPlayerByShortColor(color));

  const rating = player.rating;
  const ratingDiff = player.ratingDiff;
  const isPatron = player.user.patron;
  const title = player.user.title;
  const isRatingProvisional = player.provisional;
  const username = player.user.name;

  const colorClass =
    ratingDiff > 0
      ? RatingDifferenceTextColors.positive
      : ratingDiff < 0
        ? RatingDifferenceTextColors.negative
        : RatingDifferenceTextColors.neutral;
  const showDiff = ratingDiff !== undefined && ratingDiff !== 0;

  const renderIcon = () => {
    const isWhite = color === "w";
    const icon = (!isDarkMode && isWhite) || (isDarkMode && !isWhite) ? PlayerIcons.unfilled : PlayerIcons.filled;

    return <span className="icon" dangerouslySetInnerHTML={{ __html: icon }} />;
  };

  const renderPatronWing = () => {
    return (
      isPatron && <span className="icon text-orange-500" dangerouslySetInnerHTML={{ __html: PlayerIcons.patron }} />
    );
  };

  const renderPlayerTitle = () => {
    return (
      <>
        {title && (
          <p className="text-orange-400">
            {title}
            {"  "}
          </p>
        )}
      </>
    );
  };

  const renderPlayerName = () => {
    return (
      <a className="text-blue-500" href={`${LichessURL.Profile}${username}`} target="_blank" rel="noopener noreferrer">
        {color === "w" ? puzzle?.players.white.user.name : puzzle?.players.black.user.name}
      </a>
    );
  };

  const renderPlayerRating = () => {
    return (
      <p className="text-gray-400 ml-1">
        ({rating}
        {isRatingProvisional && "?"}){" "}
        {showDiff && <span className={colorClass}>{ratingDiff > 0 ? `+${ratingDiff}` : ratingDiff}</span>}
      </p>
    );
  };

  return (
    <div className="noto player-color flex justify-center items-center gap-1 text-md">
      {renderIcon()}
      {renderPatronWing()}
      {renderPlayerTitle()}
      {renderPlayerName()}
      {renderPlayerRating()}
    </div>
  );
};

export default PlayerMetaData;
