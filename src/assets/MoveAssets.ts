import { MoveClassification } from "../constants/classification";

export const MoveClassificationImages: Record<MoveClassification, string> = {
  [MoveClassification.Book]: "/move-quality/book.png",
  [MoveClassification.Best]: "/move-quality/best.png",
  [MoveClassification.Excellent]: "/move-quality/excellent.png",
  [MoveClassification.Good]: "/move-quality/good.png",
  [MoveClassification.Inaccuracy]: "/move-quality/inaccuracy.png",
  [MoveClassification.Mistake]: "/move-quality/mistake.png",
  [MoveClassification.Blunder]: "/move-quality/blunder.png",
  [MoveClassification.Brilliant]: "/move-quality/brilliant.png",
};
