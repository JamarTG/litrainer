import { useState } from 'react';
import { Models } from '../typings';
import { STARTINGPOSFEN } from '../constants';
interface Puzzle {
  fen: string;
}

interface PuzzleIndex {
  x: number;
  y: number;
}

const useMoveToNextPuzzle = (puzzles: Puzzle[][]) => {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [puzzleIndex, setPuzzleIndex] = useState<Models.Move.Index>({ x: 0, y: 0 });
  const [fen, setFen] = useState<string>(puzzles[0]?.[0]?.fen || STARTINGPOSFEN);

  const moveToNextPuzzle = () => {
    if (puzzles.length === 0) return;

    let newIndex: PuzzleIndex;
    let newFen: string;

    if (!sessionStarted) {
      newIndex = { x: 0, y: 0 };
      newFen = puzzles[0][0].fen;
      setSessionStarted(true);
    } else if (puzzleIndex.y + 1 < puzzles[puzzleIndex.x]?.length) {
      newIndex = { x: puzzleIndex.x, y: puzzleIndex.y + 1 };
      newFen = puzzles[puzzleIndex.x][puzzleIndex.y + 1].fen;
    } else if (puzzleIndex.x + 1 < puzzles.length) {
      newIndex = { x: puzzleIndex.x + 1, y: 0 };
      newFen = puzzles[puzzleIndex.x + 1][0].fen;
    } else {
      newIndex = { x: 0, y: 0 };
      newFen = puzzles[0][0].fen;
    }

    setPuzzleIndex(newIndex);
    setFen(newFen);
  };

  console.log(puzzles);

  return { sessionStarted, puzzleIndex, fen, moveToNextPuzzle, setSessionStarted, setPuzzleIndex, setFen };
};

export default useMoveToNextPuzzle;