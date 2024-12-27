import { Chess, Square } from "chess.js";
import { MoveClassification } from "../types/move";
import { getWinPercentageFromCp, getWinPercentageFromMate } from "./math";
import { PositionEval } from "../types/eval";
import { PIECEVALUE } from "../constants";

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

export function getEvaluationLossThreshold(
  classif: MoveClassification,
  prevEval: number
) {
  prevEval = Math.abs(prevEval);

  let threshold = 0;

  switch (classif) {
    case MoveClassification.Best:
      threshold = 0.0001 * Math.pow(prevEval, 2) + 0.0236 * prevEval - 3.7143;
      break;
    case MoveClassification.Excellent:
      threshold = 0.0002 * Math.pow(prevEval, 2) + 0.1231 * prevEval + 27.5455;
      break;
    case MoveClassification.Good:
      threshold = 0.0002 * Math.pow(prevEval, 2) + 0.2643 * prevEval + 60.5455;
      break;
    case MoveClassification.Inaccuracy:
      threshold = 0.0002 * Math.pow(prevEval, 2) + 0.3624 * prevEval + 108.0909;
      break;
    case MoveClassification.Mistake:
      threshold = 0.0003 * Math.pow(prevEval, 2) + 0.4027 * prevEval + 225.8182;
      break;
    default:
      threshold = Infinity;
  }

  return Math.max(threshold, 0);
}

export const getBasicClassification = (
  lastPositionEval: PositionEval,
  currentPositionEval: PositionEval,
  move: string
) => {
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

const isPieceSacrifice = (fen: string, move: string) => {
  const game = new Chess(fen);

  // If you were being attacked by a lower value piece its not a sacrifice
  const pieceSquare = move.slice(0, 2);
  const attackers = game
    .moves({ verbose: true })
    .filter((m) => m.to === pieceSquare && m.color !== game.turn());

  console.log(attackers)
  for (const attacker of attackers) {
    if (
      PIECEVALUE[attacker.piece] <
      PIECEVALUE[game.get(pieceSquare as Square)?.type ?? ""]
    ) {
      return false;
    }
  }

  //if the piece was being attacked with no defenders you are probably in a double attack
  const protectors = game
    .moves({ verbose: true })
    .filter((m) => m.to === pieceSquare && m.color === game.turn());

  if (attackers.length > 0 && protectors.length === 0) {
    return false;
  }

  // If the king was in check it has to move..not brilliant
  if (game.inCheck()) {
    return false;
  }

  const moveObj = game.move(move);

  // if the piece that moved was attacked before it moves. the move was to get rid of a greater threat and is not a sacrifice
  if (
    moveObj.captured &&
    PIECEVALUE[moveObj.captured] >= PIECEVALUE[moveObj.piece]
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
        PIECEVALUE[ourMove.captured] +
          (moveObj.captured ? PIECEVALUE[moveObj.captured] : 0) >=
          PIECEVALUE[opponentMove.captured] - 1
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
