import { Color, Square } from "chess.js";
import { useMarkerPositionEffect } from "@/hooks/useMarkerPositionEffect";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { MoveClassification, MoveClassificationImages } from "@/constants/classification";
import { FC, RefObject, useEffect, useState } from "react";
import { ColorLongForm } from "@/types/lichess";
import { Z_INDEX } from "@/components/constants";

interface MoveClassificationMarkerProps {
  boardSize: number;
  boardRef: RefObject<HTMLDivElement>;
  orientation: ColorLongForm;
}

const MoveClassificationMarker: FC<MoveClassificationMarkerProps> = ({ boardSize, boardRef, orientation }) => {
  const markerPosition = useSelector((state: RootState) => state.board.markerPosition);
  const puzzle = useSelector((state: RootState) => state.puzzle.puzzles[state.puzzle.currentIndex]);
  const classification = useSelector((state: RootState) => state.feedback.classification);
  const destinationSquare = useSelector((state: RootState) => state.board.destinationSquare);

  const [visible, setVisible] = useState(false);

  useMarkerPositionEffect(
    destinationSquare as Square,
    boardSize,
    puzzle?.userMove.color[0].toLocaleLowerCase() as Color,
    boardRef,
    orientation
  );

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
      src={MoveClassificationImages[classification as keyof typeof MoveClassification]}
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
