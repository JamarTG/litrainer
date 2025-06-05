export enum EngineName {
  Stockfish16_1 = "stockfish_16_1",
  Stockfish16_1Lite = "stockfish_16_1_lite",
  Stockfish16NNUE = "stockfish_16_nnue",
  Stockfish16 = "stockfish_16"
  // Stockfish11 = "stockfish_11", [SCRIPT REMOVED]
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
