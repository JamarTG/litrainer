import { MoveClassification } from "./enums";

// Lichess
export type Sort = "asc" | "desc";
export type GameType = "bullet" | "blitz" | "rapid" | "classical" | "correspondence";

export type Phase = "opening" | "middlegame" | "endgame";

// Classification
export type Classification = (typeof MoveClassification)[keyof typeof MoveClassification];
