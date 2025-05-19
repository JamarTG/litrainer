import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../pages/redux/store";
import { Chess, Square } from "chess.js";
import { setClassification, setIsPuzzleSolved } from "../pages/redux/slices/feedbackSlices";

const usePuzzleSetup = (
  executeComputerMove: (game: Chess, move: string) => void,
  game: Chess,
  setFen: React.Dispatch<React.SetStateAction<string>>,
  setSourceSquare: React.Dispatch<React.SetStateAction<Square | null>>,
  setDestinationSquare: React.Dispatch<React.SetStateAction<Square | null>>
) => {
  const dispatch = useDispatch();
  const puzzles = useSelector((state: RootState) => state.puzzle.puzzles);
  const puzzleIndex = useSelector((state: RootState) => state.puzzle.currentIndex);

  useEffect(() => {
    const currentPuzzle = puzzles[puzzleIndex] || puzzles[0];
    if (!currentPuzzle) return;

    setFen(currentPuzzle.fen.previous);
    game.load(currentPuzzle.fen.previous);

    dispatch(setClassification(null));
    dispatch(setIsPuzzleSolved(false));
    setSourceSquare(null);

    setDestinationSquare(null);

    if (currentPuzzle.opponentMove?.lan) {
      executeComputerMove(game, currentPuzzle.opponentMove.lan);
    }
  }, [puzzleIndex, puzzles, setFen]);
};

export default usePuzzleSetup;
