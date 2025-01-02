export interface Fields {
  username: string;
  maxNoGames: number;
  startDate: string;
  endDate: string;
  gameTypes: GameType[];
  color: Color;
  sort : "asc" | "desc";
}


export type GameType = "bullet" | "blitz" | "rapid" | "classical" | "correspondence";

export type Color = "black" | "white" | "both";
