import { Chess, Move, Square } from "chess.js";
import { Classification, MoveClassification } from "../types/move";
import { Materials, PositionEval } from "../types/eval";
import { PIECE_VALUE } from "../constants/piece";
import { openings } from "../data/openings";
import { Puzzle } from "../types/puzzle";

export const getSquarePosition = (
  square: string,
  boardSize: number,
  orientation: "w" | "b"
) => {

  const file = square.charCodeAt(0) - "a".charCodeAt(0);
  const rank = 8 - parseInt(square[1], 10);

  const squareSize = boardSize / 8;

  const topOffset = squareSize * 0.3;
  const rightOffset = squareSize * 0.3;

  if (orientation === "w") {
    return {
      right: (7 - file) * squareSize - rightOffset,
      top: rank * squareSize - topOffset,
    };
  } else {
    return {
      right: file * squareSize - rightOffset,
      top: (7 - rank) * squareSize - topOffset,
    };
  }
};

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

export const isNotUserTurn = (game: Chess, puzzle: Puzzle | null) => {
  return game.turn() !== puzzle?.userMove.color;
};

export const isPositiveClassification = (
  classificationResult: Classification
) => {
  return (
    classificationResult === MoveClassification.Best ||
    classificationResult === MoveClassification.Excellent ||
    classificationResult === MoveClassification.Good ||
    classificationResult === MoveClassification.Brilliant
  );
};

export const isNegativeClassification = (
  classificationResult: Classification | ""
) => {
  return (
    classificationResult === MoveClassification.Blunder ||
    classificationResult === MoveClassification.Mistake ||
    classificationResult === MoveClassification.Inaccuracy
  );
};

export const checkKnownOpening = (fen: string) => {
  const opening = openings.find((opening) => opening.fen === fen.split(" ")[0]);

  return !!opening;
};

export const checkKnownBadMove = (movePlayedByUser: Move, puzzle: Puzzle) => {
  return movePlayedByUser.lan == puzzle?.userMove.lan
    ? puzzle.evaluation.judgment?.name
    : "";
};
export const getBasicClassification = (
  lastPositionEval: PositionEval,
  currentPositionEval: PositionEval,
  move: string
) => {
  if (lastPositionEval.bestMove === move) {
    return MoveClassification.Best;
  }

  let currentCp = null;
  let lastCp = null;

  if (!currentPositionEval.lines[0].mate) {
    currentCp = currentPositionEval.lines[0].cp ?? 0;
  } else {
    currentCp =
      currentPositionEval.lines[0].mate > 0
        ? 100000 - currentPositionEval.lines[0].mate * 100
        : -100000 - currentPositionEval.lines[0].mate * 100;
  }

  if (!lastPositionEval.lines[0].mate) {
    lastCp = lastPositionEval.lines[0].cp ?? 0;
  } else {
    lastCp =
      lastPositionEval.lines[0].mate > 0
        ? 100000 - lastPositionEval.lines[0].mate * 100
        : -100000 - lastPositionEval.lines[0].mate * 100;
  }

  const cpDiff = Math.abs(currentCp - lastCp);

  if (cpDiff >= 300) return MoveClassification.Blunder;
  if (cpDiff >= 100) return MoveClassification.Mistake;
  if (cpDiff >= 50) return MoveClassification.Inaccuracy;
  if (cpDiff >= 20) return MoveClassification.Good;
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

  const pieceSquare = move.slice(0, 2);
  const attackers = game
    .moves({ verbose: true })
    .filter((m) => m.to === pieceSquare && m.color !== game.turn());

  for (const attacker of attackers) {
    if (
      PIECE_VALUE[attacker.piece] <
      PIECE_VALUE[game.get(pieceSquare as Square)?.type ?? ""]
    ) {
      return false;
    }
  }

  const protectors = game
    .moves({ verbose: true })
    .filter((m) => m.to === pieceSquare && m.color === game.turn());

  if (attackers.length > 0 && protectors.length === 0) {
    return false;
  }

  if (game.inCheck()) {
    return false;
  }

  const moveObj = game.move(move);
  if (
    moveObj.captured &&
    PIECE_VALUE[moveObj.captured] >= PIECE_VALUE[moveObj.piece]
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
        PIECE_VALUE[ourMove.captured] +
          (moveObj.captured ? PIECE_VALUE[moveObj.captured] : 0) >=
          PIECE_VALUE[opponentMove.captured]
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

export const getMaterialDiff = (game: Chess) => {
  let material: Materials = {
    w: { p: 0, n: 0, b: 0, r: 0, q: 0 },
    b: { p: 0, n: 0, b: 0, r: 0, q: 0 },
  };

  for (const row of game.board()) {
    for (const square of row) {
      if (square) {
        if (square.color === "w") {
          material.w[square.type as keyof typeof material.w]++;
        }
        if (square.color === "b") {
          material.b[square.type as keyof typeof material.b]++;
        }
      }
    }

    let materialDiff = 0;
    for (const pieceType of ["p", "n", "b", "r", "q"] as const) {
      materialDiff +=
        (material.w[pieceType] - material.b[pieceType]) * PIECE_VALUE[pieceType];
    }
  }

  const w = {
    p: Math.max(material.w.p - material.b.p, 0),
    n: Math.max(material.w.n - material.b.n, 0),
    b: Math.max(material.w.b - material.b.b, 0),
    r: Math.max(material.w.r - material.b.r, 0),
    q: Math.max(material.w.q - material.b.q, 0),
  };

  const b = {
    p: Math.max(material.b.p - material.w.p, 0),
    n: Math.max(material.b.n - material.w.n, 0),
    b: Math.max(material.b.b - material.w.b, 0),
    r: Math.max(material.b.r - material.w.r, 0),
    q: Math.max(material.b.q - material.w.q, 0),
  };

  return { w, b };
};

export const getMaterialCount = (
  material: Materials,
  color: "w" | "b"
) => {
  const matdiff =
    material.w.p -
    material.b.p +
    material.w.b * 3 -
    material.b.b * 3 +
    material.w.n * 3 -
    material.b.n * 3 +
    material.w.r * 5 -
    material.b.r * 5 +
    material.w.q * 9 +
    material.b.q * 9;

  return (color === "w" && matdiff >= 0) ||
    (color === "b" && matdiff < 0)
    ? Math.abs(matdiff)
    : 0;
};

export { isPieceSacrifice };
