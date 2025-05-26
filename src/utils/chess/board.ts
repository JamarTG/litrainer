import { Color, Square } from "chess.js";
import { BOARD_THEMES } from "../../constants/board";

export const getSquareCoordinates = (
  square: Square,
  boardSize: number,
  puzzleColor: Color,
  boardOrientation?: Color
) => {
  const [fileLetter, rankNumberAsString] = square;
  const fileLetterASCIINumberCode = fileLetter.charCodeAt(0);
  const ASCIINumberCodeForA = "a".charCodeAt(0);
  const rankNumberAsInteger = parseInt(rankNumberAsString, 10);
  
  const file = fileLetterASCIINumberCode - ASCIINumberCodeForA; 
  const rank = 8 - rankNumberAsInteger; 
  
  const numberOfSquaresOnRank = 8;
  const singleSquareSize = boardSize / numberOfSquaresOnRank;
  
  const effectiveBoardOrientation = boardOrientation || puzzleColor;
  const isBoardWhiteOriented = effectiveBoardOrientation === "w";

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