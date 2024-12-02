import { Chess } from "chess.js";
import { Dispatch, SetStateAction } from "react";
import { playVariationSound } from "./playSound";

const playMoveWithDelay = (
  index: number,
  setMarkerType: Dispatch<SetStateAction<"wrong" | "best" | null>>,
  variationMoves: string[],
  game: Chess,
  setFen: Dispatch<SetStateAction<string>>
) => {
  setMarkerType(null);
  if (index < variationMoves.length) {
    setTimeout(() => {
      const result = game.move(variationMoves[index]);
      playVariationSound(game, result);
      setFen(game.fen());

      if (result !== null) {
        playMoveWithDelay(
          index + 1,
          setMarkerType,
          variationMoves,
          game,
          setFen
        );
      } else {
        console.error(`Invalid move: ${variationMoves[index]}`);
      }
    }, 800);
  }
};

export default playMoveWithDelay;
