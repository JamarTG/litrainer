import { ColorLongForm, ColorShortForm } from "@/typing/enums";
import { Chess, Move, Square } from "chess.js";

// Board Logic
export const turnColor = (game: Chess) => {
  return game.turn() === ColorShortForm.WHITE ? ColorLongForm.WHITE : ColorLongForm.BLACK;
};

export const isPromotionMove = (game: Chess, from: Square, to: Square): boolean => {
  const piece = game.get(from);
  if (!piece || piece.type !== "p") return false;

  const fromRank = parseInt(from[1]);
  const toRank = parseInt(to[1]);

  return (
    (piece.color === ColorShortForm.WHITE && fromRank === 7 && toRank === 8) ||
    (piece.color === "b" && fromRank === 2 && toRank === 1)
  );
};

// Board Configuration

export const buildDestsMap = (moves: Move[]): Map<string, string[]> => {
  const dests = new Map<string, string[]>();
  moves.forEach((move) => {
    if (!dests.has(move.from)) {
      dests.set(move.from, []);
    }
    dests.get(move.from)!.push(move.to);
  });
  return dests;
};

export const createMovableConfig = (dests: Map<string, string[]>, color: ColorLongForm) => ({
  free: false,
  dests,
  color
});

export const getDefaultMovableConfig = () => {
  return {
    free: false,
    dests: new Map(),
    color: "white" as ColorLongForm
  };
};
