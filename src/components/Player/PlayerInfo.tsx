import PatronIcon from "./PatronIcon";
import PlayerIcon from "./PlayerIcon";
import PlayerName from "./PlayerName";
import PlayerRating from "./PlayerRating";
import PlayerTitle from "./PlayerTitle";

interface PlayerInfoProps {
  color: "w" | "b";
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ color }) => {
  return (
    <div className="noto player-color flex justify-center items-center text-xs lg:text-base">
      <PlayerIcon color={color} />
      <PatronIcon color={color} />
      <PlayerTitle color={color} />
      <PlayerName color={color} />
      <PlayerRating color={color} />
    </div>
  );
};

export default PlayerInfo;
