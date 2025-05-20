import { MoveClassification } from "../../constants/classification";
import { Classification } from "../../types/classification";
import { PositionEvaluation } from "../../types/eval";

const convertMateScore = (mate: number | undefined): number => {
  const isNoMate = mate === undefined
  
  if (isNoMate) return 0;

  const isMateForWhite = mate > 0;
  
  const whiteMateScore = 100000 - mate * 100;
  const blackMateScore = -100000 - mate * 100;

  return isMateForWhite ? whiteMateScore : blackMateScore;
};

export const getBasicClassification = (
  lastPositionEvaluation: PositionEvaluation,
  currentPositionEvaluation: PositionEvaluation,
  move: string
): MoveClassification => {
  
  if (lastPositionEvaluation.bestMove === move) {
    return MoveClassification.Best;
  }
  const currentCentipawn = currentPositionEvaluation.lines[0].mate
    ? convertMateScore(currentPositionEvaluation.lines[0].mate)
    : currentPositionEvaluation.lines[0].cp ?? 0;

  const lastCentipawn = lastPositionEvaluation.lines[0].mate
    ? convertMateScore(lastPositionEvaluation.lines[0].mate)
    : lastPositionEvaluation.lines[0].cp ?? 0;

  const centipawnDifference = Math.abs(currentCentipawn - lastCentipawn);

  if (centipawnDifference >= 300) return MoveClassification.Blunder;
  if (centipawnDifference >= 100) return MoveClassification.Mistake;
  if (centipawnDifference >= 50) return MoveClassification.Inaccuracy;
  if (centipawnDifference >= 20) return MoveClassification.Good;

  return MoveClassification.Excellent;
};



export const isPositiveClassification = (classificationResult: Classification) => {
  return (
    classificationResult === MoveClassification.Best ||
    classificationResult === MoveClassification.Excellent ||
    classificationResult === MoveClassification.Good ||
    classificationResult === MoveClassification.Brilliant
  );
};
