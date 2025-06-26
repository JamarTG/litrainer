import { FC } from "react";

interface PlayerRatingProps {
  rating: number;
  isProvisional?: boolean;
}

const PlayerRating: FC<PlayerRatingProps> = ({ rating, isProvisional = false }) => {
  if (!rating) return null;

  return <p>{`(${rating}${isProvisional ? "?" : ""})`}</p>;
};

export default PlayerRating;
