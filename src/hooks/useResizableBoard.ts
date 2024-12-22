import { useState, useEffect, useRef, useCallback } from 'react';

const useResizableBoard = (
  initialSize: number = 500,
  minSize: number = 200,
  maxSize: number = 800 // Adjusted maxSize to 800
) => {
  const [boardSize, setBoardSize] = useState<number>(initialSize);
  const boardRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef<boolean>(false);

  const handleResize = useCallback(() => {
    if (!isResizing.current) {
      const newSize = Math.max(
        minSize,
        Math.min(maxSize, Math.min(window.innerWidth - 100, window.innerHeight - 100))
      );
      setBoardSize(newSize);
    }
  }, [minSize, maxSize]);

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
      setBoardSize(Math.max(minSize, Math.min(width, maxSize)));
    };

    const onMouseUp = () => {
      isResizing.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [initialSize, minSize, maxSize]);

  return { boardSize, boardRef, resizeRef, handleMouseDown };
};

export default useResizableBoard;