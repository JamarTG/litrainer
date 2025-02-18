import PlayerIcon from "./PlayerIcon";
import PatronIcon from "./PatronIcon";
import PlayerTitle from "./PlayerTitle";
import PlayerName from "./PlayerName";
import PlayerRating from "./PlayerRating";

interface PlayerInfoProps {
  color: "w" | "b";
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ color }) => {
  return (
    <div className="noto player-color flex justify-center items-center flex">
      <PlayerIcon color={color} />
      <PatronIcon color={color} />
      <PlayerTitle color={color} />
      <PlayerName color={color} />
      <PlayerRating color={color} />
    </div>
  );
};

export default PlayerInfo;
