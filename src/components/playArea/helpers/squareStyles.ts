import { Move, Square } from "chess.js";
import { CSSProperties } from "react";
import { Classification } from "../../../types/classification";
import { ClassificationColors, MoveClassification } from "../../../constants/classification";
import { BASE_SQUARE_HIGHLIGHT_STYLES, CLASSIFICATION_OPACITY, DEFAULT_CLASSIFICATION_COLOR, LEGAL_MOVE_GRADIENTS } from "../../../constants/board";

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
      ...BASE_SQUARE_HIGHLIGHT_STYLES,
      backgroundColor:
        classification && !isLoadingEvaluation
          ? ClassificationColors[MoveClassification[classification as keyof typeof MoveClassification]]
          : DEFAULT_CLASSIFICATION_COLOR,
    };

    styles[dstSquare] = {
      ...baseStyles,
    };

    styles[srcSquare] = {
      ...baseStyles,
      opacity: classification ? CLASSIFICATION_OPACITY : 1,
    };
  }

  return styles;
};

export const getHighlightedLegalMoves = (legalMoves: Move[]) => {
  return legalMoves.reduce((styles, move) => {
    const isCaptureMove = !!move.captured;

    styles[move.to] = {
      background: isCaptureMove
        ? LEGAL_MOVE_GRADIENTS.capture
        : LEGAL_MOVE_GRADIENTS.move,
      borderRadius: "50%",
      zIndex: 1,
    };
    return styles;
  }, {} as Record<string, CSSProperties>);
};