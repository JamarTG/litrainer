const nextPuzzleAfterDelay = (
  delay: number,
  moveToNextPuzzle: () => void,
  setMoveSquares: React.Dispatch<React.SetStateAction<Record<string, any>>>
) => {
  setMoveSquares([]);
  setTimeout(() => {
    moveToNextPuzzle();
  }, delay);
};

export default nextPuzzleAfterDelay;
