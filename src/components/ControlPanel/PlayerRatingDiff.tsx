import React from "react";

interface PlayerRatingDiffProps {
  ratingDiff: number;
}

const PlayerRatingDiff: React.FC<PlayerRatingDiffProps> = ({ ratingDiff }) => {
  return (
    <div className="ml-1">
      {ratingDiff > 0 ? (
        <span className="icon text-sm text-green-500">&#xe02c;</span>
      ) : (
        <span className="icon text-sm text-red-500">&#xe02b;</span>
      )}
      {Math.abs(ratingDiff)}
    </div>
  );
};

export default PlayerRatingDiff;
