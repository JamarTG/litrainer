import { useEffect } from "react";
import { Square } from "chess.js";
import { getSquarePosition } from "../utils/chess";
import { getColorLongForm } from "../utils/style";

export const useMarkerPositionEffect = (
  destinationSquare: Square | "",
  boardSize: number,
  puzzleColor: "w" | "b" | undefined,
  setMarkerPosition: (position: { right: number; top: number }) => void
) => {
  useEffect(() => {
    if (destinationSquare) {
      const { right, top } = getSquarePosition(
        destinationSquare,
        boardSize,
        getColorLongForm(puzzleColor ?? "w")
      );
      setMarkerPosition({ right, top });
    }
  }, [destinationSquare, boardSize, puzzleColor, setMarkerPosition]);
};