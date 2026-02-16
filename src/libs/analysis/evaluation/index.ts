import { MoveClassification } from "@/typing/enums";
import { PositionEvaluation } from "@/typing/interfaces";

export const getBasicClassification = (
  lastPositionEvaluation: PositionEvaluation,
  currentPositionEvaluation: PositionEvaluation,
  move: string
): MoveClassification => {
  if (lastPositionEvaluation.bestMove === move) {
    const cp1 = lastPositionEvaluation?.lines?.[0]?.cp ?? 0;
    const cp2 = lastPositionEvaluation?.lines?.[1]?.cp ?? 0;

    const cpDiff = Math.abs(cp1 - cp2);

    if (cpDiff >= 70) {
      return MoveClassification.great;
    }

    return MoveClassification.best;
  }
  const currentCentipawn = currentPositionEvaluation.lines[0].mate
    ? convertMateScore(currentPositionEvaluation.lines[0].mate)
    : (currentPositionEvaluation.lines[0].cp ?? 0);

  const lastCentipawn = lastPositionEvaluation.lines[0].mate
    ? convertMateScore(lastPositionEvaluation.lines[0].mate)
    : (lastPositionEvaluation.lines[0].cp ?? 0);

  const centipawnDifference = Math.abs(currentCentipawn - lastCentipawn);

  if (centipawnDifference >= 300) return MoveClassification.blunder;
  if (centipawnDifference >= 100) return MoveClassification.mistake;
  if (centipawnDifference >= 50) return MoveClassification.inaccuracy;
  if (centipawnDifference >= 20) return MoveClassification.good;

  return MoveClassification.excellent;
};

const convertMateScore = (mate: number | undefined): number => {
  const isNoMate = mate === undefined;
  if (isNoMate) return 0;
  const isMateForWhite = mate > 0;

  const whiteMateScore = 100000 - mate * 100;
  const blackMateScore = -100000 - mate * 100;

  return isMateForWhite ? whiteMateScore : blackMateScore;
};
