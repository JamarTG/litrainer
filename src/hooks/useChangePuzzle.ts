import { useState, Dispatch, SetStateAction } from "react";
import { STARTINGPOSFEN } from "../constants";
import { Puzzle, PuzzleIndex } from "../types/puzzle";

const useChangePuzzle = (
  puzzles: Puzzle[][],
  setCurrentPuzzle: Dispatch<SetStateAction<Puzzle | null>>
) => {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [puzzleIndex, setPuzzleIndex] = useState<PuzzleIndex>({ x: 0, y: 0 });
  const [fen, setFen] = useState<string>(STARTINGPOSFEN);

  const moveToNextPuzzle = () => {
    if (puzzles.length === 0) return;

    if (!sessionStarted) {
      setSessionStarted(true);
    }

    if (puzzleIndex.y + 1 < puzzles[puzzleIndex.x]?.length) {
      setCurrentPuzzle(puzzles[puzzleIndex.x][puzzleIndex.y + 1]);
      setPuzzleIndex({ x: puzzleIndex.x, y: puzzleIndex.y + 1 });
      setFen(puzzles[puzzleIndex.x][puzzleIndex.y + 1].fen.previous);
    } else if (puzzleIndex.x + 1 < puzzles.length) {
      setCurrentPuzzle(puzzles[puzzleIndex.x + 1][0]);
      setPuzzleIndex({ x: puzzleIndex.x + 1, y: 0 });
      setFen(puzzles[puzzleIndex.x + 1][0].fen.previous);
    }
  };

  const moveToPreviousPuzzle = () => {
    if (puzzles.length === 0) return;

    if (puzzleIndex.y > 0) {
      setCurrentPuzzle(puzzles[puzzleIndex.x][puzzleIndex.y - 1]);
      setPuzzleIndex({ x: puzzleIndex.x, y: puzzleIndex.y - 1 });
      setFen(puzzles[puzzleIndex.x][puzzleIndex.y - 1].fen.previous);
    } else if (puzzleIndex.x > 0) {
      const newY = puzzles[puzzleIndex.x - 1].length - 1;
      setCurrentPuzzle(puzzles[puzzleIndex.x - 1][newY]);
      setPuzzleIndex({ x: puzzleIndex.x - 1, y: newY });
      setFen(puzzles[puzzleIndex.x - 1][newY].fen.previous);
    }
  };

  return {
    puzzleIndex,
    fen,
    setFen,
    moveToNextPuzzle,
    moveToPreviousPuzzle,
    sessionStarted,
    setSessionStarted,
  };
};

export default useChangePuzzle;
