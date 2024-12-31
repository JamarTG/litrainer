import { useEffect } from "react";
import { Chess } from "chess.js";
import { getMaterialDiff } from "../../../utils/chess";
import { Materials } from "../../../types/eval";

export const useMaterialEffect = (game: Chess, setMaterial: (material: Materials) => void) => {
  useEffect(() => {
    setMaterial(getMaterialDiff(game));
  }, [game.fen(), setMaterial]);
};