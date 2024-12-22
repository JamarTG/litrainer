import { useState,  Dispatch, SetStateAction } from "react";
import { STARTINGPOSFEN } from "../constants";
import { Game } from "../types/game";

const useChangePuzzle = (
  puzzles: Game.Info[][],
  sessionStarted: boolean,
  setSessionStarted: Dispatch<SetStateAction<boolean>>,
  setCurrentPuzzle : Dispatch<SetStateAction<Game.Info | null>>
) => {

  const [puzzleIndex, setPuzzleIndex] = useState<Game.Index>({
    x: 0,
    y: 0,
  });
  const [fen, setFen] = useState<string>(STARTINGPOSFEN);
 

  const moveToNextPuzzle = () => {
    if (puzzles.length === 0) return;

    let newIndex: Game.Index;
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

    let newIndex: Game.Index;
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

  console.log({
    puzzleIndex,
    fen,
    setFen,
    moveToNextPuzzle,
    moveToPreviousPuzzle,
  })

  return {
    puzzleIndex,
    fen,
    setFen,
    moveToNextPuzzle,
    moveToPreviousPuzzle,
  };
};

export default useChangePuzzle;
