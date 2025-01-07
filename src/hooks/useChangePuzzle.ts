import { useState, Dispatch, SetStateAction, useContext} from "react";
import { Square } from "chess.js";
import { Puzzle} from "../types/puzzle";
import { PuzzleContext } from "../context/PuzzleContext";
import { Classification } from "../types/move";

const useChangePuzzle = (
  puzzles: Puzzle[],
  setDstSquare: Dispatch<SetStateAction<Square | "">>,
  setSrcSquare: Dispatch<SetStateAction<Square | "">>,
  setFen: Dispatch<SetStateAction<string>>,
  setMoveFeedback: Dispatch<SetStateAction<{best:string,played:string}>>,
  setClassification: Dispatch<SetStateAction<"" | Classification>>,
  setIsPuzzleSolved: Dispatch<SetStateAction<boolean | null>>
  
) => {
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const { setPuzzle } = useContext(PuzzleContext);

  const jumpToPuzzle = (index: number) => {
    if (index < 0 || index >= puzzles.length) return;

    setClassification("");
    setIsPuzzleSolved(null);
    setMoveFeedback({best:"",played:""});
    setPuzzle(puzzles[index]);
    setPuzzleIndex(index);
    setFen(puzzles[index].fen.previous);
    setDstSquare("");
    setSrcSquare("");
  };
  const nextPuzzle = () => {
    if (puzzles.length === 0) return;
    setClassification("");
    setIsPuzzleSolved(null);
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
    setClassification("");
    setIsPuzzleSolved(null);
    setMoveFeedback({best:"",played:""});
    if (puzzleIndex - 1 >= 0) {
      setPuzzle(puzzles[puzzleIndex - 1]);
      setPuzzleIndex(puzzleIndex - 1);
      setFen(puzzles[puzzleIndex - 1].fen.previous);
    }
    setDstSquare("");
    setSrcSquare("");
  };

  return { puzzleIndex, nextPuzzle, prevPuzzle, jumpToPuzzle};
};

export default useChangePuzzle;