import React from "react";
import { Classification } from "../../../types/move";
import { Square } from "chess.js";

interface MarkerProps {
  classification: Classification | "";
  markerPosition: { top: number; right: number };
  boardSize: number;
  destinationSquare: Square | "";
}

const Marker: React.FC<MarkerProps> = ({
  classification,
  boardSize,
  markerPosition,
  destinationSquare
}) => {
  return (
    <>
      {destinationSquare && classification && (
        <img
          src={`/images/marker/${classification}.svg`}
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
