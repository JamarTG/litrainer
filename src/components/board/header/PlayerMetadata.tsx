import { useSelector } from "react-redux";
import { FC } from "react";
import { Color } from "chess.js";
import { RATING_DIFFERENCE_TEXT_COLORS } from "@/constants/player";
import { PlayerIcons } from "@/constants/icons";
import { LICHESS_URLS } from "@/constants/urls";
import { isDarkModeActive } from "@/redux/slices/theme";
import { getPuzzle } from "@/redux/slices/puzzle";
import { isWhitePlayerShort } from "@/utils/color";
import { ColorShortForm } from "@/utils/enums";

interface PlayerMetaDataProps {
  playerColor: Color;
}

const PlayerMetaData: FC<PlayerMetaDataProps> = ({ playerColor }) => {
  const isDarkMode = useSelector(isDarkModeActive);
  const puzzle = useSelector(getPuzzle);
  const player = isWhitePlayerShort(playerColor) ? puzzle?.players.white : puzzle?.players.black;

  const isWhite = playerColor === ColorShortForm.WHITE;
  const icon = (!isDarkMode && isWhite) || (isDarkMode && !isWhite) ? PlayerIcons.unfilled : PlayerIcons.filled;

  const renderPlayerColorIcon = () => {
    return <span className="icon" dangerouslySetInnerHTML={{ __html: icon }} />;
  };

  const renderPatronIcon = () => {
    return <span className="icon text-orange-500" dangerouslySetInnerHTML={{ __html: PlayerIcons.patron }} />;
  };

  const renderPlayerTitle = () => {
    return (
      <p className="text-orange-400">
        {player?.user.title}
        {"  "}
      </p>
    );
  };

  const renderPlayerName = () => {
    return (
      <a
        href={`${LICHESS_URLS.Profile}/${player?.user.name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {player?.user.name}
      </a>
    );
  };

  const renderPlayerRating = () => {
    if (!player) return null;

    const { rating, provisional, ratingDiff } = player;
    const diffClass =
      ratingDiff > 0
        ? RATING_DIFFERENCE_TEXT_COLORS.positive
        : ratingDiff < 0
          ? RATING_DIFFERENCE_TEXT_COLORS.negative
          : RATING_DIFFERENCE_TEXT_COLORS.neutral;

    return (
      <p className="text-gray-400 ml-1">
        ({rating}
        {provisional && "?"})
        {typeof ratingDiff === "number" && ratingDiff !== 0 && (
          <span className={diffClass}>{ratingDiff > 0 ? `+${ratingDiff}` : ratingDiff}</span>
        )}
      </p>
    );
  };

  return (
    <div className="noto player-color flex justify-center items-center gap-1 text-md">
      {renderPlayerColorIcon()}
      {player.user.patron && renderPatronIcon()}
      {player.user.title && renderPlayerTitle()}
      {renderPlayerName()}
      {renderPlayerRating()}
    </div>
  );
};

export default PlayerMetaData;
