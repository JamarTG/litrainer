  import { Move, Square } from "chess.js";
  import {
  Classification,
  ClassificationColors,
  MoveClassification,
  } from "../types/move";
  import { CSSProperties } from "react";

  const generateSquareStyle = (classification: Classification | null, isLoadingEvaluation: boolean) => ({
  backgroundColor:
    classification && !isLoadingEvaluation
      ? ClassificationColors[MoveClassification[classification as keyof typeof MoveClassification]]
      : 'grey',
  backgroundSize: "30%",
  backgroundPosition: "top right",
  backgroundRepeat: "no-repeat",
  });

  export const getCustomSquareStyles = (
  dstSquare: Square | null,
  srcSquare: Square | null,
  classification: Classification | null,
  moveSquares: Record<string, CSSProperties>,
  isLoadingEvaluation: boolean
  ) => {
  const styles: Record<string, CSSProperties> = { ...moveSquares };

  if (dstSquare && srcSquare) {
    styles[dstSquare] = generateSquareStyle(classification, isLoadingEvaluation);
    styles[srcSquare] = {
      ...generateSquareStyle(classification, isLoadingEvaluation),
      opacity: classification ? 0.7 : 1,
    };
  }

  return styles;
  };

  export const getHighlightedLegalMoves = (legalMoves: Move[]) => {
  return legalMoves.reduce((styles, move) => {
    styles[move.to] = getSquareStyle(!!move.captured);
    return styles;
  }, {} as Record<string, CSSProperties>);
  };

  export const getSquareStyle = (isCaptureMove: boolean) => ({
  background: isCaptureMove
    ? "radial-gradient(circle, transparent 55%, rgba(0,0,0, 0.2) 35%)"
    : "radial-gradient(circle, rgba(0,0,0, 0.2) 30%, transparent 35%)",
  borderRadius: "50%",
  zIndex: 1,
  });

