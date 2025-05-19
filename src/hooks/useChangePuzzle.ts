import { useEffect, Dispatch, SetStateAction } from "react";
import { Square } from "chess.js";
import { Puzzle } from "../types/puzzle";
import { Classification } from "../types/classification";
import { useSelector } from "react-redux";
import { RootState } from "../pages/redux/store";

const useChangePuzzle = (
  puzzles: Puzzle[],
  setDstSquare: Dispatch<SetStateAction<Square | null>>,
  setSrcSquare: Dispatch<SetStateAction<Square | null>>,
  setFen: Dispatch<SetStateAction<string>>,
  setMoveFeedback: Dispatch<SetStateAction<{ best: string | null; played: string | null }>>,
  setClassification: Dispatch<SetStateAction<Classification | null>>,
  setIsPuzzleSolved: Dispatch<SetStateAction<boolean | null>>
) => {

  const puzzleIndex = useSelector((state: RootState) => state.puzzle.currentIndex);
  


  useEffect(() => {
    if (puzzles.length === 0) return;

    setClassification(null);
    setIsPuzzleSolved(null);
    setMoveFeedback({ best: null, played: null });
    setFen(puzzles[puzzleIndex].fen.previous);
    setDstSquare(null);
    setSrcSquare(null);
   
  }, [
    puzzleIndex,
    puzzles,
    setFen,
    setDstSquare,
    setSrcSquare,
    setMoveFeedback,
    setClassification,
    setIsPuzzleSolved,
  ]);
};

export default useChangePuzzle;
