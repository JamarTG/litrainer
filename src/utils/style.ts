import { Move, Square } from "chess.js";
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
          : 'grey',
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
          : 'grey',
      backgroundSize: "30%",
      opacity: classification ? 0.7 : 1,
      backgroundPosition: "top right",
      backgroundRepeat: "no-repeat",
    };
  }

  return styles;
};

export const getHighlightedLegalMoves = (legalMoves: Move[]) => {
  return legalMoves.reduce((styles, move) => {
    styles[move.to] = getSquareStyle(!!move.captured);
    return styles;
  }, {} as Record<string, any>);
};

export const getSquareStyle = (isCaptureMove: boolean) => {
  return {
    background: isCaptureMove
      ? "radial-gradient(circle, transparent 55%, rgba(0,0,0, 0.2) 35%)"
      : "radial-gradient(circle, rgba(0,0,0, 0.2) 30%, transparent 35%)",
    borderRadius: "50%",
    zIndex: 1,
  };
};

export const getColorLongForm = (color: "w" | "b") =>
  color === "w" ? "white" : "black";