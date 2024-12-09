import { normalizeCastlingMove } from "./normalizeCastle";
import { Models } from "../../typings";
import { Move } from "chess.js";

const checkBestMove = (move: Move, currentPuzzle: Models.Move.Info | null) => {
  return (
    normalizeCastlingMove(move.lan) ===
    normalizeCastlingMove(currentPuzzle?.evaluation.best as string)
  );
};

export default checkBestMove;