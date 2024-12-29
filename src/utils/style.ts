import { Square } from "chess.js";
import {
  Classification,
  ClassificationColors,
  MoveClassification,
} from "../types/move";

export const getCustomSquareStyles = (
  dstSquare: Square | "",
  classification: Classification | "",
  moveSquares: Record<string, any>,
  isLoadingEvaluation: boolean
) => {
  const styles: Record<string, any> = { ...moveSquares };

  if (dstSquare) {
    styles[dstSquare] = {
      backgroundImage: `url(images/marker/${classification}.svg)`,
      backgroundColor:
        classification && !isLoadingEvaluation
          ? `${
              ClassificationColors[
                MoveClassification[
                  classification as keyof typeof MoveClassification
                ]
              ]
            }`
          : undefined,
      backgroundSize: "30%",
      backgroundPosition: "top right",
      backgroundRepeat: "no-repeat",
    };
  }

  return styles;
};

export const getSquareStyle = (isCaptureMove: boolean) => {
  return {
    background: `radial-gradient(circle, ${
      isCaptureMove ? "rgba(2,0,0,.2)" : "rgba(0,0,0,.1)"
    } ${isCaptureMove ? "60%" : "30%"}, transparent 25%)`,
    borderRadius: "50%",
    zIndex: 1,
  };
};
