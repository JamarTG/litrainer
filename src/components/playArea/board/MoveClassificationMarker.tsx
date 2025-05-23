import { Square } from "chess.js";
import { useMarkerPositionEffect } from "../../../hooks/useMarkerPositionEffect";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MoveClassification, MoveClassificationImages } from "../../../constants/classification";
import { FC } from "react";
import { MARKER_SIZE_RATIO } from "../../../constants/board";

interface MoveClassificationMarkerProps {
  boardSize: number;
}

const MoveClassificationMarker: FC<MoveClassificationMarkerProps> = ({ boardSize }) => {
  const markerPosition = useSelector((state: RootState) => state.board.markerPosition);
  const { puzzle, classification, destinationSquare } = useSelector((state: RootState) => {
    return {
      puzzle: state.puzzle.puzzles[state.puzzle.currentIndex],
      classification: state.feedback.classification,
      destinationSquare: state.board.destinationSquare
    };
  });

  useMarkerPositionEffect(destinationSquare as Square, boardSize, puzzle?.userMove.color);

  return (
    <>
      {destinationSquare && classification && (
        <img
          src={MoveClassificationImages[classification as keyof typeof MoveClassification]}
          alt={classification}
          width={boardSize / MARKER_SIZE_RATIO}
          height={boardSize / 16}
          className="absolute"
          style={{ right: markerPosition.right, top: markerPosition.top }}
        />
      )}
    </>
  );
};

export default MoveClassificationMarker;
