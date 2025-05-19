import { Color } from "chess.js";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface PlayerNameProps {
  color: Color;
}

const PlayerName: React.FC<PlayerNameProps> = ({ color }) => {
   const {puzzles, currentIndex} = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex]
  return (
    <a
      className="text-blue-500"
      href={`https://lichess.org/@/${name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {color === "w" ? puzzle?.players.white.user.name : puzzle?.players.black.user.name}
    </a>
  );
};

export default PlayerName;