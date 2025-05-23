import { useEffect, useState } from 'react';
import { boardDimensions } from '../constants/board';

const useResponsiveBoardSize = () => {
  const { initialSize, minimumSize, maximumSize } = boardDimensions;
  const [boardSize, setBoardSize] = useState<number>(initialSize);

  useEffect(() => {
    const handleResize = () => {
      const maxViewportSize = Math.min(window.innerWidth, window.innerHeight);
    
      const newSize = Math.max(minimumSize, Math.min(maximumSize, maxViewportSize ));
      setBoardSize(newSize);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [minimumSize, maximumSize]);

  return { boardSize, setBoardSize };
};

export default useResponsiveBoardSize;
