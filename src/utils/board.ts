import { boardDimensions } from "../constants/board";

export const calculateBoardSize = (windowWidth: number, windowHeight: number, offset: number = 100): number => {
  const { minimumSize, maximumSize } = boardDimensions;

  const smallestWindowDimension = Math.min(windowWidth - offset, windowHeight - offset);
  const clampedSize = Math.min(maximumSize, Math.max(minimumSize, smallestWindowDimension));

  return clampedSize;
};
