import { Color } from "chess.js";
import { useContext } from "react";
import { PuzzleContext } from "../../context/PuzzleContext";

interface PatronIconProps {
  color: Color;
}

const PatronIcon: React.FC<PatronIconProps> = ( {color}) => {
  const {puzzle} = useContext(PuzzleContext);
 
  return (
    (color === "w" ? puzzle?.players.white.user.patron : puzzle?.players.black.user.patron) || false  && (
      <small className="icon text-orange-500 text-xl md:text-2xl ml-1">
        &#xe06c;
      </small>
    )
  );
};

export default PatronIcon;
