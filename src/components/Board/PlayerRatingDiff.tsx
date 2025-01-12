import React from "react";

interface PlayerRatingDiffProps {
  ratingDiff: number;
}

const PlayerRatingDiff: React.FC<PlayerRatingDiffProps> = ({ ratingDiff }) => {
  let color = "gray";

  if (ratingDiff > 0) {
    color = "green";
  } else if (ratingDiff < 0) {
    color = "red";
  }

  return (
    <div className={`ml-1 text-${color}-500`}>
      {ratingDiff > 0 ? "+" : "-"}
      {Math.abs(ratingDiff)}
    </div>
  );
};

export default PlayerRatingDiff;
