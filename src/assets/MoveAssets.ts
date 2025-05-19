import { MoveClassification } from "../constants/classification";

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
