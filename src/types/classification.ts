export enum MoveClassification {
  Blunder = "Blunder",
  Mistake = "Mistake",
  Inaccuracy = "Inaccuracy",
  Good = "Good",
  Excellent = "Excellent",
  Best = "Best",
  Book = "Book",
  Unknown = "Unknown"
}

export type Classification =
  | MoveClassification.Blunder
  | MoveClassification.Mistake
  | MoveClassification.Inaccuracy
  | MoveClassification.Good
  | MoveClassification.Excellent
  | MoveClassification.Best
  | MoveClassification.Book
  | MoveClassification.Unknown;
