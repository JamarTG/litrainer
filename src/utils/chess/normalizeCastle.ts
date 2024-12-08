export const normalizeCastlingMove = (move: string) => {
  const sourceSquare = move.slice(0, 2); 
  const targetSquare = move.slice(2);
  if (
    (sourceSquare === "e1" &&
      (targetSquare === "g1" || targetSquare === "h1")) ||
    (sourceSquare === "e8" && (targetSquare === "g8" || targetSquare === "h8"))
  ) {
    return "O-O";
  }

  if (
    (sourceSquare === "e1" &&
      (targetSquare === "c1" || targetSquare === "a1")) ||
    (sourceSquare === "e8" && (targetSquare === "c8" || targetSquare === "a8"))
  ) {
    return "O-O-O";
  }
  return move;
};
