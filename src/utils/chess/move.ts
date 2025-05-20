import { Chess, Move } from "chess.js";


export const attemptMove = (
  game: Chess,
  sourceSquare: string,
  targetSquare: string,
  promotion: string = "q"
): Move | null => {
  try {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion,
    });
    return move;
  } catch (error) {
    console.error("Invalid move attempt:", error);
    return null;
  }
};


export const normalizeCastlingMove = (move: string): string => {
  const sourceSquare = move.slice(0, 2);
  const targetSquare = move.slice(2);

  if (
    (sourceSquare === "e1" && targetSquare === "g1") ||
    (sourceSquare === "e8" && targetSquare === "g8")
  ) {
    return "O-O";
  }

  if (
    (sourceSquare === "e1" && targetSquare === "c1") ||
    (sourceSquare === "e8" && targetSquare === "c8")
  ) {
    return "O-O-O";
  }
  return move;
};
