import { PieceLongFormWithoutKing, PieceShortFormWithoutKing, PromotionPiece } from "../types/chess";

export const CHESS_PIECE_CODES = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"];

export const PIECE_TYPES = {
  PAWN: "p",
  KNIGHT: "n",
  BISHOP: "b",
  ROOK: "r",
  QUEEN: "q",
  KING: "k"
} as const;

export const PIECE_SETS = [
  "alpha",
  "anarcandy",
  "caliente",
  "california",
  "cardinal",
  "cburnett",
  "celtic",
  "chess7",
  "chessnut",
  "companion",
  "cooke",
  "dubrovny",
  "fantasy",
  "firi",
  "fresca",
  "gioco",
  "governor",
  "horsey",
  "icpieces",
  "kiwen-suwi",
  "kosal",
  "leipzig",
  "letter",
  "maestro",
  "merida",
  "monarchy",
  // "mono",
  "mpchess",
  "pirouetti",
  "pixel",
  "reillycraig",
  "rhosgfx",
  "riohacha",
  "shapes",
  "spatial",
  "staunty",
  "tatiana",
  "xkcd"
];

export const PIECE_VALUE = {
  [PIECE_TYPES.PAWN]: 1,
  [PIECE_TYPES.KNIGHT]: 3,
  [PIECE_TYPES.BISHOP]: 3,
  [PIECE_TYPES.ROOK]: 5,
  [PIECE_TYPES.QUEEN]: 9,
  [PIECE_TYPES.KING]: 0
};

const createInitialPieceCounts = () => ({
  p: 0,
  n: 0,
  b: 0,
  r: 0,
  q: 0
});

export const initialPieceCounts = {
  w: createInitialPieceCounts(),
  b: createInitialPieceCounts()
};

export const pieceLongFormWithoutKing: Record<PieceShortFormWithoutKing, PieceLongFormWithoutKing> = {
  b: "bishop",
  p: "pawn",
  r: "rook",
  q: "queen",
  n: "knight"
} as const;

export const PROMOTION_PIECES: PromotionPiece[] = [
  {
    piece: "q",
    name: "Queen"
  },
  {
    piece: "r",
    name: "Rook"
  },
  {
    piece: "b",
    name: "Bishop"
  },
  {
    piece: "n",
    name: "Knight"
  }
];
