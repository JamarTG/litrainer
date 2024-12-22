import { BOARD_DIMENSIONS } from "../constants";


export const calculateBoardSize = (
windowWidth: number, windowHeight: number, offset: number = 100  ): number => {
    return Math.max(
      BOARD_DIMENSIONS.MIN_SIZE,
      Math.min(
        BOARD_DIMENSIONS.MAX_SIZE,
        Math.min(windowWidth - offset, windowHeight - offset)
      )
    );
  };