import { PIECE_VALUE } from "@/constants/piece";
import { Chess } from "chess.js";

export const convertLanToSan = (fen: string, lanMove: string) => {
  try {
    const tempGame = new Chess(fen);
    const move = tempGame.move(lanMove);
    return move ? move.san : lanMove;
  } catch (error) {
    console.error("Error converting LAN to SAN:", error);
    return lanMove;
  }
};

// THIS FUNCTION IS RESERVED FOR LATER IMPLEMENTATION OF BRILLIANT MOVE

export const isPieceSacrifice = (fen: string, move: string): boolean => {
  const game = new Chess(fen);

  // Skip if in check - moves under check are forced, not sacrifices
  if (game.inCheck()) {
    return false;
  }

  // Get move details
  const moveObj = game.move(move);
  if (!moveObj) {
    return false; // Invalid move
  }

  const movingPieceValue = PIECE_VALUE[moveObj.piece];
  const capturedPieceValue = moveObj.captured ? PIECE_VALUE[moveObj.captured] : 0;

  // If we captured equal or more value, it's not a sacrifice
  if (capturedPieceValue >= movingPieceValue) {
    return false;
  }

  // Check if the moved piece can be immediately captured
  const opponentMoves = game.moves({ verbose: true });
  const capturesOfMovedPiece = opponentMoves.filter((m) => m.to === moveObj.to && m.captured === moveObj.piece);

  if (capturesOfMovedPiece.length === 0) {
    return false; // Piece can't be captured, so it's not a sacrifice
  }

  // Calculate net material loss if piece is captured
  const netMaterialLoss = movingPieceValue - capturedPieceValue;

  // For the simplest case: if we lose material and the piece can be captured, it's a sacrifice
  // This covers the vast majority of tactical sacrifices
  return netMaterialLoss > 0;
};

// Enhanced version that considers if the sacrifice might be tactically sound
export const isPieceSacrificeEnhanced = (fen: string, move: string): boolean => {
  const game = new Chess(fen);

  if (game.inCheck()) {
    return false;
  }

  const moveObj = game.move(move);
  if (!moveObj) {
    return false;
  }

  const movingPieceValue = PIECE_VALUE[moveObj.piece];
  const capturedPieceValue = moveObj.captured ? PIECE_VALUE[moveObj.captured] : 0;

  // Not a sacrifice if we gain material
  if (capturedPieceValue >= movingPieceValue) {
    return false;
  }

  // Check if piece can be captured
  const opponentMoves = game.moves({ verbose: true });
  const capturesOfMovedPiece = opponentMoves.filter((m) => m.to === moveObj.to && m.captured === moveObj.piece);

  if (capturesOfMovedPiece.length === 0) {
    return false;
  }

  // Calculate immediate material exchange
  const netLoss = movingPieceValue - capturedPieceValue;

  // Simple heuristics for common sacrifice patterns
  const afterMove = new Chess(game.fen());

  // Check for immediate tactical benefits that might justify the sacrifice
  const hasCheck = afterMove.inCheck();
  const hasCheckmate = afterMove.isCheckmate();
  const reducedOpponentMobility = opponentMoves.length < 10; // Rough heuristic

  // If checkmate, it's definitely a valid sacrifice
  if (hasCheckmate) {
    return true;
  }

  // For minor sacrifices (pawns, minor pieces), be more liberal
  if (netLoss <= 3 && (hasCheck || reducedOpponentMobility)) {
    return true;
  }

  // For major sacrifices, require stronger immediate benefits
  if (netLoss > 3 && hasCheck) {
    return true;
  }

  // Otherwise, if we lose material and piece can be captured, call it a sacrifice
  return netLoss > 0;
};

// Utility function to analyze the sacrifice quality (for debugging/analysis)
export const analyzeSacrifice = (fen: string, move: string) => {
  const game = new Chess(fen);
  const moveObj = game.move(move);

  if (!moveObj) {
    return { valid: false, reason: "Invalid move" };
  }

  const movingPieceValue = PIECE_VALUE[moveObj.piece];
  const capturedPieceValue = moveObj.captured ? PIECE_VALUE[moveObj.captured] : 0;
  const netLoss = movingPieceValue - capturedPieceValue;

  const afterMove = new Chess(game.fen());
  const opponentMoves = afterMove.moves({ verbose: true });
  const canBeCaptured = opponentMoves.some((m) => m.to === moveObj.to && m.captured === moveObj.piece);

  return {
    valid: true,
    move: moveObj.san,
    movingPiece: moveObj.piece,
    movingPieceValue,
    capturedPiece: moveObj.captured || null,
    capturedPieceValue,
    netMaterialLoss: netLoss,
    canBeCaptured,
    createsCheck: afterMove.inCheck(),
    createsCheckmate: afterMove.isCheckmate(),
    isSacrifice: canBeCaptured && netLoss > 0
  };
};
