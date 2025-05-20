import { Chess, Move } from "chess.js";

export const attemptMove = (currentGame: Chess, fromSquare: string, toSquare: string, promotion: string = "q"): Move | null => {
  try {
    const move = currentGame.move({
      from: fromSquare,
      to: toSquare,
      promotion,
    });
    return move;
  } catch (error) {
    console.error("Invalid move attempt:", error);
    return null;
  }
};
