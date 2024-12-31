import { useState, Dispatch, SetStateAction, useContext } from "react";
import { STARTINGPOSFEN } from "../../../constants";
import { Puzzle, PuzzleIndex } from "../../../types/puzzle";
import { Square } from "chess.js";
import { PuzzleContext } from "../../../context/Puzzle/PuzzleContext";

const useChangePuzzle = (
  puzzles: Puzzle[][],
  setUndoneMoves: Dispatch<SetStateAction<string[]>>,
  setDstSquare: Dispatch<SetStateAction<Square | "">>,
  setSrcSquare : Dispatch<SetStateAction<Square | "">>,

) => {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [puzzleIndex, setPuzzleIndex] = useState<PuzzleIndex>({ x: 0, y: 0 });
  const [fen, setFen] = useState<string>(STARTINGPOSFEN);
  const {setPuzzle} = useContext(PuzzleContext);

  const nextPuzzle = () => {
    if (puzzles.length === 0) return;


    if (!sessionStarted) {
      setSessionStarted(true);
      setPuzzle(puzzles[0][0]);
      setPuzzleIndex({ x: 0, y: 0 });
      setFen(puzzles[0][0].fen.previous);
      return
    }

    if (puzzleIndex.y + 1 < puzzles[puzzleIndex.x]?.length) {
      setPuzzle(puzzles[puzzleIndex.x][puzzleIndex.y + 1]);
      setPuzzleIndex({ x: puzzleIndex.x, y: puzzleIndex.y + 1 });
      setFen(puzzles[puzzleIndex.x][puzzleIndex.y + 1].fen.previous);
    } else if (puzzleIndex.x + 1 < puzzles.length) {
      setPuzzle(puzzles[puzzleIndex.x + 1][0]);
      setPuzzleIndex({ x: puzzleIndex.x + 1, y: 0 });
      setFen(puzzles[puzzleIndex.x + 1][0].fen.previous);
    }
    setUndoneMoves([]);
    setDstSquare("");
    setSrcSquare("");
  };

  const prevPuzzle = () => {
    if (puzzles.length === 0) return;

    if (puzzleIndex.y > 0) {
      setPuzzle(puzzles[puzzleIndex.x][puzzleIndex.y - 1]);
      setPuzzleIndex({ x: puzzleIndex.x, y: puzzleIndex.y - 1 });
      setFen(puzzles[puzzleIndex.x][puzzleIndex.y - 1].fen.previous);
    } else if (puzzleIndex.x > 0) {
      const newY = puzzles[puzzleIndex.x - 1].length - 1;
      setPuzzle(puzzles[puzzleIndex.x - 1][newY]);
      setPuzzleIndex({ x: puzzleIndex.x - 1, y: newY });
      setFen(puzzles[puzzleIndex.x - 1][newY].fen.previous);
    }
    setUndoneMoves([]);
    setDstSquare("");
    setSrcSquare("");
  };

  return {
    puzzleIndex,
    fen,
    setFen,
    nextPuzzle,
    prevPuzzle,
    sessionStarted,
    setSessionStarted,
  };
};

export default useChangePuzzle;
