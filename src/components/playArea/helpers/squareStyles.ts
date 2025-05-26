import { Move} from "chess.js";
import { CSSProperties } from "react";
import {
  LEGAL_MOVE_GRADIENTS,
} from "../../../constants/board";



export const getHighlightedLegalMoves = (legalMoves: Move[]) => {
  return legalMoves.reduce((styles, move) => {
    const isCaptureMove = !!move.captured;

    styles[move.to] = {
      background: isCaptureMove ? LEGAL_MOVE_GRADIENTS.capture : LEGAL_MOVE_GRADIENTS.move,
      borderRadius: "50%",
      zIndex: 1,
    };
    return styles;
  }, {} as Record<string, CSSProperties>);
};
