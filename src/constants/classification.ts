import { MoveClassification } from "@/types/classification";

export const CLASSIFICATION_IMAGES: Record<MoveClassification, string> = {
  [MoveClassification.Book]: "/classification/book.svg",
  [MoveClassification.Great]: "/classification/great.svg",
  [MoveClassification.Best]: "/classification/best.svg",
  [MoveClassification.Excellent]: "/classification/excellent.svg",
  [MoveClassification.Good]: "/classification/good.svg",
  [MoveClassification.Inaccuracy]: "/classification/inaccuracy.svg",
  [MoveClassification.Mistake]: "/classification/mistake.svg",
  [MoveClassification.Blunder]: "/classification/blunder.svg"
} as const;

export const CLASSIFICATION_COLORS: Record<string, string> = {
  [MoveClassification.Book]: "#a88865",
  [MoveClassification.Best]: "#96bc4b",
  [MoveClassification.Excellent]: "#96bc4b",
  [MoveClassification.Good]: "#96af8b",
  [MoveClassification.Inaccuracy]: "#f7c045",
  [MoveClassification.Mistake]: "#e58f2a",
  [MoveClassification.Blunder]: "#ca3431"
} as const;

export const CLASSIFICATION_MESSAGES: Record<MoveClassification, string> = {
  [MoveClassification.Blunder]: "is a blunder",
  [MoveClassification.Mistake]: "is a mistake",
  [MoveClassification.Inaccuracy]: "is an inaccuracy",
  [MoveClassification.Good]: "is a good move",
  [MoveClassification.Excellent]: "is an excellent move",
  [MoveClassification.Best]: "is the best move",
  [MoveClassification.Book]: "is a book move",
  [MoveClassification.Great]: "is a great move"
} as const;
