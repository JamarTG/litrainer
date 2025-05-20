import { Color, Square } from "chess.js";
import { boardDimensions } from "../../constants/board";
import { SquareCoordinates } from "../../types/board";

export const calculateBoardSize = (windowWidth: number, windowHeight: number, offset: number = 100): number => {
  const { minimumSize, maximumSize } = boardDimensions;

  const smallestWindowDimension = Math.min(windowWidth - offset, windowHeight - offset);
  const clampedSize = Math.min(maximumSize, Math.max(minimumSize, smallestWindowDimension));

  return clampedSize;
};

export const getSquareCoordinates = (
  square: Square,
  chessBoardSize: number, 
  boardOrientation: Color
): SquareCoordinates => {

  const [fileLetter, rankNumberAsString] = square;
  const fileLetterASCIINumberCode = fileLetter.charCodeAt(0);
  const ASCIINumberCodeForA = "a".charCodeAt(0);
  const rankNumberAsInteger = parseInt(rankNumberAsString, 10);
  const endRank = 8;
  const file = fileLetterASCIINumberCode - ASCIINumberCodeForA;
  const rank = endRank - rankNumberAsInteger
  const numberOfSquaresOnRank = 8;
  const arbitraryOffsetConstant = 0.3;
  const singleSquareSize = chessBoardSize / numberOfSquaresOnRank;
  const topOffset = singleSquareSize * arbitraryOffsetConstant;
  const rightOffset = singleSquareSize * arbitraryOffsetConstant;
  const isBoardWhiteOriented = boardOrientation === "w";

  if (isBoardWhiteOriented) {
    return {
      right: (7 - file) * singleSquareSize - rightOffset,
      top: rank * singleSquareSize - topOffset,
    };
  } else {
    return {
      right: file * singleSquareSize - rightOffset,
      top: (7 - rank) * singleSquareSize - topOffset,
    };
  }
};
