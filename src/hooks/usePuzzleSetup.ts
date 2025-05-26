import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chess } from "chess.js";
import { resetFeedback } from "../redux/slices/feedback";
import { RootState } from "../redux/store";
import { playSound } from "../libs/sound";
import { setFen } from "../redux/slices/board";

const usePuzzleSetup = () => {
  const [game, setGame] = useState<Chess>(new Chess());
  const dispatch = useDispatch();
  const puzzle = useSelector((state: RootState) => state.puzzle.puzzles[state.puzzle.currentIndex]);

  const executeComputerMove = useCallback(
    (game: Chess, move: string) => {
      setTimeout(() => {
        game.move(move);
        playSound(game);
        setGame(game);
        dispatch(setFen(game.fen()));
      }, 500);
    },
    [setGame, dispatch]
  );
  useEffect(() => {
    if (!puzzle) return;
    game.load(puzzle.fen.previous);

    dispatch(resetFeedback());

    executeComputerMove(game, puzzle.opponentMove.lan);
  }, [puzzle, dispatch, game, executeComputerMove]);

  return { game };
};

export default usePuzzleSetup;
