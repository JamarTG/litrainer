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
import { MARKER_SCALE_FACTOR, MARKER_Z_INDEX } from "@/constants/ui";
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

  const { isVisible } = useMarkerVisibility(classification, destinationSquare);

  const boardSize = boardRef.current?.offsetWidth || DEFAULT_BOARD_SIZE;
  const markerSize = boardSize / MARKER_SCALE_FACTOR;

  useMarkerPositionEffect(destinationSquare as Square, boardSize, boardRef, orientation);

  if (!classification) {
    return null;
  }

  return (
    <img
      src={CLASSIFICATION_IMAGES[classification as keyof typeof MoveClassification]}
      alt={classification ?? "Classification Marker"}
      width={markerSize}
      height={markerSize}
      className={`transform translate-x-[-15%] translate-y-[30%] absolute pointer-events-none transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-90" : "opacity-0"
      }`}
      style={{
        right: markerPosition.right,
        top: markerPosition.top,
        zIndex: MARKER_Z_INDEX
      }}
    />
  );
};

export default ClassificationMarker;
