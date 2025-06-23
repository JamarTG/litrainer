import { useSelector } from "react-redux";
import { FC } from "react";
import { Color } from "chess.js";
import { COLORS, RATING_DIFFERENCE_TEXT_COLORS } from "@/constants/player";
import { PlayerIcons } from "@/constants/icons";
import { LICHESS_URLS } from "@/constants/urls";
import { isDarkModeActive } from "@/redux/slices/theme";
import { getPuzzle } from "@/redux/slices/puzzle";
import { isWhitePlayerShort } from "@/utils/color";

interface PlayerMetaDataProps {
  playerColor: Color;
}

const PlayerMetaData: FC<PlayerMetaDataProps> = ({ playerColor }) => {
  const isDarkMode = useSelector(isDarkModeActive);
  const puzzle = useSelector(getPuzzle);
  const player = isWhitePlayerShort(playerColor) ? puzzle?.players.white : puzzle?.players.black;

  const isWhite = playerColor === COLORS.SHORT.white;
  const icon = (!isDarkMode && isWhite) || (isDarkMode && !isWhite) ? PlayerIcons.unfilled : PlayerIcons.filled;

  return (
    <div className="noto player-color flex justify-center items-center gap-1 text-md">
      <span className="icon" dangerouslySetInnerHTML={{ __html: icon }} />
      {player?.user.patron && (
        <span className="icon text-orange-500" dangerouslySetInnerHTML={{ __html: PlayerIcons.patron }} />
      )}
      {player?.user.title && (
        <p className="text-orange-400">
          {player?.user.title}
          {"  "}
        </p>
      )}
      <a
        className="text-blue-500"
        href={`${LICHESS_URLS.Profile}${player?.user.name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {isWhitePlayerShort(playerColor) ? puzzle?.players.white.user.name : puzzle?.players.black.user.name}
      </a>
      <p className="text-gray-400 ml-1">
        ({player?.rating}
        {player?.provisional && "?"}){" "}
        {!!player?.ratingDiff && (
          <span
            className={
              player?.ratingDiff > 0
                ? RATING_DIFFERENCE_TEXT_COLORS.positive
                : player?.ratingDiff < 0
                  ? RATING_DIFFERENCE_TEXT_COLORS.negative
                  : RATING_DIFFERENCE_TEXT_COLORS.neutral
            }
          >
            {player?.ratingDiff > 0 ? `+${player?.ratingDiff}` : player?.ratingDiff}
          </span>
        )}
      </p>
    </div>
  );
};

export default PlayerMetaData;
