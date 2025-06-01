import { ColorLongForm } from "./player";

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

export type Color = ColorLongForm | "both";
