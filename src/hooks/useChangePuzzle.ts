import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Models } from "../typings";
import { STARTINGPOSFEN } from "../constants";

const useChangePuzzle = (
  puzzles: Models.Move.Info[][],
  sessionStarted: boolean,
  setSessionStarted: Dispatch<SetStateAction<boolean>>,
  setCurrentPuzzle : Dispatch<SetStateAction<Models.Move.Info | null>>
) => {
  const [puzzleIndex, setPuzzleIndex] = useState<Models.Move.Index>({
    x: 0,
    y: 0,
  });
  const [fen, setFen] = useState<string>(STARTINGPOSFEN);
 

  const moveToNextPuzzle = () => {
    if (puzzles.length === 0) return;

    let newIndex: Models.Move.Index;
    let newFen: string;

    if (!sessionStarted) {
      setSessionStarted(true);
    }

    if (puzzleIndex.y + 1 < puzzles[puzzleIndex.x]?.length) {
      newIndex = { x: puzzleIndex.x, y: puzzleIndex.y + 1 };
      newFen = puzzles[puzzleIndex.x][puzzleIndex.y + 1].fenBeforeOpponentMove;
    } else if (puzzleIndex.x + 1 < puzzles.length) {
      newIndex = { x: puzzleIndex.x + 1, y: 0 };
      newFen = puzzles[puzzleIndex.x + 1][0].fenBeforeOpponentMove;
    } else {
      return;
    }
    setCurrentPuzzle(puzzles[newIndex.x][newIndex.y]);
    setPuzzleIndex(newIndex);
    setFen(newFen);
  };

  const moveToPreviousPuzzle = () => {
    if (puzzles.length === 0) return;

    let newIndex: Models.Move.Index;
    let newFen: string;

    if (puzzleIndex.y > 0) {
      newIndex = { x: puzzleIndex.x, y: puzzleIndex.y - 1 };
      newFen = puzzles[puzzleIndex.x][puzzleIndex.y - 1].fenBeforeOpponentMove;
    } else if (puzzleIndex.x > 0) {
      newIndex = {
        x: puzzleIndex.x - 1,
        y: puzzles[puzzleIndex.x - 1].length - 1,
      };
      newFen = puzzles[puzzleIndex.x - 1][puzzleIndex.y - 1].fenBeforeOpponentMove;
    } else {
      return;
    }

    setCurrentPuzzle(puzzles[newIndex.x][newIndex.y]);
    setPuzzleIndex(newIndex);
    setFen(newFen);
  };


  return {
    puzzleIndex,
    fen,
    setFen,
    moveToNextPuzzle,
    moveToPreviousPuzzle,
  };
};

export default useChangePuzzle;
