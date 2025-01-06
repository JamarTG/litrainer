import { useState, Dispatch, SetStateAction, useContext} from "react";
import { Square } from "chess.js";
import { Puzzle} from "../types/puzzle";
import { PuzzleContext } from "../context/PuzzleContext";

const useChangePuzzle = (
  puzzles: Puzzle[],
  setDstSquare: Dispatch<SetStateAction<Square | "">>,
  setSrcSquare: Dispatch<SetStateAction<Square | "">>,
  setFen: Dispatch<SetStateAction<string>>,
  setMoveFeedback: Dispatch<SetStateAction<{best:string,played:string}>>
  
) => {
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const { setPuzzle } = useContext(PuzzleContext);

  const nextPuzzle = () => {
    if (puzzles.length === 0) return;
    
    setMoveFeedback({best:"",played:""});

    if (puzzleIndex + 1 < puzzles.length) {
      setPuzzle(puzzles[puzzleIndex + 1]);
      setPuzzleIndex(puzzleIndex + 1);
      setFen(puzzles[puzzleIndex + 1].fen.previous);
    }
    setDstSquare("");
    setSrcSquare("");
  };

  const prevPuzzle = () => {
    if (puzzles.length === 0) return;

    setMoveFeedback({best:"",played:""});
    if (puzzleIndex - 1 >= 0) {
      setPuzzle(puzzles[puzzleIndex - 1]);
      setPuzzleIndex(puzzleIndex - 1);
      setFen(puzzles[puzzleIndex - 1].fen.previous);
    }
    setDstSquare("");
    setSrcSquare("");
  };

  return { puzzleIndex, nextPuzzle, prevPuzzle };
};

export default useChangePuzzle;