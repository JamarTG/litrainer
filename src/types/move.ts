export enum MoveClassification {
  Blunder    = "Blunder",
  Mistake    = "Mistake",
  Inaccuracy = "Inaccuracy",
  Good       = "Good",
  Excellent  = "Excellent",
  Best       = "Best",
  Book       = "Book",
  Brilliant = "Brilliant"
}

export const ClassificationColors: Record<MoveClassification, string> = {
  [MoveClassification.Book]: "#a88865",
  [MoveClassification.Best]: "#96bc4b",
  [MoveClassification.Excellent]: "#96bc4b",
  [MoveClassification.Good]: "#96af8b",
  [MoveClassification.Inaccuracy]: "#f7c045",
  [MoveClassification.Mistake]: "#e58f2a",
  [MoveClassification.Blunder]: "#ca3431",
  [MoveClassification.Brilliant]: "#1bada6",

};

export const ClassificationMessage: Record<MoveClassification, string> = {
  [MoveClassification.Blunder]: "is a blunder",
  [MoveClassification.Mistake]: "is a mistake",
  [MoveClassification.Inaccuracy]: "is an inaccuracy",
  [MoveClassification.Good]: "is a good move",
  [MoveClassification.Excellent]: "is an excellent move",
  [MoveClassification.Best]: "is the best move",
  [MoveClassification.Book]: "is a book move",
  [MoveClassification.Brilliant]: "is a brilliant move",
};

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
  color: string;
}
