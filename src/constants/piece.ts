import { PieceLongFormWithoutKing, PieceShortFormWithoutKing } from "@/typing/interfaces";

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
  ["p"]: 1,
  ["n"]: 3,
  ["b"]: 3,
  ["r"]: 5,
  ["q"]: 9,
  ["k"]: 0
};

export const initialPieceCounts = {
  w: {
    p: 0,
    n: 0,
    b: 0,
    r: 0,
    q: 0
  },
  b: {
    p: 0,
    n: 0,
    b: 0,
    r: 0,
    q: 0
  }
};

export const pieceLongFormWithoutKing: Record<PieceShortFormWithoutKing, PieceLongFormWithoutKing> = {
  b: "bishop",
  p: "pawn",
  r: "rook",
  q: "queen",
  n: "knight"
} as const;
