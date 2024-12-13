import { useState, useEffect, Dispatch, SetStateAction } from "react";
import evaluateFen from "../utils/chess/evaluateFen"; // Adjust the path as necessary
import { Models } from "../typings";
import { STARTINGPOSFEN } from "../constants";

const useChangePuzzle = (
  puzzles: Models.Move.Info[][],
  sessionStarted: boolean,
  setSessionStarted: Dispatch<SetStateAction<boolean>>
) => {
  const [puzzleIndex, setPuzzleIndex] = useState<Models.Move.Index>({
    x: 0,
    y: 0,
  });
  const [fen, setFen] = useState<string>(STARTINGPOSFEN);
  const [acceptableMoves, setAcceptableMoves] = useState<
    { move: any; eval: number }[]
  >([]);

  const moveToNextPuzzle = () => {
    if (puzzles.length === 0) return;

    let newIndex: Models.Move.Index;
    let newFen: string;

    if (!sessionStarted) {
      setSessionStarted(true);
    }

    if (puzzleIndex.y + 1 < puzzles[puzzleIndex.x]?.length) {
      newIndex = { x: puzzleIndex.x, y: puzzleIndex.y + 1 };
      newFen = puzzles[puzzleIndex.x][puzzleIndex.y + 1].fen;
    } else if (puzzleIndex.x + 1 < puzzles.length) {
      newIndex = { x: puzzleIndex.x + 1, y: 0 };
      newFen = puzzles[puzzleIndex.x + 1][0].fen;
    } else {
      // No more puzzles
      return;
    }

    setPuzzleIndex(newIndex);
    setFen(newFen);
  };

  const moveToPreviousPuzzle = () => {
    if (puzzles.length === 0) return;

    let newIndex: Models.Move.Index;
    let newFen: string;

    if (puzzleIndex.y > 0) {
      newIndex = { x: puzzleIndex.x, y: puzzleIndex.y - 1 };
      newFen = puzzles[puzzleIndex.x][puzzleIndex.y - 1].fen;
    } else if (puzzleIndex.x > 0) {
      newIndex = {
        x: puzzleIndex.x - 1,
        y: puzzles[puzzleIndex.x - 1].length - 1,
      };
      newFen = puzzles[puzzleIndex.x - 1][puzzleIndex.y - 1].fen;
    } else {
      // No previous puzzles
      return;
    }

    setPuzzleIndex(newIndex);
    setFen(newFen);
  };

  useEffect(() => {
    const fetchAcceptableMoves = async () => {
      const depth = 20;
      const multipv = 5; // Adjust this value as needed
      const moves = await evaluateFen(fen, depth, multipv);
      setAcceptableMoves(moves);
    };

    if (fen) {
      fetchAcceptableMoves();
    }
  }, [fen]);

  return {
    puzzleIndex,
    fen,
    setFen,
    acceptableMoves,
    moveToNextPuzzle,
    moveToPreviousPuzzle,
  };
};

export default useChangePuzzle;
