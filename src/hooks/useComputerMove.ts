import { SetStateAction, useCallback, Dispatch as ReactDispatch } from "react";
import { Chess } from "chess.js";
import { useDispatch } from "react-redux";
import { setFen } from "@/redux/slices/board";
import { playSound } from "@/libs/sound";

export const useComputerMove = (setGame: ReactDispatch<SetStateAction<Chess>>) => {
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
