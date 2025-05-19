import { MoveClassification } from "../constants/classification";
import { Classification } from "../types/classification";

export const isPositiveClassification = (classificationResult: Classification) => {
  return (
    classificationResult === MoveClassification.Best ||
    classificationResult === MoveClassification.Excellent ||
    classificationResult === MoveClassification.Good ||
    classificationResult === MoveClassification.Brilliant
  );
};
