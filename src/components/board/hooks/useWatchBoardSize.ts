import { RefObject, useEffect, useState } from "react";

const useWatchBoardSize = (boardRef: RefObject<HTMLDivElement>) => {
  const [boardSize, setBoardSize] = useState<number | null>(null);
  useEffect(() => {
    const updateBoardSize = () => {
      if (boardRef.current) {
        setBoardSize(boardRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", updateBoardSize);
    return () => window.removeEventListener("resize", updateBoardSize);
  }, [boardSize, boardRef]);

  return boardSize;
};

export default useWatchBoardSize;
