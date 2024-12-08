import { Dispatch, SetStateAction, useState } from "react";
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
  const [fen, setFen] = useState<string>(
    STARTINGPOSFEN
  );

  const moveToNextPuzzle = () => {
    if (puzzles.length === 0) return;

    let newIndex: Models.Move.Index;
    let newFen: string;

    if(!sessionStarted) {
      setSessionStarted(true);
    }

     if (puzzleIndex.y + 1 < puzzles[puzzleIndex.x]?.length) {
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

  const moveToPreviousPuzzle = () => {
    if (!sessionStarted || puzzles.length === 0) return;

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
      newFen =
        puzzles[puzzleIndex.x - 1][puzzles[puzzleIndex.x - 1].length - 1].fen;
    } else {
      newIndex = {
        x: puzzles.length - 1,
        y: puzzles[puzzles.length - 1].length - 1,
      };
      newFen =
        puzzles[puzzles.length - 1][puzzles[puzzles.length - 1].length - 1].fen;
    }

    setPuzzleIndex(newIndex);
    setFen(newFen);
  };

  return {
    puzzleIndex,
    fen,
    moveToNextPuzzle,
    moveToPreviousPuzzle,
    setPuzzleIndex,
    setFen,
  };
};

export default useChangePuzzle;
