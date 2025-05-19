import { Square } from "chess.js";
import { useMarkerPositionEffect } from "../../hooks/useMarkerPositionEffect";
import { useState } from "react";
import { Marker as MarkerT } from "../../types/board";
import { INITIAL_MARKER_POSITION } from "../../constants/board";
import { useSelector } from "react-redux";
import { RootState } from "../../pages/redux/store";

interface MarkerProps {
  boardSize: number;
}

const Marker: React.FC<MarkerProps> = ({ boardSize}) => {
  const [markerPosition, setMarkerPosition] = useState<MarkerT>(INITIAL_MARKER_POSITION);
  const { puzzles, currentIndex } = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex];

  const classification = useSelector((state: RootState) => state.feedback.classification);
  const destinationSquare = useSelector((state: RootState) => state.board.destinationSquare);

  useMarkerPositionEffect(destinationSquare as Square, boardSize, setMarkerPosition, puzzle?.userMove.color);

  return (
    <>
      {destinationSquare && classification && (
        <img
          src={`/assets/app-icons/move-quality/${classification}.svg`}
          alt=""
          width={boardSize / 16}
          height={boardSize / 16}
          className="absolute"
          style={{ right: markerPosition.right, top: markerPosition.top }}
        />
      )}
    </>
  );
};

export default Marker;
