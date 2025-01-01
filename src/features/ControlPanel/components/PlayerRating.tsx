import React from 'react';

interface PlayerRatingProps {
  rating: number;
}

const PlayerRating: React.FC<PlayerRatingProps> = ({ rating }) => {
  return (
    <p className="text-gray-400 text-sm md:text-base ml-1">
      {rating}
    </p>
  );
};

export default PlayerRating;