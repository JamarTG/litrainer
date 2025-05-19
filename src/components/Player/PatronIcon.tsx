import { Color } from "chess.js";
import { RootState } from "../../pages/redux/store";
import { useSelector } from "react-redux";

interface PatronIconProps {
  color: Color;
}

const PatronIcon: React.FC<PatronIconProps> = ( {color}) => {
   const {puzzles, currentIndex} = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex]
 
  return (
    (color === "w" ? puzzle?.players.white.user.patron : puzzle?.players.black.user.patron) || false  && (
      <small className="icon text-orange-500 text-xl md:text-2xl ml-1">
        &#xe06c;
      </small>
    )
  );
};

export default PatronIcon;
