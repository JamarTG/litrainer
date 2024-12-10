import { Chess } from "chess.js";
import { Dispatch,SetStateAction } from "react";

const resetBoardAfterDelay = (game: Chess, fen: string, setFen: Dispatch<SetStateAction<string>>) => {
  setTimeout(() => {
    game.load(fen);
    setFen(fen);
  }, 500);
};

export default resetBoardAfterDelay;