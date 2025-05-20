import { useCallback, useRef } from 'react';
import { boardDimensions } from '../constants/board';

const useDraggableResizer = (setBoardSize: (size: number) => void) => {
  const { minimumSize, maximumSize } = boardDimensions;
  const boardRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef<boolean>(false);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;

    const initialX = e.clientX;
    const initialWidth = boardRef.current?.offsetWidth || 0;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = initialWidth + (moveEvent.clientX - initialX);
      setBoardSize(Math.max(minimumSize, Math.min(maximumSize, newWidth)));
    };

    const onMouseUp = () => {
      isResizing.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [minimumSize, maximumSize, setBoardSize]);

  return { boardRef, resizeRef, handleMouseDown };
};

export default useDraggableResizer;
