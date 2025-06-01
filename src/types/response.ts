import { LichessClock } from "./clock";
import { ColorLongForm, LichessPlayers } from "./player";
import { Opening } from "./puzzle";

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
