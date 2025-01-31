import { useState, Dispatch, SetStateAction, useContext } from "react";
import { Square } from "chess.js";
import { Puzzle } from "../types/puzzle";
import { PuzzleContext } from "../context/PuzzleContext";
import { Classification } from "../types/move";

const useChangePuzzle = (
  puzzles: Puzzle[],
  setDstSquare: Dispatch<SetStateAction<Square | null>>,
  setSrcSquare: Dispatch<SetStateAction<Square | null>>,
  setFen: Dispatch<SetStateAction<string>>,
  setMoveFeedback: Dispatch<
    SetStateAction<{ best: string | null; played: string | null }>
  >,
  setClassification: Dispatch<SetStateAction<Classification | null>>,
  setIsPuzzleSolved: Dispatch<SetStateAction<boolean | null>>
) => {
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const { setPuzzle } = useContext(PuzzleContext);

  const jumpToPuzzle = (index: number) => {
    if (index < 0 || index >= puzzles.length) return;

    setClassification(null);
    setIsPuzzleSolved(null);
    setMoveFeedback({ best: null, played: null });
    setPuzzle(puzzles[index]);
    setPuzzleIndex(index);
    setFen(puzzles[index].fen.previous);
    setDstSquare(null);
    setSrcSquare(null);
  };
  const nextPuzzle = () => {
    if (puzzles.length === 0) return;
    setClassification(null);
    setIsPuzzleSolved(null);
    setMoveFeedback({ best: null, played: null });

    if (puzzleIndex + 1 < puzzles.length) {
      setPuzzle(puzzles[puzzleIndex + 1]);
      setPuzzleIndex(puzzleIndex + 1);
      setFen(puzzles[puzzleIndex + 1].fen.previous);
    }
    setDstSquare(null);
    setSrcSquare(null);
  };

  const prevPuzzle = () => {
    if (puzzles.length === 0) return;
    setClassification(null);
    setIsPuzzleSolved(null);
    setMoveFeedback({ best: null, played: null });
    if (puzzleIndex - 1 >= 0) {
      setPuzzle(puzzles[puzzleIndex - 1]);
      setPuzzleIndex(puzzleIndex - 1);
      setFen(puzzles[puzzleIndex - 1].fen.previous);
    }
    setDstSquare(null);
    setSrcSquare(null);
  };

  return { puzzleIndex, nextPuzzle, prevPuzzle, jumpToPuzzle };
};

export default useChangePuzzle;
