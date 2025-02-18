import { useState, useEffect, useRef, useCallback } from 'react';
import { BOARD_DIMENSIONS } from '../constants/board';

const useResizableBoard = () => {
  const { INITIAL_SIZE, MIN_SIZE, MAX_SIZE } = BOARD_DIMENSIONS;
  const [boardSize, setBoardSize] = useState<number>(INITIAL_SIZE);
  const boardRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef<boolean>(false);

  const handleResize = useCallback(() => {
    if (!isResizing.current) {
    
      const maxViewportSize = Math.min(window.innerWidth, window.innerHeight);
      const margin = 20;
      const maxBoardSize = maxViewportSize - margin * 2;

      setBoardSize(Math.max(MIN_SIZE, Math.min(MAX_SIZE, maxBoardSize)));
    }
  }, [MIN_SIZE, MAX_SIZE]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;

    const initialX = e.clientX;
    const initialWidth = boardRef.current?.offsetWidth || INITIAL_SIZE;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const width = initialWidth + (moveEvent.clientX - initialX);
      setBoardSize(Math.max(MIN_SIZE, Math.min(width, MAX_SIZE)));
    };

    const onMouseUp = () => {
      isResizing.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [INITIAL_SIZE,MIN_SIZE,MAX_SIZE]);

  return { boardSize, boardRef, resizeRef, handleMouseDown };
};

export default useResizableBoard;