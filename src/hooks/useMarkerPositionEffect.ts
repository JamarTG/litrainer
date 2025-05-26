import { useEffect, RefObject } from "react";
import { Color, Square } from "chess.js";
import { getSquareCoordinates } from "../utils/chess/board";
import { useDispatch } from "react-redux";
import { setMarkerPosition } from "../redux/slices/boardSlices";

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
      // Wait for next frame to ensure board is fully rendered
      requestAnimationFrame(() => {
        const { right, top } = getSquareCoordinates(
          destinationSquare,
          boardSize,
          puzzleColor,
          orientation ? (orientation === "white" ? "w" : "b") : puzzleColor
        );
        dispatch(setMarkerPosition({ right, top }));
      });
    }
  }, [destinationSquare, dispatch, boardSize, puzzleColor, boardRef?.current, orientation]);
};
