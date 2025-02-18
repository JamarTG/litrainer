import { Color } from "chess.js";
import { useContext } from "react";
import { PuzzleContext } from "../../context/PuzzleContext";

interface PlayerTitleProps {
  color: Color;
}

const PlayerTitle: React.FC<PlayerTitleProps> = ({ color }) => {
  
  const {puzzle} = useContext(PuzzleContext);
  const playerTitle = color === "w" ? puzzle?.players.white.user.title : puzzle?.players.black.user.title;

  return (
    <>
      {playerTitle && (
        <p className="text-orange-400 text-sm ml-1 md:text-base">{playerTitle}</p>
      )}
    </>
  );
};

export default PlayerTitle;
