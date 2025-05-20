import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FC } from "react";
import { Color } from "chess.js";

interface PlayerInfoProps {
  color: Color;
}

const PlayerHeader: FC<PlayerInfoProps> = ({ color }) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const { puzzles, currentIndex } = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex];

  const player = puzzles[currentIndex]?.players[color === "w" ? "white" : "black"];
  const iconColor = theme === "light" ? (color === "w" ? "black" : "white") : color;

  const rating = player?.rating;
  const provisional = player?.provisional;
  const ratingDiff = player?.ratingDiff;
  const colorClass = ratingDiff > 0 ? "text-green-500" : ratingDiff < 0 ? "text-red-500" : "text-gray-500";
  const showDiff = ratingDiff !== undefined && ratingDiff !== 0;

  const renderIcon = () => {
    return (
      <div className="rounded-full px-1">
        {iconColor === "w" ? <span className="icon text-xl">&#xe028;</span> : <span className="icon text-xl">&#xe029;</span>}
      </div>
    );
  };

  const renderPatronWing = () => {
    const isPatron = color === "w" ? puzzle?.players.white.user.patron : puzzle?.players.black.user.patron;

    return isPatron ? (
      <div>
        <small className="icon text-orange-500 text-xl md:text-2xl ml-1">&#xe06c;</small>
      </div>
    ) : null;
  };

  const renderPlayerTitle = () => {
    const playerTitle = color === "w" ? puzzle?.players.white.user.title : puzzle?.players.black.user.title;
    return (
      <>
        {playerTitle && (
          <p className="text-orange-400 text-sm md:text-base">
            {playerTitle}
            {"  "}
          </p>
        )}
      </>
    );
  };

  const renderPlayerName = () => {
    return (
      <a
        className="text-blue-500"
        href={`https://lichess.org/@/${name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {color === "w" ? puzzle?.players.white.user.name : puzzle?.players.black.user.name}
      </a>
    );
  };

  const renderPlayerRating = () => {
    return (
      <p className="text-gray-400 ml-1">
        ({rating}
        {provisional && "?"}) {showDiff && <span className={colorClass}>{ratingDiff > 0 ? `+${ratingDiff}` : ratingDiff}</span>}
      </p>
    );
  };

  return (
    <div className="noto player-color flex justify-center items-center text-xs lg:text-base">
      {renderIcon()}

      <div className="flex gap-1">
        {renderPatronWing()}
        {renderPlayerTitle()}
        {renderPlayerName()}
      </div>

      {renderPlayerRating()}
    </div>
  );
};

export default PlayerHeader;
