import { Chess } from "chess.js";
import { Dispatch,SetStateAction } from "react";

const resetBoardAfterDelay = (game: Chess, fen: string, setFen: Dispatch<SetStateAction<string>>) => {
  setTimeout(() => {
    game.load(fen);
    setFen(fen);
  }, 600);
};

export default resetBoardAfterDelay;