import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chess} from "chess.js";
import { setClassification, setIsPuzzleSolved } from "../redux/slices/feedbackSlices";
import { setDestinationSquare, setFen, setSourceSquare } from "../redux/slices/boardSlices";
import { RootState } from "../redux/store";

const usePuzzleSetup = (
  executeComputerMove: (game: Chess, move: string) => void,
  game: Chess,
) => {
  const dispatch = useDispatch();
  const puzzles = useSelector((state: RootState) => state.puzzle.puzzles);
  const puzzleIndex = useSelector((state: RootState) => state.puzzle.currentIndex);

  useEffect(() => {
    const currentPuzzle = puzzles[puzzleIndex] || puzzles[0];
    if (!currentPuzzle) return;

    dispatch(setFen(currentPuzzle.fen.previous));
    game.load(currentPuzzle.fen.previous);

    dispatch(setClassification(null));
    dispatch(setIsPuzzleSolved(false));
    dispatch(setSourceSquare(null));
    dispatch(setDestinationSquare(null));

    if (currentPuzzle.opponentMove?.lan) {
      executeComputerMove(game, currentPuzzle.opponentMove.lan);
    }
  }, [puzzleIndex, puzzles, setFen]);
};

export default usePuzzleSetup;
