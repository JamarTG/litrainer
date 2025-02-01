import { useState, useEffect, RefObject } from 'react';
import { calculateBoardSize } from '../utils/board';
import { BOARD_DIMENSIONS } from '../constants/board';

const useBoardSize = (boardRef: RefObject<HTMLDivElement>) => {
  const [boardSize, setBoardSize] = useState<number>(BOARD_DIMENSIONS.INITIAL_SIZE);

  useEffect(() => {
    const handleResize = () => {
      if (boardRef.current) {
        setBoardSize(calculateBoardSize(window.innerWidth, window.innerHeight));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [boardRef, BOARD_DIMENSIONS.MIN_SIZE, BOARD_DIMENSIONS.MAX_SIZE]);

  return boardSize;
};

export default useBoardSize;