import { MoveClassification } from "./enums";
import { Material } from "./interfaces";

// Lichess
export type Sort = "asc" | "desc";
export type GameType = "bullet" | "blitz" | "rapid" | "classical" | "correspondence";
export type Phase = "opening" | "middlegame" | "endgame";

// Classification
export type Classification = (typeof MoveClassification)[keyof typeof MoveClassification];

// Chess
export type PieceCount = [keyof Material, Material[keyof Material]];
