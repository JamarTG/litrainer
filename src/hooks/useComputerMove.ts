import { useCallback } from "react";
import { Chess } from "chess.js";
import { playSound } from "../utils/sound";

export const useComputerMove = (setGame: (game: Chess) => void, setFen: (fen: string) => void) => {
  const executeComputerMove = useCallback((game: Chess, move: string) => {
    setTimeout(() => {
      const moveObj = game.move(move);
      playSound(game, moveObj);
      setGame(game);
      setFen(game.fen());
    }, 500);
  }, [setGame, setFen]);

  return { executeComputerMove };
};