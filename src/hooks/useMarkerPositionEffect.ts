import { useEffect } from "react";
import { Square } from "chess.js";
import { getSquarePosition } from "../utils/chess/board";
import { useDispatch } from "react-redux";
import { setMarkerPosition } from "../redux/slices/boardSlices";

export const useMarkerPositionEffect = (
  destinationSquare: Square | null,
  boardSize: number,
  puzzleColor?: "w" | "b",

) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (destinationSquare && puzzleColor) {
      const { right, top } = getSquarePosition(
        destinationSquare,
        boardSize,
        puzzleColor
      );
      dispatch(setMarkerPosition({ right, top }));
    }
  }, [destinationSquare, dispatch, boardSize, puzzleColor]);
};
