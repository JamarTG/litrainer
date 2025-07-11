import { PositionEvaluation, VariationLineEvaluation } from "@/typing/interfaces";

export const parseEvaluationResults = (results: string[], whiteToPlay: boolean): PositionEvaluation => {
  const parsedResults: PositionEvaluation = {
    lines: []
  };
  const tempResults: Record<string, VariationLineEvaluation> = {};

  for (const result of results) {
    if (result.startsWith("bestmove")) {
      const bestMove = getResultProperty(result, "bestmove");
      if (bestMove) {
        parsedResults.bestMove = bestMove;
      }
    }

    if (result.startsWith("info")) {
      const pv = getResultPv(result);
      const multiPv = getResultProperty(result, "multipv");
      const depth = getResultProperty(result, "depth");
      if (!pv || !multiPv || !depth) continue;

      if (tempResults[multiPv] && parseInt(depth) < tempResults[multiPv].depth) {
        continue;
      }

      const cp = getResultProperty(result, "cp");
      const mate = getResultProperty(result, "mate");

      tempResults[multiPv] = {
        pv,
        cp: cp ? parseInt(cp) : undefined,
        mate: mate ? parseInt(mate) : undefined,
        depth: parseInt(depth),
        multiPv: parseInt(multiPv)
      };
    }
  }

  parsedResults.lines = Object.values(tempResults).sort(sortLines);

  if (!whiteToPlay) {
    parsedResults.lines = parsedResults.lines.map((line) => ({
      ...line,
      cp: line.cp ? -line.cp : line.cp,
      mate: line.mate ? -line.mate : line.mate
    }));
  }

  return parsedResults;
};

export const sortLines = (a: VariationLineEvaluation, b: VariationLineEvaluation): number => {
  if (a.mate !== undefined && b.mate !== undefined) {
    return a.mate - b.mate;
  }

  if (a.mate !== undefined) {
    return -a.mate;
  }

  if (b.mate !== undefined) {
    return b.mate;
  }

  return (b.cp ?? 0) - (a.cp ?? 0);
};

export const getResultProperty = (result: string, property: string): string | undefined => {
  const splitResult = result.split(" ");
  const propertyIndex = splitResult.indexOf(property);

  const isInvalidPropertyIndex = propertyIndex === -1 || propertyIndex + 1 >= splitResult.length;
  return isInvalidPropertyIndex ? undefined : splitResult[propertyIndex + 1];
};

const getResultPv = (result: string): string[] | undefined => {
  const splitResult = result.split(" ");
  const pvIndex = splitResult.indexOf("pv");

  const isInvalidPvIndex = pvIndex === -1 || pvIndex + 1 >= splitResult.length;
  return isInvalidPvIndex ? undefined : splitResult.slice(pvIndex + 1);
};
