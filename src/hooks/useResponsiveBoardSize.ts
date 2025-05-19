import { useEffect, useState } from 'react';
import { boardDimensions } from '../constants/board';

const useResponsiveBoardSize = () => {
  const { initialSize, minSize, maxSize } = boardDimensions;
  const [boardSize, setBoardSize] = useState<number>(initialSize);

  useEffect(() => {
    const handleResize = () => {
      const maxViewportSize = Math.min(window.innerWidth, window.innerHeight);
      const margin = 20;
      const newSize = Math.max(minSize, Math.min(maxSize, maxViewportSize - margin * 2));
      setBoardSize(newSize);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [minSize, maxSize]);

  return { boardSize, setBoardSize };
};

export default useResponsiveBoardSize;
