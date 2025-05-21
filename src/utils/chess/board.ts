import { Color, Square } from "chess.js";
import { boardDimensions } from "../../constants/board";

export const calculateBoardSize = (
  windowWidth: number,
  windowHeight: number,
  offset: number = 100
): number => {
  const { minimumSize, maximumSize } = boardDimensions;

  // Use only half the window width
  const halfWindowWidth = windowWidth / 2;
  const usableWidth = halfWindowWidth - offset;
  const usableHeight = windowHeight - offset;

  const smallestUsableDimension = Math.min(usableWidth, usableHeight);
  const clampedSize = Math.min(maximumSize, Math.max(minimumSize, smallestUsableDimension));

  return clampedSize;
};


export const getSquareCoordinates = (
  square: Square,
  chessBoardSize: number, 
  boardOrientation: Color
) => {

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
