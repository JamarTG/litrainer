import { Color } from "chess.js";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
interface PlayerRatingProps {
  color: Color
}

const PlayerRating: React.FC<PlayerRatingProps> = ({ color }) => {
   const {puzzles, currentIndex} = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex]

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
    <p className="text-gray-400 ml-1">
      ({rating}
      {provisional && "?"}) {ratingDiff !== undefined && ratingDiff !== 0 ? <span className={`${colorClass}`}>{displayText}</span> : null}
    </p>
  );
};

export default PlayerRating;
