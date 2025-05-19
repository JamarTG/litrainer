import { useCallback } from "react";
import { Chess } from "chess.js";
import { playSound } from "../lib/sound";

export const useComputerMove = (setGame: (game: Chess) => void, setFen: (fen: string) => void) => {
   
  const executeComputerMove = useCallback(
    (game: Chess, move: string) => {
      setTimeout(() => {
        game.move(move);
        playSound(game);
        setGame(game);
        setFen(game.fen());
      }, 500);
    },
    [setGame, setFen]
  );

  return { executeComputerMove };
};
