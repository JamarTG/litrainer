import { normalizeCastlingMove } from "./normalizeCastle";

const checkGoodMove = (acceptableMoves: string[], move: string) => {
  return acceptableMoves.includes(normalizeCastlingMove(move as string));
};

export default checkGoodMove;