import { Chess, Square } from "chess.js";

export const turnColor = (game: Chess) => {
  return game.turn() === "w" ? "white" : "black";
};

export const isPromotionMove = (game: Chess, from: Square, to: Square): boolean => {
  const piece = game.get(from);
  if (!piece || piece.type !== "p") return false;

  const fromRank = parseInt(from[1]);
  const toRank = parseInt(to[1]);

  return (
    (piece.color === "w" && fromRank === 7 && toRank === 8) || (piece.color === "b" && fromRank === 2 && toRank === 1)
  );
};
