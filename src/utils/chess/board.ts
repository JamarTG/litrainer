import { Color, Square } from "chess.js";
import { BOARD_THEMES } from "../../constants/board";

export const getSquareCoordinates = (
  square: Square,
  boardSize: number,
  puzzleColor: Color,
  boardOrientation?: Color
) => {
  // Parse the square notation (e.g., "e4" -> file: 4, rank: 3)
  const [fileLetter, rankNumberAsString] = square;
  const fileLetterASCIINumberCode = fileLetter.charCodeAt(0);
  const ASCIINumberCodeForA = "a".charCodeAt(0);
  const rankNumberAsInteger = parseInt(rankNumberAsString, 10);
  
  const file = fileLetterASCIINumberCode - ASCIINumberCodeForA; // 0-7 (a-h)
  const rank = 8 - rankNumberAsInteger; // Convert to 0-7 from bottom
  
  const numberOfSquaresOnRank = 8;
  const singleSquareSize = boardSize / numberOfSquaresOnRank;
  
  // Use the provided orientation, or fall back to puzzle color
  const effectiveBoardOrientation = boardOrientation || puzzleColor;
  const isBoardWhiteOriented = effectiveBoardOrientation === "w";

  // Offset constants for centering the marker
  const arbitraryOffsetConstant = 0.3;
  const topOffset = singleSquareSize * arbitraryOffsetConstant;
  const rightOffset = singleSquareSize * arbitraryOffsetConstant;

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

export function getBoardBackgroundStyle(boardThemeName: string) {
  const theme = Object.values(BOARD_THEMES).find(t => t.name === boardThemeName);
  if (!theme) return {};
  
  return {
    backgroundImage: `url(${theme.path})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };
}