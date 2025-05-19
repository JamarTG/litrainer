import { Color } from "chess.js";
import { useSelector } from "react-redux";
import { RootState } from "../../pages/redux/store";

interface PlayerTitleProps {
  color: Color;
}

const PlayerTitle: React.FC<PlayerTitleProps> = ({ color }) => {
  
   const {puzzles, currentIndex} = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex]
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
