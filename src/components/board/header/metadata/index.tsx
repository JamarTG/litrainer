import { useSelector } from "react-redux";
import { FC } from "react";
import { Color } from "chess.js";
import { PlayerIcons } from "@/constants/icons";
import { LICHESS_URLS } from "@/constants/urls";
import { isDarkModeActive } from "@/redux/slices/theme";
import { getPuzzle } from "@/redux/slices/puzzle";
import { ColorShortForm } from "@/typing/enums";
import { LichessPlayer } from "@/typing/interfaces";

interface PlayerMetaDataProps {
  playerColor: Color;
}

const PlayerMetaData: FC<PlayerMetaDataProps> = ({ playerColor }) => {
  const isDarkMode = useSelector(isDarkModeActive);
  const puzzle = useSelector(getPuzzle);
  const player = playerColor === ColorShortForm.WHITE ? puzzle?.players.white : puzzle?.players.black;

  const renderPlayerColorIcon = () => {
    const shouldRenderUnfilledIcon = () => {
      return (
        (!isDarkMode && playerColor === ColorShortForm.WHITE) || (isDarkMode && !(playerColor === ColorShortForm.WHITE))
      );
    };

    return (
      <span
        className="icon"
        dangerouslySetInnerHTML={{
          __html: shouldRenderUnfilledIcon() ? PlayerIcons.unfilled : PlayerIcons.filled
        }}
      />
    );
  };

  const renderPatronIcon = () => {
    return <span className="icon text-orange-500" dangerouslySetInnerHTML={{ __html: PlayerIcons.patron }} />;
  };

  const renderPlayerTitle = () => {
    return <p className="text-orange-400">{player?.user.title}</p>;
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

    const getRatingWithProvisional = (player: LichessPlayer) => {
      return `(${player?.rating}${player?.provisional ? "?" : ""})`;
    };

    const playerRating = getRatingWithProvisional(player);

    return <p>{playerRating}</p>;
  };

  const renderRatingDifference = () => {
    const { ratingDiff } = player;

    const getDiffClass = (ratingDiff: number) => {
      return ratingDiff > 0 ? "text-green-500" : ratingDiff < 0 ? "text-red-500" : "text-gray-500";
    };

    const getRatingDiffWithOperator = (ratingDiff: number) => {
      return ratingDiff > 0 ? `+${ratingDiff}` : ratingDiff;
    };

    const diffClass = getDiffClass(ratingDiff);
    const ratingDiffWithOperator = getRatingDiffWithOperator(ratingDiff);

    return <p>{ratingDiff ? <span className={diffClass}>{ratingDiffWithOperator}</span> : ""} </p>;
  };

  return (
    <div className="noto player-color flex justify-center items-center gap-1 text-md">
      {renderPlayerColorIcon()}
      {player.user.patron && renderPatronIcon()}
      {player.user.title && renderPlayerTitle()}
      {renderPlayerName()}

      <div className="text-gray-400 flex gap-1">
        {renderPlayerRating()}
        {renderRatingDifference()}
      </div>
    </div>
  );
};

export default PlayerMetaData;
