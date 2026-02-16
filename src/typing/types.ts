import { MoveClassification } from "./enums";
import { Material } from "./interfaces";


export type Sort = "asc" | "desc";
export type GameType = "bullet" | "blitz" | "rapid" | "classical" | "correspondence";
export type Phase = "opening" | "middlegame" | "endgame";

export type Classification = (typeof MoveClassification)[keyof typeof MoveClassification];

export type PieceCount = [keyof Material, Material[keyof Material]];
