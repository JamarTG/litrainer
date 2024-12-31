import { useEffect } from "react";
import { getSquarePosition } from "../../../utils/chess";
import { Square } from "chess.js";

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
        puzzleColor === "w" ? "white" : "black"
      );
      setMarkerPosition({ right, top });
    }
  }, [destinationSquare, boardSize, puzzleColor, setMarkerPosition]);
};