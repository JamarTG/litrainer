// useResizableBoard.ts
import { useRef, useState, useCallback } from "react";

const useResizeableBoard = (initialSize: number = 500, minSize: number = 200, maxSize: number = 500) => { // Adjusted maxSize to 500
  const [boardSize, setBoardSize] = useState<number>(initialSize);
  const boardRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    const initialX = e.clientX;
    const initialWidth = boardRef.current?.offsetWidth || initialSize;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const width = initialWidth + (moveEvent.clientX - initialX);
      setBoardSize(Math.max(minSize, Math.min(width, maxSize)));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, [initialSize, minSize, maxSize]);

  return { setBoardSize, boardSize, boardRef, resizeRef, handleMouseDown };
};

export default useResizeableBoard;