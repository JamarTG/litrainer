export enum EngineName {
  Stockfish17SingleThreaded = "stockfish_17_single",
  Stockfish17LiteSingleThreaded = "stockfish_17_lite_single",
  Stockfish17LiteMultiThreaded = "stockfish_17_lite_multi"
}

export interface PositionEvaluation {
  bestMove?: string;
  opening?: string;
  lines: VariationLineEvaluation[];
}

export interface VariationLineResult {
  move: string;
  eval: number;
}

export interface VariationLineEvaluation {
  pv: string[];
  cp?: number;
  mate?: number;
  depth: number;
  multiPv: number;
}
