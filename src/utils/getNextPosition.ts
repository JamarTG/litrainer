import { Models } from "../typings";

export const getNextPosition = (
  puzzles: Models.Move.Info[][],
  currentIndex: { x: number; y: number },
  setCurrentIndex: (index: { x: number; y: number }) => void
): string | null => {
  if (puzzles.length === 0) return null;

  let newIndex;
  let newFen;

  if (currentIndex.y + 1 < puzzles[currentIndex.x]?.length) {
    newIndex = { x: currentIndex.x, y: currentIndex.y + 1 };
    newFen = puzzles[currentIndex.x][currentIndex.y + 1].fen;
  } else if (currentIndex.x + 1 < puzzles.length) {
    newIndex = { x: currentIndex.x + 1, y: 0 };
    newFen = puzzles[currentIndex.x + 1][0].fen;
  } else {
    newIndex = { x: 0, y: 0 };
    newFen = puzzles[0][0].fen;
  }

  setCurrentIndex(newIndex);
  return newFen;
};
