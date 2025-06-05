type PieceShortForm = "p" | "b" | "r" | "k" | "n" | "q";
type PieceLongForm = "pawn" | "bishop" | "rook" | "king" | "knight" | "queen";

export type PieceShortFormWithoutKing = Exclude<PieceShortForm, "k">;
export type PieceLongFormWithoutKing = Exclude<PieceLongForm, "king">;

export interface PromotionPiece {
  piece: PieceShortForm;
  name: Capitalize<PieceLongForm>;
}
