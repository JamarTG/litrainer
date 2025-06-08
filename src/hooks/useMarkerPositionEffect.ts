import { useEffect, RefObject } from "react";
import { Square } from "chess.js";
import { useDispatch } from "react-redux";
import { setMarkerPosition } from "@/redux/slices/board";
import { ColorLongForm } from "@/types/lichess";
import { useSelector } from "react-redux";
import { getUserColor } from "@/redux/slices/puzzle";

export const useMarkerPositionEffect = (
  destinationSquare: Square | null,
  boardSize: number,
  boardRef?: RefObject<HTMLDivElement>,
  orientation?: ColorLongForm
) => {
  const puzzleColor = useSelector(getUserColor);
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
  }, [destinationSquare, dispatch, boardSize, puzzleColor, boardRef, orientation]);
};
