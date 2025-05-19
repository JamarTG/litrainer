import { MoveClassification } from "../constants/classification";

export const MoveClassificationImages: Record<MoveClassification, string> = {
  [MoveClassification.Book]: "/assets/move-quality/book.png",
  [MoveClassification.Best]: "/assets/move-quality/best.png",
  [MoveClassification.Excellent]: "/assets/move-quality/excellent.png",
  [MoveClassification.Good]: "/assets/move-quality/good.png",
  [MoveClassification.Inaccuracy]: "/assets/move-quality/inaccuracy.png",
  [MoveClassification.Mistake]: "/assets/move-quality/mistake.png",
  [MoveClassification.Blunder]: "/assets/move-quality/blunder.png",
  [MoveClassification.Brilliant]: "/assets/move-quality/brilliant.png",
};
