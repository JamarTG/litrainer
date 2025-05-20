import { Color, PieceSymbol, Square } from "chess.js";
import { LichessClock } from "./clock";
import { LichessEvaluation } from "./eval";
import { GameType } from "./form";
import { LichessPlayers } from "./player";

export interface Puzzle {
  evaluation: LichessEvaluation;
  fen: Fen;
  players: LichessPlayers;
  gameId: string;
  timeControl: GameType;
  rated: boolean;
  status: string;
  variant: string;
  userMove:{ san: string; lan: string; piece: PieceSymbol; source: Square; destination: Square; color: Color; };
  opponentMove: { san: string; lan: string; piece: PieceSymbol; source: Square; destination: Square; color: Color; };
  clock: LichessClock;
  winner?: "w" | "b";
  moveNumber: number;
  opening: Opening;
  phase: "opening" | "middlegame" | "endgame";
}

export interface Opening {
  eco: string;
  name: string;
  ply: number;
}

export interface Fen {
  current: string;
  previous: string;
}
