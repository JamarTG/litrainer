import { Chess, Move } from "chess.js";
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

const isPieceSacrifice = (fen: string, move: string) => {
  const game = new Chess(fen);
  const moveObj = game.move(move);

  if (!moveObj) {
    return false;
  }

  let materialBalance = 0;

  if (moveObj.captured) {
    if (pieceValues[moveObj.captured] >= pieceValues[moveObj.piece]) {
      return false;
    }
    materialBalance += pieceValues[moveObj.captured];
  }

  const opponentMoves = game.moves({ verbose: true });
  for (const opponentMove of opponentMoves) {
    // If you give up a higher value piece for a lower value piece then its a sacrifice

    if (!opponentMove.captured) {
      continue;
    }
    
    if (pieceValues[opponentMove.captured] > pieceValues[opponentMove.piece]) {
      return true;
    }

    // if you give up a piece and is unable to recoup its a sacrifice
    if (
      opponentMove.to === moveObj.to &&
      pieceValues[opponentMove.piece] < pieceValues[opponentMove.captured]
    ) {
      materialBalance -= pieceValues[moveObj.piece];
      // Check if the capturing piece can be recouped on the next move
      const gameAfterOpponentMove = new Chess(game.fen());
      gameAfterOpponentMove.move(opponentMove.san);
      const recoupMoves = gameAfterOpponentMove.moves({ verbose: true });

      const canBeRecouped = recoupMoves.some((recoupMove) => {
        const gameAfterRecoupMove = new Chess(gameAfterOpponentMove.fen());
        const recoupMoveObj = gameAfterRecoupMove.move(recoupMove.san);
        const recoupMaterialBalance =
          materialBalance +
          (recoupMoveObj?.captured ? pieceValues[recoupMoveObj.captured] : 0);
        return recoupMaterialBalance >= 0;
      });

      if (materialBalance < 0 && !canBeRecouped) {
        console.log("First condition");
        return true;
      }
    }
  }

  console.log("nope.");
  return false;
};

export { isPieceSacrifice };
