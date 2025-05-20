import { MoveClassification } from "../../constants/classification";
import { PositionEval } from "../../types/eval";

export const getBasicClassification = (
  lastPositionEval: PositionEval,
  currentPositionEval: PositionEval,
  move: string
): MoveClassification => {
  if (lastPositionEval.bestMove === move) {
    return MoveClassification.Best;
  }

  const convertMateScore = (mate: number | undefined): number => {
    if (mate === undefined) return 0;
    return mate > 0 ? 100000 - mate * 100 : -100000 - mate * 100;
  };

  const currentCp = currentPositionEval.lines[0].mate
    ? convertMateScore(currentPositionEval.lines[0].mate)
    : currentPositionEval.lines[0].cp ?? 0;

  const lastCp = lastPositionEval.lines[0].mate
    ? convertMateScore(lastPositionEval.lines[0].mate)
    : lastPositionEval.lines[0].cp ?? 0;

  const cpDiff = Math.abs(currentCp - lastCp);

  if (cpDiff >= 300) return MoveClassification.Blunder;
  if (cpDiff >= 100) return MoveClassification.Mistake;
  if (cpDiff >= 50) return MoveClassification.Inaccuracy;
  if (cpDiff >= 20) return MoveClassification.Good;

  return MoveClassification.Excellent;
};
