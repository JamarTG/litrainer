import { Color, PieceSymbol, Square } from "chess.js";

export interface LichessEvaluation {
  eval: number;
  best?: string;
  variation?: string;
  judgment?: {
    name: "Inaccuracy" | "Blunder" | "Mistake";
    comment: string;
  };
}

export interface Fields {
  username: string;
  maxNoGames: number;
  startDate: string;
  endDate: string;
  gameTypes: GameType[];
  color: Color;
  sort: Sort;
}

export type Sort = "asc" | "desc";

export type GameType = "bullet" | "blitz" | "rapid" | "classical" | "correspondence";

// export type Color = ColorLongForm | "both";

export interface LichessPlayers {
  white: LichessPlayer;
  black: LichessPlayer;
}

export interface LichessPlayer {
  rating: number;
  ratingDiff: number;
  user: LichessUserMetaData;
  provisional?: boolean;
}

export type ColorLongForm = "white" | "black";

interface LichessUserMetaData {
  name: string;
  flair: string;
  title?: string;
  patron?: boolean;
}

export interface LichessClock {
  initial: number;
  increment: number;
  totalTime: number;
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

type Phase = "opening" | "middlegame" | "endgame";

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
