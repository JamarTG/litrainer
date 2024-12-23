import { LichessClock } from "./clock";
import { LichessEvaluation } from "./eval";
import { Move } from "./move";
import { LichessPlayers } from "./player";

export interface Puzzle {
  evaluation: LichessEvaluation;
  fen: Fen;
  players: LichessPlayers;
  gameId: string;
  timeControl: string;
  rated: boolean;
  status: string;
  variant: string;
  userMove: Move;
  opponentMove: Move;
  clock: LichessClock;
}

export interface Fen {
    current: string;
    previous: string;
}

export interface PuzzleIndex {
  x: number;
  y: number;
}
