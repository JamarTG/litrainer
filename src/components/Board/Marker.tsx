import { Square } from "chess.js";
import { Classification } from "../../types/move";
import { useMarkerPositionEffect } from "../../hooks/useMarkerPositionEffect";
import { useContext, useState } from "react";
import { Marker as MarkerT } from "../../types/board";
import { INITIAL_MARKER_POSITION } from "../../constants/board";
import { PuzzleContext } from "../../context/PuzzleContext";

interface MarkerProps {
  classification: Classification | null;
  boardSize: number;
  destinationSquare: Square | null;
}

const Marker: React.FC<MarkerProps> = ({
  classification,
  boardSize,
  destinationSquare,
}) => {
  const [markerPosition, setMarkerPosition] = useState<MarkerT>(
    INITIAL_MARKER_POSITION
  );
  const { puzzle } = useContext(PuzzleContext);

  useMarkerPositionEffect(
    destinationSquare,
    boardSize,
    setMarkerPosition,
    puzzle?.userMove.color
  );
  
  return (
    <>
      {destinationSquare && classification && (
        <img
          src={`/assets/evals/${classification}.svg`}
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
