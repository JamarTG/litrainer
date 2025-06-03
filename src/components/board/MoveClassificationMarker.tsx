import { Square } from "chess.js";
import { useMarkerPositionEffect } from "../../hooks/useMarkerPositionEffect";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { MoveClassification, MoveClassificationImages } from "../../constants/classification";
import { FC, RefObject, useEffect, useState } from "react";
import { ColorLongForm } from "../../types/player";

interface MoveClassificationMarkerProps {
  boardSize: number;
  boardRef: RefObject<HTMLDivElement>;
  orientation: ColorLongForm;
}

const MoveClassificationMarker: FC<MoveClassificationMarkerProps> = ({ boardSize, boardRef, orientation }) => {
  const markerPosition = useSelector((state: RootState) => state.board.markerPosition);
  const { puzzle, classification, destinationSquare } = useSelector((state: RootState) => ({
    puzzle: state.puzzle.puzzles[state.puzzle.currentIndex],
    classification: state.feedback.classification,
    destinationSquare: state.board.destinationSquare
  }));

  const [visible, setVisible] = useState(false);

  useMarkerPositionEffect(destinationSquare as Square, boardSize, puzzle?.userMove.color, boardRef, orientation);

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

  return (
    <img
      src={MoveClassificationImages[classification as keyof typeof MoveClassification]}
      alt={classification}
      width={boardSize / 16}
      height={boardSize / 16}
      className={`absolute pointer-events-none transition-opacity duration-500 ease-in-out ${
        visible ? "opacity-90" : "opacity-0"
      }`}
      style={{
        right: markerPosition.right,
        top: markerPosition.top,
        transform: "translate(-15%, 30%)"
      }}
    />
  );
};

export default MoveClassificationMarker;
