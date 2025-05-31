export const chessPieceCodes = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"];

export const PieceType = {
  PAWN: "p",
  KNIGHT: "n",
  BISHOP: "b",
  ROOK: "r",
  QUEEN: "q",
  KING: "k"
} as const;

export const PieceSets = [
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
  "mono",
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
  [PieceType.PAWN]: 1,
  [PieceType.KNIGHT]: 3,
  [PieceType.BISHOP]: 3,
  [PieceType.ROOK]: 5,
  [PieceType.QUEEN]: 9,
  [PieceType.KING]: 0
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

type PieceShortForm = "p" | "b" | "r" | "k" | "n" | "q";
type PieceLongForm = "pawn" | "bishop" | "rook" | "king" | "knight" | "queen";
export type PieceShortFormWithoutKing = Exclude<PieceShortForm, 'k'>;
export type PieceLongFormWithoutKing = Exclude<PieceLongForm, 'king'>;

export const pieceLongFormWithoutKing: Record<PieceShortFormWithoutKing, PieceLongFormWithoutKing> = {
  b: "bishop",
  p: "pawn",
  r: "rook",
  q: "queen",
  n: "knight"
} as const;


