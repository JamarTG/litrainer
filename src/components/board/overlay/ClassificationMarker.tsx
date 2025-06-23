import { Square } from "chess.js";

import { useSelector } from "react-redux";
import { CLASSIFICATION_IMAGES } from "@/constants/classification";
import { MoveClassification } from "@/types/classification";
import { FC, RefObject } from "react";
import { ColorLongForm } from "@/types/lichess";
import { Z_INDEX } from "@/constants/ui";
import { getDestinationSquare, getMarkerPosition } from "@/redux/slices/board";
import useMarkerVisibility from "../hooks/useMarkerVisibility";
import { getClassification } from "@/redux/slices/feedback";
import { useMarkerPositionEffect } from "../hooks/useMarkerPositionEffect";
import { calculateSquareSize } from "@/libs/trainer/marker";

interface MoveClassificationMarkerProps {
  boardSize: number;
  boardRef: RefObject<HTMLDivElement>;
  orientation: ColorLongForm;
}

const MoveClassificationMarker: FC<MoveClassificationMarkerProps> = ({ boardRef, orientation, boardSize }) => {
  const markerPosition = useSelector(getMarkerPosition);
  const classification = useSelector(getClassification);
  const destinationSquare = useSelector(getDestinationSquare);

  const { isVisible } = useMarkerVisibility(classification, destinationSquare);

  useMarkerPositionEffect(destinationSquare as Square, boardSize, boardRef, orientation);

  const squareSize = calculateSquareSize(boardSize);

  if (!classification) {
    return null;
  }

  return (
    <img
      src={CLASSIFICATION_IMAGES[classification as keyof typeof MoveClassification]}
      alt={classification ?? "Classification Marker"}
      width={squareSize}
      height={squareSize}
      className={`transform translate-x-[-15%] translate-y-[30%] absolute pointer-events-none transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-90" : "opacity-0"
      }`}
      style={{
        right: markerPosition.right,
        top: markerPosition.top,
        zIndex: Z_INDEX.MARKER
      }}
    />
  );
};

export default MoveClassificationMarker;
