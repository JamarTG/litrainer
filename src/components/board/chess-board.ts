import { ColorLongForm } from "@/typing/lichess";
import { Move } from "chess.js";

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
