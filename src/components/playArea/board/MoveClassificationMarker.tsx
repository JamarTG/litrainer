import { Square } from "chess.js";
import { useMarkerPositionEffect } from "../../../hooks/useMarkerPositionEffect";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MoveClassification, MoveClassificationImages } from "../../../constants/classification";
import { FC, RefObject } from "react";
import { MARKER_SIZE_RATIO } from "../../../constants/board";

interface MoveClassificationMarkerProps {
  boardSize: number;
  boardRef: RefObject<HTMLDivElement>;
  orientation: 'white' | 'black';
}

const MoveClassificationMarker: FC<MoveClassificationMarkerProps> = ({ 
  boardSize, 
  boardRef,
  orientation 
}) => {
  const markerPosition = useSelector((state: RootState) => state.board.markerPosition);
  const { puzzle, classification, destinationSquare } = useSelector((state: RootState) => {
    return {
      puzzle: state.puzzle.puzzles[state.puzzle.currentIndex],
      classification: state.feedback.classification,
      destinationSquare: state.board.destinationSquare
    };
  });

  // Pass boardRef and orientation to the hook
  useMarkerPositionEffect(
    destinationSquare as Square, 
    boardSize, 
    puzzle?.userMove.color,
    boardRef,
    orientation
  );

  // Only render if we have all required data and the board is mounted
  if (!destinationSquare || !classification || !boardRef.current || !markerPosition) {
    return null;
  }

  return (
    <img
      src={MoveClassificationImages[classification as keyof typeof MoveClassification]}
      alt={classification}
      width={boardSize / MARKER_SIZE_RATIO}
      height={boardSize / 16}
      className="absolute pointer-events-none z-10"
      style={{ 
        right: markerPosition.right, 
        top: markerPosition.top,
        transform: 'translate(-15%, 30%)' // Center the marker on the square
      }}
    />
  );
};

export default MoveClassificationMarker;