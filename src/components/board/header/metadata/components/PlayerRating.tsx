import { LichessPlayer } from "@/typing/interfaces";
import { FC } from "react";

interface PlayerRatingProps {
  player?: LichessPlayer;
}

const PlayerRating: FC<PlayerRatingProps> = ({ player }) => {
  if (!player) return null;
  const ratingWithProvisional = `(${player.rating}${player.provisional ? "?" : ""})`;
  return <p>{ratingWithProvisional}</p>;
};

export default PlayerRating;
