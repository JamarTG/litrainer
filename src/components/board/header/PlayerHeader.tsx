import { useSelector } from "react-redux";
import { FC } from "react";
import { Color } from "chess.js";
import { RootState } from "../../../redux/store";
import { RatingDifferenceTextColors } from "../../../constants/player";
import { PlayerIcons } from "../../../constants/icons";
import { LichessURL } from "../../../constants/urls";

interface PlayerInfoProps {
  color: Color;
}

const PlayerHeader: FC<PlayerInfoProps> = ({ color }) => {
  const { puzzle, theme } = useSelector((state: RootState) => {
    return {
      theme: state.theme.theme,
      puzzle: state.puzzle.puzzles[state.puzzle.currentIndex]
    };
  });

  const player = puzzle.players[color === "w" ? "white" : "black"];
  const { rating, provisional, ratingDiff, user } = player;

  const colorClass =
    ratingDiff > 0
      ? RatingDifferenceTextColors.positive
      : ratingDiff < 0
        ? RatingDifferenceTextColors.negative
        : RatingDifferenceTextColors.neutral;
  const showDiff = ratingDiff !== undefined && ratingDiff !== 0;

  const renderIcon = () => {
    const isLightTheme = theme === "light";
    const isWhite = color === "w";

    const icon = (isLightTheme && isWhite) || (!isLightTheme && !isWhite) ? PlayerIcons.unfilled : PlayerIcons.filled;

    return <span className="icon" dangerouslySetInnerHTML={{ __html: icon }} />;
  };

  const renderPatronWing = () => {
    const isPatron = color === "w" ? puzzle?.players.white.user.patron : puzzle?.players.black.user.patron;

    return (
      isPatron && <span className="icon text-orange-500" dangerouslySetInnerHTML={{ __html: PlayerIcons.patron }} />
    );
  };

  const renderPlayerTitle = () => {
    const playerTitle = color === "w" ? puzzle?.players.white.user.title : puzzle?.players.black.user.title;
    return (
      <>
        {playerTitle && (
          <p className="text-orange-400">
            {playerTitle}
            {"  "}
          </p>
        )}
      </>
    );
  };

  const renderPlayerName = () => {
    return (
      <a className="text-blue-500" href={`${LichessURL.Profile}${user.name}`} target="_blank" rel="noopener noreferrer">
        {color === "w" ? puzzle?.players.white.user.name : puzzle?.players.black.user.name}
      </a>
    );
  };

  const renderPlayerRating = () => {
    return (
      <p className="text-gray-400 ml-1">
        ({rating}
        {provisional && "?"}){" "}
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

export default PlayerHeader;
