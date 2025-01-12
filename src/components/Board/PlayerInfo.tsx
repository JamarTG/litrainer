import { LichessPlayer } from "../../types/player";
import PlayerIcon from "./PlayerIcon";
import PatronIcon from "./PatronIcon";
import PlayerTitle from "./PlayerTitle";
import PlayerName from "./PlayerName";
import PlayerRating from "./PlayerRating";
import PlayerRatingDiff from "./PlayerRatingDiff";

interface PlayerInfoProps {
  player: LichessPlayer;
  color: "white" | "black";
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ player, color }) => {
  const { user, rating, ratingDiff, provisional} = player;
  return (
    <div className="noto player-color flex justify-center items-center flex">
      <PlayerIcon color={color} />
      <PatronIcon isPatron={user.patron ?? null} />
      <PlayerTitle title={user.title ?? null} />
      <PlayerName name={user.name} />
      <PlayerRating rating={rating} provisional={provisional ?? false} />
      <PlayerRatingDiff ratingDiff={ratingDiff} />
    </div>
  );
};

export default PlayerInfo;
