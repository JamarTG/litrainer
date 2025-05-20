import { useCallback } from "react";
import { Chess } from "chess.js";
import { playSound } from "../lib/sound";
import { useDispatch } from "react-redux";
import { setFen } from "../redux/slices/boardSlices";

export const useComputerMove = (setGame: (game: Chess) => void) => {

  const dispatch = useDispatch();
   
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

  return { executeComputerMove };
};
