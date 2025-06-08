import { Square } from "chess.js";
import { useMarkerPositionEffect } from "@/hooks/useMarkerPositionEffect";
import { useSelector } from "react-redux";
import { CLASSIFICATION_IMAGES } from "@/constants/classification";
import { MoveClassification } from "@/types/classification";
import { FC, RefObject, useEffect, useState } from "react";
import { ColorLongForm } from "@/types/lichess";
import { Z_INDEX } from "@/constants/ui";
import { getClassification } from "@/redux/slices/feedback";
import { getDestinationSquare, getMarkerPosition } from "@/redux/slices/board";

interface MoveClassificationMarkerProps {
  boardSize: number;
  boardRef: RefObject<HTMLDivElement>;
  orientation: ColorLongForm;
}

const MoveClassificationMarker: FC<MoveClassificationMarkerProps> = ({ boardSize, boardRef, orientation }) => {
  const markerPosition = useSelector(getMarkerPosition);
  const classification = useSelector(getClassification);
  const destinationSquare = useSelector(getDestinationSquare);

  const [visible, setVisible] = useState(false);

  useMarkerPositionEffect(destinationSquare as Square, boardSize, boardRef, orientation);

  useEffect(() => {
    if (destinationSquare && classification) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [destinationSquare, classification]);

  if (!destinationSquare || !classification || !boardRef.current || !markerPosition) {
    return null;
  }
  const squareSize = boardSize / 16;

  return (
    <img
      src={CLASSIFICATION_IMAGES[classification as keyof typeof MoveClassification]}
      alt={classification}
      width={squareSize}
      height={squareSize}
      className={`transform translate-x-[-15%] translate-y-[30%] absolute pointer-events-none transition-opacity duration-500 ease-in-out ${
        visible ? "opacity-90" : "opacity-0"
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
