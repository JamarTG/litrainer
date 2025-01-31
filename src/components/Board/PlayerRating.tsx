interface PlayerRatingProps {
  rating: number;
  provisional: boolean;
  ratingDiff: number;
}

const PlayerRating: React.FC<PlayerRatingProps> = ({
  rating,
  provisional,
  ratingDiff,
}) => {
  let colorClass = "text-gray-500"; // Default color
  let displayText = "";


  if (ratingDiff > 0 && ratingDiff !== undefined) {
    colorClass = "text-green-500"; // Positive rating change
    displayText = `+${ratingDiff}`;
  } else if (ratingDiff < 0 && ratingDiff !== undefined) {
    colorClass = "text-red-500"; // Negative rating change
    displayText = `${ratingDiff}`;
  } else {
    displayText = `${ratingDiff}`; // No change
  }

  return (
    <p className="text-gray-400 text-sm md:text-base ml-1">
      ({rating}
      {provisional && "?"}) {ratingDiff !== undefined ? <span className={`font-semibold text-sm ${colorClass}`}>{displayText}</span> : ""}
    </p>
  );
};

export default PlayerRating;