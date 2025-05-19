import { boardDimensions } from "../constants/board";

export const calculateBoardSize = (windowWidth: number, windowHeight: number, offset: number = 100): number => {
  const { minSize, maxSize } = boardDimensions;

  const smallestWindowDimension = Math.min(windowWidth - offset, windowHeight - offset);
  const clampedSize = Math.min(maxSize, Math.max(minSize, smallestWindowDimension));

  return clampedSize;
};
