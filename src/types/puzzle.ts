import { LichessClock } from "./clock";
import { LichessEvaluation } from "./eval";
import { GameType } from "./form";
import { Move } from "./move";
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
  userMove: Move;
  opponentMove: Move;
  clock: LichessClock;
  winner?: "white" | "black";
  moveNumber: number;
  opening: Opening;
  phase: "opening" | "middlegame"| "endgame"
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
