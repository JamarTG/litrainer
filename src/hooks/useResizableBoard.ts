import { useState, useEffect, useRef, useCallback } from 'react';
import { boardDimensions } from '../constants/board';

const useResizableBoard = () => {
  const { initialSize, minimumSize, maximumSize} = boardDimensions;
  const [boardSize, setBoardSize] = useState<number>(initialSize);
  const boardRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef<boolean>(false);

  const handleResize = useCallback(() => {
    if (!isResizing.current) {
    
      const maxViewportSize = Math.min(window.innerWidth, window.innerHeight);
      const margin = 20;
      const maxBoardSize = maxViewportSize - margin * 2;

      setBoardSize(Math.max(minimumSize, Math.min(maximumSize, maxBoardSize)));
    }
  }, [minimumSize, maximumSize]);

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
    const initialWidth = boardRef.current?.offsetWidth || initialSize;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const width = initialWidth + (moveEvent.clientX - initialX);
      setBoardSize(Math.max(minimumSize, Math.min(width, minimumSize)));
    };

    const onMouseUp = () => {
      isResizing.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [minimumSize,initialSize]);

  return { boardSize, boardRef, resizeRef, handleMouseDown };
};

export default useResizableBoard;