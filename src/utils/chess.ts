import { Chess } from "chess.js";
import { MoveClassification } from "../types/move";
import { calculateWinPercentage } from "./math";
import { openings } from "../data/openings";
import { PositionEval } from "../types/eval";


export const attemptMove = (
  game: Chess,
  sourceSquare: string,
  targetSquare: string
) => {
  try {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    return move;
  } catch (error) {
    console.error(error);
  }
};

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

export const classifyMove = (
  lastPositionEval: PositionEval,
  currentPositionEval: PositionEval,
  move: string,
  fen: string,
  isWhiteMove: boolean
) => {

  const opening = openings.find((opening) => opening.fen === fen.split(" ")[0]);

  if (opening) {
    return MoveClassification.Book;
  }

  if (lastPositionEval.bestMove === move) {
    return MoveClassification.Best;
  }

  const positionWinPercentage = calculateWinPercentage(
    currentPositionEval.lines[0].cp ?? 0
  );
  const lastPositionWinPercentage = calculateWinPercentage(
    lastPositionEval.lines[0].cp ?? 0
  );

  const winPercentageDiff =
    (positionWinPercentage - lastPositionWinPercentage) *
    100 *
    (isWhiteMove ? 1 : -1);

  if (winPercentageDiff < -20) return MoveClassification.Blunder;
  if (winPercentageDiff < -10) return MoveClassification.Mistake;
  if (winPercentageDiff < -5) return MoveClassification.Inaccuracy;
  if (winPercentageDiff < -2) return MoveClassification.Good;
  return MoveClassification.Excellent;
};
