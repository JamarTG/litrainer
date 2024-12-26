import { Chess, Move } from "chess.js";
import { MoveClassification } from "../types/move";
import {
  calculateWinPercentage,
  getWinPercentageFromCp,
  getWinPercentageFromMate,
} from "./math";
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

export const getBasicClassification = (
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

  let currentPositionWinPerc = null;
  let lastPositionWinPerc = null;

  if (!currentPositionEval.lines[0].mate) {
    currentPositionWinPerc = getWinPercentageFromCp(
      currentPositionEval.lines[0].cp ?? 0
    );
  } else {
    currentPositionWinPerc = getWinPercentageFromMate(
      currentPositionEval.lines[0].mate
    );
  }

  if (!lastPositionEval.lines[0].mate) {
    lastPositionWinPerc = getWinPercentageFromCp(
      lastPositionEval.lines[0].cp ?? 0
    );
  } else {
    lastPositionWinPerc = getWinPercentageFromMate(
      lastPositionEval.lines[0].mate
    );
  }

  const winPercentageDiff = Math.abs(
    currentPositionWinPerc - lastPositionWinPerc
  );

  if (winPercentageDiff >= 20) return MoveClassification.Blunder;
  if (winPercentageDiff >= 10) return MoveClassification.Mistake;
  if (winPercentageDiff >= 5) return MoveClassification.Inaccuracy;
  if (winPercentageDiff >= 2) return MoveClassification.Good;
  return MoveClassification.Excellent;
};

export const getGameResultMessage = (status: string, winner?: string) => {
  switch (status) {
    case "mate":
      return `${winner} won by checkmate`;
    case "resign":
      return `${winner} won by resignation`;
    case "stalemate":
      return "Game ended in stalemate";
    case "outoftime":
      return `${winner} won on time`;
    case "draw":
      return "Game ended in a draw";
    case "cheat":
      return "Cheat was detected from ${loser}";
    default:
      return "Unknown";
  }
};

const pieceValues = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 0,
};

/*
  problem is that this recognizes a move that is forced to be a sacrifice as a sacrifice
*/

const isPieceSacrifice = (fen: string, move: string) => {
  const game = new Chess(fen);
  const moveObj = game.move(move);

  if (
    moveObj.captured &&
    pieceValues[moveObj.captured] >= pieceValues[moveObj.piece]
  ) {
    return false;
  }

  const opponentMoves = game.moves({ verbose: true });
  for (const opponentMove of opponentMoves) {
    if (!opponentMove.captured) {
      continue;
    }

    const gameAfterOpponentMove = new Chess(game.fen());
    gameAfterOpponentMove.move(opponentMove.san);
    const ourMoves = gameAfterOpponentMove.moves({ verbose: true });

    let canRegainMaterial = false;
    for (const ourMove of ourMoves) {
      if (
        ourMove.captured &&
        pieceValues[ourMove.captured] +
          (moveObj.captured ? pieceValues[moveObj.captured] : 0) >=
          pieceValues[opponentMove.captured]
      ) {
        canRegainMaterial = true;
        break;
      }
    }

    if (!canRegainMaterial) {
      return true;
    }
  }

  return false;
};

export { isPieceSacrifice };
