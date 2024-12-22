import { Accuracy, LineEval, PositionEval } from "../types/eval";

export const ceilsNumber = (number: number, min: number, max: number) => {
  if (number > max) return max;
  if (number < min) return min;
  return number;
};

export const getHarmonicMean = (array: number[]) => {
  const sum = array.reduce((acc, curr) => acc + 1 / curr, 0);
  return array.length / sum;
};

export const getStandardDeviation = (array: number[]) => {
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;
  return Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  );
};

export const getWeightedMean = (array: number[], weights: number[]) => {
  if (array.length > weights.length)
    throw new Error("Weights array is too short");

  const weightedSum = array.reduce(
    (acc, curr, index) => acc + curr * weights[index],
    0
  );
  const weightSum = weights
    .slice(0, array.length)
    .reduce((acc, curr) => acc + curr, 0);

  return weightedSum / weightSum;
};


// COMPUTE ACCURACY

export const computeAccuracy = (positions: PositionEval[]): Accuracy => {
  const positionsWinPercentage = positions.map(getPositionWinPercentage);

  const weights = getAccuracyWeights(positionsWinPercentage);

  const movesAccuracy = getMovesAccuracy(positionsWinPercentage);

  const whiteAccuracy = getPlayerAccuracy(movesAccuracy, weights, "white");
  const blackAccuracy = getPlayerAccuracy(movesAccuracy, weights, "black");

  return {
    white: whiteAccuracy,
    black: blackAccuracy,
  };
};

const getPlayerAccuracy = (
  movesAccuracy: number[],
  weights: number[],
  player: "white" | "black"
): number => {
  const remainder = player === "white" ? 0 : 1;
  const playerAccuracies = movesAccuracy.filter(
    (_, index) => index % 2 === remainder
  );
  const playerWeights = weights.filter((_, index) => index % 2 === remainder);

  const weightedMean = getWeightedMean(playerAccuracies, playerWeights);
  const harmonicMean = getHarmonicMean(playerAccuracies);

  return (weightedMean + harmonicMean) / 2;
};

const getAccuracyWeights = (movesWinPercentage: number[]): number[] => {
  const windowSize = ceilsNumber(
    Math.ceil(movesWinPercentage.length / 10),
    2,
    8
  );

  const windows: number[][] = [];
  const halfWindowSize = Math.round(windowSize / 2);

  for (let i = 1; i < movesWinPercentage.length; i++) {
    const startIdx = i - halfWindowSize;
    const endIdx = i + halfWindowSize;

    if (startIdx < 0) {
      windows.push(movesWinPercentage.slice(0, windowSize));
      continue;
    }

    if (endIdx > movesWinPercentage.length) {
      windows.push(movesWinPercentage.slice(-windowSize));
      continue;
    }

    windows.push(movesWinPercentage.slice(startIdx, endIdx));
  }

  const weights = windows.map((window) => {
    const std = getStandardDeviation(window);
    return ceilsNumber(std, 0.5, 12);
  });

  return weights;
};

const getMovesAccuracy = (movesWinPercentage: number[]): number[] =>
  movesWinPercentage.slice(1).map((winPercent, index) => {
    const lastWinPercent = movesWinPercentage[index];
    const winDiff = Math.abs(lastWinPercent - winPercent);

    const rawAccuracy =
      103.1668100711649 * Math.exp(-0.04354415386753951 * winDiff) -
      3.166924740191411;

    return Math.min(100, Math.max(0, rawAccuracy + 1));
  });

// COMPUTE WIN PERCENTAGE

export const getPositionWinPercentage = (position: PositionEval): number => {
  return getLineWinPercentage(position.lines[0]);
};

export const getLineWinPercentage = (line: LineEval): number => {
  if (line.cp !== undefined) {
    return getWinPercentageFromCp(line.cp);
  }

  if (line.mate !== undefined) {
    return getWinPercentageFromMate(line.mate);
  }

  throw new Error("No cp or mate in line");
};

const getWinPercentageFromMate = (mate: number): number => {
  const mateInf = mate * Infinity;
  return getWinPercentageFromCp(mateInf);
};

const getWinPercentageFromCp = (cp: number): number => {
  const cpCeiled = ceilsNumber(cp, -1000, 1000);
  const MULTIPLIER = -0.004;
  const winChances = 2 / (1 + Math.exp(MULTIPLIER * cpCeiled)) - 1;
  return 50 + 50 * winChances;
};
