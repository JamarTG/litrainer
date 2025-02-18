import { useContext } from "react";
import { PuzzleContext } from "../../context/PuzzleContext";
import { Color } from "chess.js";

interface PlayerRatingProps {
  color: Color
}

const PlayerRating: React.FC<PlayerRatingProps> = ({ color }) => {
  const { puzzle } = useContext(PuzzleContext);

  if (!puzzle) return null; 
  const player = color === "w" ? puzzle.players.white : puzzle.players.black;

  // Ensure player data exists
  if (!player) return null;

  const { rating, provisional, ratingDiff } = player;

  let colorClass = "text-gray-500"; // Default color
  let displayText = "";

  if (ratingDiff > 0) {
    colorClass = "text-green-500"; 
    displayText = `+${ratingDiff}`;
  } else if (ratingDiff < 0) {
    colorClass = "text-red-500"; 
    displayText = `${ratingDiff}`;
  } else {
    displayText = `${ratingDiff}`; 
  }

  return (
    <p className="text-gray-400 text-sm md:text-base ml-1">
      ({rating}
      {provisional && "?"}) {ratingDiff !== undefined && ratingDiff !== 0 ? <span className={`${colorClass}`}>{displayText}</span> : null}
    </p>
  );
};

export default PlayerRating;
