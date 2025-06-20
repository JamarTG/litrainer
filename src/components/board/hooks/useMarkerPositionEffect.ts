import { useEffect, RefObject } from "react";
import { Square } from "chess.js";
import { useDispatch } from "react-redux";
import { setMarkerPosition } from "@/redux/slices/board";
import { ColorLongForm } from "@/types/lichess";
import { useSelector } from "react-redux";
import { getUserColor } from "@/redux/slices/puzzle";

const convertSquareToFileRank = (square: Square): [number, number] => {
  const [fileLetter, rankChar] = square;
  const file = fileLetter.charCodeAt(0) - "a".charCodeAt(0);
  const rank = 8 - parseInt(rankChar, 10);
  return [file, rank];
};

const determineSquareSize = (boardSize: number): number => {
  return boardSize / 8;
};

const getOrientation = (orientation: ColorLongForm | undefined, puzzleColor: ColorLongForm): "w" | "b" => {
  if (orientation === "white") return "w";
  if (orientation === "black") return "b";
  return puzzleColor === "white" ? "w" : "b";
};

const calculateOffset = (squareSize: number): number => {
  return 0.3 * squareSize; // Adjust this value as needed for centering
};

const calculateMarkerPosition = (
  destinationSquare: Square,
  boardSize: number,
  puzzleColor: ColorLongForm,
  boardRef?: RefObject<HTMLDivElement>,
  orientation?: ColorLongForm
) => {
  if (!destinationSquare || !boardRef?.current) return;
  // Step 1: Convert square string (e.g. "e4") to file (0–7) and rank (0–7)
  const [file, rank] = convertSquareToFileRank(destinationSquare);
  // Step 2: Determine square size (assuming 8x8 board)
  const squareSize = determineSquareSize(boardSize);
  // Step 3: Determine if the board is white- or black-oriented
  const isWhite = getOrientation(orientation, puzzleColor) === "w";
  // Step 4: Offset to adjust image placement (e.g. for centering)
  const offset = calculateOffset(squareSize);
  // Step 5: Calculate marker position
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

        // Step 6: Dispatch the position
        if (position) {
          dispatch(setMarkerPosition(position));
        }
      });
    }
  }, [destinationSquare, dispatch, boardSize, puzzleColor, boardRef, orientation]);
};
