import { MoveClassification } from "../constants/classification";
import { Color } from "chess.js";

export type Classification =
  | MoveClassification.Blunder
  | MoveClassification.Mistake
  | MoveClassification.Inaccuracy
  | MoveClassification.Good
  | MoveClassification.Excellent
  | MoveClassification.Best
  | MoveClassification.Book
  | MoveClassification.Brilliant;

export interface Move {
  san: string;
  lan: string;
  piece: string;
  source: string;
  destination: string;
  color: Color
}
