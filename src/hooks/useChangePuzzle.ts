import { useState, Dispatch, SetStateAction, useContext} from "react";
import { Square } from "chess.js";
import { Puzzle, PuzzleIndex } from "../types/puzzle";
import { PuzzleContext } from "../context/PuzzleContext";

const useChangePuzzle = (
  puzzles: Puzzle[][],
  setDstSquare: Dispatch<SetStateAction<Square | "">>,
  setSrcSquare: Dispatch<SetStateAction<Square | "">>,
  fen: string,
  setFen: Dispatch<SetStateAction<string>>
  
) => {
  const [puzzleIndex, setPuzzleIndex] = useState<PuzzleIndex>({ x: 0, y: 0 });
  
  const { setPuzzle } = useContext(PuzzleContext);

  const nextPuzzle = () => {

    if (puzzles.length === 0) return;

    if (puzzleIndex.y + 1 < puzzles[puzzleIndex.x]?.length) {
      setPuzzle(puzzles[puzzleIndex.x][puzzleIndex.y + 1]);
      setPuzzleIndex({ x: puzzleIndex.x, y: puzzleIndex.y + 1 });
      setFen(puzzles[puzzleIndex.x][puzzleIndex.y + 1].fen.previous);
    } else if (puzzleIndex.x + 1 < puzzles.length) {
      setPuzzle(puzzles[puzzleIndex.x + 1][0]);
      setPuzzleIndex({ x: puzzleIndex.x + 1, y: 0 });
      setFen(puzzles[puzzleIndex.x + 1][0].fen.previous);
    }
    setDstSquare("");
    setSrcSquare("");
  };

  const prevPuzzle = () => {
    if (puzzles.length === 0) return;

    if (puzzleIndex.y - 1 >= 0) {
      setPuzzle(puzzles[puzzleIndex.x][puzzleIndex.y - 1]);
      setPuzzleIndex({ x: puzzleIndex.x, y: puzzleIndex.y - 1 });
      setFen(puzzles[puzzleIndex.x][puzzleIndex.y - 1].fen.previous);
    } else if (puzzleIndex.x - 1 >= 0) {
      setPuzzle(puzzles[puzzleIndex.x - 1][puzzles[puzzleIndex.x - 1].length - 1]);
      setPuzzleIndex({ x: puzzleIndex.x - 1, y: puzzles[puzzleIndex.x - 1].length - 1 });
      setFen(puzzles[puzzleIndex.x - 1][puzzles[puzzleIndex.x - 1].length - 1].fen.previous);
    }
    setDstSquare("");
    setSrcSquare("");
  };

  return { puzzleIndex, nextPuzzle, prevPuzzle };
};

export default useChangePuzzle;