import { Square } from "chess.js";
import {
  Classification,
  ClassificationColors,
  MoveClassification,
} from "../types/move";

export const getCustomSquareStyles = (
  dstSquare: Square | "",
  srcSquare: Square | "",
  classification: Classification | "",
  moveSquares: Record<string, any>,
  isLoadingEvaluation: boolean
) => {
  const styles: Record<string, any> = { ...moveSquares };

  if (dstSquare && srcSquare) {
    styles[dstSquare] = {

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
    styles[srcSquare] = {

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
      opacity: classification ? 0.5 : 1,
      backgroundPosition: "top right",
      backgroundRepeat: "no-repeat",
    };
  }

  return styles;
};

export const getSquareStyle = (isCaptureMove: boolean) => {
  return {
    background: `radial-gradient(circle, ${
      isCaptureMove ? "rgba(15, 245, 130, 0.6)" : "rgba(15, 245, 130, 0.8)"
    } ${isCaptureMove ? "60%" : "20%"}, transparent 15%)`,
    borderRadius: "50%",
    zIndex: 1,
  };
};
