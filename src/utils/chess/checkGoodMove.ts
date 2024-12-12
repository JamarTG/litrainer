import { normalizeCastlingMove } from "./normalizeCastle";

const checkGoodMove = (acceptableMoves: string[], move: string) => {
  console.log("acceptableMoves:",acceptableMoves,move);
  return acceptableMoves.includes(normalizeCastlingMove(move as string));
};

export default checkGoodMove;