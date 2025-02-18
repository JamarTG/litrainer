import { useEffect } from "react";
import { Square } from "chess.js";
import { getSquarePosition } from "../utils/chess";
// import { getColorLongForm } from "../utils/style";

export const useMarkerPositionEffect = (
  destinationSquare: Square | null,
  boardSize: number,
  setMarkerPosition: (position: { right: number; top: number }) => void,
  puzzleColor?: "w" | "b",

) => {
  useEffect(() => {
    if (destinationSquare && puzzleColor) {
      const { right, top } = getSquarePosition(
        destinationSquare,
        boardSize,
        puzzleColor
      );
      setMarkerPosition({ right, top });
    }
  }, [destinationSquare, boardSize, puzzleColor, setMarkerPosition]);
};
