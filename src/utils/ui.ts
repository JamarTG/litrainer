import { pieceLongFormWithoutKing } from "@/constants/piece";
import { PieceShortFormWithoutKing } from "@/typing/interfaces";
import { Bishop, Knight, Pawn, Queen, Rook } from "./pieces";

export const getPieceSVGComponent = (pieceType: PieceShortFormWithoutKing) => {
  const PIECE_SVGS = {
    bishop: Bishop,
    knight: Knight,
    pawn: Pawn,
    queen: Queen,
    rook: Rook
  };

  return PIECE_SVGS[pieceLongFormWithoutKing[pieceType] as keyof typeof PIECE_SVGS];
};
