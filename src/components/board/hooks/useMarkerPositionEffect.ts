import { useEffect, RefObject } from "react";
import { Square } from "chess.js";
import { useDispatch } from "react-redux";
import { setMarkerPosition } from "@/redux/slices/board";
import { ColorLongForm } from "@/types/lichess";
import { useSelector } from "react-redux";
import { getUserColor } from "@/redux/slices/puzzle";
import { calculateMarkerPosition } from "@/utils/marker";

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

        const markerPosition = calculateMarkerPosition(
          destinationSquare,
          boardSize,
          puzzleColor,
          boardRef,
          orientation
        );

        if (markerPosition) {
          dispatch(setMarkerPosition({ top: markerPosition.top, right: markerPosition.right }));
        }
      });
    }
  }, [destinationSquare, dispatch, boardSize, puzzleColor, boardRef, orientation]);
};
