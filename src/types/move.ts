export enum MoveClassification {
  Blunder    = "Blunder",
  Mistake    = "Mistake",
  Inaccuracy = "Inaccuracy",
  Good       = "Good",
  Excellent  = "Excellent",
  Best       = "Best",
  Book       = "Book",
}

export enum ClassificationMessage {
  Blunder    = "is a blunder",
  Mistake    = "is a mistake",
  Inaccuracy = "is an inaccuracy",
  Good       = "is a good move",
  Excellent  = "is an excellent move",
  Best       = "is the best move",
  Book       = "is a book move",
  
}

export type Classification =
  | MoveClassification.Blunder
  | MoveClassification.Mistake
  | MoveClassification.Inaccuracy
  | MoveClassification.Good
  | MoveClassification.Excellent
  | MoveClassification.Best
  | MoveClassification.Book;

export interface Move {
  san: string;
  lan: string;
  piece: string;
  source: string;
  destination: string;
  color: string;
}
