import { useEffect, RefObject } from "react";
import { Square } from "chess.js";
import { useDispatch } from "react-redux";
import { setMarkerPosition } from "@/redux/slices/board";
import { ColorLongForm } from "@/types/lichess";
import { useSelector } from "react-redux";
import { getUserColor } from "@/redux/slices/puzzle";
import { isWhiteOrientationLong } from "@/utils/color";

const convertSquareToFileRank = (square: Square): [number, number] => {
  const [fileLetter, rankChar] = square;
  const file = fileLetter.charCodeAt(0) - "a".charCodeAt(0);
  const rank = 8 - parseInt(rankChar, 10);
  return [file, rank];
};

const determineSquareSize = (boardSize: number): number => {
  return boardSize / 8;
};

const calculateOffset = (squareSize: number): number => {
  return 0.3 * squareSize;
};

const calculateMarkerPosition = (
  destinationSquare: Square,
  boardSize: number,
  puzzleColor: ColorLongForm,
  boardRef?: RefObject<HTMLDivElement>,
  orientation?: ColorLongForm
) => {
  if (!destinationSquare || !boardRef?.current) return;

  const [file, rank] = convertSquareToFileRank(destinationSquare);

  const squareSize = determineSquareSize(boardSize);

  const isWhite = isWhiteOrientationLong(orientation || puzzleColor);

  const offset = calculateOffset(squareSize);

  const top = isWhite ? rank * squareSize - offset : (7 - rank) * squareSize - offset;
  const right = isWhite ? (7 - file) * squareSize - offset : file * squareSize - offset;
  return { top, right };
};

export const useMarkerPositionEffect = (
  destinationSquare: Square | null,
  boardSize: number,
  boardRef?: RefObject<HTMLDivElement>,
  orientation?: ColorLongForm
) => {
  const puzzleColor = useSelector(getUserColor) as ColorLongForm;
  const dispatch = useDispatch();

  useEffect(() => {
    if (destinationSquare && puzzleColor && boardRef?.current) {
      requestAnimationFrame(() => {
        if (!destinationSquare) return;

        const position = calculateMarkerPosition(destinationSquare, boardSize, puzzleColor, boardRef, orientation);

        if (position) {
          dispatch(setMarkerPosition(position));
        }
      });
    }
  }, [destinationSquare, dispatch, boardSize, puzzleColor, boardRef, orientation]);
};
