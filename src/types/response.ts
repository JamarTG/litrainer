import { LichessClock } from "./clock";
import { LichessPlayers } from "./player";

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
  winner?: "white" | "black" ;
}
