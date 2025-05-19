import { Classification, MoveClassification } from "../types/move";

export const isPositiveClassification = (
  classificationResult: Classification
) => {
  return (
    classificationResult === MoveClassification.Best ||
    classificationResult === MoveClassification.Excellent ||
    classificationResult === MoveClassification.Good ||
    classificationResult === MoveClassification.Brilliant
  );
};
