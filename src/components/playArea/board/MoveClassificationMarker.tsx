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
  const { puzzles, currentIndex } = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex];

  const classification = useSelector((state: RootState) => state.feedback.classification);
  const destinationSquare = useSelector((state: RootState) => state.board.destinationSquare);

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
