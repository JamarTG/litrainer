import { useEffect, RefObject } from "react";
import { Color, Square } from "chess.js";
import { useDispatch } from "react-redux";
import { setMarkerPosition } from "../redux/slices/board";

export const useMarkerPositionEffect = (
  destinationSquare: Square | null,
  boardSize: number,
  puzzleColor?: Color,
  boardRef?: RefObject<HTMLDivElement>,
  orientation?: "white" | "black"
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (destinationSquare && puzzleColor && boardRef?.current) {
      requestAnimationFrame(() => {
        const [fileLetter, rankNumberAsString] = destinationSquare;
        const fileLetterASCIINumberCode = fileLetter.charCodeAt(0);
        const ASCIINumberCodeForA = "a".charCodeAt(0);
        const rankNumberAsInteger = parseInt(rankNumberAsString, 10);

        const file = fileLetterASCIINumberCode - ASCIINumberCodeForA;
        const rank = 8 - rankNumberAsInteger;

        const numberOfSquaresOnRank = 8;
        const singleSquareSize = boardSize / numberOfSquaresOnRank;

        const effectiveBoardOrientation = orientation === "white" ? "w" : orientation === "black" ? "b" : puzzleColor;
        const isBoardWhiteOriented = effectiveBoardOrientation === "w";

        const arbitraryOffsetConstant = 0.3;
        const topOffset = singleSquareSize * arbitraryOffsetConstant;
        const rightOffset = singleSquareSize * arbitraryOffsetConstant;

        const position = isBoardWhiteOriented
          ? {
              right: (7 - file) * singleSquareSize - rightOffset,
              top: rank * singleSquareSize - topOffset
            }
          : {
              right: file * singleSquareSize - rightOffset,
              top: (7 - rank) * singleSquareSize - topOffset
            };

        dispatch(setMarkerPosition(position));
      });
    }
  }, [destinationSquare, dispatch, boardSize, puzzleColor, boardRef?.current, orientation]);
};
