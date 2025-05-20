import { useEffect } from "react";
import { Color, Square } from "chess.js";
import { getSquareCoordinates } from "../utils/chess/board";
import { useDispatch } from "react-redux";
import { setMarkerPosition } from "../redux/slices/boardSlices";

export const useMarkerPositionEffect = (
  destinationSquare: Square | null,
  boardSize: number,
  puzzleColor?: Color,

) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (destinationSquare && puzzleColor) {
      const { right, top } = getSquareCoordinates(
        destinationSquare,
        boardSize,
        puzzleColor
      );
      dispatch(setMarkerPosition({ right, top }));
    }
  }, [destinationSquare, dispatch, boardSize, puzzleColor]);
};
