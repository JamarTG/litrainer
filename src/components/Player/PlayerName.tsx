import { Color } from "chess.js";
import { useContext } from "react";
import { PuzzleContext } from "../../context/PuzzleContext";

interface PlayerNameProps {
  color: Color;
}

const PlayerName: React.FC<PlayerNameProps> = ({ color }) => {
  const {puzzle} = useContext(PuzzleContext);
  return (
    <a
      className="text-blue-500 text-sm md:text-base ml-1"
      href={`https://lichess.org/@/${name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {color === "w" ? puzzle?.players.white.user.name : puzzle?.players.black.user.name}
    </a>
  );
};

export default PlayerName;