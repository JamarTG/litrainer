import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chess } from "chess.js";
import { resetFeedback } from "@/redux/slices/feedback";
import { playSound } from "@/sound";
import { setFen } from "@/redux/slices/board";
import { getPuzzle } from "@/redux/slices/puzzle";

const usePuzzleSetup = () => {
  const [game, setGame] = useState<Chess>(new Chess());
  const dispatch = useDispatch();
  const puzzle = useSelector(getPuzzle);

  const executeComputerMove = useCallback(
    (game: Chess, move: string) => {
      setTimeout(() => {
        const newGame = new Chess(game.fen());
        newGame.move(move);
        playSound(newGame);
        setGame(newGame);
        dispatch(setFen(newGame.fen()));
      }, 500);
    },
    [dispatch]
  );

  useEffect(() => {
    if (!puzzle) return;

    const newGame = new Chess();
    newGame.load(puzzle.fen.previous);
    setGame(newGame);
    dispatch(setFen(newGame.fen()));
    dispatch(resetFeedback());

    executeComputerMove(newGame, puzzle.opponentMove.lan);
  }, [puzzle, dispatch, executeComputerMove]);

  return { game };
};

export default usePuzzleSetup;
