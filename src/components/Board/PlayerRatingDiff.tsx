import React from "react";

interface PlayerRatingDiffProps {
  ratingDiff: number | null | undefined;
}

const PlayerRatingDiff: React.FC<PlayerRatingDiffProps> = ({ ratingDiff }) => {
  let color = "gray";
  let displayText = "";

  if (ratingDiff !== null && ratingDiff !== undefined) {
    if (ratingDiff > 0) {
      color = "green";
      displayText = `+${ratingDiff}`;
    } else if (ratingDiff < 0) {
      color = "red";
      displayText = `${ratingDiff}`;
    } else {
      displayText = `${ratingDiff}`;
    }
  }

  return (
    <div className={`ml-1 text-${color}-500`}>
      {displayText}
    </div>
  );
};

export default PlayerRatingDiff;
