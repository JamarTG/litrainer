import {
  faChessBishop,
  faChessKing,
  faChessKnight,
  faChessPawn,
  faChessQueen,
  faChessRook,
} from "@fortawesome/free-solid-svg-icons";

// Constants for piece types
export const PieceType = {
  PAWN: "p",
  KNIGHT: "n",
  BISHOP: "b",
  ROOK: "r",
  QUEEN: "q",
  KING: "k",
} as const;

export const STARTING_POS_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const PIECE_ICONS = {
  [PieceType.KNIGHT]: faChessKnight,
  [PieceType.BISHOP]: faChessBishop,
  [PieceType.ROOK]: faChessRook,
  [PieceType.QUEEN]: faChessQueen,
  [PieceType.KING]: faChessKing,
  [PieceType.PAWN]: faChessPawn,
};

export const PIECE_VALUE = {
  [PieceType.PAWN]: 1,
  [PieceType.KNIGHT]: 3,
  [PieceType.BISHOP]: 3,
  [PieceType.ROOK]: 5,
  [PieceType.QUEEN]: 9,
  [PieceType.KING]: 0,
};


const createInitialPieceCounts = () => ({
  p: 0,
  n: 0,
  b: 0,
  r: 0,
  q: 0,
});

export const INITIAL_PIECE_COUNTS = {
  w: createInitialPieceCounts(),
  b: createInitialPieceCounts(),
};