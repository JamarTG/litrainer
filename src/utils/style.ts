import { Move, Square } from "chess.js";
import { CSSProperties } from "react";
import { ClassificationColors, MoveClassification } from "../constants/classification";
import { Classification } from "../types/classification";

export const getCustomSquareStyles = (
  dstSquare: Square | null,
  srcSquare: Square | null,
  classification: Classification | null,
  moveSquares: Record<string, CSSProperties>,
  isLoadingEvaluation: boolean
) => {
  const styles: Record<string, CSSProperties> = { ...moveSquares };

  if (dstSquare && srcSquare) {
    const baseStyles = {
      backgroundSize: "30%",
      backgroundPosition: "top right",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        classification && !isLoadingEvaluation
          ? ClassificationColors[MoveClassification[classification as keyof typeof MoveClassification]]
          : "grey",
    };

    styles[dstSquare] = {
      ...baseStyles,
    };

    styles[srcSquare] = {
      ...baseStyles,
      opacity: classification ? 0.7 : 1,
    };
  }

  return styles;
};

export const getHighlightedLegalMoves = (legalMoves: Move[]) => {
  return legalMoves.reduce((styles, move) => {
    const isCaptureMove = !!move.captured;

    styles[move.to] = {
      background: isCaptureMove
        ? "radial-gradient(circle, transparent 55%, rgba(0,0,0, 0.2) 35%)"
        : "radial-gradient(circle, rgba(0,0,0, 0.2) 30%, transparent 35%)",
      borderRadius: "50%",
      zIndex: 1,
    };
    return styles;
  }, {} as Record<string, CSSProperties>);
};
