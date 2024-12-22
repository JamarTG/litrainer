export interface Move {
  san: string;
  lan: string;
  piece: string;
  source: string;
  destination: string;
  color: string;
}

export interface BestMove {
  move: string;
  eval: number;
}
