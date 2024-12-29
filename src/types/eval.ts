export interface PositionEval {
  bestMove?: string;
  opening?: string;
  lines: LineEval[];
}

export interface LineResult {
  move: string;
  eval: number;
}

export interface LineEval {
  pv: string[];
  cp?: number;
  mate?: number;
  depth: number;
  multiPv: number;
}

export interface LichessEvaluation {
  eval: number;
  best?: string;
  variation?: string;
  judgment?: {
    name: "Inaccuracy" | "Blunder" | "Mistake";
    comment: string;
  };
}

export enum AnalysisSource {
  LichessAPI = "LichessAPI",
  Stockfish = "Stockfish",
  Opening = "Opening",
}

export type Source =
  | AnalysisSource.LichessAPI
  | AnalysisSource.Stockfish
  | AnalysisSource.Opening
  | null;

export interface Material {
  p: number;
  n: number;
  b: number;
  r: number;
  q: number;
}

export interface Materials {
  w: Material;
  b: Material;
}
