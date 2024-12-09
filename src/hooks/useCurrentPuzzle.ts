import { Dispatch, SetStateAction, useEffect } from "react";
import { Models } from "../typings";

const useCurrentPuzzle = (
  puzzles: Models.Move.Info[][],
  puzzleIndex: Models.Move.Index,
  setCurrentPuzzle: Dispatch<SetStateAction<Models.Move.Info | null>>
) => {
  useEffect(() => {
    setCurrentPuzzle(puzzles[puzzleIndex.x]?.[puzzleIndex.y] || null);
  }, [puzzleIndex, puzzles, setCurrentPuzzle]);
};

export default useCurrentPuzzle;
