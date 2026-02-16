import { Puzzle } from "@/typing/interfaces";
import { GameMode } from "@/typing/enums";

interface RatedOrCasualProps {
  isRatedGame: Puzzle["rated"];
}

const RatedOrCasual: React.FC<RatedOrCasualProps> = ({ isRatedGame }) => {
  const label = isRatedGame ? GameMode.Rated : GameMode.Casual;
  const baseClasses = "px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide";

  const ratedClasses = isRatedGame
    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";

  return (
    <span className={`text-lg ${baseClasses} ${ratedClasses}`} aria-label={`${label} Game`} title={`${label} Game`}>
      {label}
    </span>
  );
};

export default RatedOrCasual;