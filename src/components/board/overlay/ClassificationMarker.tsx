import { Square } from "chess.js";

import { useSelector } from "react-redux";
import { CLASSIFICATION_IMAGES } from "@/constants/classification";
import { MoveClassification } from "@/types/classification";
import { FC, RefObject, useEffect, useState } from "react";
import { ColorLongForm } from "@/types/lichess";
import { Z_INDEX } from "@/constants/ui";
import { getDestinationSquare, getMarkerPosition } from "@/redux/slices/board";
import useMarkerVisibility from "../hooks/useMarkerVisibility";
import { getClassification } from "@/redux/slices/feedback";
import { useMarkerPositionEffect } from "../hooks/useMarkerPositionEffect";

interface MoveClassificationMarkerProps {
  boardRef: RefObject<HTMLDivElement>;
  orientation: ColorLongForm;
}

const calculateSquareSize = (boardSize: number) => {
  return boardSize / 16;
};

const MoveClassificationMarker: FC<MoveClassificationMarkerProps> = ({ boardRef, orientation }) => {
  const markerPosition = useSelector(getMarkerPosition);
  const classification = useSelector(getClassification);
  const destinationSquare = useSelector(getDestinationSquare);

  const [boardSize, setBoardSize] = useState<number>(0);

  const { isVisible } = useMarkerVisibility();

  useMarkerPositionEffect(destinationSquare as Square, boardSize, boardRef, orientation);

  useEffect(() => {
    const updateBoardSize = () => {
      if (boardRef.current) {
        setBoardSize(boardRef.current.offsetWidth);
      }
    };

    updateBoardSize();

    window.addEventListener("resize", updateBoardSize);
    return () => window.removeEventListener("resize", updateBoardSize);
  }, []);

  if (!classification) {
    return null;
  }

  const squareSize = calculateSquareSize(boardSize);

  return (
    <img
      src={CLASSIFICATION_IMAGES[classification as keyof typeof MoveClassification]}
      alt={classification}
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
