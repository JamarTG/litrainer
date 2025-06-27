import { Square } from "chess.js";

import { useSelector } from "react-redux";
import { CLASSIFICATION_IMAGES } from "@/constants/classification";
import { MoveClassification } from "@/typing/enums";
import { FC, RefObject } from "react";
import { getDestinationSquare, getMarkerPosition } from "@/redux/slices/board";
import useMarkerVisibility from "../../../hooks/board/useMarkerVisibility";
import { getClassification } from "@/redux/slices/feedback";
import { useMarkerPositionEffect } from "../../../hooks/board/useMarkerPositionEffect";
import { getUserColorLongForm } from "@/redux/slices/puzzle";
import { MARKER_Z_INDEX } from "@/constants/ui";
import { MARKER_SCALE_FACTOR } from "@/constants/board";
import { DEFAULT_BOARD_SIZE } from "@/constants/board";

interface ClassificationMarkerProps {
  boardSize: number;
  boardRef: RefObject<HTMLDivElement>;
}

const ClassificationMarker: FC<ClassificationMarkerProps> = ({ boardRef }) => {
  const markerPosition = useSelector(getMarkerPosition);
  const classification = useSelector(getClassification);
  const destinationSquare = useSelector(getDestinationSquare);
  const orientation = useSelector(getUserColorLongForm);

  // Classification and Destination are required in order to render the marker
  const { shouldMarkerBeVisible } = useMarkerVisibility(classification, destinationSquare);

  const boardSize = boardRef.current?.offsetWidth || DEFAULT_BOARD_SIZE;
  const markerSize = boardSize / MARKER_SCALE_FACTOR;

  useMarkerPositionEffect(destinationSquare as Square, boardSize, boardRef, orientation);

  const markerCoordinatesStyles = {
    right: markerPosition.right,
    top: markerPosition.top,
    zIndex: MARKER_Z_INDEX
  };
  if (!classification) return;

  return (
    <img
      src={CLASSIFICATION_IMAGES[classification as keyof typeof MoveClassification]}
      alt={classification}
      width={markerSize}
      height={markerSize}
      className={`transform translate-x-[-15%] translate-y-[30%] absolute pointer-events-none transition-opacity duration-500 ease-in-out ${
        shouldMarkerBeVisible ? "opacity-90" : "opacity-0"
      }`}
      style={markerCoordinatesStyles}
    />
  );
};

export default ClassificationMarker;
