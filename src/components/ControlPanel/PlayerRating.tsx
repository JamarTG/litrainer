interface PlayerRatingProps {
  rating: number;
  provisional: boolean;
}

const PlayerRating: React.FC<PlayerRatingProps> = ({ rating, provisional }) => {
  return (
    <p className="text-gray-400 text-sm md:text-base ml-1">
      ({rating}{provisional && "?"})
    </p>
  );
};

export default PlayerRating;