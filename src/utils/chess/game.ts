import { Chess, Move, Square } from "chess.js";
import { Puzzle } from "../../types/puzzle";
import { openings } from "../../data/openings";
import { PIECE_VALUE } from "../../constants/piece";


export const isNotUserTurn = (game: Chess, puzzle: Puzzle | null): boolean => {
  return game.turn() !== puzzle?.userMove.color;
};


export const checkKnownOpening = (fen: string): boolean => {
  const fenPosition = fen.split(" ")[0];
  return openings.some((opening) => opening.fen === fenPosition);
};

export const checkKnownBadMove = (movePlayedByUser: Move, puzzle: Puzzle): string => {
  return movePlayedByUser.lan === puzzle?.userMove.lan ? puzzle.evaluation.judgment?.name ?? "" : "";
};

export const getGameResultMessage = (status: string, winner?: string, loser?: string): string => {
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
      return `Cheat was detected from ${loser ?? "unknown player"}`;
    default:
      return "Unknown";
  }
};

export const isPieceSacrifice = (fen: string, move: string): boolean => {
  const game = new Chess(fen);

  const pieceSquare = move.slice(0, 2);
  const attackers = game.moves({ verbose: true }).filter((m) => m.to === pieceSquare && m.color !== game.turn());

  for (const attacker of attackers) {
    if (PIECE_VALUE[attacker.piece] < PIECE_VALUE[game.get(pieceSquare as Square)?.type ?? ""]) {
      return false;
    }
  }

  const protectors = game.moves({ verbose: true }).filter((m) => m.to === pieceSquare && m.color === game.turn());

  if (attackers.length > 0 && protectors.length === 0) {
    return false;
  }

  if (game.inCheck()) {
    return false;
  }

  const moveObj = game.move(move);
  if (!moveObj) return false; // invalid move

  if (moveObj.captured && PIECE_VALUE[moveObj.captured] >= PIECE_VALUE[moveObj.piece]) {
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
        PIECE_VALUE[ourMove.captured] + (moveObj.captured ? PIECE_VALUE[moveObj.captured] : 0) >= PIECE_VALUE[opponentMove.captured]
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
