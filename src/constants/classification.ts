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

export const MoveClassificationImages: Record<MoveClassification, string> = {
  [MoveClassification.Book]: "/move-quality/book.svg",
  [MoveClassification.Best]: "/move-quality/best.svg",
  [MoveClassification.Excellent]: "/move-quality/excellent.svg",
  [MoveClassification.Good]: "/move-quality/good.svg",
  [MoveClassification.Inaccuracy]: "/move-quality/inaccuracy.svg",
  [MoveClassification.Mistake]: "/move-quality/mistake.svg",
  [MoveClassification.Blunder]: "/move-quality/blunder.svg",
  [MoveClassification.Brilliant]: "/move-quality/brilliant.svg",
};

export const ClassificationColors: Record<string, string> = {
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