import { Color, PieceSymbol, Square } from "chess.js";
import { ColorLongForm } from "./enums";
import { GameType, Phase, Sort } from "./types";


export interface PositionEvaluation {
  bestMove?: string;
  opening?: string;
  lines: VariationLineEvaluation[];
}

export interface VariationLineResult {
  move: string;
  eval: number;
}

export interface VariationLineEvaluation {
  pv: string[];
  cp?: number;
  mate?: number;
  depth: number;
  multiPv: number;
}


export interface LichessEvaluation {
  eval: number;
  best?: string;
  variation?: string;
  judgment?: {
    name: "Inaccuracy" | "Blunder" | "Mistake";
    comment: string;
  };
}

export interface LichessPlayers {
  white: LichessPlayer;
  black: LichessPlayer;
}

interface LichessUserMetaData {
  name: string;
  flair: string;
  title?: string;
  patron?: boolean;
}

export interface LichessPlayer {
  rating: number;
  ratingDiff: number;
  user: LichessUserMetaData;
  provisional?: boolean;
}

export interface LichessGameResponse {
  players: LichessPlayers;
  moves: string;
  game_id: string;
  fen: string;
  perf: string;
  rated: boolean;
  status: string;
  variant: string;
  clock: LichessClock;
  winner?: ColorLongForm;
  opening: Opening;
  division: {
    middle: number;
    end: number;
  };
}

export interface Puzzle {
  evaluation: LichessEvaluation;
  fen: Fen;
  players: LichessPlayers;
  gameId: string;
  timeControl: GameType;
  rated: boolean;
  status: string;
  variant: string;
  userMove: {
    san: string;
    lan: string;
    piece: PieceSymbol;
    source: Square;
    destination: Square;
    color: Color;
  };
  opponentMove: {
    san: string;
    lan: string;
    piece: PieceSymbol;
    source: Square;
    destination: Square;
    color: Color;
  };
  clock: LichessClock;
  winner?: ColorLongForm;
  moveNumber: number;
  gameOpening: Opening;
  phase: Phase;
  positionOpening: PositionOpening | null;
}

interface LichessClock {
  initial: number;
  increment: number;
  totalTime: number;
}

export interface Opening {
  eco: string;
  name: string;
  ply: number;
}

export interface PositionOpening {
  eco: string;
  name: string;
  pgn: string;
}

export interface Fen {
  current: string;
  previous: string;
}


export interface Fields {
  username: string;
  maxNoGames: number;
  startDate: string;
  endDate: string;
  gameTypes: GameType[];
  color: ColorLongForm | "both";
  sort: Sort;
}

export interface Material {
  p: number;
  n: number;
  b: number;
  r: number;
  q: number;
}

export interface Materials {
  w: Material;
  b: Material;
}


type PieceShortForm = "p" | "b" | "r" | "k" | "n" | "q";
type PieceLongForm = "pawn" | "bishop" | "rook" | "king" | "knight" | "queen";

export type PieceShortFormWithoutKing = Exclude<PieceShortForm, "k">;
export type PieceLongFormWithoutKing = Exclude<PieceLongForm, "king">;

export interface PromotionPiece {
  piece: PieceShortForm;
  name: Capitalize<PieceLongForm>;
}
