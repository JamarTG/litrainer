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
      backgroundSize: "40%",
      backgroundPosition: "top right",
      backgroundRepeat: "no-repeat",
      zIndex: 2
    };
  }

  return styles;
};

export const getSquareStyle = (isCaptureMove: boolean) => {
  return {
    background: `radial-gradient(circle, ${
      isCaptureMove ? "rgba(15, 245, 130, 0.6)" : "rgba(15, 206, 196, 0.6)"
    } ${isCaptureMove ? "60%" : "20%"}, transparent 15%)`,
    borderRadius: "50%",
    zIndex: 1,
  };
};
