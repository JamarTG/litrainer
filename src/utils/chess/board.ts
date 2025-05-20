import { Square } from "chess.js";
import { boardDimensions } from "../../constants/board";

export const calculateBoardSize = (windowWidth: number, windowHeight: number, offset: number = 100): number => {
  const { minimumSize, maximumSize } = boardDimensions;

  const smallestWindowDimension = Math.min(windowWidth - offset, windowHeight - offset);
  const clampedSize = Math.min(maximumSize, Math.max(minimumSize, smallestWindowDimension));

  return clampedSize;
};

export const getSquarePosition = (
  square: Square,
  boardSize: number,
  orientation: "w" | "b"
): { top: number; right: number } => {
  const [fileChar, rankChar] = square;
  const file = fileChar.charCodeAt(0) - "a".charCodeAt(0);
  const rank = 8 - parseInt(rankChar, 10);

  const squareSize = boardSize / 8;

  const topOffset = squareSize * 0.3;
  const rightOffset = squareSize * 0.3;

  if (orientation === "w") {
    return {
      right: (7 - file) * squareSize - rightOffset,
      top: rank * squareSize - topOffset,
    };
  } else {
    return {
      right: file * squareSize - rightOffset,
      top: (7 - rank) * squareSize - topOffset,
    };
  }
};
